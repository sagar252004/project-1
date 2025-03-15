import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        let isPolling = true;

        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        };

        const pollAppliedJobs = async () => {
            while (isPolling) {
                await fetchAppliedJobs();
                await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before next poll
            }
        };

        pollAppliedJobs();

        return () => { isPolling = false; }; // Cleanup function to stop polling
    }, [dispatch]);
};

export default useGetAppliedJobs;
