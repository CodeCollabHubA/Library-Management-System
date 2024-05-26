import { createContext, useContext, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { initialStatusMessage, userLocalStorage } from '../utils/constant';

const Context = createContext()

const ContextProvider = ({ children }) => {
    const [data, setData] = useState([])
    const [state, setState] = useState(initialStatusMessage)
    const [books, setBooks] = useState([])
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem(userLocalStorage) || "{}"))
    const [publishers, setPublishers] = useState([])
    const [authors, setAuthors] = useState([])
    const [users, setUsers] = useState({})
    const [borrowings, setBorrowings] = useState([])
    const [borrowingsActions, setBorrowingsActions] = useState([])
    const [bag,setBag]= useState([])
    const toBorrow = bag.length



    const value = {
        data, setData,
        state, setState,
        user, setUser,
        books, setBooks,
        publishers, setPublishers,
        authors, setAuthors,
        users, setUsers,
        borrowings, setBorrowings,
        borrowingsActions, setBorrowingsActions,
        toBorrow,
        bag,setBag,
    }

    return (
        <Context.Provider
            value={value}
        >
            <Toaster />
            {children}
        </Context.Provider>
    );
}

export const useMyContext = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error("useMyContext must be used within a ContextProvider");
    }
    return context;
};

export default ContextProvider;
