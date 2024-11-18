import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
  const { allJobs, loading } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: "", // Location filter
    title: "", // Job title filter (e.g., "Frontend Developer", "Backend Developer")
  });

  useGetAllJobs(); // Fetch all jobs initially

  // Apply filters whenever allJobs or filters change
  useEffect(() => {
    const applyFilters = () => {
      let jobs = [...allJobs];
      console.log("all jobs", allJobs);

      console.log("Selected filters:", filters); // Log selected filters

      // Filter by location
      if (filters.location) {
        jobs = jobs.filter((job) =>
          job.location?.toLowerCase().includes(filters.location.toLowerCase().trim())
        );
      }

      // Filter by job title
      if (filters.title) {
        console.log("Filtering by job title:", filters.title); // Log selected job title
        jobs = jobs.filter((job) => {
          const title = job.title?.toLowerCase().trim().replace(/\s+/g, ''); // Trim and convert to lowercase
          const selectedJobTitle = filters.title.toLowerCase().trim().replace(/\s+/g, '');
          console.log(`Comparing "${title}" with "${selectedJobTitle}"`); // Log comparison
          return title === selectedJobTitle; // Exact match on title
        });
      }

      console.log("Filtered jobs after applying filters:", jobs); // Log filtered jobs

      setFilteredJobs(jobs);
    };

    applyFilters();
  }, [allJobs, filters]);

  // Loading state while jobs are being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <span className="text-gray-700 text-lg font-semibold">Loading jobs...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-8 px-6 sm:px-8 lg:px-10">
        <div className="flex gap-6 flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 p-4 bg-white rounded-lg shadow-md">
            <FilterCard filters={filters} setFilters={setFilters} />
          </div>
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {filteredJobs.length <= 0 ? (
              <div className="flex justify-center items-center h-full text-gray-500">
                <span>No jobs found matching your criteria.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
