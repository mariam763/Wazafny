import React, { useEffect, useState } from "react";
import Header from "../shared/Header";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesInfo from "./CompaniesInfo";
import { useNavigate } from "react-router-dom";
import getAllCompanies from "@/hooks/getAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";


const Companies = () => {
  getAllCompanies();
  const [input, setInput] = useState("");
//   const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
const navigate = useNavigate();
  return (
    <div>
      <Header />

      <div className="bg-gradient-to-br from-[#3d005e] to-[#6a0dad] text-black max-w-6xl mx-auto my-10 p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
            className="font-medium bg-white placeholder-purple-500 border border-purple-600 focus:ring-2 focus:ring-purple-500 focus:outline-none px-4 py-2 rounded-md shadow-sm w-full sm:w-80"
          />
          <button
            className="bg-white border-2 border-black text-black hover:bg-purple-700 px-4 py-2 rounded-md shadow-md transition font-medium w-full sm:w-auto cursor-pointer"
            onClick={() => navigate("/recruiter/companies/create")}
          >
            New Company
          </button>
        </div>

        <CompaniesInfo />
      </div>
    </div>
  );
};

export default Companies;

