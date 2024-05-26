const ColoredBgPercentage = ({ className, children }) => {
    return (
        children > 0
            ?
            <span className={`w-16 rounded-full p-2 text-white bg-green-500 !${className}`}>
                {children}%
            </span>
            :
            <span className={`w-16 rounded-full p-2 text-white bg-amber-500 !${className}`}>
                {children}%
            </span>
    );
}

export default ColoredBgPercentage;
