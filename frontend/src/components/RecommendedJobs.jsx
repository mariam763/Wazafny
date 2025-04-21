import React, { useEffect, useState } from "react";
import Header from "./shared/Header";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllJobs } from "@/redux/jobSlice";
import { RECOMMENDED_API_END_POINT } from "@/utils/apiEndpoints";
import { motion } from "framer-motion";
import Footer from "./shared/Footer";

const RecommendedJobs = () => {
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        const response = await axios.get(
          `${RECOMMENDED_API_END_POINT}/recommend`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          dispatch(setAllJobs(response.data.jobs));
        } else {
          dispatch(setAllJobs([]));
        }
      } catch (error) {
        console.log(error);
        dispatch(setAllJobs([]));
      } finally {
        // ✅ Hide loading page after data is fetched
        setLoading(false);
      }
    };

    fetchRecommendedJobs();
  }, [dispatch]);

  // 🔄 Show full-screen loading page first
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#1a1a1a] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4" />
          <p className="text-xl">Fetching your recommended jobs...</p>
        </div>
      </div>
    );
  }

  // ✅ Render the actual content after loading
  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto m-5">
        <div className="my-10">
          <h1 className="font-bold text-xl my-10">
            Recommended Jobs ({allJobs.length})
          </h1>

          {allJobs.length <= 0 ? (
            <div className="text-center text-white text-lg mt-10">
              <p className="bg-gradient-to-br from-[#3d005e] to-[#6a0dad] p-4 rounded-xl shadow-lg inline-block">
                🚫 No recommended jobs found based on your resume.
              </p>
            </div>
          ) : (
            <div className="w-full h-[250vh] overflow-y-auto pb-5 flex-1">
              <div className="grid gap-4 lg:grid-cols-3 sm:grid-cols-2">
                {allJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Job job={job} matchScore={job.matchPercentage} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecommendedJobs;
