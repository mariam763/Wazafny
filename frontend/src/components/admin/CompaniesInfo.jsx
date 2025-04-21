import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Trash, MoreHorizontal, CalendarDays } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/utils/apiEndpoints";
import axios from "axios";
import { toast } from "sonner";
const CompaniesInfo = () => {


const handleDelete = async (companyId) => {
  try {
    const res = await axios.put(
      `${COMPANY_API_END_POINT}/delete/${companyId}`,
      {},
      {
        withCredentials: true,
      }
    );

    if (res?.data?.success) {
      toast.success("Company deleted successfully");
      setFilterCompany((prev) =>
        prev.filter((company) => company._id !== companyId)
      );
    } else {
      toast.error("Failed to delete the company.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Server error. Please try again later.");
  }
};


  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    useEffect(() => {
      const filteredCompany =
        companies.length >= 0 &&
        companies.filter((company) => {
          if (!searchCompanyByText) {
            return true;
          }
          return company?.name
            ?.toLowerCase()
            .includes(searchCompanyByText.toLowerCase());
        });
      setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

  return (
    <div className="space-y-6 text-white">
      <h2 className="text-2xl font-bold text-gray-100">
        Your Registered Companies
      </h2>

      {companies?.length === 0 ? (
        <p className="text-center font-bold text-lg text-black">
          No companies registered yet.
        </p>
      ) : (
        <ul className="flex flex-wrap gap-3 justify-center">
          {filterCompany?.map((company) => (
            <li
              key={company._id}
              className="flex items-center justify-between bg-white text-black rounded-xl px-3 py-2 shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 w-[38%]"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="rounded-full w-9 h-9"
                  />
                </Avatar>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-medium">{company.name}</h3>
                  <p className="text-xs text-gray-600 flex items-center gap-1">
                    <CalendarDays className="w-4 h-4 text-purple-600" />
                    <span>
                      Registered on:{" "}
                      <span className="font-normal">
                        {new Date(company.createdAt).toLocaleDateString()}
                      </span>
                    </span>
                  </p>
                </div>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <button
                    aria-label="Company options"
                    className="p-1 rounded-md hover:bg-purple-100 transition-colors"
                  >
                    <MoreHorizontal className="text-purple-600 w-4 h-4 cursor-pointer" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-36 bg-white text-black rounded-md shadow-md p-2">
                  <div className="flex flex-col">
                    <button
                      onClick={() =>
                        navigate(`/recruiter/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-purple-100 text-sm cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-gray-700" />
                      <span>Edit</span>
                    </button>
                    <div className="h-px bg-gray-200 my-1" />
                    <button
                      onClick={() => {
                        {
                          handleDelete(company._id);
                        }
                      }}
                      className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-red-100 text-sm cursor-pointer"
                    >
                      <Trash className="w-3.5 h-3.5 text-gray-700" />
                      <span>Delete</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompaniesInfo;
