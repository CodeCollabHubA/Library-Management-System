import { Route, Routes } from "react-router-dom";
import { authorHeader as header, authorResource as resource } from "../utils/inputs"
import useDeleteContext from "../hooks/useDeleteContext"

import AuthorForm from "../layout/form/AuthorForm";
import NotFound from "../layout/shared/NotFound";
import Table from "../layout/table/Table";
import AuthorBody from "../layout/table/body/AuthorBody";



const Authors = () => {

    const { handleDelete, myContext } = useDeleteContext(resource)

    return (
        <Routes>
            <Route index element={
                <Table resource={resource} header={header}>
                    <AuthorBody resource={resource} body={myContext.authors} handleDelete={handleDelete} />
                </Table>
            } />
            <Route path='update/:id' element={<AuthorForm />} />
            <Route path='create' element={<AuthorForm />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}
export default Authors;