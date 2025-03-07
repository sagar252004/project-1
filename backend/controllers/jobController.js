import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};
export const updateJob = async (req, res) => {
    try {
        const { title, description, requirements,salary,location,jobType  } = req.body;
        console.log(req.body);
        // Update company data
        const updateData = { title, description, requirements,salary,location,jobType  };
        console.log(updateData);
        
        const job = await Job.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job information updated.",
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Find and delete the job by ID
        const job = await Job.findByIdAndDelete(jobId);

        if (!job) {
            return res.status(404).json({
                message: "job not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "job deleted successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
export const savedJobs = async(req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.id;

        let user = await user.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        if (user.profile.savedJobs.includes(jobId)) {
            return res.status(400).json({
                message: "Job is already saved",
                success: false
            })
        }

        user.profile.savedJobs.push(jobId);
        await user.save()

        await user.populate('profile.savedJobs');
        return res.status(200).json({
            user,
            message: "Job saved successfully",
            success: true,
            savedJobs: user.profile.savedJobs
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred",
            error: error.message,
            success: false
        });

    }
}