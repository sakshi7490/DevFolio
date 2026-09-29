import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import portfolioService from "../portfolioService";

const ProjectsSection = ({ portfolioId }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [improving, setImproving] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");

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
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    loadProjects();
  }, [portfolioId]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await portfolioService.getProjects(portfolioId);

      setProjects(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load projects");
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

  const handleImproveWithAI = async () => {
    if (!form.description.trim()) {
      toast.error("Enter a project description first.");
      return;
    }

    try {
      setImproving(true);

      const response = await portfolioService.improveProjectDescription({
        description: form.description,
      });

      setAiSuggestion(response.data.content);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to improve project description",
      );
    } finally {
      setImproving(false);
    }
  };

  const addTechnology = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const technology = technologyInput.trim();

    if (!technology || form.technologies.includes(technology)) {
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
      technologies: prev.technologies.filter((item) => item !== technology),
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
        const response = await portfolioService.updateProject(
          portfolioId,
          editingId,
          projectData,
        );

        project = response.data;

        setProjects((prev) =>
          prev.map((item) => (item._id === editingId ? project : item)),
        );

        setMessage("Project updated successfully");
      } else {
        const response = await portfolioService.createProject(
          portfolioId,
          projectData,
        );

        project = response.data;

        setProjects((prev) => [project, ...prev]);

        setMessage("Project added successfully");
      }

      if (imageFile && project?._id) {
        const response = await portfolioService.uploadProjectImage(
          portfolioId,
          project._id,
          imageFile,
        );

        const updatedProject = response.data;

        setProjects((prev) =>
          prev.map((item) =>
            item._id === project._id ? updatedProject : item,
          ),
        );
      }

      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save project");
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
      startDate: project.startDate ? project.startDate.slice(0, 10) : "",
      endDate: project.endDate ? project.endDate.slice(0, 10) : "",
    });

    setImagePreview(project.image || "");
    setImageFile(null);
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      setError("");

      await portfolioService.deleteProject(portfolioId, projectId);

      setProjects((prev) => prev.filter((item) => item._id !== projectId));

      setMessage("Project deleted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete project");
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const inputClass =
    "w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-ink placeholder-stone-400 outline-none transition focus:border-accent";

  return (
    <section className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-ink">Projects</h2>

          <p className="mt-1 text-sm text-muted">
            Showcase your projects and technical work.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isAdding && (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              + Add Project
            </button>
          )}

          <button
            type="button"
            onClick={() => setVisible((prev) => !prev)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${
              visible ? "bg-accent" : "bg-stone-300"
            }`}
            aria-label="Toggle projects visibility"
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                visible ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>

      {visible && (
        <>
          {/* Messages */}
          {error && (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {message}
            </div>
          )}

          {/* Projects List */}
          <div className="mt-6">
            {loading ? (
              <div className="space-y-3">
                <div className="h-28 animate-pulse rounded-xl bg-canvas" />
                <div className="h-28 animate-pulse rounded-xl bg-canvas" />
              </div>
            ) : projects.length === 0 && !isAdding ? (
              <div className="rounded-xl border border-dashed border-stone-300 px-5 py-8 text-center">
                <p className="text-sm text-stone-600">No projects added yet.</p>

                <p className="mt-1 text-xs text-muted">
                  Add your projects and technical work below.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project._id}>
                    {/* Project Card */}
                    {!editingId || editingId !== project._id ? (
                      <div className="group rounded-xl border border-stone-200 bg-canvas p-4 transition hover:border-accent/30">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex min-w-0 gap-4">
                            {project.image && (
                              <img
                                src={project.image}
                                alt={project.title}
                                className="h-20 w-20 shrink-0 rounded-lg object-cover"
                              />
                            )}

                            <div className="min-w-0">
                              <h3 className="text-base font-semibold text-ink">
                                {project.title}
                              </h3>

                              {project.description && (
                                <p className="mt-2 text-sm leading-6 text-muted">
                                  {project.description}
                                </p>
                              )}

                              {project.technologies?.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {project.technologies.map((technology) => (
                                    <span
                                      key={technology}
                                      className="rounded-full border border-accent/20 bg-emerald-50 px-2.5 py-1 text-xs text-accent"
                                    >
                                      {technology}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {(project.startDate || project.endDate) && (
                                <p className="mt-3 text-xs text-muted">
                                  {formatDate(project.startDate)}
                                  {" — "}
                                  {project.endDate
                                    ? formatDate(project.endDate)
                                    : "Present"}
                                </p>
                              )}

                              {(project.projectUrl || project.githubUrl) && (
                                <div className="mt-3 flex flex-wrap gap-3">
                                  {project.projectUrl && (
                                    <a
                                      href={project.projectUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-xs font-medium text-accent hover:text-emerald-700"
                                    >
                                      Project ↗
                                    </a>
                                  )}

                                  {project.githubUrl && (
                                    <a
                                      href={project.githubUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-xs font-medium text-accent hover:text-emerald-700"
                                    >
                                      GitHub ↗
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex shrink-0 gap-3">
                            <button
                              type="button"
                              onClick={() => handleEdit(project)}
                              className="text-xs text-muted transition hover:text-accent"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(project._id)}
                              className="text-xs text-muted transition hover:text-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add / Edit Project */}
          {isAdding && (
            <div className="mt-6 border-t border-stone-100 pt-5">
              <p className="mb-4 text-sm font-medium text-stone-700">
                {editingId ? "Edit project" : "Add project"}
              </p>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Project title *"
                    className={inputClass}
                  />

                  <input
                    type="text"
                    value={technologyInput}
                    onChange={(e) => setTechnologyInput(e.target.value)}
                    onKeyDown={addTechnology}
                    placeholder="Technology + Enter"
                    className={inputClass}
                  />

                  <div className="md:col-span-2">
                    {form.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {form.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="flex items-center gap-2 rounded-full border border-accent/20 bg-emerald-50 px-3 py-1 text-xs text-accent"
                          >
                            {technology}

                            <button
                              type="button"
                              onClick={() => removeTechnology(technology)}
                              className="text-accent hover:text-red-600"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <input
                    type="url"
                    name="projectUrl"
                    value={form.projectUrl}
                    onChange={handleChange}
                    placeholder="Project URL"
                    className={inputClass}
                  />

                  <input
                    type="url"
                    name="githubUrl"
                    value={form.githubUrl}
                    onChange={handleChange}
                    placeholder="GitHub URL"
                    className={inputClass}
                  />

                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    className={inputClass}
                  />

                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    className={inputClass}
                  />

                  <div className="md:col-span-2">
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Brief description"
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />

                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleImproveWithAI}
                        disabled={improving}
                        className="rounded-lg border border-accent/30 bg-emerald-50 px-3 py-2 text-xs font-medium text-accent transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {improving ? "Improving..." : "Improve with AI"}
                      </button>
                    </div>

                    {aiSuggestion && (
                      <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 p-4">
                        <div>
                          <h3 className="text-sm font-semibold text-ink">
                            AI Suggestion
                          </h3>

                          <p className="mt-1 text-xs text-muted">
                            Review the improved description before applying it.
                          </p>
                        </div>

                        <div className="mt-3 rounded-lg border border-stone-200 bg-white p-4">
                          <p className="whitespace-pre-wrap text-sm leading-6 text-stone-700">
                            {aiSuggestion}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setForm((prev) => ({
                                ...prev,
                                description: aiSuggestion,
                              }));

                              setAiSuggestion("");

                              toast.success("AI suggestion applied.");
                            }}
                            className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
                          >
                            Accept
                          </button>

                          <button
                            type="button"
                            onClick={() => setAiSuggestion("")}
                            className="rounded-lg border border-stone-200 px-4 py-2 text-xs text-stone-600 transition hover:text-ink"
                          >
                            Reject
                          </button>

                          <button
                            type="button"
                            onClick={handleImproveWithAI}
                            disabled={improving}
                            className="rounded-lg border border-stone-200 px-4 py-2 text-xs text-stone-600 transition hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {improving ? "Improving..." : "Regenerate"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project Image */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-stone-700">
                      Project image
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-500"
                    />

                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Project preview"
                        className="mt-4 h-40 w-full rounded-xl object-cover"
                      />
                    )}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    {editingId ? "Update Project" : "Add Project"}
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-lg border border-stone-200 px-5 py-2.5 text-sm text-stone-600 transition hover:text-ink"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ProjectsSection;
