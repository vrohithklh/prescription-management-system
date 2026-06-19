const Input = ({
    label,
    type = "text",
    placeholder,
    name,
    value,
    onChange,
}) => {
    return (
        <div>

            <label className="block mb-2 font-medium text-blue-100">
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-[#071028] border border-cyan-400/30 text-white placeholder:text-blue-200/40 p-4 rounded-2xl outline-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10 transition-all duration-300 shadow-lg"
            />

        </div>
    );
};

export default Input;