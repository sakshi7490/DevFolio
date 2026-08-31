import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

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

      <div className="relative">
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            w-full rounded-lg
            border
            bg-[#0d0e14]
            px-4 py-3 pr-12
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

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="
            absolute right-3 top-1/2
            -translate-y-1/2
            text-gray-500
            transition
            hover:text-cyan-400
          "
        >
          {showPassword ? (
            <EyeOff size={19} />
          ) : (
            <Eye size={19} />
          )}
        </button>
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;