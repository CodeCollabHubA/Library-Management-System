import { Route, Routes } from "react-router-dom";

import { publisherHeader as header, publisherResource as resource } from "../utils/inputs"

import PublisherForm from "../layout/form/PublisherForm";
import NotFound from "../layout/shared/NotFound";
import Table from "../layout/table/Table";
import PublisherBody from "../layout/table/body/PublisherBody";
import useDeleteContext from "../hooks/useDeleteContext";



const Publishers = () => {

    const { handleDelete, myContext } = useDeleteContext(resource)

    return (
        <Routes>
            <Route index element={
                <Table resource={resource} header={header}>
                    <PublisherBody resource={resource} body={myContext.publishers} handleDelete={handleDelete} />
                </Table>
            } />            <Route path='update/:id' element={<PublisherForm />} />
            <Route path='create' element={<PublisherForm />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}
export default Publishers