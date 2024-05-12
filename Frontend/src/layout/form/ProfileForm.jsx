import { useEffect, useState } from "react";

import Input, { Select } from "../../components/formFields/_input";
import FileUpload from "../../components/formFields/_fileUpload";
import Button from "../../components/common/buttons/_button";
import BackButton from "../../components/common/buttons/_backButton";
import useFormOperations from '../../hooks/useFormOperations';

import { profileInputs as inputs, profileSchema as schema, profileSelectInputs, } from "../../utils/inputs"


const ProfileForm = () => {

    const {
        file, setFile,
        defaultValues,
        register, handleSubmit, errors, isLoading,
        onSubmit,
        operation, resource
    } = useFormOperations({ schema })


    const [userRole, setUserRole] = useState(defaultValues?.userRole);
    const selectHandleChange = (selected) => {
        setUserRole(selected.value)
    }

    const handleFormSubmit = (form) => {
        form.userRole = userRole
        onSubmit(form)
    }

    useEffect(() => {
        setUserRole(defaultValues.userRole)
    }, [defaultValues.userRole]);

    return (
        <div>
            <div className="mb-10 flex justify-between">
                <h1 className="text-3xl font-semibold">profile update</h1>
                <BackButton>back</BackButton>
            </div>
            <form className="w-full flex flex-col gap-10" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="w-full flex flex-col gap-5 lg:gap-0 lg:flex-row">
                    <div className="w-full flex flex-col gap-5">
                        {inputs.map(item => (
                            <Input defaultValue={defaultValues[item.name]} key={item.name} label={item.label} name={item.name} register={register} type={item.type} errors={errors} />
                        ))}

                        {profileSelectInputs.map(item =>
                            <Select
                                key={item.name}
                                label={item.label}
                                options={item.options}
                                onChange={selectHandleChange}
                                isMulti={item.isMulti}
                                isSearchable={true}
                                defaultValue={defaultValues[item.name]}
                                placeholder="Search or select..."
                            />
                        )}
                    </div>
                    <div className="w-full flex lg:items-center lg:justify-center" >
                        <FileUpload file={file} setFile={setFile} defaultValue={defaultValues.imageURL} />
                    </div>
                </div>
                <div className="w-full flex justify-between">
                    <Button to="../profile/updatePassword" disabled={isLoading} >change password</Button>
                    <Button type="submit" disabled={isLoading} >{operation === "create" ? "add" : "save"}</Button>
                </div>
            </form>
        </div>
    );
}

export default ProfileForm;