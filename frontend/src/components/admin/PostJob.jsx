import React, { useState } from "react";
import Header from "../shared/Header";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/apiEndpoints";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// const companyArray = [];

const PostJob = () => {
   const [input, setInput] = useState({
     title: "",
     description: "",
     requirements: "",
     salary: "",
     location: "",
     jobType: "",
     experience: "",
     position: 0,
     companyId: "",
   });
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const { companies } = useSelector((store) => store.company);
   const changeEventHandler = (e) => {
     setInput({ ...input, [e.target.name]: e.target.value });
   };

   const selectChangeHandler = (value) => {
     const selectedCompany = companies.find(
       (company) => company.name.toLowerCase() === value
     );
     setInput({ ...input, companyId: selectedCompany._id });
   };

   const submitHandler = async (e) => {
     e.preventDefault();
     try {
       setLoading(true);
       const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
         headers: {
           "Content-Type": "application/json",
         },
         withCredentials: true,
       });
       if (res.data.success) {
         toast.success(res.data.message);
         navigate("/recruiter/jobs");
       }
     } catch (error) {
       toast.error(error.response.data.message);
     } finally {
       setLoading(false);
     }
   };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex items-center justify-center w-screen px-4 my-10">
        <form
          onSubmit={submitHandler}
          className="bg-[#2a003f] text-white p-10 w-full max-w-6xl rounded-2xl shadow-2xl space-y-8"
        >
          <h1 className="text-3xl font-bold text-center">Post a Job</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Label className="text-white">Job Title</Label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="mt-2 w-full rounded-xl border border-purple-400 bg-transparent text-white px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <Label className="text-white">Description</Label>
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="mt-2 w-full rounded-xl border border-purple-400 bg-transparent text-white px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <Label className="text-white">Skills</Label>
              <input
                type="text"
                name="requirements"
                placeholder="Enter skills separated by commas. Ex: react,java,python"
                value={input.requirements}
                onChange={changeEventHandler}
                className="mt-2 w-full rounded-xl border border-purple-400 bg-transparent text-white px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <Label className="text-white">Salary</Label>
              <input
                type="number"
                placeholder="Salary per year"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="mt-2 w-full rounded-xl border border-purple-400 bg-transparent text-white px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <Label className="text-white">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="mt-2 w-full rounded-xl border border-purple-400 bg-transparent text-white px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <select
              name="jobType"
              value={input.jobType}
              onChange={changeEventHandler}
              className="mt-2 w-full rounded-xl border border-purple-400 bg-[#2a003f] text-white px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="" className="bg-[#2a003f] text-white">
                Select Job Type
              </option>
              <option value="Full-time" className="bg-[#2a003f] text-white">
                Full-time
              </option>
              <option value="Part-time" className="bg-[#2a003f] text-white">
                Part-time
              </option>
              <option value="Hybrid" className="bg-[#2a003f] text-white">
                Hybrid
              </option>
            </select>

            <div>
              <Label className="text-white">Experience Level</Label>
              <Input
                type="number"
                placeholder="in years"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="mt-2 w-full rounded-xl border border-purple-400 bg-transparent text-white px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <Label className="text-white">No of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="mt-2 w-full rounded-xl border border-purple-400 bg-transparent text-white px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {companies.length > 0 && (
              <div className="md:col-span-2">
                <Label className="text-white">Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="mt-2 w-full rounded-xl border border-purple-400  text-white px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <SelectValue
                      className="text-white"
                      placeholder="Select a Company"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a003f] text-white border border-purple-400 rounded-xl">
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company?.name?.toLowerCase()}
                          className="bg-[#2a003f] cursor-pointer hover:bg-purple-600 transition-all"
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {loading ? (
            <button
              className="w-full flex items-center justify-center bg-purple-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </button>
          ) : (
            <button
              type="submit"
              className="cursor-pointer w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105"
            >
              Post New Job
            </button>
          )}

          {companies.length === 0 && (
            <p className="text-xs text-red-400 font-bold text-center mt-4">
              *Please register a company first, before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;




