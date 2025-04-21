import React from "react";

import { LogOut, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "/logo.png"; // ✅ Ensure this is inside `public/`
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/apiEndpoints";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";


import { setSearchedQuery } from "@/redux/jobSlice"; // ✅ Make sure the path is correct


const Header = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#1a002b] to-[#290d3a] text-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-30">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <img
            src={logo}
            alt="logo"
            className="w-[125px] h-[125px] p-2 object-contain"
          />
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/recruiter/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/recruiter/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="text-white hover:underline" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      dispatch(setSearchedQuery(""));
                      navigate("/browse");
                    }}
                    className="text-white hover:underline cursor-pointer"
                  >
                    Browse
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      dispatch(setSearchedQuery(""));
                      
                      navigate(user ? "/jobs" : "/login");
                    }}
                    className="text-white hover:underline cursor-pointer"
                  >
                    Filtered Jobs
                  </button>
                </li>

                <li>
                  <Link
                    className="text-white hover:underline"
                    to={user ? "/recommended" : "/login"}
                  >
                    For you
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex gap-4">
              <Link to="/login">
                <Button className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white hover:scale-105 px-6 py-2 rounded-lg">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white hover:scale-105 px-6 py-2 rounded-lg">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-[#1a0329] border border-[#6a0dad] shadow-lg rounded-xl p-4 text-white">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="cursor-pointer w-12 h-12 border-2 border-[#6a0dad]">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <h4 className="font-semibold text-lg mt-3">
                    {user?.fullname}
                  </h4>
                  <p className="text-sm text-white/70">{user?.profile?.bio}</p>

                  <div className="w-full border-t border-[#6a0dad] my-3"></div>

                  <div className="w-full flex flex-col gap-3">
                    {user && user.role === "job seeker" && (
                      <Button
                        variant="link"
                        className="w-full border-[#6a0dad] text-white hover:bg-[#6a0dad]/20"
                      >
                        <UserCircle className="mr-2" />{" "}
                        <Link to="/profile">My Profile</Link>
                      </Button>
                    )}
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="w-full border-[#6a0dad] text-white hover:bg-[#6a0dad]/20"
                    >
                      <LogOut className="mr-2" /> Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
