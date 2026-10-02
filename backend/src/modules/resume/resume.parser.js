const normalizeText = (text) => {
  return text
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const getSection = (text, sectionName, nextSections) => {
  const lines = text.split("\n");

  const startIndex = lines.findIndex(
    (line) => line.trim().toLowerCase() === sectionName,
  );

  if (startIndex === -1) {
    return [];
  }

  const sectionLines = [];

  for (let i = startIndex + 1; i < lines.length; i++) {
    const normalizedLine = lines[i].trim().toLowerCase();

    if (nextSections.includes(normalizedLine)) {
      break;
    }

    if (lines[i].trim()) {
      sectionLines.push(lines[i].trim());
    }
  }

  return sectionLines;
};

const parseSkills = (lines) => {
  const skills = [];

  for (const line of lines) {
    const content = line.includes(":")
      ? line.split(":").slice(1).join(":")
      : line;

    content
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)
      .forEach((skill) => skills.push(skill));
  }

  return [...new Set(skills)];
};

const parseEducation = (lines) => {
  const institutionIndex = lines.findIndex((line) =>
    line.toLowerCase().includes("allenhouse institute"),
  );

  if (institutionIndex === -1) {
    return [];
  }

  const institution = lines[institutionIndex];

  const degreeLine = lines[institutionIndex + 1] || "";

  const yearMatch = degreeLine.match(/(\d{4})\s*[–-]\s*(\d{4})/);

  const degreeText = degreeLine
    .replace(/\d{4}\s*[–-]\s*\d{4}/, "")
    .trim();

  const degreeMatch = degreeText.match(
    /^(Bachelor of Technology|B\.Tech|Bachelor of [^ ]+)/i,
  );

  const degree = degreeMatch
    ? degreeMatch[0]
    : degreeText;

  const fieldOfStudy = degreeText
    .replace(degree, "")
    .trim();

  return [
    {
      institution,
      degree,
      fieldOfStudy,
      startDate: yearMatch ? yearMatch[1] : null,
      endDate: yearMatch ? yearMatch[2] : null,
    },
  ];
};

const parseProjects = (lines) => {
  const projects = [];

  let currentProject = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      continue;
    }

    // Project heading contains "|"
    const isProjectHeading = trimmedLine.includes("|");

    if (isProjectHeading) {
      if (currentProject) {
        currentProject.description =
          currentProject.description.trim();

        projects.push(currentProject);
      }

      const parts = trimmedLine.split("|");

      currentProject = {
        title: parts[0].trim(),
        technologies: parts
          .slice(1)
          .join("|")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        description: "",
      };

      continue;
    }

    if (currentProject) {
      const cleanLine = trimmedLine
        .replace(/^•\s*/, "")
        .replace(/^-\s*/, "")
        .trim();

      if (cleanLine) {
        currentProject.description += `${cleanLine} `;
      }
    }
  }

  if (currentProject) {
    currentProject.description =
      currentProject.description.trim();

    projects.push(currentProject);
  }

  return projects;
};

const parseResume = (text) => {
  const normalizedText = normalizeText(text);

  const nextSections = [
    "education",
    "technical skills",
    "projects",
    "achievements",
    "certifications & virtual experience",
    "relevant coursework",
    "profile summary",
  ];

  const educationLines = getSection(
    normalizedText,
    "education",
    nextSections,
  );

  const skillsLines = getSection(
    normalizedText,
    "technical skills",
    nextSections,
  );

  const projectLines = getSection(
    normalizedText,
    "projects",
    nextSections,
  );

  return {
    skills: parseSkills(skillsLines),
    education: parseEducation(educationLines),
    projects: parseProjects(projectLines),
  };
};

export default parseResume;