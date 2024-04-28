import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { useMyContext } from '../context/ContextProvider';
import apiEndPoints from '../services/apiEndPoints';
import { getCurrentUser } from '../services/authService';
import http from '../services/httpService';
import { statusArray, statusEmoji } from '../utils/constant';


const { booksApi, publishersApi, authorsApi, usersApi, borrowingApi } = apiEndPoints
const useAppInitialLoad = () => {

    const {
        state,
        setState,
        // user,
        setUser,
        setBooks,
        setPublishers,
        setAuthors,
        setUsers,
        setBorrowing
    } = useMyContext()

    const loadData = async () => {
        try {
            const { data: books } = await http.get(booksApi)
            const { data: publishers } = await http.get(publishersApi)
            const { data: authors } = await http.get(authorsApi)
            const { data: users } = await http.get(usersApi)
            const { data: borrowing } = await http.get(borrowingApi)
            const dataUser = getCurrentUser()
            setUser(dataUser)
            setBooks(books)
            setPublishers(publishers)
            setAuthors(authors)
            setUsers(users)
            setBorrowing(borrowing)
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
        if (state) console.log(state);
        setState("")
    }, [setState, state])

    return
}

export default useAppInitialLoad;