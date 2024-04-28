/** @description */
/****
    * this custom hook is used to get the
    * 1 operation (create or update)
    * 2 resource (Books, users, authors)
    * 3 method (post, put)
    * of the current form
****/

import { useLocation, useParams } from 'react-router-dom';
import apiEndPoints from "../services/apiEndPoints"

const apiUrl = apiEndPoints.apiUrl


const useGetFormData = () => {
    const { id } = useParams();
    const url = useLocation().pathname.split("/")
    let operation;
    let resource;
    let method;

    if (url[url.length - 1] === "create") {
        operation = "create"
        method = "post"
        resource = url[url.length - 2].slice(0, -1)
    } else if (url[url.length - 2] === "update") {
        operation = "update"
        if (id) method = "put"
        resource = url[url.length - 3].slice(0, -1)
    }
    return { apiUrl, id, operation, resource, method }
}
export default useGetFormData;
