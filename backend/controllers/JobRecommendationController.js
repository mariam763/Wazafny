import axios from "axios";
import pdfParse from "pdf-parse";
import { Job } from "../models/jobModel.js";
import { User } from "../models/userModel.js";
import { JobMatchScore } from "../models/JobMatchScore.js";
import nlp from "compromise";
import fs from "fs";

// Load normalized skill list from JSON
const rawSkills = fs.readFileSync("./skills.json");
const skillsJson = JSON.parse(rawSkills);
const normalizedSkillsList = skillsJson.skills.map((s) => s.toLowerCase());

// Load normalized job titles from JSON
const rawTitles = fs.readFileSync("./Job.json");
const jobTitleJson = JSON.parse(rawTitles);
const knownTitles = jobTitleJson.job_titles.map((t) => t.toLowerCase());

export const recommendJobs = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);

    if (!user || !user.profile.resume) {
      return res.status(400).json({ message: "No resume found" });
    }

    const pdfUrl = user.profile.resume;

    const response = await axios.get(`${pdfUrl}?t=${Date.now()}`, {
      responseType: "arraybuffer",
    });

    const pdfBuffer = response.data;
    const data = await pdfParse(pdfBuffer);
    const resumeText = data.text;

    const skills = extractSkillsFromResume(resumeText);
    console.log("Extracted Skills:", skills);

    const titles = extractJobTitleFromResume(resumeText);
    console.log("Extracted Titles:", titles);

    const normalizedSkillsAndTitles = [...skills, ...titles].map((s) =>
      s.toLowerCase()
    );
    console.log("Normalized Skills and Titles:", normalizedSkillsAndTitles);

    const allJobs = await Job.find()
      .populate("company")
      .sort({ createdAt: -1 });

    const matchedJobs = await Promise.all(
      allJobs.map(async (job) => {
        const jobRequirements = job.requirements.map((r) => r.toLowerCase());
        const jobTitle = job.title.toLowerCase();

        const matchedSkillsAndTitles = normalizedSkillsAndTitles.filter(
          (item) => jobRequirements.includes(item) || jobTitle.includes(item)
        );

        const matchedCount = matchedSkillsAndTitles.length;
        const totalResumeItems = normalizedSkillsAndTitles.length;
        const totalJobItems = jobRequirements.length + 1; // +1 for title

        //  New Hybrid Scoring Logic (Weighted)
        const resumeToJob = matchedCount / totalJobItems;
        const jobToResume = matchedCount / totalResumeItems;
        const hybridScore = resumeToJob * 0.7 + jobToResume * 0.3;
        const matchPercentage = parseFloat((hybridScore * 100).toFixed(2));

        console.log(
          ` Job Title: ${job.title}, Match Percentage: ${matchPercentage}%`
        );

        await JobMatchScore.findOneAndUpdate(
          { user: userId, job: job._id },
          { matchPercentage },
          { upsert: true, new: true }
        );

        return {
          ...job.toObject(),
          matchPercentage,
        };
      })
    );

    const filteredMatchedJobs = matchedJobs.filter(
      (job) => job.matchPercentage > 0
    );

    console.log(" Matched Jobs:", filteredMatchedJobs);

    if (filteredMatchedJobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No recommended jobs found.", success: false });
    }

    return res.status(200).json({ jobs: filteredMatchedJobs, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching recommended jobs.",
      error: error.message,
    });
  }
};

// 🔍 Extract skills from resume text
const extractSkillsFromResume = (resumeText) => {
  const cleanText = resumeText
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\n\r]/g, " ");

  const matchedSkills = normalizedSkillsList.filter((skill) =>
    cleanText.includes(skill)
  );

  return [...new Set(matchedSkills)];
};

//  Extract job titles from resume text
const extractJobTitleFromResume = (resumeText) => {
  const doc = nlp(resumeText);
  const titles = doc.match("#Title+").out("array");

  const lowerText = resumeText.toLowerCase();
  const guessedTitles = knownTitles.filter((title) =>
    lowerText.includes(title)
  );

  return [
    ...new Set([...titles.map((t) => t.toLowerCase()), ...guessedTitles]),
  ];
};
