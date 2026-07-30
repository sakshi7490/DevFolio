const allowedProfileFields = [
  "name",
  "headline",
  "bio",
  "location",
  "phone",
  "website",
  "profileImage",
  "socialLinks",
];

const validateProfileUpdate = (req, res, next) => {
  const submittedFields = Object.keys(req.body);

  const invalidFields = submittedFields.filter(
    (field) => !allowedProfileFields.includes(field)
  );

  if (invalidFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `These fields cannot be updated: ${invalidFields.join(", ")}`,
    });
  }

  const {
    name,
    headline,
    bio,
    location,
    phone,
    website,
    profileImage,
    socialLinks,
  } = req.body;

  const errors = [];

  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length < 2) {
      errors.push("Name must contain at least 2 characters");
    }

    if (name.trim().length > 50) {
      errors.push("Name cannot exceed 50 characters");
    }
  }

  if (headline !== undefined && headline.length > 100) {
    errors.push("Headline cannot exceed 100 characters");
  }

  if (bio !== undefined && bio.length > 500) {
    errors.push("Bio cannot exceed 500 characters");
  }

  if (location !== undefined && location.length > 100) {
    errors.push("Location cannot exceed 100 characters");
  }

  if (
    phone !== undefined &&
    phone !== "" &&
    !/^[0-9+\-\s()]{7,20}$/.test(phone)
  ) {
    errors.push("Please provide a valid phone number");
  }

  const isValidUrl = (value) => {
    if (!value) return true;

    try {
      const parsedUrl = new URL(value);
      return ["http:", "https:"].includes(parsedUrl.protocol);
    } catch {
      return false;
    }
  };

  if (website !== undefined && !isValidUrl(website)) {
    errors.push("Website must be a valid HTTP or HTTPS URL");
  }

  if (profileImage !== undefined && !isValidUrl(profileImage)) {
    errors.push("Profile image must be a valid HTTP or HTTPS URL");
  }

  if (socialLinks !== undefined) {
    if (
      typeof socialLinks !== "object" ||
      socialLinks === null ||
      Array.isArray(socialLinks)
    ) {
      errors.push("Social links must be an object");
    } else {
      const allowedSocialLinks = ["github", "linkedin", "twitter"];

      const invalidSocialLinks = Object.keys(socialLinks).filter(
        (platform) => !allowedSocialLinks.includes(platform)
      );

      if (invalidSocialLinks.length > 0) {
        errors.push(
          `Unsupported social links: ${invalidSocialLinks.join(", ")}`
        );
      }

      Object.entries(socialLinks).forEach(([platform, url]) => {
        if (url && !isValidUrl(url)) {
          errors.push(`${platform} link must be a valid URL`);
        }
      });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Profile validation failed",
      errors,
    });
  }

  next();
};

module.exports = {
  validateProfileUpdate,
};