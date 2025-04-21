import React, { useEffect, useState } from "react";
import Header from "../shared/Header";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/apiEndpoints";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading , user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
    const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
   const submitHandler = async (e) => {
     e.preventDefault();
     try {
       dispatch(setLoading(true));
       const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
         headers: {
           "Content-Type": "application/json",
         },
         withCredentials: true,
       });
    //    console.log(res.data.success);
       if (res.data.success) {
         dispatch(setUser(res.data.user));
         navigate("/");
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a002b] to-[#290d3a] text-white px-6">
        <div className="w-full max-w-lg p-10 rounded-2xl shadow-2xl bg-[#220035] border border-purple-600 transition-transform transform hover:scale-[1.02]">
          <h1 className="text-4xl font-extrabold text-center text-white mb-8">
            Login
          </h1>

          <form onSubmit={submitHandler} className="space-y-8">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-white font-semibold">Email</label>
              <input
                className="w-full bg-[#2a003d] text-white border border-purple-500 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="Mariam@gmail.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-white font-semibold">Password</label>
              <input
                className="w-full bg-[#2a003d] text-white border border-purple-500 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="********"
              />
            </div>

            {/* Role Selection (Balanced & Centered) */}
            <RadioGroup className="flex justify-center gap-8 my-5">
              {/* Job Seeker Option */}
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="jobSeeker"
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
                  id="recruiter"
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
                Login
              </Button>
            )}

            {/* Signup Redirect */}
            <p className="text-center text-gray-300">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-400 font-semibold hover:text-purple-300 transition-colors duration-300"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login