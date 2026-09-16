import { useEffect, useState } from "react";
import portfolioService from "../portfolioService";

const ProjectsSection = ({ portfolioId }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: [],
    projectUrl: "",
    githubUrl: "",
    startDate: "",
    endDate: "",
  });

  const [technologyInput, setTechnologyInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProjects();
  }, [portfolioId]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response =
        await portfolioService.getProjects(portfolioId);

      setProjects(response.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load projects"
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      technologies: [],
      projectUrl: "",
      githubUrl: "",
      startDate: "",
      endDate: "",
    });

    setTechnologyInput("");
    setImageFile(null);
    setImagePreview("");
    setEditingId(null);
    setIsAdding(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTechnology = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const technology = technologyInput.trim();

    if (
      !technology ||
      form.technologies.includes(technology)
    ) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      technologies: [...prev.technologies, technology],
    }));

    setTechnologyInput("");
  };

  const removeTechnology = (technology) => {
    setForm((prev) => ({
      ...prev,
      technologies: prev.technologies.filter(
        (item) => item !== technology
      ),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!form.title.trim()) {
      setError("Project title is required");
      return;
    }

    try {
      let project;

      const projectData = {
        title: form.title.trim(),
        description: form.description.trim(),
        technologies: form.technologies,
        projectUrl: form.projectUrl.trim(),
        githubUrl: form.githubUrl.trim(),
        startDate: form.startDate || null,
        endDate: form.endDate || null,
      };

      if (editingId) {
        const response =
          await portfolioService.updateProject(
            portfolioId,
            editingId,
            projectData
          );

        project = response.data;

        setProjects((prev) =>
          prev.map((item) =>
            item._id === editingId ? project : item
          )
        );

        setMessage("Project updated successfully");
      } else {
        const response =
          await portfolioService.createProject(
            portfolioId,
            projectData
          );

        project = response.data;

        setProjects((prev) => [project, ...prev]);

        setMessage("Project added successfully");
      }

      if (imageFile && project?._id) {
        const response =
          await portfolioService.uploadProjectImage(
            portfolioId,
            project._id,
            imageFile
          );

        const updatedProject = response.data;

        setProjects((prev) =>
          prev.map((item) =>
            item._id === project._id
              ? updatedProject
              : item
          )
        );
      }

      resetForm();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to save project"
      );
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setIsAdding(true);

    setForm({
      title: project.title || "",
      description: project.description || "",
      technologies: project.technologies || [],
      projectUrl: project.projectUrl || "",
      githubUrl: project.githubUrl || "",
      startDate: project.startDate
        ? project.startDate.slice(0, 10)
        : "",
      endDate: project.endDate
        ? project.endDate.slice(0, 10)
        : "",
    });

    setImagePreview(project.image || "");
    setImageFile(null);
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await portfolioService.deleteProject(
        portfolioId,
        projectId
      );

      setProjects((prev) =>
        prev.filter((item) => item._id !== projectId)
      );

      setMessage("Project deleted successfully");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete project"
      );
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <p className="text-sm text-gray-500">
          Loading projects...
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Projects
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Showcase your projects and technical work.
          </p>
        </div>

        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-black hover:bg-cyan-400"
          >
            + Add Project
          </button>
        )}
      </div>

      {message && (
        <p className="mt-4 text-sm text-green-400">
          {message}
        </p>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5 border-t border-gray-800 pt-6"
        >
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Project Title *
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. DevFolio"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your project..."
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Technologies
            </label>

            <input
              type="text"
              value={technologyInput}
              onChange={(e) =>
                setTechnologyInput(e.target.value)
              }
              onKeyDown={addTechnology}
              placeholder="Type technology and press Enter"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
            />

            {form.technologies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300"
                  >
                    {technology}

                    <button
                      type="button"
                      onClick={() =>
                        removeTechnology(technology)
                      }
                      className="text-cyan-400 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Project URL
              </label>

              <input
                type="url"
                name="projectUrl"
                value={form.projectUrl}
                onChange={handleChange}
                placeholder="https://yourproject.com"
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                GitHub URL
              </label>

              <input
                type="url"
                name="githubUrl"
                value={form.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Start Date
              </label>

              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                End Date
              </label>

              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Project Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-400"
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Project preview"
                className="mt-4 h-40 w-full rounded-lg object-cover"
              />
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-medium text-black hover:bg-cyan-400"
            >
              {editingId ? "Update Project" : "Add Project"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-gray-700 px-5 py-2.5 text-sm text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 space-y-4">
        {projects.length === 0 && !isAdding ? (
          <div className="rounded-lg border border-dashed border-gray-700 p-8 text-center">
            <p className="text-sm text-gray-500">
              No projects added yet.
            </p>
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="rounded-xl border border-gray-800 bg-gray-950 p-5"
            >
              <div className="flex gap-4">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                )}

                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-white">
                    {project.title}
                  </h3>

                  {project.description && (
                    <p className="mt-1 text-sm text-gray-400">
                      {project.description}
                    </p>
                  )}

                  {project.technologies?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full bg-gray-800 px-2.5 py-1 text-xs text-gray-300"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 border-t border-gray-800 pt-4">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-cyan-400 hover:text-cyan-300"
                  >
                    Project ↗
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-cyan-400 hover:text-cyan-300"
                  >
                    GitHub ↗
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => handleEdit(project)}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(project._id)
                  }
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;