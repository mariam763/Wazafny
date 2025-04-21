import React, { useEffect, useState } from "react";
import Header from "../shared/Header";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/apiEndpoints";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import getCompanyById from "@/hooks/getCompanyById";

const CompanyProfileEdit = () => {
  const params = useParams();
  getCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // If there is no logo (no file uploaded and no existing logo), show a prompt to upload one
    if (!input.file && !singleCompany.file) {
      toast.error("Please upload a logo first.");
      return;
    }

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    // Only append the file if the user uploaded a new one
    if (input.file) {
      formData.append("file", input.file);
    } else if (singleCompany.file) {
      // If there's no new file, but the company already has a file, we can skip appending it
      // The server should use the existing logo without needing a new upload
      // No need to append the file in this case
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/recruiter/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-2xl mx-auto py-12 px-6">
        <form
          onSubmit={submitHandler}
          className="bg-[#2a003f] text-white p-8 rounded-2xl shadow-2xl space-y-6"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">Company Profile</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-white">Company Name</Label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="w-full mt-1 rounded-xl border border-purple-400 bg-transparent text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <Label className="text-white">Description</Label>
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="w-full mt-1 rounded-xl border border-purple-400 bg-transparent text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <Label className="text-white">Website</Label>
              <input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="w-full mt-1 rounded-xl border border-purple-400 bg-transparent text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <Label className="text-white">Location</Label>
              <input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="w-full mt-1 rounded-xl border border-purple-400 bg-transparent text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Display the current logo if it exists */}
            {singleCompany.file && (
              <div className="col-span-1 md:col-span-2">
                <Label className="text-white">Current Logo</Label>
                <img
                  src={singleCompany.file}
                  alt="Logo"
                  className="w-32 h-32 object-contain border-2 border-purple-600 rounded-lg mb-4"
                />
                <p className="text-white text-sm">Current logo</p>
              </div>
            )}

            {/* Only ask for a logo if there is no existing logo */}
            {!singleCompany.file && (
              <div className="col-span-1 md:col-span-2">
                <Label className="text-white">Logo</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="cursor-pointer mt-1 w-full rounded-xl bg-white text-purple-700 file:bg-purple-600 file:text-white file:rounded-lg file:border-0 file:px-4 file:py-2 hover:file:bg-purple-500 transition-all"
                />
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
              Update
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanyProfileEdit;
