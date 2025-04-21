import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, CheckCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/apiEndpoints";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsInfo = () => {
  const { applicants } = useSelector((store) => store.application);
  const [parsedResumes, setParsedResumes] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const [rankedApplicants, setRankedApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch ranked applicants when applicants data is available
  useEffect(() => {
    if (applicants && applicants.applications) {
      fetchRankedApplicants();
    }
  }, [applicants]);

  const fetchRankedApplicants = async () => {
    try {
      const jobId = applicants?.applications[0]?.job;
      console.log("Job ID:", jobId);

      if (!jobId) {
        toast.error("Job ID is missing.");
        return;
      }

      setLoading(true); // Set loading state when fetching
      const response = await axios.get(
        `${APPLICATION_API_END_POINT}/${jobId}/ranked-applicants`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setRankedApplicants(response.data.applicants);
      } else {
        toast.error("Failed to fetch ranked applicants.");
      }
    } catch (error) {
      console.error("Error fetching ranked applicants:", error);
      toast.error("Error fetching ranked applicants.");
    } finally {
      setLoading(false); // Reset loading state after fetch
    }
  };

  // Update application status
  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  // Parse resume
  const parseResume = async (resumeUrl, jobId, applicantId) => {
    setLoadingId(applicantId);
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/parse-resume`,
        { resumeUrl, jobId },
        { withCredentials: true }
      );
      if (res.data.success) {
        setParsedResumes((prev) => ({ ...prev, [applicantId]: res.data }));
      } else {
        toast.error("Failed to parse resume.");
      }
    } catch (error) {
      console.error("Error parsing resume:", error);
      toast.error(error.response?.data?.message || "Error parsing resume");
    } finally {
      setLoadingId(null);
    }
  };

  // Render applicant's rank if available
  const renderApplicantRank = (applicantId) => {
    const applicantRank = rankedApplicants.find(
      (ranked) => ranked.user.id === applicantId
    )?.rank;

    return applicantRank ? (
      <div className="text-center text-lg font-semibold mt-4">
        Rank: {applicantRank}
      </div>
    ) : (
      <div className="text-center text-lg font-semibold mt-4">Rank: </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        <div>Loading...</div> // Handle loading state
      ) : (
        applicants?.applications?.map((item) => {
          // Extract rank for the current applicant
          const applicantRank = rankedApplicants.find(
            (ranked) => ranked.user.id === item.applicant._id
          )?.rank;

          return (
            <div
              key={item._id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-[1.02]"
            >
              <div className="bg-gradient-to-br from-[#3d005e] to-[#6a0dad] text-white px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Name: {item?.applicant?.fullname || ""}
                    </h3>
                    <p className="text-sm">{item?.applicant?.email || ""}</p>
                  </div>
                  <div className="ml-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="p-2 hover:bg-white/20 rounded-full transition cursor-pointer">
                          <MoreHorizontal className="w-5 h-5 text-white" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {shortlistingStatus.map((status, index) => (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer my-1 transition-all ${
                              status === "Accepted"
                                ? "hover:bg-green-200"
                                : "hover:bg-red-200"
                            }`}
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-gray-700" />
                            <span>{status}</span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="p-4 text-sm text-gray-800 space-y-2">
                <p>
                  <strong>Contact:</strong> {item?.applicant?.phoneNumber || ""}
                </p>
                <p>
                  <strong>Resume:</strong>{" "}
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 underline"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    ""
                  )}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {item?.applicant?.createdAt
                    ? item?.applicant?.createdAt.split("T")[0]
                    : ""}
                </p>
                <button
                  className="mt-2 bg-gradient-to-br from-[#3d005e] to-[#6a0dad] text-white px-4 py-2 rounded-xl shadow-md hover:opacity-90 transition flex items-center justify-center gap-2 min-w-[130px]"
                  onClick={() =>
                    parseResume(
                      item.applicant?.profile?.resume,
                      item.job,
                      item._id
                    )
                  }
                  disabled={loadingId === item._id}
                >
                  {loadingId === item._id ? (
                    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
                  ) : (
                    "Parse Resume"
                  )}
                </button>
              </div>

              {parsedResumes[item._id] &&
                parsedResumes[item._id].extractedName && (
                  <div className="w-full flex justify-center mt-4">
                    <div className="bg-gradient-to-br from-[#3d005e] to-[#6a0dad] text-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                      <h3 className="font-semibold text-xl mb-4 text-center">
                        Parsed Resume Info
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Name:</strong>{" "}
                          {parsedResumes[item._id].extractedName || ""}
                        </p>
                        <p>
                          <strong>Email:</strong>{" "}
                          {parsedResumes[item._id].extractedEmail || ""}
                        </p>
                        <p>
                          <strong>Phone:</strong>{" "}
                          {parsedResumes[item._id].extractedPhone || ""}
                        </p>

                        <div className="my-4 border-t border-white/30 pt-3">
                          <h2 className="text-base font-semibold">Skills</h2>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            {parsedResumes[item._id].extractedSkills?.length
                              ? parsedResumes[item._id].extractedSkills.map(
                                  (skill, index) => (
                                    <span
                                      key={index}
                                      className="bg-white text-[#6a0dad] font-medium px-4 py-1.5 rounded-full shadow-md text-sm"
                                    >
                                      {skill}
                                    </span>
                                  )
                                )
                              : ""}
                          </div>
                        </div>

                        <p>
                          <strong>Job Titles:</strong>{" "}
                          {parsedResumes[item._id].extractedJobTitle?.length
                            ? parsedResumes[item._id].extractedJobTitle.join(
                                ", "
                              )
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              {/* Display Rank */}
              {renderApplicantRank(item.applicant._id)}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ApplicantsInfo;






