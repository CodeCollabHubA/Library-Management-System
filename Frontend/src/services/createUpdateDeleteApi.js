import apiEndPoints from "./apiEndPoints";
import http from "./httpService";


export async function createUpdateApi({ myContext, setDefaultValues = {}, id, form, resource, operation, method, setState }) {
    const resourceCapital = resource.charAt(0).toUpperCase() + resource.slice(1)
    const resourceWithS = resource + "s"
    const resourceSetState = "set" + resourceCapital + "s"
    try {
        if (method === "put" && !id) return console.log("id not found")
        if (!method) return console.log("unknown method")

        let url = apiEndPoints[`${resource}Api`]
        if (resource === "borrowing") {
            if (method === "post") url = apiEndPoints.borrowingApiPost
            if (method === "put") url = apiEndPoints.borrowingApiPut
        } else {
            url = id ? `${url}/${id}` : url;
        }

        let res
        if (form.imageURL) {
            res = await http[method](url, {
                data: form,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
        } else {
            res = await http[method](url, form)
        }
        if (resource !== "borrowing") {
            if (method === "put") {
                myContext[resourceSetState](oldData =>
                    oldData.map(item =>
                        item.id === res.data.id ?
                            res.data
                            :
                            item
                    ))
            } else if (method === "post") {
                myContext[resourceSetState](oldData => [...oldData, res.data])
            }
            setDefaultValues(res.data)
        }
        else {
            if (method === "put" && (res.status === 200 || res.status === 201)) {
                let arr = myContext[resourceWithS].map(item =>
                    item.id === res.data.success[0].id ?
                        res.data.success[0]
                        :
                        item
                )
                myContext[resourceSetState](arr)
            }
            else if (method === "post" && res.status === 201) {
                myContext.setBorrowings(oldData => [...oldData, ...res.data.success])
            }
        }

        setState({ status: "success", message: `${resource} ${operation}d successfully` })
        return res

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

        let url = `${apiEndPoints[`${resource}Api`]}/${form.id}`;

        const data = await http.delete(url, {
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
