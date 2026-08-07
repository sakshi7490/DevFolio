import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";

import Input from "../common/Input";
import PasswordInput from "../common/PasswordInput";
import Button from "../common/Button";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const { confirmPassword, ...userData } = formData;

      await register(userData);

      toast.success("Account created successfully!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

 return (
  <form onSubmit={handleSubmit} className="space-y-5">

    <Input
      label="Full Name"
      name="name"
      placeholder="Enter your full name"
      value={formData.name}
      onChange={handleChange}
      error={errors.name}
      required
    />

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

    <PasswordInput
      label="Password"
      name="password"
      placeholder="Create a password"
      value={formData.password}
      onChange={handleChange}
      error={errors.password}
      required
    />

    <PasswordInput
      label="Confirm Password"
      name="confirmPassword"
      placeholder="Confirm your password"
      value={formData.confirmPassword}
      onChange={handleChange}
      error={errors.confirmPassword}
      required
    />

    <Button
      type="submit"
      loading={loading}
      loadingText="Creating Account..."
    >
      Create Account
    </Button>

    <p className="text-center text-sm text-gray-600">
      Already have an account?{" "}
      <Link
        to="/login"
        className="font-semibold text-blue-600 hover:underline"
      >
        Login
      </Link>
    </p>

  </form>
);
};

export default RegisterForm;