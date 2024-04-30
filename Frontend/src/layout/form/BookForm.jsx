import { useState } from "react";

import Input, { Select } from "../../components/formFields/_input";
import FileUpload from "../../components/formFields/_fileUpload";
import Button from "../../components/common/buttons/_button";
import BackButton from "../../components/common/buttons/_backButton";
import useFormOperations from '../../hooks/useFormOperations';

import { bookInputs as inputs, bookSchema as schema } from "../../utils/inputs"
import { useMyContext } from "../../context/ContextProvider";



const BookForm = () => {
    const {
        file, setFile,
        defaultValues,
        register, handleSubmit, errors,
        onSubmit,
        operation, resource
    } = useFormOperations({ schema })

    const { authors = [], publishers = [] } = useMyContext()
    const authorOptions = authors.map(item => ({ label: item.name, value: item.id }))
    const publisherOptions = publishers.map(item => ({ label: item.name, value: item.id }))
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedPublishers, setSelectedPublishers] = useState([]);

    const selectHandleChange = {
        authors: (selected) => {
            setSelectedAuthors(selected.map(item => item.value))
        },

        publishers: (selected) => {
            setSelectedPublishers(selected.map(item => item.value))
        }
    }

    const handleOnSubmit = (data) => {
        onSubmit({ ...data, selectedAuthors, selectedPublishers })
    }


    return (
        <div>
            <div className="mb-10 flex justify-between">
                <h1 className="text-3xl font-semibold">{operation === "create" ? "add" : operation} {resource}</h1>
                <BackButton>back</BackButton>
            </div>
            <form className="w-full flex flex-col gap-10" onSubmit={handleSubmit(handleOnSubmit)}>
                <div className="w-full flex flex-col gap-5 lg:gap-0 lg:flex-row">
                    <div className="w-full flex flex-col gap-5">
                        {inputs({ authorOptions, publisherOptions }).map(item =>
                            item.type === "select" ?
                                <Select
                                    key={item.name}
                                    label={item.label}
                                    options={item.options}
                                    onChange={selectHandleChange[item.name]}
                                    isMulti={item.isMulti}
                                    isSearchable={true}
                                    defaultValue={defaultValues[item.name]}
                                    placeholder="Search or select..."
                                />
                                :
                                <Input options={item.options} defaultValue={defaultValues[item.name]} key={item.name} label={item.label} name={item.name} register={register} type={item.type} errors={errors} />
                        )}

                    </div>
                    <div className="w-full flex lg:items-center lg:justify-center">
                        <FileUpload file={file} setFile={setFile} defaultValue={defaultValues.imageURL} />
                    </div>
                </div>
                <div className="w-full flex justify-between">
                    <Button type="submit" >{operation === "create" ? "add" : "save"}</Button>
                </div>
            </form>
        </div>
    );
}

export default BookForm;