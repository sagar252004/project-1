import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    key: "location", // Location filter
    array: ["Delhi NCR", "Bengaluru", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Job Title", // Changed to Job Title to match your context
    key: "title", // Job title filter
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Data science",
      "Graphic Designer",
    ],
  },
];

const FilterCard = ({ filters, setFilters }) => {
  const changeHandler = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="w-full bg-white p-6 rounded-md shadow-md max-w-md mx-auto sm:w-11/12">
      <h1 className="font-bold text-xl text-gray-800">Filter Jobs</h1>
      <hr className="my-4 border-gray-300" />
      {filterData.map((data, index) => (
        <div key={index} className="mb-6">
          <h2 className="font-semibold text-lg text-gray-700 mb-3">
            {data.filterType}
          </h2>
          <RadioGroup
            value={filters[data.key]} // Ensuring that the value is tied to filters state
            onValueChange={(value) => changeHandler(data.key, value)} // Update state on selection change
          >
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={idx} className="flex items-center space-x-3 my-2">
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="w-5 h-5 border-gray-400 checked:bg-blue-600"
                  />
                  <Label
                    htmlFor={itemId}
                    className="text-gray-700 cursor-pointer hover:text-gray-900"
                  >
                    {item}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
