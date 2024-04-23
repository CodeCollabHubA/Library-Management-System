import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Input from "../../../components/common/_input";
import FileUpload from "../../../components/common/_fileUpload";
import Button from "../../../components/role-user/Button";

const profile = {
    id: 1,
    name: "user number 1",
    address: "address st. apartment 20, cairo",
    email: "user@example.com",
    phone: "+201027677192",
    img: "/src/assets/covers/5.jpg",
    bio: "I'am Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto optio consequuntur odio delectus, voluptate ea quasi odit ipsam."
}
const inputs = [
    { name: 'name', label: 'name', type: 'text' },
    { name: 'address', label: 'address', type: 'text' },
    { name: 'email', label: 'email', type: 'email' },
    { name: 'phone', label: 'phone', type: 'text' },
]

const ProfileForm = () => {
    // const MAX_FILE_SIZE = 102400; //100KB
    const validationSchema = yup.object().shape({
        img: yup.mixed()
            .required('Please select an image')
            .test('fileSize', 'File is too large', (value) => value && value.size <= 2000000) // 2MB limit
            .test('fileType', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png'].includes(value.type)),
    });

    const schema = yup
        .object({
            name: yup.string().required(),
            address: yup.string().required(),
            email: yup.string().email().required(),
            phone: yup.number().required(),
            bio: yup.string().required(),
            image: yup.mixed()
        }).required();

    const [file, setFile] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = (data, event) => {
        // const { data: user } = await axios.post(apiEndpoint, data)
        data.image = file
        console.log(data)
    };

    return (
        <form className="flex my-10 flex-wrap overflow-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="leftSide w-1/2">
                {inputs.map(item => (
                    <Input key={item.name} label={item.label} name={item.name} register={register} type={item.type} errors={errors} defaultValue={profile[item.name]} />
                ))}
                <div className="my-3 mx-2">
                    <label htmlFor="description">Book Description</label>
                    <textarea defaultValue={profile.bio} {...register('description')} name="description" id="description" className="block p-2.5 w-[28rem] h-[8rem] 
                        text-sm text-gray-900bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write your thoughts here..."></textarea>
                    <div className="text-red-600">{errors["description"]?.message}</div>
                </div>
            </div>
            <div className="rightSide w-1/2 p-8 h-[18rem] ">
                {/* PICTURE SIDE  */}
                <FileUpload file={file} setFile={setFile} defaultValue={profile.img} />
            </div>
            <div className="w-full flex justify-between">
                <Button to="updatePassword" >change password</Button>
                <Button type="submit" >save</Button>
            </div>
        </form>
    );
}

export default ProfileForm;