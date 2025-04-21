import React, { useState } from "react";
import Header from "../shared/Header";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/apiEndpoints";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CreateCompany = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();


  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/recruiter/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
        <div className="bg-gradient-to-br from-[#3d005e] to-[#6a0dad] rounded-3xl shadow-2xl w-full max-w-5xl p-12 md:p-16 text-white">
          <div className="mb-10">
            <h1 className="font-extrabold text-4xl">
              Let’s Get Your Company Setup
            </h1>
            <p className="text-purple-200 mt-3 text-base md:text-lg">
              Give your company a professional name. This helps job seekers
              recognize your brand.
            </p>
          </div>

          <div className="mb-8">
            <Label className="text-white text-lg">Company Name</Label>
            <input
              type="text"
              className="mt-3 p-4 w-full rounded-xl bg-white text-[#3d005e] placeholder-gray-400 text-lg focus:ring-4 focus:ring-white outline-none"
              placeholder="Enter your company name here"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-4 mt-10">
            <button
              className="px-6 py-3 rounded-xl border-2 border-white text-white hover:bg-white/10 transition duration-200 cursor-pointer"
              onClick={() => navigate("/recruiter/companies")}
            >
              Cancel
            </button>
            <button
              className="px-6 py-3 rounded-xl bg-white text-[#3d005e] font-semibold hover:bg-purple-100 transition duration-200 cursor-pointer"
              onClick={registerNewCompany}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
