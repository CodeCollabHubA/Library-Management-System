import { useEffect, useState } from "react";
import useGetFormData from "./useGetFormData";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMyContext } from "../context/ContextProvider";
import { useLocation } from "react-router-dom";
import { createUpdateApi } from "../services/createUpdateDeleteApi";

const useFormOperations = ({ schema }) => {

    const [file, setFile] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [defaultValues, setDefaultValues] = useState({});

    const location = useLocation();
    const myContext = useMyContext()
    const data = location?.state?.data;
    const { operation, resource, method } = useGetFormData()
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

    useEffect(() => {
        if (data) {
            setDefaultValues(data)
        }
    }, [data])

    const onSubmit = async (data) => {
        setIsLoading(true)
        let form
        if (resource === "borrowing") {
            form = data
        } else {
            form = { ...data, ...(file ? { imageURL: file } : {}) }
        }
        if (method === "put") {
            form = { ...defaultValues, ...form }
        }
        const res = await createUpdateApi({ myContext, setDefaultValues, form, id: form.id, resource, operation, method, setState: myContext.setState })
        setIsLoading(false)
        console.log(res);
    };
    return {
        myContext,
        file, setFile,
        operation, resource,
        defaultValues, setDefaultValues,
        register, handleSubmit, errors, isLoading,
        location, onSubmit,
    }
}

export default useFormOperations;