import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs(); // Fetch jobs
    const { allJobs, loading } = useSelector(store => store.job); // Add loading state
    
    const dispatch = useDispatch();

    useEffect(() => {
        // Reset search query when component unmounts or when you navigate away
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    // Loading state handling
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="flex justify-center items-center h-screen">
                    <span className="text-xl text-gray-500">Loading jobs...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
                <h1 className="font-bold text-2xl text-gray-800 mb-8">
                    Search Results ({allJobs.length})
                </h1>

                {allJobs.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="text-gray-500 text-lg">No jobs found.</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {allJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Browse;
