import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";


const filterData = [
  {
    filterType: "Location",
    array: [
      "New York",
      "San Francisco",
      "Los Angeles",
      "Austin",
      "Seattle",
      "Chicago",
      "Boston",
      "Miami",
      "Dallas",
      "Denver",
      "ggggggg",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Data Scientist",
      "UX/UI Designer",
      "Product Manager",
      "DevOps Engineer",
      "Marketing",
      "Flutter",
    ],
  },
  {
    filterType: "Job Type",
    array: ["Full-time", "Part-time", "Hybrid"],
  },
];

const FilterCard = () => {
 const [selectedValue, setSelectedValue] = useState("");
 const dispatch = useDispatch();
  const [openFilters, setOpenFilters] = useState({});
  const toggleDropdown = (filterType) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

 const changeHandler = (value) => {
   setSelectedValue(value);
 };
 useEffect(() => {
   dispatch(setSearchedQuery(selectedValue));
 }, [selectedValue]);
  return (
    <div className="w-full p-4 rounded-lg shadow-lg bg-gradient-to-br from-[#3d005e] to-[#6a0dad] text-white">
      <h1 className="font-bold text-xl text-center">Filter Jobs</h1>
      <hr className="mt-3 border-white opacity-30" />
      <div></div>
      {filterData.map((data, index) => (
        <div key={index} className="mt-4">
          {/* Toggle Button */}
          <button
            className="w-full flex justify-between items-center font-semibold text-lg p-3 rounded-md bg-white/20 backdrop-blur-md transition-all duration-300 hover:bg-white/30"
            onClick={() => toggleDropdown(data.filterType)}
            aria-expanded={openFilters[data.filterType]}
          >
            {data.filterType}
            {openFilters[data.filterType] ? (
              <ChevronUp size={20} className="text-white" />
            ) : (
              <ChevronDown size={20} className="text-white" />
            )}
          </button>

          {/* Dropdown Content */}
          {openFilters[data.filterType] && (
            <RadioGroup
              value={selectedValue}
              onValueChange={changeHandler}
              className="mt-2 p-3 bg-white/10 rounded-lg backdrop-blur-md transition-opacity duration-300"
            >
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div
                    key={itemId}
                    className="flex items-center space-x-2 my-2"
                  >
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId} className="text-white">
                      {item}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
