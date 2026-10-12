import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Application.css";

const Applications = () => {

    const { id } = useParams();

    const [applications, setApplications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        const fetchApplications = async () => {

            try {

                const response =
                    await axios.get(
                      `http://localhost:8000/api/v1/application/${id}/applicants`,
                        {
                            withCredentials: true
                        }
                    );

                console.log(
                    "Applications:",
                    response.data
                );

                setApplications(
                    response.data.applications || []
                );

            } catch (error) {

                console.log(
                    "Applications Error:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        fetchApplications();

    }, [id]);


    if (loading) {

        return (
            <h2 className="applications-message">
                Loading applications...
            </h2>
        );

    }


    return (

        <div className="applications-container">

            <h1>
                Job Applications
            </h1>


            {applications.length === 0 ? (

                <p className="applications-message">
                    No applications received yet.
                </p>

            ) : (

                <div className="applications-list">

                    {applications.map(
                        (application) => (

                            <div
                                className="application-card"
                                key={application._id}
                            >

                                <h2>
                                    {application.applicant?.fullName}
                                </h2>

                                <p>
                                    <strong>
                                        Email:
                                    </strong>{" "}
                                    {application.applicant?.email}
                                </p>

                                <p>
                                    <strong>
                                        Phone:
                                    </strong>{" "}
                                    {application.applicant?.phoneNumber}
                                </p>

                                <p>
                                    <strong>
                                        Status:
                                    </strong>{" "}
                                    {application.status}
                                </p>

                                <p>
                                    <strong>
                                        Applied For:
                                    </strong>{" "}
                                    {application.job?.title}
                                </p>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>

    );

};

export default Applications;