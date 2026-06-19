const Button = ({
    children,
    type = "button",
    onClick,
    className = "",
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`w-full bg-blue-700 text-white py-3 rounded-2xl font-semibold hover:bg-blue-800 transition duration-300 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;