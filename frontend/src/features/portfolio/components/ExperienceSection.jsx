import { useEffect, useState } from "react";
import portfolioService from "../portfolioService";

const ExperienceSection = ({ portfolioId }) => {
  const [experiences, setExperiences] = useState([]);

  const [form, setForm] = useState({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editingForm, setEditingForm] = useState({});

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [visible, setVisible] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadExperiences();
  }, [portfolioId]);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await portfolioService.getExperiences(portfolioId);

      setExperiences(response.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load experience"
      );
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (message) => {
    setSuccess(message);

    setTimeout(() => {
      setSuccess("");
    }, 2500);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!form.company.trim()) {
      setError("Company name is required");
      return;
    }

    if (!form.position.trim()) {
      setError("Position is required");
      return;
    }

    if (!form.startDate) {
      setError("Start date is required");
      return;
    }

    if (
      !form.isCurrent &&
      form.endDate &&
      form.endDate < form.startDate
    ) {
      setError("End date cannot be before start date");
      return;
    }

    try {
      setAdding(true);
      setError("");

      const response =
        await portfolioService.createExperience(
          portfolioId,
          {
            company: form.company.trim(),
            position: form.position.trim(),
            location: form.location.trim(),
            startDate: form.startDate,
            endDate: form.isCurrent
              ? null
              : form.endDate || null,
            isCurrent: form.isCurrent,
            description: form.description.trim(),
          }
        );

      setExperiences((prev) => [
        response.data,
        ...prev,
      ]);

      setForm({
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
      });

      showSuccess("Experience added successfully");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to add experience"
      );
    } finally {
      setAdding(false);
    }
  };

  const startEditing = (item) => {
    setEditingId(item._id);

    setEditingForm({
      company: item.company || "",
      position: item.position || "",
      location: item.location || "",
      startDate: item.startDate
        ? item.startDate.split("T")[0]
        : "",
      endDate: item.endDate
        ? item.endDate.split("T")[0]
        : "",
      isCurrent: item.isCurrent || false,
      description: item.description || "",
    });

    setError("");
    setSuccess("");
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEditingForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingForm({});
  };

  const handleUpdate = async (experienceId) => {
    if (!editingForm.company?.trim()) {
      setError("Company name is required");
      return;
    }

    if (!editingForm.position?.trim()) {
      setError("Position is required");
      return;
    }

    if (!editingForm.startDate) {
      setError("Start date is required");
      return;
    }

    if (
      !editingForm.isCurrent &&
      editingForm.endDate &&
      editingForm.endDate < editingForm.startDate
    ) {
      setError("End date cannot be before start date");
      return;
    }

    try {
      setSavingId(experienceId);
      setError("");

      const response =
        await portfolioService.updateExperience(
          portfolioId,
          experienceId,
          {
            company: editingForm.company.trim(),
            position: editingForm.position.trim(),
            location:
              editingForm.location?.trim() || "",
            startDate: editingForm.startDate,
            endDate: editingForm.isCurrent
              ? null
              : editingForm.endDate || null,
            isCurrent: editingForm.isCurrent,
            description:
              editingForm.description?.trim() || "",
          }
        );

      setExperiences((prev) =>
        prev.map((item) =>
          item._id === experienceId
            ? response.data
            : item
        )
      );

      cancelEditing();

      showSuccess("Experience updated successfully");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update experience"
      );
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (experienceId) => {
    if (!window.confirm("Delete this experience?")) {
      return;
    }

    try {
      setDeletingId(experienceId);
      setError("");

      await portfolioService.deleteExperience(
        portfolioId,
        experienceId
      );

      setExperiences((prev) =>
        prev.filter(
          (item) => item._id !== experienceId
        )
      );

      showSuccess("Experience removed");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete experience"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        month: "short",
        year: "numeric",
      }
    );
  };

  const inputClass =
    "w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-ink placeholder-stone-400 outline-none transition focus:border-accent";

  return (
    <section className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-ink">
            Experience
          </h2>

          <p className="mt-1 text-sm text-muted">
            Showcase your professional experience and career journey.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setVisible((prev) => !prev)
          }
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            visible
              ? "bg-accent"
              : "bg-stone-300"
          }`}
          aria-label="Toggle experience visibility"
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
              visible ? "left-6" : "left-1"
            }`}
          />
        </button>
      </div>

      {visible && (
        <>
          {/* Messages */}
          {error && (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {success}
            </div>
          )}

          {/* Experience List */}
          <div className="mt-6">
            {loading ? (
              <div className="space-y-3">
                <div className="h-32 animate-pulse rounded-xl bg-canvas" />
                <div className="h-32 animate-pulse rounded-xl bg-canvas" />
              </div>
            ) : experiences.length === 0 ? (
              <div className="rounded-xl border border-dashed border-stone-300 px-5 py-8 text-center">
                <p className="text-sm text-stone-600">
                  No experience added yet.
                </p>

                <p className="mt-1 text-xs text-muted">
                  Add your professional experience below.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {experiences.map((item) => (
                  <div key={item._id}>

                    {editingId === item._id ? (

                      /* Edit Experience */
                      <div className="rounded-xl border border-accent/20 bg-emerald-50/40 p-4">

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

                          <input
                            name="company"
                            value={editingForm.company}
                            onChange={handleEditChange}
                            placeholder="Company name *"
                            className={inputClass}
                          />

                          <input
                            name="position"
                            value={editingForm.position}
                            onChange={handleEditChange}
                            placeholder="Position / Job title *"
                            className={inputClass}
                          />

                          <input
                            name="location"
                            value={editingForm.location}
                            onChange={handleEditChange}
                            placeholder="Location"
                            className={inputClass}
                          />

                          <input
                            type="date"
                            name="startDate"
                            value={editingForm.startDate}
                            onChange={handleEditChange}
                            className={inputClass}
                          />

                          <input
                            type="date"
                            name="endDate"
                            value={editingForm.endDate}
                            onChange={handleEditChange}
                            disabled={editingForm.isCurrent}
                            className={`${inputClass} disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400`}
                          />

                          <label className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-3 py-2.5">
                            <input
                              id={`current-edit-${item._id}`}
                              type="checkbox"
                              name="isCurrent"
                              checked={
                                editingForm.isCurrent
                              }
                              onChange={handleEditChange}
                              className="h-4 w-4 accent-emerald-600"
                            />

                            <span className="text-sm text-stone-600">
                              Currently working here
                            </span>
                          </label>

                          <textarea
                            name="description"
                            value={editingForm.description}
                            onChange={handleEditChange}
                            placeholder="Describe your responsibilities, achievements, etc."
                            rows={4}
                            maxLength={2000}
                            className={`${inputClass} resize-none md:col-span-2`}
                          />
                        </div>

                        <div className="mt-4 flex gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              handleUpdate(item._id)
                            }
                            disabled={
                              savingId === item._id
                            }
                            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                          >
                            {savingId === item._id
                              ? "Saving..."
                              : "Save"}
                          </button>

                          <button
                            type="button"
                            onClick={cancelEditing}
                            className="rounded-lg border border-stone-200 px-4 py-2 text-sm text-stone-600 transition hover:text-ink"
                          >
                            Cancel
                          </button>

                        </div>
                      </div>

                    ) : (

                      /* Experience Card */
                      <div className="group rounded-xl border border-stone-200 bg-canvas p-4 transition hover:border-accent/30">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                          <div className="min-w-0">

                            <h3 className="text-base font-semibold text-ink">
                              {item.position}
                            </h3>

                            <p className="mt-1 text-sm font-medium text-accent">
                              {item.company}
                            </p>

                            {item.location && (
                              <p className="mt-1 text-sm text-stone-600">
                                {item.location}
                              </p>
                            )}

                            <p className="mt-2 text-xs text-muted">
                              {formatDate(item.startDate)}
                              {" — "}
                              {item.isCurrent
                                ? "Present"
                                : formatDate(item.endDate)}
                            </p>

                            {item.description && (
                              <p className="mt-3 border-t border-stone-200 pt-3 text-sm leading-6 text-muted">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="flex shrink-0 gap-3">

                            <button
                              type="button"
                              onClick={() =>
                                startEditing(item)
                              }
                              className="text-xs text-muted transition hover:text-accent"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(item._id)
                              }
                              disabled={
                                deletingId === item._id
                              }
                              className="text-xs text-muted transition hover:text-red-600 disabled:opacity-50"
                            >
                              {deletingId === item._id
                                ? "..."
                                : "Remove"}
                            </button>

                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Experience */}
          <div className="mt-6 border-t border-stone-100 pt-5">

            <p className="mb-4 text-sm font-medium text-stone-700">
              Add experience
            </p>

            <form onSubmit={handleAdd}>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company name *"
                  className={inputClass}
                />

                <input
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  placeholder="Position / Job title *"
                  className={inputClass}
                />

                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Location"
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
                  disabled={form.isCurrent}
                  className={`${inputClass} disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400`}
                />

                <label className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-3 py-2.5">

                  <input
                    id="current-experience"
                    type="checkbox"
                    name="isCurrent"
                    checked={form.isCurrent}
                    onChange={handleChange}
                    className="h-4 w-4 accent-emerald-600"
                  />

                  <span className="text-sm text-stone-600">
                    Currently working here
                  </span>

                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your responsibilities, achievements, etc."
                  rows={4}
                  maxLength={2000}
                  className={`${inputClass} resize-none md:col-span-2`}
                />

              </div>

              <button
                type="submit"
                disabled={adding}
                className="mt-4 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {adding
                  ? "Adding..."
                  : "+ Add Experience"}
              </button>

            </form>
          </div>
        </>
      )}
    </section>
  );
};

export default ExperienceSection;