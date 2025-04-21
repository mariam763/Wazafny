

import React, { useEffect, useState } from "react";
import Header from "./shared/Header";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector, useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice"; // adjust path as needed
import { motion } from 'framer-motion';
import Footer from "./shared/Footer";
const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [filterJobs, setFilterJobs] = useState(allJobs);

  // **Reset searchedQuery to empty on page load**
  useEffect(() => {
    dispatch(setSearchedQuery(""));
  }, [dispatch]);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          (job.title &&
            job.title.toLowerCase().includes(searchedQuery.toLowerCase())) ||
          (job.description &&
            job.description
              .toLowerCase()
              .includes(searchedQuery.toLowerCase())) ||
          (job.location &&
            job.location.toLowerCase().includes(searchedQuery.toLowerCase())) ||
          (job.industry &&
            job.industry.toLowerCase().includes(searchedQuery.toLowerCase())) ||
       
          (job.jobType &&
            job.jobType.toLowerCase().includes(searchedQuery.toLowerCase()))
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs); // Reset jobs when search query is empty
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Header />
      <div className="max-w-7xl m-5 mx-auto">
        <div className="flex gap-5">
          {/* FilterCard takes 30% */}
          <div className="w-1/4 mt-10">
            <FilterCard />
          </div>

          {/* Jobs Section takes 70% & Stretches Fully */}
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="w-2/4 h-[250vh] overflow-y-auto pb-5 flex-1">
              <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 flex flex-wrap justify-center gap-4">
                {" "}
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
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

export default Jobs;