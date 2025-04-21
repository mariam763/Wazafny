import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Clock, DollarSign } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Job = ({ job, matchScore }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gradient-to-br from-[#3d005e] to-[#6a0dad] border border-[#9b00e8] p-4 sm:p-6 rounded-2xl shadow-2xl text-white mt-6 sm:mt-10">
      {/* Company Info */}
      <div className="flex items-center justify-between my-4 ml-">
        <div className="flex items-center gap-3">
          <Button
            className="p-4 border border-white/30 bg-white/10 rounded-full"
            variant="outline"
            size="icon"
          >
            <Avatar>
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>
          <div>
            <h1 className="font-medium text-lg">{job?.company?.name}</h1>
            <p className="text-sm text-white/70">{job?.location}</p>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div>
        <h1 className="font-semibold text-xl">{job?.title}</h1>
        <p className="text-xs bg-white/20 px-2 py-1 rounded-md w-fit text-white/80 m-2">
          Posted {dayjs(job?.createdAt).fromNow()}
        </p>
        <p className="text-sm opacity-90">{job?.description}</p>
      </div>

      {/* Job Type Badges */}
      <div className="flex flex-wrap gap-3 mt-5">
        <Badge className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
          <Briefcase className="w-4 h-4" /> {job?.position} position left
        </Badge>

        <Badge className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
          <Clock className="w-4 h-4" /> {job?.jobType}
        </Badge>

        <Badge className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
          <DollarSign className="w-4 h-4" /> {job?.salary} k/year
        </Badge>
      </div>

      {/* Match Score */}
      {matchScore && (
        <div className="mt-3">
          <span className="text-white font-semibold">
            Match Score: {matchScore}%
          </span>
        </div>
      )}

      {/* Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <div>
          <Button
            onClick={() => navigate(`/description/${job?._id}`)}
            className="lg:w-83 sm:w-64 w-full py-2 bg-gradient-to-r from-[#dc2626] to-[#f43f5e] hover:opacity-80 text-white font-semibold rounded-xl shadow-md"
          >
            View Job
          </Button>
        </div>
      </div>
      
    </div>
  );
};

export default Job;
