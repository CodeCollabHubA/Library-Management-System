import { createContext, useContext, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { initialStatusMessage } from '../utils/constant';

const Context = createContext()

const ContextProvider = ({ children }) => {
    const [state, setState] = useState(initialStatusMessage)
    const [books, setBooks] = useState()
    const [user, setUser] = useState()
    const [publishers, setPublishers] = useState()
    const [authors, setAuthors] = useState()
    const [users, setUsers] = useState()
    const [borrowings, setBorrowings] = useState()

    const value = {
        state, setState,
        user, setUser,
        books, setBooks,
        publishers, setPublishers,
        authors, setAuthors,
        users, setUsers,
        borrowings, setBorrowings,
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
