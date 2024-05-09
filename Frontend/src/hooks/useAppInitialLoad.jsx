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
        setBorrowings
    } = useMyContext()

    const loadData = async () => {
        try {
            const { data: books } = await http.get(bookApi)
            setBooks(books)

            if (user?.userRole === "Admin") {
                const { data: publishers } = await http.get(publisherApi)
                setPublishers(publishers)
                const { data: authors } = await http.get(authorApi)
                const { data: users } = await http.get(userApi)
                const { data: borrowings } = await http.get(borrowingApi)
                setAuthors(authors)
                setUsers(users)
                setBorrowings(borrowings)
            }

            setState({ status: "success", message: "Data Fetched" })
        } catch (err) {
            setState({ status: "error", message: "error Fetching data" })
            console.error(err);
        }
    }

    useEffect(() => {
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (statusArray.includes(state?.status) && state?.message) {
            toast[state.status](`${state.message} ${statusEmoji[state.status]}`)
        }
        setState("")
    }, [setState, state])

    return
}

export default useAppInitialLoad;