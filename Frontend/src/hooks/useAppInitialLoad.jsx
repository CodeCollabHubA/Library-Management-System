import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { useMyContext } from '../context/ContextProvider';
import apiEndPoints from '../services/apiEndPoints';
import http from '../services/httpService';
import { statusArray, statusEmoji } from '../utils/constant';

const { bookApi, publisherApi, authorApi, userApi, borrowingApi } = apiEndPoints
const useAppInitialLoad = () => {
    const {
        state,
        setState,
        user,
        setBooks,
        setPublishers,
        setAuthors,
        setUsers,
        borrowings,
        setBorrowings,
        setData,
        setBorrowingsActions
    } = useMyContext()

    const loadData = async () => {
        try {
            // const { data: books } = await http.get(bookApi)
            // setBooks(books)
            const { data } = await http.get("http://localhost:5173/data.json")
            setData(data)

            if (Object.keys(user) > 0) {
                const { data: borrowings } = await http.get(borrowingApi)
                setBorrowings(borrowings)

                if (user?.userRole === "Admin") {
                    const { data: publishers } = await http.get(publisherApi)
                    const { data: authors } = await http.get(authorApi)
                    const { data: users } = await http.get(userApi)
                    setPublishers(publishers)
                    setAuthors(authors)
                    setUsers(users)
                }
                setState({ status: "success", message: "Data Fetched" })
            }
        } catch (err) {
            setState({ status: "error", message: "error Fetching data" })
            console.error(err);
        }
    }

    useEffect(() => {
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    useEffect(() => {
        if (user?.userRole === "Admin") {
            setBorrowingsActions(borrowings.filter(borrowing => ["Pending", "Borrowed"].includes(borrowing.status)))
        } else if (user?.userRole === "User") {
            setBorrowingsActions(borrowings.filter(borrowing => ["Pending", "Approved"].includes(borrowing.status)))
        }
    }, [borrowings])

    useEffect(() => {
        if (statusArray.includes(state?.status) && state?.message) {
            toast[state.status](`${state.message} ${statusEmoji[state.status]}`)
        }
        setState("")
    }, [setState, state])

    return
}

export default useAppInitialLoad;