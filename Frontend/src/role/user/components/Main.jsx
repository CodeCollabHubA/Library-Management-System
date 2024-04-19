import { Routes, Route } from "react-router-dom";

import NotFound from "../../../components/notFound";
import Books from "../pages/Books";
import BookDetails from "../pages/BookDetails";
import Borrow from "../pages/Borrow";


const Main = () => {
    return (
        <Routes>
            <Route index element={<h1>Hell</h1>} />
            <Route path='books' element={<Books />} />
            <Route path='books/:id' element={<BookDetails />} />
            <Route path='borrow/:id' element={<Borrow />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Main;
