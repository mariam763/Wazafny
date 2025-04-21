import React, { useEffect } from "react";
import Header from "./shared/Header";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import getAllJobs from "@/hooks/getAllJobs";
import { motion } from "framer-motion";
import Footer from "./shared/Footer";
const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Browse = () => {
  getAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({allJobs.length})
        </h1>
        <div className="grid gap-4 lg:grid-cols-3 sm:grid-cols-2">
          {allJobs.map((job) => {
            return (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Job key={job._id} job={job} />
              </motion.div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
