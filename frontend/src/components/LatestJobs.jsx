import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";
 
const randomJobs = Array(9).fill({}); // Placeholder for job data

const LatestJobs = () => {
const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="bg-gradient-to-r from-[#2c013d] via-[#120116] to-[#2c013d] text-white py-16 px-6">
      <h1 className="text-5xl font-extrabold text-center mb-10 tracking-wide">
        <span className="text-[#6A38C2]"> Find </span> Your Dream Job Today
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {allJobs.length <= 0 ? (
           <span>No Job Available</span>
        ) : (
            allJobs
            ?.slice(0, 6)
             .map((job) => <JobCards key={job._id} job={job} />)
         )}
      </div>
    </div>
  );
};
 
export default LatestJobs;
