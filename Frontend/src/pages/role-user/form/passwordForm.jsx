import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Input from "../../../components/common/_input";
import Button from "../../../components/role-user/Button";

const ProfileForm = () => {

    const schema = yup
        .object({
            password: yup.string().required(),
            confirmPassword: yup.string().required(),
        }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log('submitted')
    };

    return (
        <form className="flex my-10 flex-wrap overflow-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="leftSide w-1/2">
                <Input label="password" name="password" type="password" register={register} errors={errors} />
                <Input label="confirm password" name="confirmPassword" type="password" register={register} errors={errors} />
            </div>
            <div className="w-full flex justify-end">
                <Button type="submit" >save password</Button>
            </div>
        </form>
    );
}

export default ProfileForm;