import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import { PAGE_SIZE } from '../../utils/constant';

import { useMyContext } from '../../context/ContextProvider';
import http from '../../services/httpService';
import apiEndPoints from '../../services/apiEndPoints';
import { useEffect, useState } from 'react';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/common/buttons/_button';

const Pagination = ({ span }) => {

    const myContext = useMyContext()
    const [pageCount, setPageCount] = useState()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()

    const resource = location.pathname.split("/")[2]
    const setState = myContext[`set${resource[0].toLocaleUpperCase()}${resource.slice(1)}`]
    const [currentPage, setCurrentPage] = useState(searchParams.get("pageNumber") || 1)

    const api = apiEndPoints[`${resource.slice(0, -1)}Api`]

    const calculatePagesCount = async () => {
        const { data } = await http.get(`${api}?pageSize=10000`)
        const pageCount = Math.round(data.length / PAGE_SIZE)
        setPageCount(pageCount);
    }
    const loadaData = async () => {
        try {
            const query = window.location.search
            const url = api + query
            const { data } = await http.get(url)
            setState(data)
        } catch (err) {
            console.error(err);
        }
    }

    const handleNext = () => {
        if (currentPage < pageCount) setCurrentPage(prev => prev + 1);
    }

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    }

    const handleClick = (number) => {
        setCurrentPage(number)
    }

    useEffect(() => {
        calculatePagesCount()
    }, [])

    useEffect(() => {
        searchParams.set("pageSize", PAGE_SIZE)
        searchParams.set("pageNumber", currentPage)
        if (currentPage === 1) {
            searchParams.delete("pageSize")
            searchParams.delete("pageNumber")
        }
        setSearchParams(searchParams)
        loadaData()
    }, [currentPage])


    return (
        <tr>
            <td colSpan={span} className='bg-blue-100 text-gray-900 text-center px-0 py-1'>
                {/* <td colSpan={span} className='bg-red-500 text-white text-center px-0 py-1'> */}
                <div className='w-full flex gap-10 justify-center items-center'>
                    <Button
                        disabled={currentPage < 2}
                        onClick={handlePrev}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                    <ul className='flex gap-3'>
                        {Array.from({ length: pageCount },
                            ((_, i) =>
                                <li
                                    key={i}
                                    onClick={() => handleClick(i + 1)}
                                    className={`${currentPage === i + 1 ? "bg-blue-900 text-white" : ""} p-2 hover:bg-blue-600 cursor-pointer`}
                                >{i + 1}</li>
                            ))}
                    </ul>
                    <Button
                        disabled={currentPage >= pageCount}
                        onClick={handleNext}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                </div>
            </td>
        </tr>
    );
}

export default Pagination;
