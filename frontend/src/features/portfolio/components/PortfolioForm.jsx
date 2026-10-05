import { useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { fieldClass, fieldErrorClass, labelClass } from "../../../styles/ui";

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

  const [imageFile, setImageFile] = useState(null);
const [imagePreview, setImagePreview] = useState("");

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

  const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setImageFile(file);
  setImagePreview(URL.createObjectURL(file));
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Portfolio title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Portfolio slug is required";
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug.trim())) {
      newErrors.slug = "Use lowercase letters, numbers, and hyphens only";
    }

    if (formData.description.length > 1000) {
      newErrors.description = "Description cannot exceed 1000 characters";
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
      
    };

    onSubmit({
  portfolioData,
  imageFile,
});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Portfolio title"
        name="title"
        placeholder="My Developer Portfolio"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
      />

      <Input
        label="Portfolio slug"
        name="slug"
        placeholder="my-developer-portfolio"
        value={formData.slug}
        onChange={handleChange}
        error={errors.slug}
        required
      />

      <div className="w-full">
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="5"
          placeholder="Tell something about your portfolio..."
          value={formData.description}
          onChange={handleChange}
          className={errors.description ? fieldErrorClass : fieldClass}
        />
        <div className="mt-1.5 flex justify-between">
          {errors.description ? (
            <p className="text-sm text-red-600">{errors.description}</p>
          ) : (
            <span />
          )}
          <span className="text-xs text-muted">
            {formData.description.length}/1000
          </span>
        </div>
      </div>

      <div>
        <Input
          label="Technologies"
          name="technologies"
          placeholder="React, Node.js, MongoDB"
          value={formData.technologies}
          onChange={handleChange}
        />
        <p className="mt-1.5 text-xs text-muted">
          Separate technologies with commas
        </p>
      </div>

      <Input
        label="Live URL"
        name="liveUrl"
        type="url"
        placeholder="https://myportfolio.com"
        value={formData.liveUrl}
        onChange={handleChange}
      />

      <Input
        label="GitHub URL"
        name="githubUrl"
        type="url"
        placeholder="https://github.com/username/project"
        value={formData.githubUrl}
        onChange={handleChange}
      />

      <div>
  <label className={labelClass}>Featured image</label>

  <input
    type="file"
    accept="image/jpeg,image/png,image/jpg"
    onChange={handleImageChange}
    className={fieldClass}
  />

  {imagePreview && (
    <img
      src={imagePreview}
      alt="Featured preview"
      className="mt-4 h-48 w-full rounded-xl object-cover"
    />
  )}
</div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="submit" loading={loading} loadingText="Creating...">
          Create portfolio
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PortfolioForm;
