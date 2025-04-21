import axios from "axios";
import pdfParse from "pdf-parse";
import fs from "fs";
import { User } from "../models/userModel.js";
import { Job } from "../models/jobModel.js";
import { JobMatchScore } from "../models/JobMatchScore.js";
import { Application } from "../models/appModel.js";

// Load and normalize skills list
const rawSkills = fs.readFileSync("./skills.json");
const skillsJson = JSON.parse(rawSkills);
const normalizedSkillsList = skillsJson.skills.map((s) => s.toLowerCase());

// Load and normalize job titles
const rawTitles = fs.readFileSync("./Job.json");
const jobTitleJson = JSON.parse(rawTitles);
const knownTitles = jobTitleJson.job_titles.map((t) => t.toLowerCase());

// ----------------- Resume Parsing and Ranking --------------------
export const parseResumeAndRank = async (req, res) => {
  try {
    const { resumeUrl, jobId } = req.body;
    const userId = req.id;

    console.log("🔥 parseResumeAndRank TRIGGERED");
    console.log("resumeUrl:", resumeUrl);
    console.log("jobId:", jobId);
    console.log("userId:", userId);

    if (!resumeUrl || !jobId) {
      return res
        .status(400)
        .json({ message: "Resume URL and jobId are required" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const response = await axios.get(`${resumeUrl}?t=${Date.now()}`, {
      responseType: "arraybuffer",
    });
    const pdfBuffer = response.data;
    const data = await pdfParse(pdfBuffer);
    const resumeText = data.text;

    const extractedSkills = extractSkillsFromResume(resumeText);
    const extractedJobTitle = extractJobTitleFromResume(resumeText);
    const extractedEmail = extractEmail(resumeText);
    const extractedPhone = extractPhoneNumber(resumeText);
    const extractedName = extractName(resumeText);

    console.log("Extracted Skills:", extractedSkills);
    console.log("Extracted Job Titles:", extractedJobTitle);
    console.log("Extracted Name:", extractedName);
    console.log("Resume Text Snippet:", resumeText.substring(0, 300));

    const normalizedResumeData = [...extractedSkills, ...extractedJobTitle].map(
      (item) => item.toLowerCase()
    );
    const jobRequirements = job.requirements.map((r) => r.toLowerCase());
    const jobTitle = job.title.toLowerCase();

    console.log("Normalized Resume Data:", normalizedResumeData);
    console.log("Job Requirements:", jobRequirements);
    console.log("Job Title:", jobTitle);

    const matchedItems = normalizedResumeData.filter(
      (item) => jobRequirements.includes(item) || jobTitle.includes(item)
    );

    const matchedCount = matchedItems.length;
    const totalResumeItems = normalizedResumeData.length;
    const totalJobItems = jobRequirements.length + 1;

    const denominator = (totalResumeItems + totalJobItems) / 2;
    const matchPercentage = (matchedCount / denominator) * 100;
    const score = parseFloat(matchPercentage.toFixed(2));

    console.log("✅ Final Match Score:", score);

    // Calculate the numeric rank based on match percentage
    const rank = getRankFromPercentage(score);

    // Log the rank for debugging
    console.log(`Rank (numeric): ${rank}`);

    // Update the match score and rank in JobMatchScore (store rank as number)
    await JobMatchScore.findOneAndUpdate(
      { user: userId, job: job._id },
      { matchPercentage: score, rank },
      { upsert: true, new: true }
    );

    await User.findByIdAndUpdate(userId, {
      "profile.parsedResume": {
        name: extractedName,
        email: extractedEmail,
        phone: extractedPhone,
        skills: extractedSkills,
        titles: extractedJobTitle,
      },
    });

    // Translate rank to label for response
    const rankLabel = translateRankToLabel(rank);

    // Log the rank label for response
    console.log(`Rank Label: ${rankLabel}`);

    return res.status(200).json({
      success: true,
      matchPercentage: score,
      rank: rankLabel,
      extractedName,
      extractedEmail,
      extractedPhone,
      extractedSkills,
      extractedJobTitle,
    });
  } catch (error) {
    console.error("❌ Error parsing resume:", error);
    return res.status(500).json({
      message: "Error parsing resume",
      error: error.message,
    });
  }
};

// ----------------- Extraction Functions --------------------

function extractSkillsFromResume(resumeText) {
  const skills = [];
  normalizedSkillsList.forEach((skill) => {
    if (resumeText.toLowerCase().includes(skill)) {
      skills.push(skill);
    }
  });
  return skills;
}

function extractJobTitleFromResume(resumeText) {
  const jobTitles = [];
  knownTitles.forEach((title) => {
    if (resumeText.toLowerCase().includes(title)) {
      jobTitles.push(title);
    }
  });
  return jobTitles;
}

function extractEmail(resumeText) {
  const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const match = resumeText.match(emailRegex);
  return match ? match[0] : null;
}

function extractPhoneNumber(resumeText) {
  const phoneRegex =
    /(\+?\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}/;
  const match = resumeText.match(phoneRegex);
  return match ? match[0] : null;
}

function extractName(resumeText) {
  const nameRegex = /([A-Z][a-z]+(?:[-\s][A-Z][a-z]+)*)/g;
  const matches = resumeText.match(nameRegex);
  if (matches && matches.length > 0) {
    return matches[0];
  } else {
    return "Unknown";
  }
}

// ----------------- Applicant Ranking --------------------

export const getRankedApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    console.log("🟪 Getting ranked applicants for job:", jobId);

    const applications = await Application.find({ job: jobId })
      .populate("applicant")
      .sort({ createdAt: -1 });

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "No applicants found for this job.",
        success: false,
      });
    }

    const allApplicants = [];

    for (const app of applications) {
      const match = await JobMatchScore.findOne({
        user: app.applicant._id,
        job: jobId,
      });

      const matchPercentage = match ? match.matchPercentage : 0;
      const rank = match
        ? translateRankToLabel(getRankFromPercentage(matchPercentage))
        : "Not Parsed";

      allApplicants.push({
        user: {
          id: app.applicant._id,
          name: app.applicant.fullname,
          email: app.applicant.email,
        },
        matchPercentage,
        rank,
      });
    }

    res.status(200).json({ success: true, applicants: allApplicants });
  } catch (err) {
    console.error("❌ Error fetching ranked applicants:", err);
    res.status(500).json({
      message: "Error fetching ranked applicants",
      error: err.message,
    });
  }
};

// Helper functions for rank calculation

function getRankFromPercentage(percentage) {
  if (percentage < 50) return 1;
  if (percentage <= 75) return 2;
  return 3;
}

function translateRankToLabel(rank) {
  switch (rank) {
    case 1:
      return "Bad Match";
    case 2:
      return "Good Match";
    case 3:
      return "Very Good Match";
    default:
      return "Unknown Rank";
  }
}
