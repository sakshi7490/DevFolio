import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight } from "lucide-react";

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
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="you@domain.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <PasswordInput
        label="Password"
        name="password"
        placeholder="Your password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />

      <div className="-mt-2 flex justify-end">
        <button type="button" className="text-sm font-medium text-accent hover:text-emerald-800">
          Forgot password?
        </button>
      </div>

      <Button type="submit" loading={loading} loadingText="Signing in..." className="w-full">
        Sign in
        <ArrowRight size={16} />
      </Button>

      <p className="pt-1 text-center text-sm text-muted">
        New here?{" "}
        <Link to="/register" className="font-semibold text-accent hover:text-emerald-800">
          Create your DevFolio
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
