import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import useGetAdminJobById from '@/hooks/useGetAdminJobById';
import { JOB_API_END_POINT } from '@/utils/constant';

const JobSetup = () => {
    const params = useParams();
    useGetAdminJobById(params.id);

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experienceLevel: "",
    });
    
    const { singleJob, error } = useSelector((store) => store.job); // Ensure error is retrieved from store if applicable
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (singleJob) {
            setInput({
                title: singleJob.title || "",
                description: singleJob.description || "",
                requirements: singleJob.requirements?.join(", ") || "", // Convert array to comma-separated string
                salary: singleJob.salary || "",
                location: singleJob.location || "",
                jobType: singleJob.jobType || "",
                experienceLevel: singleJob.experienceLevel || 0,
            });
        }
    }, [singleJob]);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", input.title); // Corrected "name" to "title"
        formData.append("description", input.description);
        formData.append("requirements", input.requirements);
        formData.append("salary", input.salary);
        formData.append("location", input.location);
        formData.append("jobType", input.jobType);
        formData.append("experianceLevel", input.experienceLevel);
        try {
            setLoading(true);
            const res = await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='max-w-2xl mx-auto my-10 p-8 border rounded-md shadow'>
            <h1 className='font-bold text-xl mb-6'>Edit Job</h1>
            {error?.message && <p className="text-red-500 mb-4">{error.message}</p>}
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <Label>Job Title</Label>
                        <Input
                            type="text"
                            name="title"
                            value={input.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label>Requirements</Label>
                        <Input
                            type="text"
                            name="requirements"
                            value={input.requirements}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label>Salary</Label>
                        <Input
                            type="number"
                            name="salary"
                            value={input.salary}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input
                            type="text"
                            name="location"
                            value={input.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label>Job Type</Label>
                        <Input
                            type="text"
                            name="jobType"
                            value={input.jobType}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label>Experiance</Label>
                        <Input
                            type="number"
                            name="experianceLevel"
                            value={input.experienceLevel}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='mt-6'>
                    {loading ? (
                        <Button disabled className="w-full">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Updating...
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full">Save Changes</Button>
                    )}
                </div>
            </form>
            <Button variant="outline" onClick={() => navigate("/admin/jobs")} className="mt-4">
                Cancel
            </Button>
        </div>
    );
};

export default JobSetup;
