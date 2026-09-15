import { useEffect, useState } from "react";
import portfolioService from "../portfolioService";

const CertificationSection = ({ portfolioId }) => {
  const [certifications, setCertifications] = useState([]);

  const [form, setForm] = useState({
    name: "",
    issuer: "",
    issueDate: "",
    credentialUrl: "",
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
    loadCertifications();
  }, [portfolioId]);

  const loadCertifications = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await portfolioService.getCertifications(portfolioId);

      setCertifications(response.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load certifications"
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

    if (!form.name.trim() || !form.issuer.trim()) {
      setError(
        "Certification name and issuer are required"
      );
      return;
    }

    try {
      setAdding(true);
      setError("");

      const response =
        await portfolioService.createCertification(
          portfolioId,
          {
            ...form,
            name: form.name.trim(),
            issuer: form.issuer.trim(),
            credentialUrl:
              form.credentialUrl.trim(),
            description:
              form.description.trim(),
          }
        );

      setCertifications((prev) => [
        ...prev,
        response.data,
      ]);

      setForm({
        name: "",
        issuer: "",
        issueDate: "",
        credentialUrl: "",
        description: "",
      });

      showSuccess("Certification added successfully");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to add certification"
      );
    } finally {
      setAdding(false);
    }
  };

  const startEditing = (item) => {
    setEditingId(item._id);

    setEditingForm({
      name: item.name || "",
      issuer: item.issuer || "",
      issueDate: item.issueDate
        ? item.issueDate.split("T")[0]
        : "",
      credentialUrl: item.credentialUrl || "",
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

  const handleUpdate = async (certificationId) => {
    if (
      !editingForm.name?.trim() ||
      !editingForm.issuer?.trim()
    ) {
      setError(
        "Certification name and issuer are required"
      );
      return;
    }

    try {
      setSavingId(certificationId);
      setError("");

      const response =
        await portfolioService.updateCertification(
          portfolioId,
          certificationId,
          {
            ...editingForm,
            name: editingForm.name.trim(),
            issuer: editingForm.issuer.trim(),
            credentialUrl:
              editingForm.credentialUrl?.trim() || "",
            description:
              editingForm.description?.trim() || "",
          }
        );

      setCertifications((prev) =>
        prev.map((item) =>
          item._id === certificationId
            ? response.data
            : item
        )
      );

      cancelEditing();

      showSuccess(
        "Certification updated successfully"
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update certification"
      );
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (certificationId) => {
    try {
      setDeletingId(certificationId);
      setError("");

      await portfolioService.deleteCertification(
        portfolioId,
        certificationId
      );

      setCertifications((prev) =>
        prev.filter(
          (item) => item._id !== certificationId
        )
      );

      showSuccess("Certification removed");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete certification"
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
            Certifications
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Showcase your certifications and credentials.
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
          aria-label="Toggle certifications visibility"
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

          {/* Certification List */}
          <div className="mt-6">
            {loading ? (
              <div className="space-y-3">
                <div className="h-28 animate-pulse rounded-xl bg-white/[0.03]" />
                <div className="h-28 animate-pulse rounded-xl bg-white/[0.03]" />
              </div>
            ) : certifications.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 px-5 py-8 text-center">
                <p className="text-sm text-gray-400">
                  No certifications added yet.
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Add your professional certifications below.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {certifications.map((item) => (
                  <div key={item._id}>
                    {editingId === item._id ? (
                      /* Edit Form */
                      <div className="rounded-xl border border-cyan-500/20 bg-[#10121a] p-4">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

                          <input
                            name="name"
                            value={editingForm.name}
                            onChange={handleEditChange}
                            placeholder="Certification name"
                            className={inputClass}
                          />

                          <input
                            name="issuer"
                            value={editingForm.issuer}
                            onChange={handleEditChange}
                            placeholder="Issuing organization"
                            className={inputClass}
                          />

                          <input
                            type="date"
                            name="issueDate"
                            value={editingForm.issueDate}
                            onChange={handleEditChange}
                            className={inputClass}
                          />

                          <input
                            type="url"
                            name="credentialUrl"
                            value={
                              editingForm.credentialUrl
                            }
                            onChange={handleEditChange}
                            placeholder="Credential URL"
                            className={inputClass}
                          />

                          <textarea
                            name="description"
                            value={
                              editingForm.description
                            }
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
                      /* Certification Card */
                      <div className="group rounded-xl border border-white/10 bg-[#10121a] p-4 transition hover:border-cyan-500/20">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                          <div className="min-w-0">
                            <h3 className="text-base font-semibold text-white">
                              {item.name}
                            </h3>

                            <p className="mt-1 text-sm font-medium text-cyan-400">
                              {item.issuer}
                            </p>

                            {item.issueDate && (
                              <p className="mt-2 text-xs text-gray-500">
                                Issued{" "}
                                {formatDate(
                                  item.issueDate
                                )}
                              </p>
                            )}

                            {item.description && (
                              <p className="mt-3 border-t border-white/5 pt-3 text-sm leading-6 text-gray-500">
                                {item.description}
                              </p>
                            )}

                            {item.credentialUrl && (
                              <a
                                href={item.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-flex text-xs font-medium text-cyan-400 transition hover:text-cyan-300"
                              >
                                View Credential ↗
                              </a>
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

          {/* Add Certification */}
          <div className="mt-6 border-t border-white/5 pt-5">
            <p className="mb-4 text-sm font-medium text-gray-300">
              Add certification
            </p>

            <form onSubmit={handleAdd}>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Certification name *"
                  className={inputClass}
                />

                <input
                  name="issuer"
                  value={form.issuer}
                  onChange={handleChange}
                  placeholder="Issuing organization *"
                  className={inputClass}
                />

                <input
                  type="date"
                  name="issueDate"
                  value={form.issueDate}
                  onChange={handleChange}
                  className={inputClass}
                />

                <input
                  type="url"
                  name="credentialUrl"
                  value={form.credentialUrl}
                  onChange={handleChange}
                  placeholder="Credential URL"
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
                  : "+ Add Certification"}
              </button>
            </form>
          </div>
        </>
      )}
    </section>
  );
};

export default CertificationSection;