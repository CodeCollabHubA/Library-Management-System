import { apiUrl } from "./apiEndPoints";
import http from "./httpService";


export async function createUpdateApi({ myContext, id, form, resource, operation, method, setState }) {
    const resourceCapital = resource.charAt(0).toUpperCase() + resource.slice(1)
    const resourceWithS = resource + "s"
    const resourceSetState = "set" + resourceCapital + "s"

    try {
        if (method === "put" && !id) return console.log("id not found")
        if (!method) return console.log("unknown method")

        let url = `${apiUrl}/${resourceCapital}`;
        url = id ? `${url}/${id}` : url;

        let data;
        if (resource === "profile" || resource === "book") {
            ({ data } = await http[method](url, {
                data: form,
                headers: { 'Content-Type': 'multipart/form-data' }
            }))
        } else {
            if ('imageURL' in form) {
                delete form.imageURL;
            }
            ({ data } = await http[method](url, form))
        }
        if (method === "put") {
            myContext[resourceSetState](myContext[resourceWithS]
                .map(item =>
                    item.id === data.id ?
                        data
                        :
                        item
                ))

        } else if (method === "post") {
            myContext[resourceSetState](oldData => [...oldData, data])

        }
        setState({ status: "success", message: `${resource} ${operation}d successfully` })

        return data

    } catch (error) {
        console.error(error);
        setState({ status: "error", message: `${resource} ${operation === "create" ? "creation" : "update"} failed` })
        return error
    }
}
export async function deleteApi({ myContext, form, resource, setState }) {
    const resourceCapital = resource?.charAt(0).toUpperCase() + resource?.slice(1)
    const resourceWithS = resource + "s"
    const resourceSetState = "set" + resourceCapital + "s"
    try {
        if (!form.id) return console.log("id not found")

        let url = `${apiUrl}/${resourceCapital}/${form.id}`;

        const { data } = await http.delete(url, {
            data: { id: form.id, timeStamp: form.timeStamp },
            headers: { "Content-Type": "application/json" }
        });

        myContext[resourceSetState](myContext[resourceWithS]
            .filter(item => {
                return item.id !== form.id
            }))
        setState({ status: "success", message: `${resource} deleted successfully` })

        return data

    } catch (error) {
        console.error(error);
        setState({ status: "error", message: `${resource} deleting failed` })
        return error
    }
}
