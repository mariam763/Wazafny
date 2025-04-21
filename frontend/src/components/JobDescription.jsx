// import React, { useEffect, useState } from "react";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import {
//   Briefcase,
//   MapPin,
//   DollarSign,
//   Calendar,
//   Users,
//   Clock,
// } from "lucide-react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { setSingleJob } from "@/redux/jobSlice";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   APPLICATION_API_END_POINT,
//   JOB_API_END_POINT,
// } from "@/utils/apiEndpoints";
// import { toast } from "sonner";

// const JobDescription = () => {
//   const { singleJob } = useSelector((store) => store.job);
//   const { user } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const params = useParams();
//   const jobId = params.id;

//   const [isApplied, setIsApplied] = useState(false);
//   const [isSaved, setIsSaved] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchSingleJob = async () => {
//       try {
//         const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
//           withCredentials: true,
//         });
//         if (res.data.success) {
//           dispatch(setSingleJob(res.data.job));
//           setIsSaved(res.data.job.savedBy?.includes(user?._id));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchSingleJob();
//   }, [jobId, dispatch, user?._id]);

//   useEffect(() => {
//     setIsApplied(
//       singleJob?.applications?.some(
//         (application) =>
//           application.applicant === user?._id ||
//           application.applicant?._id === user?._id
//       ) || false
//     );
//   }, [singleJob, user]);

//   const applyJobHandler = async () => {
//     if (!user) {
//       toast.error("Please log in to apply for this job.");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const res = await axios.get(
//         `${APPLICATION_API_END_POINT}/apply/${jobId}`,
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         setIsApplied(true);
//         const updatedSingleJob = {
//           ...singleJob,
//           applications: [...singleJob.applications, { applicant: user?._id }],
//         };
//         dispatch(setSingleJob(updatedSingleJob));
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "Failed to apply for job.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto my-10 bg-gradient-to-br from-[#3d005e] to-[#6a0dad] p-8 md:p-12 rounded-3xl shadow-2xl text-white relative overflow-hidden">
//       {/* Title & Badges */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//         <div>
//           <h1 className="text-3xl md:text-4xl font-bold">{singleJob?.title}</h1>
//           <div className="flex flex-wrap items-center gap-3 mt-4">
//             <Badge className="bg-white text-[#3d005e] font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-md text-sm md:text-lg">
//               {singleJob?.position} position left
//             </Badge>
//             <Badge className="bg-[#F83002] text-white font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-md text-sm md:text-lg">
//               {singleJob?.jobType}
//             </Badge>
//             <Badge className="bg-[#7209b7] text-white font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-md text-sm md:text-lg">
//               ${singleJob?.salary}K/Year
//             </Badge>
//           </div>
//         </div>

//         {/* Apply Button */}
//         <div className="flex flex-col md:flex-row gap-4 md:gap-6">
//           <Button
//             onClick={isApplied || isLoading ? null : applyJobHandler}
//             className={
//               isApplied
//                 ? "bg-black text-white border-[#b5b5b5] md:text-lg w-full md:w-auto cursor-not-allowed"
//                 : "bg-white text-[#6a0dad] hover:bg-[#6a0dad] hover:text-white shadow-lg md:text-lg rounded-xl transition-all w-full md:w-auto"
//             }
//             disabled={isApplied || isLoading}
//           >
//             {isApplied
//               ? "Already Applied"
//               : isLoading
//               ? "Applying....."
//               : "Apply Now"}
//           </Button>
//         </div>
//       </div>

//       {/* Job Details */}
//       <div className="mt-8 md:mt-10 border-t border-white/20 pt-6 md:pt-8">
//         <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6">
//           Job Details
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-6 md:gap-x-10 text-base md:text-lg">
//           <div className="flex items-center gap-3 md:gap-4">
//             <Briefcase className="text-white/80 w-5 h-5 md:w-6 md:h-6" />
//             <span className="opacity-90">
//               <strong>Role:</strong> {singleJob?.title}
//             </span>
//           </div>

//           <div className="flex items-center gap-3 md:gap-4">
//             <MapPin className="text-white/80 w-5 h-5 md:w-6 md:h-6" />
//             <span className="opacity-90">
//               <strong>Location:</strong> {singleJob?.location}
//             </span>
//           </div>

//           <div className="flex items-center gap-3 md:gap-4">
//             <Calendar className="text-white/80 w-5 h-5 md:w-6 md:h-6" />
//             <span className="opacity-90">
//               <strong>Experience:</strong> {singleJob?.experienceLevel}
//             </span>
//           </div>

//           <div className="flex items-center gap-3 md:gap-4">
//             <DollarSign className="text-white/80 w-5 h-5 md:w-6 md:h-6" />
//             <span className="opacity-90">
//               <strong>Salary:</strong> ${singleJob?.salary}K
//             </span>
//           </div>

//           <div className="flex items-center gap-3 md:gap-4">
//             <Users className="text-white/80 w-5 h-5 md:w-6 md:h-6" />
//             <span className="opacity-90">
//               <strong>Total Applicants:</strong>{" "}
//               {singleJob?.applications?.length}
//             </span>
//           </div>

