import { Route, Routes } from "react-router-dom";

import { userHeader as header, userResource as resource } from "../utils/inputs"
import useDeleteContext from "../hooks/useDeleteContext";

import Profile from "./Profile";
import ProfileForm from "../layout/form/ProfileForm";
import NotFound from "../layout/shared/NotFound";
import Table from "../layout/table/Table";
import UserBody from "../layout/table/body/UserBody";



const Users = () => {

    const { handleDelete, myContext } = useDeleteContext(resource)

    return (
        <Routes>
            <Route index element={
                <Table resource={resource} header={header}>
                    <UserBody resource={resource} body={myContext.users} handleDelete={handleDelete} />
                </Table>
            } />
            <Route path='update/:id' element={<ProfileForm />} />
            <Route path=':id' element={<Profile />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}
export default Users;