import { useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

const PortfolioForm = ({ onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    featuredImage: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = "Portfolio title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    // Slug validation
    if (!formData.slug.trim()) {
      newErrors.slug = "Portfolio slug is required";
    } else if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug.trim())
    ) {
      newErrors.slug =
        "Use lowercase letters, numbers, and hyphens only";
    }

    // Description validation
    if (formData.description.length > 1000) {
      newErrors.description =
        "Description cannot exceed 1000 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const portfolioData = {
      title: formData.title.trim(),
      slug: formData.slug.trim().toLowerCase(),
      description: formData.description.trim(),

      technologies: formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),

      liveUrl: formData.liveUrl.trim(),
      githubUrl: formData.githubUrl.trim(),
      featuredImage: formData.featuredImage.trim(),
    };

    onSubmit(portfolioData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Portfolio Title */}
      <Input
        label="Portfolio Title"
        name="title"
        type="text"
        placeholder="My Developer Portfolio"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
      />

      {/* Portfolio Slug */}
      <Input
        label="Portfolio Slug"
        name="slug"
        type="text"
        placeholder="my-developer-portfolio"
        value={formData.slug}
        onChange={handleChange}
        error={errors.slug}
        required
      />

      {/* Description */}
      <div className="w-full">
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows="5"
          placeholder="Tell something about your portfolio..."
          value={formData.description}
          onChange={handleChange}
          className={`w-full rounded-lg border bg-[#0d0e14] px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition ${
            errors.description
              ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
          }`}
        />

        <div className="mt-1.5 flex justify-between">
          {errors.description ? (
            <p className="text-sm text-red-400">
              {errors.description}
            </p>
          ) : (
            <span />
          )}

          <span className="text-xs text-gray-500">
            {formData.description.length}/1000
          </span>
        </div>
      </div>

      {/* Technologies */}
      <div className="w-full">
        <Input
          label="Technologies"
          name="technologies"
          type="text"
          placeholder="React, Node.js, MongoDB"
          value={formData.technologies}
          onChange={handleChange}
        />

        <p className="mt-1.5 text-xs text-gray-500">
          Separate technologies with commas
        </p>
      </div>

      {/* Live URL */}
      <Input
        label="Live URL"
        name="liveUrl"
        type="url"
        placeholder="https://myportfolio.com"
        value={formData.liveUrl}
        onChange={handleChange}
      />

      {/* GitHub URL */}
      <Input
        label="GitHub URL"
        name="githubUrl"
        type="url"
        placeholder="https://github.com/username/project"
        value={formData.githubUrl}
        onChange={handleChange}
      />

      {/* Featured Image */}
      <Input
        label="Featured Image URL"
        name="featuredImage"
        type="url"
        placeholder="https://example.com/image.png"
        value={formData.featuredImage}
        onChange={handleChange}
      />

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          loading={loading}
          loadingText="Creating..."
        >
          Create Portfolio
        </Button>

        <Button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="border border-gray-700 bg-transparent text-gray-300 hover:border-cyan-400 hover:bg-transparent hover:text-cyan-400"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PortfolioForm;