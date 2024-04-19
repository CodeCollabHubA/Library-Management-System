import Input from "../components/common/_input";
import {useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FileUpload from "../components/common/_fileUpload";


const BookForm = () => {
    

    const inputs = [
        { name: 'title', label: 'Book Title', type:'text'},
        {name:'noCopies',label:'No. Copies',type:'number'},
        {name:'ISBN',label:'ISBN',type:'text'},
        {name:'authNo',label:'Author No',type:'text'},
    ]

    // const MAX_FILE_SIZE = 102400; //100KB
    const validationSchema = yup.object().shape({
        image: yup.mixed()
          .required('Please select an image')
          .test('fileSize', 'File is too large', (value) => value && value.size <= 2000000) // 2MB limit
          .test('fileType', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png'].includes(value.type)),
      });



    
    const schema = yup
        .object({
            title: yup.string().required('must enter a Title name'),
            noCopies: yup.number().required('must enter a the no. Copies'),
            ISBN: yup.string().required('must enter The no. ISBN'),
            authNo: yup.string(),
            description: yup.string(),
            image: yup.mixed()
            .required('Please select an image')
        }).required();
    
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        // const { data: user } = await axios.post(apiEndpoint, data)
        const imageFile = data.image[0];
        console.log(imageFile);
        console.log(data)
        console.log('submitted')
    };

    return (
        <>
            <form className="flex my-10 flex-wrap overflow-scroll" onSubmit={handleSubmit(onSubmit)}>
                <div className="leftSide w-1/2">
                    {inputs.map(item => (
                        <Input key={item.name} label={item.label} name={item.name} register={register} type={item.type} errors={errors} />
                    ))}
                    <div className="my-3 mx-2">
                        <label htmlFor="description">Book Description</label>
                        <textarea {...register('description')} name="description" id="description" className="block p-2.5 w-[28rem] h-[8rem] 
                        text-sm text-gray-900bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Write your thoughts here..."></textarea>
                        <div className="text-red-600">{errors["description"]?.message}</div>
                    </div>
                </div>
                <div className="rightSide w-1/2 p-8 h-[18rem] ">
                    {/* PICTURE SIDE  */}
                    <FileUpload register={register} errors={errors} id={'image'}/>
                    
                </div>
                <div className="w-full flex justify-end">
                    <button type="submit" className="w-[8rem] text-base focus:outline-none text-white 
                    bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300
                    font-medium rounded-lg px-5 py-2.5 me-2 mb-2 ">Add</button>
                </div>
            </form>
        </>
    );
}
 
export default BookForm;

/*  */