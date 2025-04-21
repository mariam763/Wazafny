import { Application } from "../models/appModel.js";
import { Job } from "../models/jobModel.js";
import { sendMail } from "../utils/emailHelper.js";
import { User } from "../models/userModel.js";

// Applying for a job
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res
        .status(400)
        .json({ message: "Job ID is required.", success: false });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job.",
        success: false,
      });
    }

    // Fetch job with company populated
    const job = await Job.findById(jobId).populate("company");

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    // Create application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // Push to job applications
    job.applications.push(newApplication._id);
    await job.save();

    // Get applicant info
    const applicant = await User.findById(userId);

    // Send confirmation email
    if (applicant?.email) {
      await sendMail({
        to: applicant.email,
        subject: "Application Submitted Successfully - Wazafny",
        html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>Hi ${applicant.name || "Applicant"},</h2>
    <p>You have successfully applied for the position of <strong>${
      job.title || "a job"
    }</strong> at <strong>${job.company?.name || "the company"}</strong>.</p>
    <p>We will review your application and get back to you soon.</p>
    <p>Thank you for using <strong>Wazafny</strong>!</p>
    <hr style="margin: 20px 0;" />
    <p>Regards,<br/>The Wazafny Team</p>
  </div>
`,
      });
    }

    return res.status(201).json({
      message: "Job applied successfully. Confirmation email sent.",
      success: true,
    });
  } catch (error) {
    console.log("Apply Job Error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};


// Getting applied jobs for rec
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "No Applications",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// // employers will see how many users have applied
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      succees: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//updatig status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status is required",
        success: false,
      });
    }

    // find the application by applicantion id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    // update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};





