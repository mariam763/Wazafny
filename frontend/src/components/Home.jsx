import React, { useEffect } from "react";
import Header from "./shared/Header";
import SearchSection from "./SearchSection";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import getAllJobs from "@/hooks/getAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
    getAllJobs();
    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    useEffect(() => {
      if (user?.role === "recruiter") {
        navigate("/recruiter/companies");
      }
    }, []);
  return (
    <div>
      <Header />
      <SearchSection />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
