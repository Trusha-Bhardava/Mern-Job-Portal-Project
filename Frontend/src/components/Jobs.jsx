import { useEffect, useState } from "react";
import axios from "axios";
import "./Job.css";

const Jobs = () => {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);


    // =====================================
    // GET LOGGED-IN USER
    // =====================================

    useEffect(() => {

        const storedUser =
            localStorage.getItem("user");

        if (storedUser) {

            try {

                setUser(
                    JSON.parse(storedUser)
                );

            } catch (error) {

                console.log(
                    "User data error:",
                    error
                );

            }

        }

    }, []);


    // =====================================
    // GET ALL JOBS
    // =====================================

    useEffect(() => {

        const fetchJobs = async () => {

            try {

                const response =
                    await axios.get(
                        "http://localhost:8000/api/v1/job/get"
                    );

                console.log(
                    "Jobs:",
                    response.data
                );

                setJobs(
                    response.data.jobs || []
                );

            } catch (error) {

                console.log(
                    "Get Jobs Error:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        fetchJobs();

    }, []);


    // =====================================
    // DELETE JOB
    // =====================================

    const handleDeleteJob = async (jobId) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this job?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            const response =
                await axios.delete(
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

                alert(
                    response.data.message
                );

                setJobs(
                    (previousJobs) =>
                        previousJobs.filter(
                            (job) =>
                                job._id !== jobId
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


    // =====================================
    // APPLY FOR JOB
    // =====================================

    const handleApply = async (jobId) => {

        try {

            const response =
                await axios.post(
                    `http://localhost:8000/api/v1/application/apply/${jobId}`,
                    {},
                    {
                        withCredentials: true
                    }
                );

            console.log(
                "Apply Response:",
                response.data
            );

            alert(
                response.data.message
            );

        } catch (error) {

            console.log(
                "Apply Job Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to apply for job"
            );

        }

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (
            <h2 className="jobs-message">
                Loading jobs...
            </h2>
        );

    }


    // =====================================
    // JOBS PAGE
    // =====================================

    return (

        <div className="jobs-container">

            <h1>
                Available Jobs
            </h1>


            {jobs.length === 0 ? (

                <p className="jobs-message">
                    No jobs available right now.
                </p>

            ) : (

                <div className="jobs-list">

                    {jobs.map((job) => {

                        /*
                         * Check whether the current
                         * logged-in recruiter created
                         * this job.
                         */

                        const isJobOwner =
                            user &&
                            user.role?.toLowerCase() ===
                                "recruiter" &&
                            job.created_by?.toString() ===
                                user._id?.toString();


                        return (

                            <div
                                className="job-card"
                                key={job._id}
                            >

                                <h2>
                                    {job.title}
                                </h2>


                                {/* COMPANY */}

                                <p>
                                    <strong>
                                        Company:
                                    </strong>{" "}
                                    {job.company?.companyName ||
                                        "Company"}
                                </p>


                                {/* LOCATION */}

                                <p>
                                    <strong>
                                        Location:
                                    </strong>{" "}
                                    {job.location}
                                </p>


                                {/* JOB TYPE */}

                                <p>
                                    <strong>
                                        Job Type:
                                    </strong>{" "}
                                    {job.jobType}
                                </p>


                                {/* SALARY */}

                                <p>
                                    <strong>
                                        Salary:
                                    </strong>{" "}
                                    ₹{job.salary}
                                </p>


                                {/* EXPERIENCE */}

                                <p>
                                    <strong>
                                        Experience:
                                    </strong>{" "}
                                    {job.experienceLevel}
                                </p>


                                {/* POSITION */}

                                <p>
                                    <strong>
                                        Position:
                                    </strong>{" "}
                                    {job.position}
                                </p>


                                {/* DESCRIPTION */}

                                <p className="job-description">
                                    {job.description}
                                </p>


                                {/* REQUIREMENTS */}

                                <p>
                                    <strong>
                                        Requirements:
                                    </strong>
                                </p>


                                <ul>

                                    {job.requirements?.map(
                                        (
                                            requirement,
                                            index
                                        ) => (

                                            <li
                                                key={index}
                                            >
                                                {requirement}
                                            </li>

                                        )
                                    )}

                                </ul>


                                {/* ================================= */}
                                {/* STUDENT → APPLY */}
                                {/* ================================= */}

                                {user?.role?.toLowerCase() ===
                                    "student" && (

                                    <button
                                        className="apply-job-btn"
                                        onClick={() =>
                                            handleApply(
                                                job._id
                                            )
                                        }
                                    >
                                        Apply Now
                                    </button>

                                )}


                                {/* ================================= */}
                                {/* RECRUITER → DELETE OWN JOB */}
                                {/* ================================= */}

                                {isJobOwner && (

                                    <button
                                        className="delete-job-btn"
                                        onClick={() =>
                                            handleDeleteJob(
                                                job._id
                                            )
                                        }
                                    >
                                        Delete Job
                                    </button>

                                )}

                            </div>

                        );

                    })}

                </div>

            )}

        </div>

    );

};

export default Jobs;