import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Input from "../../components/formFields/_input";
import Button from "../../components/common/buttons/_button";
import BackButton from "../../components/common/buttons/_backButton";


const schema = yup
    .object({
        password: yup.string().required(),
        confirmPassword: yup.string().required(),
    }).required();

const ProfilePasswordForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log('submitted')
    };

    return (
        <div>
            <div className="mb-10 flex justify-between">
                <h1 className="text-3xl font-semibold">update password</h1>
                <BackButton>back</BackButton>
            </div>
            <form className="w-full flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-1/2 flex flex-col gap-5">
                    <Input label="password" name="password" type="password" register={register} errors={errors} />
                    <Input label="confirm password" name="confirmPassword" type="password" register={register} errors={errors} />
                </div>
                <div className="w-full flex justify-between">
                    <Button type="submit" >update password</Button>
                </div>
            </form>
        </div>
    );
}
export default ProfilePasswordForm;