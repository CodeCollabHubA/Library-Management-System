const ColoredPercentage = ({ className, children }) => {
    return (
        children > 0
            ?
            <span className={`text-green-500 ${className}`}>
                {children}%
            </span>
            :
            <span className={`text-amber-500 ${className}`}>
                {children}%
            </span>
    );
}

export default ColoredPercentage;
