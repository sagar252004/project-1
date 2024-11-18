import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';

const JobDescription = () => {
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const isInitiallyApplied =
        singleJob?.applications?.some((application) => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }],
                };
                dispatch(setSingleJob(updatedSingleJob)); // Helps us update UI in real-time
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(
                        res.data.job.applications.some((application) => application.applicant === user?._id)
                    ); // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-6xl mx-auto mt-10 p-6 sm:p-8 md:p-10 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-3xl font-extrabold text-gray-800">{singleJob?.title}</h1>
                        <div className="flex flex-wrap gap-3 mt-4">
                            <Badge className="text-blue-700 font-bold bg-blue-100 px-3 py-1 rounded">
                                {singleJob?.position} Positions
                            </Badge>
                            <Badge className="text-[#F83002] font-bold bg-red-100 px-3 py-1 rounded">
                                {singleJob?.jobType}
                            </Badge>
                            <Badge className="text-[#7209b7] font-bold bg-purple-100 px-3 py-1 rounded">
                                {singleJob?.salary} LPA
                            </Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg px-6 py-2 ${
                            isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500'
                        } text-white font-semibold`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

                <h1 className="border-b-2 border-gray-300 font-bold py-4 mt-8 text-lg text-gray-800">
                    Job Description
                </h1>
                <div className="my-6 text-gray-700">
                    <p className="mb-4">
                        <span className="font-semibold text-gray-900">Role:</span>{' '}
                        <span className="pl-4">{singleJob?.title || 'N/A'}</span>
                    </p>
                    <p className="mb-4">
                        <span className="font-semibold text-gray-900">Location:</span>{' '}
                        <span className="pl-4">{singleJob?.location || 'N/A'}</span>
                    </p>
                    <p className="mb-4">
                        <span className="font-semibold text-gray-900">Description:</span>{' '}
                        <span className="pl-4">{singleJob?.description || 'N/A'}</span>
                    </p>
                    <p className="mb-4">
                        <span className="font-semibold text-gray-900">Experience:</span>{' '}
                        <span className="pl-4">{singleJob?.experienceLevel || 'N/A'} yrs</span>
                    </p>
                    <p className="mb-4">
                        <span className="font-semibold text-gray-900">Salary:</span>{' '}
                        <span className="pl-4">{singleJob?.salary || 'N/A'} LPA</span>
                    </p>
                    <p className="mb-4">
                        <span className="font-semibold text-gray-900">Total Applicants:</span>{' '}
                        <span className="pl-4">{singleJob?.applications?.length || 0}</span>
                    </p>
                    <p className="mb-4">
                        <span className="font-semibold text-gray-900">Posted Date:</span>{' '}
                        <span className="pl-4">{singleJob?.createdAt?.split('T')[0] || 'N/A'}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;
