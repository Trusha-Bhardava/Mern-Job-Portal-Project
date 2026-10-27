import { useEffect, useState } from "react";
import axios from "axios";
import "./ApplicationDashboard.css";

const ApplicationDashboard = () => {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchApplications = async () => {
            try {
                // Get jobs created by recruiter
                const jobResponse = await axios.get(
                    "http://localhost:8000/api/v1/job/getadminjobs",
                    {
                        withCredentials: true
                    }
                );

                console.log("Recruiter Jobs:", jobResponse.data);
                const jobs = jobResponse.data.jobs || [];
                let allApplications = [];

                // Get applications for each job
                for (const job of jobs) {

                    const response = await axios.get(
                        `http://localhost:8000/api/v1/application/${job._id}/applicants`,
                        {
                            withCredentials: true
                        }
                    );

                    const jobApplications = response.data.applications || [];

                    const applicationsWithJob =
                        jobApplications.map((application) => ({
                            ...application,
                            job: job
                        }));

                    allApplications.push(
                        ...applicationsWithJob
                    );
                }

                console.log("All Applications:", allApplications);
                setApplications(allApplications);
            }
             catch (error)
              {
                console.log("Dashboard Error:", error);
            }
            finally 
            {
                setLoading(false);
            }

        };
        fetchApplications();
    }, []);

    // APPROVE / REJECT
    const handleStatusChange = async (
        applicationId,
        status
    ) => {

        try {

            const response = await axios.put(
                `http://localhost:8000/api/v1/application/status/${applicationId}`,
                {
                    status: status
                },
                {
                    withCredentials: true
                }
            );

            console.log("Status Response:",response.data);

            if (response.data.success) {

                alert(
                    status === "accepted"
                        ? "Application approved"
                        : "Application rejected"
                );

                setApplications(
                    (previousApplications) =>
                        previousApplications.map(
                            (application) =>
                                application._id === applicationId
                                    ? {
                                        ...application,
                                        status: status
                                    }
                                    : application
                        )
                );
            }

        } catch (error) {
            console.log( "Update Status Error:",error);

            alert(
                error.response?.data?.message ||
                "Failed to update application"
            );

        }

    };


    if (loading) {

        return (
            <h2 className="dashboard-message">
                Loading applications...
            </h2>
        );
    }

    return (

        <div className="application-dashboard">
            <h1>
                Application Dashboard
            </h1>

            {applications.length === 0 ? (

                <p className="dashboard-message">
                    No applications received yet.
                </p>

            ) : (

                <div className="dashboard-applications">

                    {applications.map(
                        (application) => (

                            <div
                                className="dashboard-application-card"
                                key={application._id}
                            >

                                <h2>
                                    {application.applicant?.fullName}
                                </h2>

                                <p>
                                    <strong>Email:</strong>{" "}
                                    {application.applicant?.email}
                                </p>

                                <p>
                                    <strong>Phone:</strong>{" "}
                                    {application.applicant?.phoneNumber}
                                </p>

                                <p>
                                    <strong>Job:</strong>{" "}
                                    {application.job?.title}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    {application.status}
                                </p>

                                <div className="application-actions">

                                    <button
                                        className="approve-btn"
                                        onClick={() =>
                                            handleStatusChange(
                                                application._id,
                                                "accepted"
                                            )
                                        }
                                        disabled={
                                            application.status ===
                                            "accepted"
                                        }
                                    >
                                        Approve
                                    </button>

                                    <button
                                        className="reject-btn"
                                        onClick={() =>
                                            handleStatusChange(
                                                application._id,
                                                "rejected"
                                            )
                                        }
                                        disabled={
                                            application.status ===
                                            "rejected"
                                        }
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default ApplicationDashboard;