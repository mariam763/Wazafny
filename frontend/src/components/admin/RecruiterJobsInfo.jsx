import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  CalendarDays,
  Briefcase,
  Edit2,
  Trash,
  MoreHorizontal,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JOB_API_END_POINT } from "@/utils/apiEndpoints";
import axios from "axios";
import { toast } from "sonner";

const RecruiterJobsInfo = () => {


const handleDelete = async (jobId) => {
  try {
    const res = await axios.put(
      `${JOB_API_END_POINT}/delete/${jobId}`,
      {},
      {
        withCredentials: true,
      }
    );
    if (res?.data?.success) {
      toast.success("Job deleted successfully");
      setFilterJobs((prev) =>
        prev.filter((job) => job._id !== jobId)
      );
    } else {
      toast.error("Failed to delete the Job.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Server error. Please try again later.");
  }
};


const { allRecruiterJobs, searchJobByText } = useSelector((store) => store.job);
const [filterJobs, setFilterJobs] = useState(allRecruiterJobs);
const navigate = useNavigate();

useEffect(() => {
  console.log("called");
  const filteredJobs = allRecruiterJobs.filter((job) => {
    if (!searchJobByText) {
      return true;
    }
    return (
      job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
      job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
    );
  });
  setFilterJobs(filteredJobs);
}, [allRecruiterJobs, searchJobByText]);

  return (
    <div className="space-y-6 text-white">
      <h2 className="text-2xl font-bold text-gray-100">Your Registered Jobs</h2>

      {filterJobs?.length === 0 ? (
        <p className="text-center font-bold text-lg text-black">
          No jobs registered yet.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterJobs.map((job) => (
            <li
              key={job._id}
              className="relative bg-white text-black rounded-2xl p-5 shadow-md hover:shadow-lg transition duration-200 transform hover:scale-[1.02] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-semibold ">
                  Company:{" "}
                  <span className="text-purple-700">{job?.company?.name}</span>
                </h3>

                <div className="flex items-center text-sm text-gray-700 gap-2">
                  <Briefcase className="w-4 h-4 text-purple-600" />
                  <span>Role: {job?.title}</span>
                </div>

                <div className="flex items-center text-sm text-gray-700 gap-2">
                  <CalendarDays className="w-4 h-4 text-purple-600" />
                  <span>
                    Date: {new Date(job?.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Options Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    aria-label="Options"
                    className="absolute top-3 right-3 p-1 rounded hover:bg-purple-100 transition"
                  >
                    <MoreHorizontal className="text-purple-600 w-4 h-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-36 bg-white text-black rounded-md shadow-md p-2">
                  <div className="flex flex-col">
                    <button
                      onClick={() =>
                        navigate(`/recruiter/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-purple-100 text-sm cursor-pointer"
                    >
                      <Users className="w-3.5 h-3.5 text-gray-700" />
                      <span>Applicants</span>
                    </button>
                    <div className="h-px bg-gray-200 my-1" />
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-red-100 text-sm cursor-pointer"
                    >
                      <Trash className="w-3.5 h-3.5 text-gray-700" />
                      <span>Delete</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecruiterJobsInfo;
