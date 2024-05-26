import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useMyContext } from '../../../context/ContextProvider';
import apiEndPoints from '../../../services/apiEndPoints';
import http from '../../../services/httpService';


const SearchFilter = ({ header, resource }) => {

    const [searchParams, setSearchParams] = useSearchParams()

    const [filterOn, setFilterOn] = useState({ value: searchParams.get("filterOn") || header[0]?.value })
    const [filterQuery, setFilterQuery] = useState(searchParams.get("filterQuery") || "")
    const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "")
    const [isAscending, setIsAscending] = useState(searchParams.get("isAscending") || "")

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
        if (filterQuery) {
            const value = filterOn?.type === "number" || filterOn?.type === "date" ? `>${filterQuery}` : filterQuery
            searchParams.set("filterOn", filterOn.value || header[0]?.value)
            searchParams.set("filterQuery", value)
        } else if (filterQuery?.length === 0) {
            searchParams.delete("filterQuery")
            searchParams.delete("filterOn")
            setFilterQuery("")
        }
        if (sortBy || isAscending !== "") {
            searchParams.set("isAscending", isAscending || true)
            searchParams.set("sortBy", sortBy || header[0]?.value)
        }
        setSearchParams(searchParams)
        const query = window.location.search
        loadData(api + query)
    }, [sortBy, isAscending, filterOn, filterQuery])

    return (
        <div>
            <input type={filterOn?.type ? filterOn?.type : "text"} value={filterQuery} onChange={(e) => setFilterQuery(e.target.value)} />
            <label htmlFor="">filter on</label>
            <select value={filterOn.value || ""}
                onChange={(e) => {
                    const target = e.target;
                    const option = target.options[target.selectedIndex];
                    const type = option.dataset.type || "text"
                    const value = target.value
                    setFilterOn({ value, type })
                }
                }
            >{header?.map((item, i) => <option key={i} value={item.value} data-type={item.type}>{item.label}</option>)}
            </select>
            <label htmlFor="">sortby</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            >{header?.map((item, i) => <option key={i} value={item.value} data-type={item.type}>{item.label}</option>)}
            </select>
            <label htmlFor="">order</label>
            <select value={isAscending} onChange={(e) => { setIsAscending(e.target.value) }}>
                <option value={true}>ascending</option>
                <option value={false}>descending</option>
            </select>
        </div >
    );
}

export default SearchFilter;
