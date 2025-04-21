import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="flex flex-col items-center text-center my-16 px-6">
      {/* Title Section */}
      <h1 className="text-5xl font-extrabold leading-tight">
        Your Next{" "}
        <span className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-transparent bg-clip-text">
          Career Move
        </span>{" "}
        Starts Here!
      </h1>
      <p className="text-gray-600 mt-3 max-w-2xl">
        Discover thousands of job opportunities from top companies. Let our
        intelligent job-matching system connect you with the perfect
        opportunities effortlessly.
      </p>

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-xl bg-white shadow-md border border-gray-200 rounded-lg mt-6 p-2">
        <Search className="h-6 w-6 text-gray-500 ml-3" />
        <input
          type="text"
          placeholder="Search jobs, companies, or industries..."
            onChange={(e) => setQuery(e.target.value)}
          className="flex-1 outline-none border-none px-3 text-gray-900 placeholder-gray-500 bg-transparent"
        />
        <Button
            onClick={searchJobHandler}
          className="bg-[#6A38C2] hover:bg-[#4B0082] text-white px-5 py-2 rounded-lg"
        >
          Search
        </Button>
      </div>

      {/* Job Market Insights */}
      <div className="flex flex-wrap justify-center gap-6 mt-8 text-gray-800">
        <div className="bg-white px-8 py-4 rounded-xl shadow-lg border border-gray-200 transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] text-transparent bg-clip-text">
            150K+
          </h2>
          <p className="text-sm font-medium text-gray-600">
            Active Job Listings
          </p>
        </div>

        <div className="bg-white px-8 py-4 rounded-xl shadow-lg border border-gray-200 transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#F83002] to-[#FF5733] text-transparent bg-clip-text">
            75K+
          </h2>
          <p className="text-sm font-medium text-gray-600">
            Top Companies Hiring
          </p>
        </div>

        <div className="bg-white px-8 py-4 rounded-xl shadow-lg border border-gray-200 transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] text-transparent bg-clip-text">
            1M+
          </h2>
          <p className="text-sm font-medium text-gray-600">
            Job Seekers Connected
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