//           <div className="flex items-center gap-3 md:gap-4">
//             <Clock className="text-white/80 w-5 h-5 md:w-6 md:h-6" />
//             <span className="opacity-90">
//               <strong>Posted Date:</strong>{" "}
//               {singleJob?.createdAt?.split("T")[0]}
//             </span>
//           </div>
//         </div>

//         {/* Skills */}
//         <div className="my-6 border-t border-white/30 pt-4">
//           <h2 className="text-lg font-semibold">Skills</h2>
//           <div className="flex items-center gap-2 mt-3 flex-wrap">
//             {singleJob?.requirements?.length > 0 ? (
//               singleJob.requirements.map((item, index) => (
//                 <Badge
//                   key={index}
//                   className="bg-white text-[#6a0dad] font-medium px-4 py-1.5 rounded-full shadow-md"
//                 >
//                   {item}
//                 </Badge>
//               ))
//             ) : (
//               <span className="opacity-70 text-sm">NA</span>
//             )}
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mt-6 md:mt-8">
//           <h2 className="text-2xl md:text-3xl font-semibold text-white/90">
//             Description
//           </h2>
//           <p className="opacity-80 text-base md:text-lg mt-3 md:mt-4 leading-relaxed">
//             {singleJob?.description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobDescription;



import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Clock,
} from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/apiEndpoints";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsSaved(res.data.job.savedBy?.includes(user?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  useEffect(() => {
    if (!user) {
      setIsApplied(false); // explicitly reset
    } else {
      setIsApplied(
        singleJob?.applications?.some(
          (application) =>
            application.applicant === user?._id ||
            application.applicant?._id === user?._id
        ) || false
      );
    }
  }, [singleJob, user]);

  const applyJobHandler = async () => {
    if (!user) {
      toast.error("Please log in to apply for this job.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to apply for job.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 bg-gradient-to-br from-[#3d005e] to-[#6a0dad] p-8 md:p-12 rounded-3xl shadow-2xl text-white relative overflow-hidden">
      {/* Title & Badges */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Badge className="bg-white text-[#3d005e] font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-md text-sm md:text-lg">
              {singleJob?.position} position left
            </Badge>
            <Badge className="bg-[#F83002] text-white font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-md text-sm md:text-lg">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-[#7209b7] text-white font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-md text-sm md:text-lg">
              ${singleJob?.salary}K/Year
            </Badge>
          </div>
        </div>

        {/* Apply Button */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <Button
            onClick={isApplied || isLoading ? null : applyJobHandler}
            className={
              isApplied
                ? "bg-black text-white border-[#b5b5b5] md:text-lg w-full md:w-auto cursor-not-allowed"
                : "bg-white text-[#6a0dad] hover:bg-[#6a0dad] hover:text-white shadow-lg md:text-lg rounded-xl transition-all w-full md:w-auto"
            }
            disabled={isApplied || isLoading}
          >
            {isApplied
              ? "Already Applied"
              : isLoading
              ? "Applying....."
              : "Apply Now"}
          </Button>
        </div>
      </div>

      {/* Job Details */}
      <div className="mt-8 md:mt-10 border-t border-white/20 pt-6 md:pt-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6">
          Job Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-6 md:gap-x-10 text-base md:text-lg">
          <div className="flex items-center gap-3 md:gap-4">
            <Briefcase className="text-white/80 w-5 h-5 md:w-6 md:h-6" />
            <span className="opacity-90">
              <strong>Role:</strong> {singleJob?.title}
            </span>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <MapPin className="text-white/80 w-5 h-5 md:w-6 md:h-6" />
            <span className="opacity-90">
              <strong>Location:</strong> {singleJob?.location}
            </span>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <Calendar className="text-white/80 w-5 h-5 md:w-6 md:h-6" />
            <span className="opacity-90">
              <strong>Experience:</strong> {singleJob?.experienceLevel}
            </span>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <DollarSign className="text-white/80 w-5 h-5 md:w-6 md:h-6" />
            <span className="opacity-90">
              <strong>Salary:</strong> ${singleJob?.salary}K
            </span>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <Users className="text-white/80 w-5 h-5 md:w-6 md:h-6" />
            <span className="opacity-90">
              <strong>Total Applicants:</strong>{" "}
              {singleJob?.applications?.length}
            </span>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <Clock className="text-white/80 w-5 h-5 md:w-6 md:h-6" />
            <span className="opacity-90">
              <strong>Posted Date:</strong>{" "}
              {singleJob?.createdAt?.split("T")[0]}
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="my-6 border-t border-white/30 pt-4">
          <h2 className="text-lg font-semibold">Skills</h2>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {singleJob?.requirements?.length > 0 ? (
              singleJob.requirements.map((item, index) => (
                <Badge
                  key={index}
                  className="bg-white text-[#6a0dad] font-medium px-4 py-1.5 rounded-full shadow-md"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="opacity-70 text-sm">NA</span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 md:mt-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-white/90">
            Description
          </h2>
          <p className="opacity-80 text-base md:text-lg mt-3 md:mt-4 leading-relaxed">
            {singleJob?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
