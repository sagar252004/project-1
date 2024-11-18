import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="p-6 rounded-md shadow-md bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            {/* Job Header */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0
                        ? 'Today'
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button
                    variant="outline"
                    className="rounded-full border-gray-300 hover:bg-gray-100"
                    size="icon"
                >
                    <Bookmark className="text-gray-600" />
                </Button>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-4 my-4">
                <Avatar>
                    <AvatarImage
                        src={job?.company?.logo || 'https://via.placeholder.com/50'}
                        alt={job?.company?.name || 'Company Logo'}
                        className="object-cover"
                    />
                </Avatar>
                <div>
                    <h1 className="font-medium text-lg text-gray-800">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">India</p>
                </div>
            </div>

            {/* Job Info */}
            <div className="my-4">
                <h1 className="font-bold text-xl text-gray-900">{job?.title}</h1>
                <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
            </div>

            {/* Job Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="text-blue-700 font-semibold" variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-[#F83002] font-semibold" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#7209b7] font-semibold" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                    Details
                </Button>
                <Button className="bg-[#7209b7] text-white font-semibold hover:bg-[#5f32ad]">
                    Save For Later
                </Button>
            </div>
        </div>
    );
};

export default Job;
