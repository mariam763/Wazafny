import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const JobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="relative p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg 
      hover:shadow-purple-500/40 transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
    >
      {/* Glowing Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#6A38C2]/40 to-[#F83002]/30 opacity-0 transition-all duration-300 hover:opacity-100 blur-xl"></div>

      {/* Company Name & Location */}
      <div>
        <h1 className="font-semibold text-lg text-white">
          {job?.company?.name}
        </h1>
        <p className="text-sm text-gray-300">📍 {job?.location}</p>
      </div>

      {/* Job Title & Description */}
      <div className="mt-4">
        <h1 className="font-bold text-xl text-[#F83002]">🔥 {job?.title}</h1>
        <p className="text-sm text-gray-300 mt-2 leading-relaxed">
          {job?.description}
        </p>
      </div>

      {/* Job Badges */}
      <div className="flex items-center gap-3 mt-5 flex-wrap">
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full">
          {job?.jobType}
        </Badge>
        <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1 rounded-full">
          {job?.position} positions left
        </Badge>
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full">
          ${job?.salary} k/Year
        </Badge>
      </div>
    </div>
  );
};

export default JobCards;
