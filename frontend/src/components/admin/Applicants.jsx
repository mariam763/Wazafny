import React, { useEffect } from "react";
import Header from "../shared/Header";
import ApplicantsInfo from "./ApplicantsInfo";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/apiEndpoints";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        //  console.log(res.data);
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants: {applicants?.applications?.length}
        </h1>
        <ApplicantsInfo />
      </div>
    </div>
  );
};

export default Applicants;
