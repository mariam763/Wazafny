import React, { useEffect, useState } from "react";
import Header from "../shared/Header";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/apiEndpoints";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confpassword: "",
    role: "",
    file: "",
  });
    const { loading, user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
        // console.log(input);
 if (input.password !== input.confpassword) {
   toast.error("Passwords do not match!");
   return;
 }
    const formData = new FormData(); //formdata object
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
      formData.append("confpassword", input.confpassword);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
            dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
      finally {
          dispatch(setLoading(false));
        }
  };
 useEffect(() => {
       if (user) {
         navigate("/");
       }
     }, []);
  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a002b] to-[#290d3a] text-white px-4">
        <div className=" max-w-xxl p-10 rounded-2xl shadow-2xl bg-[#220035] border border-purple-600 transition-transform transform hover:scale-[1.02]">
          <h1 className="text-4xl font-extrabold text-center text-white mb-6">
            Join Wazafny
          </h1>
          <p className="text-center text-gray-300 mb-8">
            Create an account to start your journey.
          </p>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Full Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white font-semibold">Full Name</label>
                <input
                  className="w-full bg-[#2a003d] text-white border border-purple-500 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400"
                  type="text"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  placeholder="Mariam Tarek"
                />
              </div>
              <div>
                <label className="text-white font-semibold">Phone Number</label>
                <input
                  className="w-full bg-[#2a003d] text-white border border-purple-500 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400"
                  type="text"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  placeholder="011143656676"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-white font-semibold">Email</label>
              <input
                className="w-full bg-[#2a003d] text-white border border-purple-500 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400"
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="Mariam@gmail.com"
              />
            </div>

            {/* Password and Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white font-semibold">Password</label>
                <input
                  className="w-full bg-[#2a003d] text-white border border-purple-500 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400"
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="8+ chars, 1 upper, 1 num, 1 symbol"
                />
              </div>
              <div>
                <label className="text-white font-semibold">
                  Confirm Password
                </label>
                <input
                  className="w-full bg-[#2a003d] text-white border border-purple-500 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400"
                  type="password"
                  value={input.confpassword}
                  name="confpassword"
                  onChange={changeEventHandler}
                  placeholder="********"
                />
              </div>
            </div>

            {/* Role Selection + Profile Picture */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-6">
              {/* Radio Buttons */}
              <RadioGroup className="flex items-center gap-6 my-5">
                {/* Job Seeker Option */}
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="job seeker"
                    checked={input.role === "job seeker"}
                    onChange={changeEventHandler}
                    className="w-5 h-5 accent-purple-500 cursor-pointer"
                  />
                  <Label
                    htmlFor="jobSeeker"
                    className="text-white cursor-pointer"
                  >
                    Job Seeker
                  </Label>
                </div>

                {/* Recruiter Option */}
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="w-5 h-5 accent-purple-500 cursor-pointer"
                  />
                  <Label
                    htmlFor="recruiter"
                    className="text-white cursor-pointer"
                  >
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>

              {/* Profile Picture Upload (Now aligned on the same row) */}
              <div className="flex items-center gap-2">
                <label className="text-white font-semibold">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="cursor-pointer file:bg-purple-700 file:text-white file:rounded-md file:px-3 file:py-1 file:border-none hover:file:bg-purple-500 transition-all w-[230px]"
                />
              </div>
            </div>

            {/* Submit Button */}
            {loading ? (
              <Button
                className="w-full bg-purple-700 text-white font-bold"
                disabled
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full py-3 bg-purple-700 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Sign Up
              </Button>
            )}
            <p className="text-center text-gray-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-400 font-semibold hover:text-purple-300 transition-colors duration-300"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Signup;
