import { useMyContext } from "../context/ContextProvider"
import { deleteApi } from "../services/createUpdateDeleteApi"

const useDeleteContext = (resource) => {

    const myContext = useMyContext()

    const handleDelete = (item) => {
        if (window.confirm("do you want to delete it?????😭")) {
            deleteApi({ myContext, resource, form: item, setState: myContext.setState })
        }
    }
    return { handleDelete, myContext }
}

export default useDeleteContext