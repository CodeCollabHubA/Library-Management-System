import { Route, Routes } from "react-router-dom";

import useDeleteContext from "../hooks/useDeleteContext";
import { borrowingHeader as header, borrowingResource as resource } from "../utils/inputs"

import BookDetail from "./BookDetails";
import BorrowingForm from "../layout/form/BorrowingForm";
import NotFound from "../layout/shared/NotFound";
import Table from "../layout/table/Table";
import BorrowingActionTable from "../layout/table/BorrowingActionTable";
import BorrowingBody from "../layout/table/body/BorrowingBody";



const Borrowing = () => {

    const { handleDelete, myContext } = useDeleteContext(resource)

    return (
        <Routes>
            <Route index element={
                <Table resource={resource} header={header}>
                    <BorrowingBody resource={resource} body={myContext.borrowings} handleDelete={handleDelete} />
                </Table>
            } />
            <Route path="actions" element={<BorrowingActionTable handleDelete={handleDelete} />} />
            <Route path='update/:id' element={<BorrowingForm />} />
            <Route path='create' element={<BorrowingForm />} />
            <Route path=':id' element={<BookDetail />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Borrowing;