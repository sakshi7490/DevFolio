import asyncHandler from "../../utils/asyncHandler.js";
import extractTextFromPdf from "../../utils/pdfParser.js";
import parseResume from "./resume.parser.js";
import Resume from "./resume.model.js";
import Skill from "../portfolio/skill.model.js";
import Education from "../portfolio/education.model.js";
import Project from "../portfolio/project.model.js";
import Portfolio from "../portfolio/portfolio.model.js";
import cloudinaryService from "../../services/cloudinary.service.js";


export const uploadResume = asyncHandler(async (req, res) => {
    const { portfolioId } = req.body;
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Resume PDF is required",
    });
  }

  if (!portfolioId) {
  return res.status(400).json({
    success: false,
    message: "Portfolio ID is required",
  });
}

  const extractedText = await extractTextFromPdf(
    req.file.buffer,
  );

  if (!extractedText) {
    return res.status(400).json({
      success: false,
      message: "Could not extract text from the resume PDF",
    });
  }

  const resumeData = parseResume(extractedText);
  

  const result = await cloudinaryService.uploadRawFile(
  req.file.buffer,
  "devfolio/resumes",
  req.file.originalname
);


  const resume = await Resume.create({
  userId: req.user._id,
  portfolioId,
  fileName: req.file.originalname,
  fileSize: req.file.size,
  mimeType: req.file.mimetype,
  extractedText,
  resumeData,
});

await Portfolio.findByIdAndUpdate(
  portfolioId,
  {
    resumeUrl: result.secure_url,
  },
  { new: true }
);



  

 res.status(200).json({
  success: true,
  message: "Resume parsed successfully",
 data: {
  resume,
},
});
});

export const importResumeData = asyncHandler(async (req, res) => {
  const { resumeId, portfolioId, sections } = req.body;

  if (!resumeId || !portfolioId) {
    return res.status(400).json({
      success: false,
      message: "Resume ID and Portfolio ID are required",
    });
  }

  const resume = await Resume.findOne({
    _id: resumeId,
    portfolioId,
    userId: req.user._id,
  });

 

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: "Resume not found",
    });
  }

  if (resume.importedAt) {
  return res.status(400).json({
    success: false,
    message: "This resume has already been imported",
  });
}

  const selectedSections = sections || {};

  const imported = {
    skills: 0,
    education: 0,
    projects: 0,
  };

  if (selectedSections.skills) {
    for (const skill of resume.resumeData.skills) {
      if (skill.trim()) {
        await Skill.create({
          portfolioId,
          name: skill.trim(),
        });

        imported.skills++;
      }
    }
  }

 if (selectedSections.education) {
  for (const education of resume.resumeData.education) {
    if (education.institution?.trim()) {
      await Education.create({
        portfolioId,
        institution: education.institution.trim(),
        degree: education.degree?.trim() || "Not specified",
        fieldOfStudy: education.fieldOfStudy?.trim() || undefined,
        startDate: education.startDate
          ? new Date(`${education.startDate}-01-01`)
          : undefined,
        endDate: education.endDate
          ? new Date(`${education.endDate}-01-01`)
          : undefined,
      });

      imported.education++;
    }
  }
}

  if (selectedSections.projects) {
  for (const project of resume.resumeData.projects) {
    if (project.title?.trim()) {
      await Project.create({
        portfolioId,
        title: project.title.trim(),
        description: project.description?.trim() || undefined,
        technologies: project.technologies || [],
      });

      imported.projects++;
    }
  }
}

  resume.importedAt = new Date();
await resume.save();

  res.status(200).json({
    success: true,
    message: "Resume data imported successfully",
    data: {
      imported,
    },
  });
});