import { useEffect, useState } from "react";
import portfolioService from "../portfolioService";

const EducationSection = ({ portfolioId }) => {
  const [education, setEducation] = useState([]);

  const [form, setForm] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
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
    loadEducation();
  }, [portfolioId]);

  const loadEducation = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await portfolioService.getEducation(portfolioId);

      setEducation(response.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load education"
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
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!form.institution.trim() || !form.degree.trim()) {
      setError("Institution and degree are required");
      return;
    }

    try {
      setAdding(true);
      setError("");

      const response =
        await portfolioService.createEducation(
          portfolioId,
          {
            ...form,
            institution: form.institution.trim(),
            degree: form.degree.trim(),
            fieldOfStudy: form.fieldOfStudy.trim(),
            description: form.description.trim(),
          }
        );

      setEducation((prev) => [
        ...prev,
        response.data,
      ]);

      setForm({
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        description: "",
      });

      showSuccess("Education added successfully");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to add education"
      );
    } finally {
      setAdding(false);
    }
  };

  const startEditing = (item) => {
    setEditingId(item._id);

    setEditingForm({
      institution: item.institution || "",
      degree: item.degree || "",
      fieldOfStudy: item.fieldOfStudy || "",
      startDate: item.startDate
        ? item.startDate.split("T")[0]
        : "",
      endDate: item.endDate
        ? item.endDate.split("T")[0]
        : "",
      description: item.description || "",
    });

    setError("");
  };

  const handleEditChange = (e) => {
    setEditingForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingForm({});
  };

  const handleUpdate = async (educationId) => {
    if (
      !editingForm.institution?.trim() ||
      !editingForm.degree?.trim()
    ) {
      setError("Institution and degree are required");
      return;
    }

    try {
      setSavingId(educationId);
      setError("");

      const response =
        await portfolioService.updateEducation(
          portfolioId,
          educationId,
          {
            ...editingForm,
            institution:
              editingForm.institution.trim(),
            degree: editingForm.degree.trim(),
            fieldOfStudy:
              editingForm.fieldOfStudy?.trim() || "",
            description:
              editingForm.description?.trim() || "",
          }
        );

      setEducation((prev) =>
        prev.map((item) =>
          item._id === educationId
            ? response.data
            : item
        )
      );

      cancelEditing();
      showSuccess("Education updated successfully");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update education"
      );
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (educationId) => {
    try {
      setDeletingId(educationId);
      setError("");

      await portfolioService.deleteEducation(
        portfolioId,
        educationId
      );

      setEducation((prev) =>
        prev.filter(
          (item) => item._id !== educationId
        )
      );

      showSuccess("Education removed");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete education"
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
    "w-full rounded-lg border border-white/10 bg-[#08090d] px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-cyan-500/50";

  return (
    <section className="w-full rounded-2xl border border-white/10 bg-[#0d0e14] p-5 shadow-xl sm:p-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Education
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add your academic background and journey.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            visible
              ? "bg-cyan-500"
              : "bg-gray-700"
          }`}
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
            <div className="mt-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-5 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-400">
              {success}
            </div>
          )}

          {/* Education List */}
          <div className="mt-6">
            {loading ? (
              <div className="space-y-3">
                <div className="h-28 animate-pulse rounded-xl bg-white/[0.03]" />
                <div className="h-28 animate-pulse rounded-xl bg-white/[0.03]" />
              </div>
            ) : education.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 px-5 py-8 text-center">
                <p className="text-sm text-gray-400">
                  No education added yet.
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Add your academic background below.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {education.map((item) => (
                  <div key={item._id}>
                    {editingId === item._id ? (
                      /* Edit */
                      <div className="rounded-xl border border-cyan-500/20 bg-[#10121a] p-4">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

                          <input
                            name="institution"
                            value={editingForm.institution}
                            onChange={handleEditChange}
                            placeholder="Institution"
                            className={inputClass}
                          />

                          <input
                            name="degree"
                            value={editingForm.degree}
                            onChange={handleEditChange}
                            placeholder="Degree"
                            className={inputClass}
                          />

                          <input
                            name="fieldOfStudy"
                            value={editingForm.fieldOfStudy}
                            onChange={handleEditChange}
                            placeholder="Field of study"
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
                            className={inputClass}
                          />

                          <textarea
                            name="description"
                            value={editingForm.description}
                            onChange={handleEditChange}
                            placeholder="Description"
                            rows={3}
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
                            className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-50"
                          >
                            {savingId === item._id
                              ? "Saving..."
                              : "Save"}
                          </button>

                          <button
                            type="button"
                            onClick={cancelEditing}
                            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:border-white/20 hover:text-white"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Education Card */
                      <div className="group rounded-xl border border-white/10 bg-[#10121a] p-4 transition hover:border-cyan-500/20">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                          <div className="min-w-0">
                            <h3 className="text-base font-semibold text-white">
                              {item.degree}
                            </h3>

                            <p className="mt-1 text-sm font-medium text-cyan-400">
                              {item.institution}
                            </p>

                            {item.fieldOfStudy && (
                              <p className="mt-1 text-sm text-gray-400">
                                {item.fieldOfStudy}
                              </p>
                            )}

                            {(item.startDate ||
                              item.endDate) && (
                              <p className="mt-2 text-xs text-gray-500">
                                {formatDate(item.startDate)}
                                {" — "}
                                {item.endDate
                                  ? formatDate(item.endDate)
                                  : "Present"}
                              </p>
                            )}

                            {item.description && (
                              <p className="mt-3 border-t border-white/5 pt-3 text-sm leading-6 text-gray-500">
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
                              className="text-xs text-gray-500 transition hover:text-cyan-400"
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
                              className="text-xs text-gray-500 transition hover:text-red-400 disabled:opacity-50"
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

          {/* Add Education */}
          <div className="mt-6 border-t border-white/5 pt-5">
            <p className="mb-4 text-sm font-medium text-gray-300">
              Add education
            </p>

            <form onSubmit={handleAdd}>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

                <input
                  name="institution"
                  value={form.institution}
                  onChange={handleChange}
                  placeholder="Institution *"
                  className={inputClass}
                />

                <input
                  name="degree"
                  value={form.degree}
                  onChange={handleChange}
                  placeholder="Degree *"
                  className={inputClass}
                />

                <input
                  name="fieldOfStudy"
                  value={form.fieldOfStudy}
                  onChange={handleChange}
                  placeholder="Field of study"
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

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Brief description"
                  rows={3}
                  className={`${inputClass} resize-none md:col-span-2`}
                />
              </div>

              <button
                type="submit"
                disabled={adding}
                className="mt-4 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {adding
                  ? "Adding..."
                  : "+ Add Education"}
              </button>
            </form>
          </div>
        </>
      )}
    </section>
  );
};

export default EducationSection;