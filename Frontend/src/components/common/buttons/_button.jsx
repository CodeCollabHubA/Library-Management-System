import { Link } from "react-router-dom";

const Button = ({ type, to, className, disabled, children, ...props }) => {
    const style = {
        basic: "flex capitalize items-center justify-center px-3 py-2 text-sm font-medium text-center text-white rounded-md border-2 border-transparent outline-none transition-all duration-300",

        default: "bg-blue-700 hover:bg-white hover:border-blue-700 hover:text-blue-700",
        primary: " bg-orange-800 hover:bg-white hover:border-orange-800 hover:text-orange-800",
        green: "text-white bg-green-700 hover:bg-green-800",

        checkbox:"w-4 h-4 me-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2",
        icon: "text-blue-500 hover:text-blue-700 transition-all duration-300"
    }
    // if button type unknown not one of the above
    const buttonType = style[type] ? style[type] : style.default
    let stylee = `${style.basic} ${buttonType} ${className}`

    if (type === "icon") stylee = `${style.icon} ${className}`
    if (type === "checkbox") stylee = `${style.checkbox} ${className}`
    if (disabled) stylee =`${style.basic} ${className} bg-green-200`
    return (
        to ?
            <Link className={stylee} to={`${to}`} type={type} disabled={disabled}  {...props}>{children}</Link>
            :
            type === 'checkbox' ?
                <input type={type} className={stylee} {...props} />
                :
                <button className={stylee} title="button" type={type} disabled={disabled} {...props}>{children}</button>
    );
}

export default Button;
