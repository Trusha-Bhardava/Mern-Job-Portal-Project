import { useEffect, useState } from "react";
import axios from "axios";
import "./PostJob.css";

const PostJob = () => {

    const [company, setCompany] = useState(null);

    const [loadingCompany, setLoadingCompany] = useState(true);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: ""
    });


    // =====================================
    // GET RECRUITER COMPANY
    // =====================================

    useEffect(() => {

        const getCompany = async () => {

            try {

                setLoadingCompany(true);

                const response = await axios.get(
                    "http://localhost:8000/api/v1/company/",
                    {
                        withCredentials: true
                    }
                );

                console.log(
                    "Post Job Company Response:",
                    response.data
                );


                if (
                    response.data.success &&
                    response.data.companies &&
                    response.data.companies.length > 0
                ) {

                    setCompany(
                        response.data.companies[0]
                    );

                } else {

                    setCompany(null);

                }

            } catch (error) {

                console.log(
                    "GET COMPANY ERROR:",
                    error
                );

                console.log(
                    "Backend Response:",
                    error.response?.data
                );

                setCompany(null);

            } finally {

                setLoadingCompany(false);

            }

        };


        getCompany();

    }, []);


    // =====================================
    // HANDLE INPUT
    // =====================================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // =====================================
    // POST JOB
    // =====================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // Make sure company exists

        if (!company?._id) {

            alert(
                "Please create your company first."
            );

            return;

        }


        try {

            setLoading(true);


            const jobData = {

                title: formData.title,

                description:
                    formData.description,

                requirements:
                    formData.requirements,

                salary:
                    formData.salary,

                location:
                    formData.location,

                jobType:
                    formData.jobType,

                experience:
                    formData.experience,

                position:
                    formData.position,

                // Automatically send company ID

                companyId:
                    company._id

            };


            console.log(
                "Job Data:",
                jobData
            );


            const response = await axios.post(
                "http://localhost:8000/api/v1/job/post",
                jobData,
                {
                    withCredentials: true
                }
            );


            console.log(
                "POST JOB RESPONSE:",
                response.data
            );


            if (response.data.success) {

                alert(
                    response.data.message ||
                    "Job posted successfully"
                );


                // Clear form

                setFormData({
                    title: "",
                    description: "",
                    requirements: "",
                    salary: "",
                    location: "",
                    jobType: "",
                    experience: "",
                    position: ""
                });

            }

        } catch (error) {

            console.log(
                "POST JOB ERROR:",
                error
            );

            console.log(
                "BACKEND RESPONSE:",
                error.response?.data
            );


            alert(
                error.response?.data?.message ||
                "Failed to post job"
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================
    // COMPANY LOADING
    // =====================================

    if (loadingCompany) {

        return (
            <div className="post-job-container">

                <h2>
                    Loading company...
                </h2>

            </div>
        );

    }


    // =====================================
    // COMPANY NOT FOUND
    // =====================================

    if (!company) {

        return (
            <div className="post-job-container">

                <h2>
                    Create Company First
                </h2>

                <p>
                    You need to create your company
                    before posting a job.
                </p>

            </div>
        );

    }


    // =====================================
    // POST JOB FORM
    // =====================================

    return (

        <div className="post-job-container">

            <h2>
                Post a Job
            </h2>


            {/* COMPANY */}

            <div className="post-job-company">

                <strong>
                    Company:
                </strong>

                <span>
                    {company.companyName}
                </span>

            </div>


            <form
                className="post-job-form"
                onSubmit={handleSubmit}
            >


                {/* JOB TITLE */}

                <div className="post-job-field">

                    <label>
                        Job Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        placeholder="Example: MERN Stack Developer"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                </div>


                {/* DESCRIPTION */}

                <div className="post-job-field">

                    <label>
                        Job Description
                    </label>

                    <textarea
                        name="description"
                        placeholder="Enter job description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                </div>


                {/* REQUIREMENTS */}

                <div className="post-job-field">

                    <label>
                        Requirements
                    </label>

                    <textarea
                        name="requirements"
                        placeholder="Example: JavaScript, React, Node.js, MongoDB"
                        value={formData.requirements}
                        onChange={handleChange}
                        required
                    />

                </div>


                {/* SALARY */}

                <div className="post-job-field">

                    <label>
                        Salary
                    </label>

                    <input
                        type="number"
                        name="salary"
                        placeholder="Example: 25000"
                        value={formData.salary}
                        onChange={handleChange}
                        min="1"
                        required
                    />

                </div>


                {/* LOCATION */}

                <div className="post-job-field">

                    <label>
                        Location
                    </label>

                    <input
                        type="text"
                        name="location"
                        placeholder="Example: Rajkot"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />

                </div>


                {/* JOB TYPE */}

                <div className="post-job-field">

                    <label>
                        Job Type
                    </label>

                    <select
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Job Type
                        </option>

                        <option value="Full Time">
                            Full Time
                        </option>

                        <option value="Part Time">
                            Part Time
                        </option>

                        <option value="Internship">
                            Internship
                        </option>

                        <option value="Remote">
                            Remote
                        </option>

                    </select>

                </div>


                {/* EXPERIENCE */}

                <div className="post-job-field">

                    <label>
                        Experience Level
                    </label>

                    <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Experience
                        </option>

                        <option value="Fresher">
                            Fresher
                        </option>

                        <option value="0-1 Years">
                            0-1 Years
                        </option>

                        <option value="1-3 Years">
                            1-3 Years
                        </option>

                        <option value="3-5 Years">
                            3-5 Years
                        </option>

                        <option value="5+ Years">
                            5+ Years
                        </option>

                    </select>

                </div>


                {/* POSITION */}

                <div className="post-job-field">

                    <label>
                        Number of Positions
                    </label>

                    <input
                        type="number"
                        name="position"
                        placeholder="Example: 2"
                        value={formData.position}
                        onChange={handleChange}
                        min="1"
                        required
                    />

                </div>


                {/* BUTTON */}

                <button
                    className="post-job-button"
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Posting..."
                        : "Post Job"
                    }

                </button>


            </form>

        </div>

    );

};

export default PostJob;