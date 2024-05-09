import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useMyContext } from '../../../context/ContextProvider';
import apiEndPoints from '../../../services/apiEndPoints';
import http from '../../../services/httpService';


const SearchFilter = ({ header, resource }) => {

    const [searchParams, setSearchParams] = useSearchParams()

    const [filtertype, setFiltertype] = useState("text")
    const [filterOn, setFilterOn] = useState(searchParams.get("filterOn") || header[0]?.name)
    const [filterQuery, setFilterQuery] = useState(searchParams.get("filterQuery") || "")
    const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || header[0]?.name)
    const [isAscending, setIsAscending] = useState(searchParams.get("isAscending") || true)

    const myContext = useMyContext()

    const setState = myContext[`set${resource.slice(0, 1).toLocaleUpperCase()}${resource.slice(1)}s`]
    const api = apiEndPoints[`${resource}Api`]


    const loadData = async (url) => {
        try {
            const { data } = await http.get(url)
            setState(data)
            return data
        }
        catch (err) {
            console.log(err);
            return err
        }
    }

    useEffect(() => {
        searchParams.set("filterQuery", filterQuery)
        searchParams.set("filterOn", filterOn)
        setSearchParams(searchParams)
        const query = window.location.search
        if (filterQuery?.length > 0) {
            loadData(api + query)
        } else {
            loadData(api)
        }
    }, [filterOn, filterQuery])


    useEffect(() => {
        searchParams.set("isAscending", isAscending)
        searchParams.set("sortBy", sortBy)
        setSearchParams(searchParams)
        const query = window.location.search
        loadData(api + query)
    }, [sortBy, isAscending])


    return (
        <div>
            <input type="search" value={filterQuery} onChange={(e) => setFilterQuery(e.target.value)}
            />
            <label htmlFor="">filter on</label>
            <select value={filterOn} onChange={(e) => { setFilterOn(e.target.value) }}
            >{header?.map((item, i) => <option key={i} value={item.name}>{item.name}</option>)}
            </select>
            <label htmlFor="">sortby</label>
            <select value={sortBy} onChange={(e) => { setSortBy(e.target.value) }}
            >{header?.map((item, i) => <option key={i} value={item.name}>{item.name}</option>)}
            </select>
            <label htmlFor="">is Ascending</label>
            <select value={isAscending} onChange={(e) => { setIsAscending(e.target.value) }}>
                <option value={true}>ascending</option>
                <option value={false}>descending</option>
            </select>
        </div >
    );
}

export default SearchFilter;
