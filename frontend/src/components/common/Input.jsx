const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          w-full rounded-lg
          border
          bg-[#0d0e14]
          px-4 py-3
          text-sm text-white
          placeholder:text-gray-600
          outline-none
          transition
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
          }
        `}
      />

      {error && (
        <p className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;