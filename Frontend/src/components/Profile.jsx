import { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    // ========================================
    // APPLICATION STATES
    // ========================================

    const [applications, setApplications] = useState([]);
    const [applicationsLoading, setApplicationsLoading] =
        useState(true);


    // ========================================
    // GET MY APPLICATIONS
    // ========================================

    useEffect(() => {

        const fetchApplications = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8000/api/v1/application/get",
                    {
                        withCredentials: true
                    }
                );

                console.log(
                    "My Applications:",
                    response.data
                );

                setApplications(
                    response.data.applications || []
                );

            } catch (error) {

                console.log(
                    "My Applications Error:",
                    error
                );

            } finally {

                setApplicationsLoading(false);

            }

        };

        fetchApplications();

    }, []);


    // ========================================
    // PROFILE FORM
    // ========================================

    const [formData, setFormData] = useState({

        fullName: user?.fullName || "",

        email: user?.email || "",

        phoneNumber: user?.phoneNumber || "",

        bio: user?.profile?.bio || "",

        skills:
            user?.profile?.skills?.join(", ") || ""

    });


    // ========================================
    // HANDLE PROFILE CHANGE
    // ========================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };


    // ========================================
    // UPDATE PROFILE
    // ========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.put(

                "http://localhost:8000/api/v1/user/profile/update",

                {

                    fullname: formData.fullName,

                    email: formData.email,

                    phoneNumber: formData.phoneNumber,

                    bio: formData.bio,

                    skills: formData.skills

                },

                {

                    withCredentials: true

                }

            );


            alert(response.data.message);


            // Update localStorage

            localStorage.setItem(

                "user",

                JSON.stringify(response.data.user)

            );


        } catch (error) {

            console.log(
                "Profile Update Error:",
                error
            );

            alert(

                error.response?.data?.message ||

                "Profile update failed"

            );

        }

    };


    // ========================================
    // PAGE
    // ========================================

    return (

        <div className="profile-container">

            {/* =================================
                PROFILE
            ================================= */}

            <h2>
                My Profile
            </h2>


            <form
                className="profile-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                />


                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />


                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                />


                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Bio"
                />


                <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB"
                />


                <button type="submit">
                    Update Profile
                </button>

            </form>


            {/* =================================
                MY APPLICATIONS
            ================================= */}

            <div className="my-applications">

                <h2>
                    My Applications
                </h2>


                {applicationsLoading ? (

                    <p>
                        Loading applications...
                    </p>

                ) : applications.length === 0 ? (

                    <p>
                        You have not applied for any job yet.
                    </p>

                ) : (

                    <div className="applications-list">

                        {applications.map(
                            (application) => (

                                <div
                                    className="student-application-card"
                                    key={application._id}
                                >

                                    <h3>
                                        {application.job?.title}
                                    </h3>


                                    <p>
                                        <strong>
                                            Company:
                                        </strong>{" "}

                                        {application.job?.company
                                            ?.companyName ||
                                            "Company"}
                                    </p>


                                    <p>
                                        <strong>
                                            Location:
                                        </strong>{" "}

                                        {application.job?.location}
                                    </p>


                                    <p>
                                        <strong>
                                            Applied On:
                                        </strong>{" "}

                                        {new Date(
                                            application.createdAt
                                        ).toLocaleDateString()}
                                    </p>


                                    <p>
                                        <strong>
                                            Status:
                                        </strong>{" "}


                                        <span
                                            className={`application-status ${application.status}`}
                                        >
                                            {application.status}
                                        </span>

                                    </p>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>

    );

};

export default Profile;