import Input from "../../components/formFields/_input";
import Button from "../../components/common/buttons/_button";
import BackButton from "../../components/common/buttons/_backButton";
import useFormOperations from '../../hooks/useFormOperations';

import { authorInputs as inputs, authorSchema as schema } from "../../utils/inputs"



const AuthorForm = () => {
    const {
        defaultValues,
        register, handleSubmit, errors, isLoading,
        onSubmit,
        operation, resource
    } = useFormOperations({ schema })

    return (
        <div>
            <div className="mb-10 flex justify-between">
                <h1 className="text-3xl font-semibold">{operation === "create" ? "add" : operation} {resource}</h1>
                <BackButton>back</BackButton>
            </div>
            <form className="w-full flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex flex-col gap-5">
                    {inputs.map(item => (
                        <Input defaultValue={defaultValues[item.name]} key={item.name} label={item.label} name={item.name} register={register} type={item.type} errors={errors} />
                    ))}
                </div>
                <div className="w-full flex justify-between">
                    <Button type="submit" disabled={isLoading} >{operation === "create" ? "add" : "save"}</Button>
                </div>
            </form>
        </div>
    );
}

export default AuthorForm;