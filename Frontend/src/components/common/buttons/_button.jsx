import { Link } from "react-router-dom";

const Button = ({ type, to, className, disabled, children, ...props }) => {
    const style = {
        basic: "w-fit flex capitalize items-center justify-center px-3 py-2 text-sm font-medium text-center text-white rounded-md border-2 border-transparent outline-none transition-all duration-300",

        default: "bg-blue-700 hover:bg-white hover:border-blue-700 hover:text-blue-700",
        primary: " bg-orange-800 hover:bg-white hover:border-orange-800 hover:text-orange-800",
        green: "text-white bg-green-700 hover:bg-green-800",

        icon: "text-blue-500 hover:text-blue-700 transition-all duration-300"
    }
    // if button type unknown not one of the above
    const buttonType = style[type] ? style[type] : style.default
    let stylee = `${style.basic} ${buttonType} ${className} ${disabled ? "bg-gray-600 hover:bg-gray-600 hover:border-gray-600 hover:text-white" : ""}`

    if (type === "icon") stylee = `${style.icon} ${className}`

    return (
        to ?
            <Link className={stylee} to={`${to}`} type={type} disabled={disabled}  {...props}>{children}</Link>
            :
            <button className={stylee} title="button" type={type} disabled={disabled} {...props}>{children}</button>
    );
}

export default Button;
