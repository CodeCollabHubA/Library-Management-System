const Input = ({ name, label, register, errors,...input }) => {
    return (
        <>
            <label className="flex flex-col text-lg" htmlFor={name}>
                {label}
                <input
                    className="mt-3 bg-gray-50 border border-gray-300 
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block w-full p-2.5"
                    name={name}
                    {...register(`${name}`)}
                    {...input}
                />
            <span className="text-base text-red-700 float-end">
                {errors[name]?.message}
            </span>
            </label>
            
            
        </>
    );
}
 
export default Input;