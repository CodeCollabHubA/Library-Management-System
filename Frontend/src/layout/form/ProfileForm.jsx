import Input from "../../components/formFields/_input";
import FileUpload from "../../components/formFields/_fileUpload";
import Button from "../../components/common/buttons/_button";
import BackButton from "../../components/common/buttons/_backButton";
import useFormOperations from '../../hooks/useFormOperations';

import { profileInputs as inputs, profileSchema as schema } from "../../utils/inputs"


const ProfileForm = () => {

    const {
        file, setFile,
        defaultValues,
        register, handleSubmit, errors,
        onSubmit,
    } = useFormOperations({ schema })


    return (
        <div>
            <div className="mb-10 flex justify-between">
                <h1 className="text-3xl font-semibold">profile update</h1>
                <BackButton>back</BackButton>
            </div>
            <form className="w-full flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex flex-col gap-5 lg:gap-0 lg:flex-row">
                    <div className="w-full flex flex-col gap-5">
                        {inputs.map(item => (
                            <Input defaultValue={defaultValues[item.name]} key={item.name} label={item.label} name={item.name} register={register} type={item.type} errors={errors} />
                        ))}

                    </div>
                    <div className="w-full flex lg:items-center lg:justify-center" >
                        <FileUpload file={file} setFile={setFile} defaultValue={defaultValues.imageURL} />
                    </div>
                </div>
                <div className="w-full flex justify-between">
                    <Button to="../profile/updatePassword" >change password</Button>
                    <Button type="submit" >save</Button>
                </div>
            </form>
        </div>
    );
}

export default ProfileForm;