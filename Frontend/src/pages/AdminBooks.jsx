import { Route, Routes } from "react-router-dom";

import useDeleteContext from "../hooks/useDeleteContext";
import { bookHeader as header, bookResource as resource } from "../utils/inputs"

import BookDetail from "./BookDetails";
import BookForm from "../layout/form/BookForm";
import NotFound from "../layout/shared/NotFound";
import Table from "../layout/table/Table";
import BookBody from "../layout/table/body/BookBody";



const Books = () => {

    const { handleDelete, myContext } = useDeleteContext(resource)

    return (
        <Routes>
            <Route index element={
                <Table resource={resource} header={header}>
                    <BookBody resource={resource} body={myContext.books} handleDelete={handleDelete} />
                </Table>
            } />
            <Route path='update/:id' element={<BookForm />} />
            <Route path='create' element={<BookForm />} />
            <Route path=':id' element={<BookDetail />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Books;