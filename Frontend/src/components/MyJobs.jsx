import { useEffect, useState } from "react";
import axios from "axios";
import "./MyJobs.css";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {

     const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchMyJobs = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8000/api/v1/job/getadminjobs",
                    {
                        withCredentials: true
                    }
                );

                console.log(
                    "My Jobs:",
                    response.data
                );

                setJobs(
                    response.data.jobs || []
                );

            } catch (error) {

                console.log(
                    "Get My Jobs Error:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        fetchMyJobs();

    }, []);


    const handleDelete = async (jobId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await axios.delete(
                `http://localhost:8000/api/v1/job/delete/${jobId}`,
                {
                    withCredentials: true
                }
            );

            console.log(
                "Delete Job:",
                response.data
            );

            if (response.data.success) {

                alert(response.data.message);

                setJobs((previousJobs) =>
                    previousJobs.filter(
                        (job) => job._id !== jobId
                    )
                );

            }

        } catch (error) {

            console.log(
                "Delete Job Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete job"
            );

        }

    };


    if (loading) {

        return (
            <div className="my-jobs-container">
                <h2>Loading My Jobs...</h2>
            </div>
        );

    }


    return (

        <div className="my-jobs-container">

            <h1>My Jobs</h1>

            {jobs.length === 0 ? (

                <p className="my-jobs-message">
                    You have not posted any jobs yet.
                </p>

            ) : (

                <div className="my-jobs-list">

                    {jobs.map((job) => (

                        <div
                            className="my-job-card"
                            key={job._id}
                        >

                            <h2>
                                {job.title}
                            </h2>

                            <p>
                                <strong>
                                    Company:
                                </strong>{" "}
                                {job.company?.companyName ||
                                    "Company"}
                            </p>

                            <p>
                                <strong>
                                    Location:
                                </strong>{" "}
                                {job.location}
                            </p>

                            <p>
                                <strong>
                                    Job Type:
                                </strong>{" "}
                                {job.jobType}
                            </p>

                            <p>
                                <strong>
                                    Salary:
                                </strong>{" "}
                                ₹{job.salary}
                            </p>

                            <p>
                                <strong>
                                    Experience:
                                </strong>{" "}
                                {job.experienceLevel}
                            </p>

                            <p>
                                <strong>
                                    Position:
                                </strong>{" "}
                                {job.position}
                            </p>

                            <p className="job-description">
                                {job.description}
                            </p>

                            <p>
                                <strong>
                                    Requirements:
                                </strong>
                            </p>

                            <ul>
                                {job.requirements?.map(
                                    (requirement, index) => (
                                        <li key={index}>
                                            {requirement}
                                        </li>
                                    )
                                )}
                            </ul>

                            <div className="my-job-actions">

    <button
        className="delete-job-btn"
        onClick={() =>
            handleDelete(job._id)
        }
    >
        Delete Job
    </button>

    <button
        className="view-applications-btn"
        onClick={() =>
            navigate(
                `/applications/${job._id}`
            )
        }
    >
        View Applications
    </button>

</div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

};

export default MyJobs;