import ReactSelect from "react-select";

import { textLikeInput } from "../../utils/constant";


const fieldStyles = {
    basic: "w-full p-2.5 text-sm text-gray-900",
    input: "h-10",
    textarea: "h-40 block resize-none",

    search: "bg-transparent rounded-md",
    default: "bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500",
}

const Input = ({ type, name, label, style, className, defaultValue, divClass, register, errors, ...rest }) => {
    const optionStyle = fieldStyles[style] ? fieldStyles[style] : fieldStyles.default

    if (textLikeInput.includes(type)) return (
        <div>
            {label && <label className="block font-normal" htmlFor={name}>{label}</label>}
            <input type={type} name={name} id={name} className={`${fieldStyles.basic} ${fieldStyles.input} ${optionStyle} ${className}`} defaultValue={defaultValue} {...rest} {...register(name)} />
            {errors?.[name] && <p className="text-right text-red-600">{errors?.[name]?.message}</p>}
        </div>
    )
    else if (type === "textarea") return (
        <div className={divClass}>
            {label && <label className="block font-normal" htmlFor={name}>{label}</label>}
            <textarea id={name} name={name} className={`${fieldStyles.basic} ${fieldStyles.textarea} ${optionStyle} ${className}`} defaultValue={defaultValue} {...rest} {...register(name)}></textarea>
            {errors?.[name] && <p className="text-right text-red-600">{errors?.[name]?.message}</p>}
        </div>)
    else return <span>unsupported input type</span>
}


export const Select = ({ className, name, options, onChange, label, defaultValue, isMulti, ...rest }) => {
    return (
        <div className={className}>
            {label && <label className="block font-normal" htmlFor={name}>{label}</label>}
            <ReactSelect
                options={options}
                onChange={onChange}
                isMulti={isMulti}
                isSearchable={true}
                defaultValue={defaultValue ? Array.from(defaultValue, ((value, index) => ({ label: name, value }))) : defaultValue}
                placeholder="Search or select..."
                {...rest}
            />
        </div >)
}
export default Input;