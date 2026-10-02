import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FileText, Upload, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import portfolioService from "../portfolioService";

const ResumeImport = () => {

  

  const navigate = useNavigate();
  const { id: portfolioId } = useParams();

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [imported, setImported] = useState(false);
  const [portfolioSlug, setPortfolioSlug] = useState("");

  const [selectedSections, setSelectedSections] = useState({
    skills: true,
    education: true,
    projects: true,
  });

  useEffect(() => {
  const loadPortfolio = async () => {
    try {
      const response =
        await portfolioService.getPortfolio(portfolioId);

      setPortfolioSlug(response.data.slug);
    } catch (error) {
      console.error("Failed to load portfolio:", error);
    }
  };

  loadPortfolio();
}, [portfolioId]);



  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("PDF size must be less than 5 MB");
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a resume PDF");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("resume", file);
      formData.append("portfolioId", portfolioId);

      const response = await portfolioService.uploadResume(formData);

      setResumeId(response.data.resume._id);
      setResumeData(response.data.resume.resumeData);

      toast.success("Resume parsed successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload resume");
    } finally {
      setUploading(false);
    }
  };

  const toggleSection = (section) => {
    setSelectedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleImport = async () => {
    if (!resumeData) {
      return;
    }

    try {
      setUploading(true);

      await portfolioService.importResumeData({
        resumeId,
        portfolioId,
        sections: selectedSections,
      });

      
      setImported(true);

      toast.success("Resume data imported successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to import resume data",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Import Resume</h1>

        <p className="mt-1 text-sm text-muted">
          Upload your resume and automatically extract portfolio information.
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-8">
        <label
          htmlFor="resume-upload"
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-stone-200 bg-stone-50 px-6 py-12 text-center transition hover:bg-stone-100"
        >
          <Upload className="h-8 w-8 text-stone-500" />

          <p className="mt-4 text-sm font-medium text-stone-700">
            Choose your resume PDF
          </p>

          <p className="mt-1 text-xs text-muted">PDF only · Maximum 5 MB</p>

          <input
            id="resume-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {file && (
          <div className="mt-4 flex items-center justify-between rounded-lg border border-stone-200 bg-stone-50 p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-stone-600" />

              <div>
                <p className="text-sm font-medium text-stone-700">
                  {file.name}
                </p>

                <p className="text-xs text-muted">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading && <Loader2 className="h-4 w-4 animate-spin" />}

              {uploading ? "Uploading..." : "Upload Resume"}
            </button>
          </div>
        )}
      </div>
      {resumeData && (
        <div className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6">
          <div>
            <h2 className="text-lg font-semibold text-ink">
              Extracted Resume Data
            </h2>

            <p className="mt-1 text-sm text-muted">
              Review the information extracted from your resume.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-stone-700">
              Select information to import
            </h3>

            {["skills", "education", "projects"].map((section) => (
              <label
                key={section}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-stone-200 p-3"
              >
                <input
                  type="checkbox"
                  checked={selectedSections[section]}
                  onChange={() => toggleSection(section)}
                  className="h-4 w-4"
                />

                <span className="text-sm font-medium capitalize text-stone-700">
                  {section}
                </span>
              </label>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-stone-700">Skills</h3>

            <div className="mt-2 flex flex-wrap gap-2">
              {resumeData.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-stone-700">Education</h3>

            <div className="mt-2 space-y-2">
              {resumeData.education.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-stone-200 p-3 text-sm text-stone-700"
                >
                  <p className="font-semibold">{item.degree}</p>

                  <p className="mt-1">{item.institution}</p>

                  {item.fieldOfStudy && (
                    <p className="mt-1 text-xs text-muted">
                      {item.fieldOfStudy}
                    </p>
                  )}

                  {(item.startDate || item.endDate) && (
                    <p className="mt-1 text-xs text-muted">
                      {item.startDate} – {item.endDate}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-stone-700">Projects</h3>

            <div className="mt-2 space-y-2">
              {resumeData.projects.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-stone-200 p-4"
                >
                  <p className="text-sm font-semibold text-stone-800">
                    {item.title}
                  </p>

                  {item.technologies?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.description && (
                    <p className="mt-3 text-sm leading-6 text-stone-600">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {imported ? (
            <div className="flex items-center justify-between border-t border-stone-200 pt-4">
              <div>
                <p className="text-sm font-semibold text-stone-800">
                  Resume imported successfully
                </p>

                <p className="mt-1 text-xs text-muted">
                  Your selected resume information has been added to your
                  portfolio.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/portfolio/${portfolioSlug}`)}
                className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800"
              >
                Go to Portfolio
              </button>
            </div>
          ) : (
            <div className="flex justify-end border-t border-stone-200 pt-4">
              <button
                type="button"
                onClick={handleImport}
                disabled={uploading}
                className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading && <Loader2 className="h-4 w-4 animate-spin" />}

                {uploading ? "Importing..." : "Confirm Import"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeImport;
