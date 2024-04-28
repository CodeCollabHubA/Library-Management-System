import { useEffect, useState } from "react";
import useGetFormData from "./useGetFormData";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMyContext } from "../context/ContextProvider";
import { useLocation } from "react-router-dom";
import { createUpdateApi } from "../services/createUpdateApi";

const useFormOperations = ({ schema }) => {

    const [file, setFile] = useState({});
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
        const form = { ...defaultValues, ...data, imageURL: file }
        const res = await createUpdateApi({ myContext, form, id: form.id, resource, operation, method, setState: myContext.setState })
        console.log("submited!!");
        console.log(res);
    };
    return {
        myContext,
        file, setFile,
        operation, resource,
        defaultValues, setDefaultValues,
        register, handleSubmit, errors,
        location, onSubmit,
    }
}

export default useFormOperations;