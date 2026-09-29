import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import portfolioService from "../portfolioService";

const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

const SkillsSection = ({ portfolioId }) => {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("Intermediate");

  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [editingLevel, setEditingLevel] = useState("Intermediate");

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [suggesting, setSuggesting] = useState(false);

  const [visible, setVisible] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadSkills();
  }, [portfolioId]);

  const loadSkills = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await portfolioService.getSkills(portfolioId);
      setSkills(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load skills");
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

  const handleSuggestSkills = async () => {
    const currentSkills = skills.map((skill) => skill.name).join(", ");

    const content = currentSkills
      ? `Current technical skills: ${currentSkills}`
      : "The developer has not added any technical skills yet.";

    try {
      setSuggesting(true);
      setError("");

      const response = await portfolioService.suggestSkills({
        content,
      });

      setAiSuggestion(response.data.content);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to suggest skills");
    } finally {
      setSuggesting(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Skill name is required");
      return;
    }

    try {
      setAdding(true);
      setError("");

      const response = await portfolioService.createSkill(portfolioId, {
        name: name.trim(),
        level,
      });

      setSkills((prev) => [...prev, response.data]);

      setName("");
      setLevel("Intermediate");

      showSuccess("Skill added successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add skill");
    } finally {
      setAdding(false);
    }
  };

  const startEditing = (skill) => {
    setEditingId(skill._id);
    setEditingName(skill.name);
    setEditingLevel(skill.level);
    setError("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
    setEditingLevel("Intermediate");
  };

  const handleUpdate = async (skillId) => {
    if (!editingName.trim()) {
      setError("Skill name is required");
      return;
    }

    try {
      setSavingId(skillId);
      setError("");

      const response = await portfolioService.updateSkill(
        portfolioId,
        skillId,
        {
          name: editingName.trim(),
          level: editingLevel,
        },
      );

      setSkills((prev) =>
        prev.map((skill) => (skill._id === skillId ? response.data : skill)),
      );

      cancelEditing();
      showSuccess("Skill updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update skill");
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (skillId) => {
    try {
      setDeletingId(skillId);
      setError("");

      await portfolioService.deleteSkill(portfolioId, skillId);

      setSkills((prev) => prev.filter((skill) => skill._id !== skillId));

      showSuccess("Skill removed");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete skill");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-ink">Skills</h2>

          <p className="mt-1 text-sm text-muted">
            Showcase your technical expertise.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSuggestSkills}
          disabled={suggesting}
          className="rounded-lg border border-accent/30 bg-emerald-50 px-3 py-2 text-xs font-medium text-accent transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {suggesting ? "Suggesting..." : "Suggest with AI"}
        </button>

        {/* Visibility toggle */}
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            visible ? "bg-accent" : "bg-stone-300"
          }`}
          aria-label="Toggle skills visibility"
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
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

          {/* Skills */}
          <div className="mt-6">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-14 animate-pulse rounded-xl border border-stone-100 bg-canvas"
                  />
                ))}
              </div>
            ) : skills.length === 0 ? (
              <div className="rounded-xl border border-dashed border-stone-300 px-5 py-8 text-center">
                <p className="text-sm text-stone-600">No skills added yet.</p>

                <p className="mt-1 text-xs text-muted">
                  Add your first skill below.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {skills.map((skill) =>
                  editingId === skill._id ? (
                    /* Edit row */
                    <div
                      key={skill._id}
                      className="rounded-xl border border-accent/20 bg-emerald-50/50 p-3"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="min-w-0 flex-1 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-ink outline-none transition focus:border-accent"
                        />

                        <select
                          value={editingLevel}
                          onChange={(e) => setEditingLevel(e.target.value)}
                          className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 outline-none focus:border-accent"
                        >
                          {skillLevels.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleUpdate(skill._id)}
                            disabled={savingId === skill._id}
                            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
                          >
                            {savingId === skill._id ? "Saving..." : "Save"}
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
                    </div>
                  ) : (
                    /* Skill row */
                    <div
                      key={skill._id}
                      className="group flex items-center justify-between rounded-xl border border-stone-100 bg-canvas px-4 py-3 transition hover:border-accent/30"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-accent">
                          ✦
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-ink">
                            {skill.name}
                          </p>

                          <span className="text-xs text-muted">
                            {skill.level}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => startEditing(skill)}
                          className="text-xs text-muted transition hover:text-accent"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(skill._id)}
                          disabled={deletingId === skill._id}
                          className="text-xs text-muted transition hover:text-red-600 disabled:opacity-50"
                        >
                          {deletingId === skill._id ? "..." : "Remove"}
                        </button>
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>

          {aiSuggestion && (
            <div className="mt-5 rounded-xl border border-stone-200 bg-stone-50 p-4">
              <div>
                <h3 className="text-sm font-semibold text-ink">
                  AI Skill Suggestions
                </h3>

                <p className="mt-1 text-xs text-muted">
                  Review the suggested skills before adding them.
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
                    setAiSuggestion("");
                    toast.success(
                      "Review the suggestions and add the relevant skills manually.",
                    );
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
                  onClick={handleSuggestSkills}
                  disabled={suggesting}
                  className="rounded-lg border border-stone-200 px-4 py-2 text-xs text-stone-600 transition hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {suggesting ? "Suggesting..." : "Regenerate"}
                </button>
              </div>
            </div>
          )}

          {/* Add skill */}
          <form
            onSubmit={handleAdd}
            className="mt-6 border-t border-stone-100 pt-5"
          >
            <p className="mb-3 text-sm font-medium text-stone-700">
              Add a skill
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. React, Python, MongoDB"
                className="min-w-0 flex-1 rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-ink placeholder-stone-400 outline-none transition focus:border-accent"
              />

              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-700 outline-none focus:border-accent"
              >
                {skillLevels.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                disabled={adding}
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {adding ? "Adding..." : "+ Add"}
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
};

export default SkillsSection;
