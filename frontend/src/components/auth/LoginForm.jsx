import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";

import Input from "../common/Input";
import PasswordInput from "../common/PasswordInput";
import Button from "../common/Button";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      await login(formData);

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
    >

      {/* Email */}
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      {/* Password */}
      <PasswordInput
        label="Password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />

      {/* Forgot Password */}
      <div className="-mt-2 flex justify-end">
        <button
          type="button"
          className="
            text-sm
            font-medium
            text-purple-400
            transition
            hover:text-cyan-400
          "
        >
          Forgot Password?
        </button>
      </div>

      {/* Login */}
      <Button
        type="submit"
        loading={loading}
        loadingText="Logging in..."
        className="
          bg-gradient-to-r
          from-cyan-500
          to-purple-600
          py-3
          shadow-lg
          shadow-purple-500/20
          hover:from-cyan-400
          hover:to-purple-500
        "
      >
        Login
      </Button>

      {/* Register */}
      <p className="pt-1 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="
            font-semibold
            text-cyan-400
            transition
            hover:text-purple-400
          "
        >
          Create Account
        </Link>
      </p>

    </form>
  );
};

export default LoginForm;