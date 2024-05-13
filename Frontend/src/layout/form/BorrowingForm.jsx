import { useState } from "react";

import Input, { Select } from "../../components/formFields/_input";
import FileUpload from "../../components/formFields/_fileUpload";
import Button from "../../components/common/buttons/_button";
import BackButton from "../../components/common/buttons/_backButton";
import useFormOperations from '../../hooks/useFormOperations';

import { borrowingSelectInputs as inputs, borrowingSchema as schema } from "../../utils/inputs"
import { useMyContext } from "../../context/ContextProvider";



const BookForm = () => {
    const {
        defaultValues,
        onSubmit, handleSubmit,
        operation, resource
    } = useFormOperations({ schema })

    const [bookIds, setBookIds] = useState([]);
    const { books = [], user } = useMyContext()

    const bookOptions = books.map(item => ({ label: item.title, value: item.id }))


    const selectHandleChange = (selected) => {
        setBookIds(selected.map(item => item.value))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit({ bookIds })
    }


    return (
        <div>
            <div className="mb-10 flex justify-between">
                <h1 className="text-3xl font-semibold">{operation === "create" ? "add" : operation} {resource}</h1>
                <BackButton>back</BackButton>
            </div>
            <form className="w-full flex flex-col gap-10" onSubmit={handleFormSubmit}>
                <div className="w-full flex flex-col gap-5">
                    {inputs({ bookOptions }).map(item =>
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
                <div className="w-full flex justify-between">
                    <Button type="submit" >{operation === "create" ? "add" : "save"}</Button>
                </div>
            </form>
        </div>
    );
}

export default BookForm;