import { useEffect, useState } from "react";
import axios from "axios";
import "./Company.css";

const Company = () => {

    const [company, setCompany] = useState(null);

    const [formData, setFormData] = useState({
        companyName: "",
        description: "",
        website: "",
        location: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);


    // =====================================
    // GET MY COMPANY
    // =====================================

    const getMyCompany = async () => {

        try {

            setLoading(true);

            console.log("Getting company...");

            const response = await axios.get(
                "http://localhost:8000/api/v1/company/",
                {
                    withCredentials: true
                }
            );

            console.log(
                "Company API Response:",
                response.data
            );


            if (
                response.data.success &&
                response.data.companies &&
                response.data.companies.length > 0
            ) {

                const myCompany =
                    response.data.companies[0];

                setCompany(myCompany);

                setFormData({
                    companyName:
                        myCompany.companyName || "",

                    description:
                        myCompany.description || "",

                    website:
                        myCompany.website || "",

                    location:
                        myCompany.location || ""
                });

            } else {

                // Recruiter has not created company yet

                setCompany(null);

            }

        } catch (error) {

            console.log(
                "GET COMPANY ERROR:",
                error
            );

            console.log(
                "BACKEND RESPONSE:",
                error.response?.data
            );

            setCompany(null);

        } finally {

            // VERY IMPORTANT
            setLoading(false);

        }

    };


    // =====================================
    // LOAD COMPANY WHEN PAGE OPENS
    // =====================================

    useEffect(() => {

        getMyCompany();

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
    // CREATE COMPANY
    // =====================================

    const handleCreateCompany = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            const response = await axios.post(
                "http://localhost:8000/api/v1/company/register",
                formData,
                {
                    withCredentials: true
                }
            );

            console.log(
                "CREATE COMPANY RESPONSE:",
                response.data
            );


            if (response.data.success) {

                alert(
                    response.data.message ||
                    "Company created successfully"
                );

                // Immediately show created company

                setCompany(
                    response.data.company
                );

                setFormData({
                    companyName:
                        response.data.company.companyName || "",

                    description:
                        response.data.company.description || "",

                    website:
                        response.data.company.website || "",

                    location:
                        response.data.company.location || ""
                });

            }

        } catch (error) {

            console.log(
                "CREATE COMPANY ERROR:",
                error
            );

            console.log(
                "BACKEND RESPONSE:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                "Company creation failed"
            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================
    // UPDATE COMPANY
    // =====================================

    const handleUpdateCompany = async (e) => {

        e.preventDefault();

        if (!company?._id) {
            return;
        }

        try {

            setSaving(true);

            const response = await axios.put(
                `http://localhost:8000/api/v1/company/${company._id}`,
                formData,
                {
                    withCredentials: true
                }
            );

            console.log(
                "UPDATE COMPANY RESPONSE:",
                response.data
            );


            if (response.data.success) {

                alert(
                    response.data.message ||
                    "Company updated successfully"
                );

                setCompany(
                    response.data.company
                );

            }

        } catch (error) {

            console.log(
                "UPDATE COMPANY ERROR:",
                error
            );

            console.log(
                "BACKEND RESPONSE:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                "Company update failed"
            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================
    // DELETE COMPANY
    // =====================================

    const handleDeleteCompany = async () => {

        if (!company?._id) {
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this company?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await axios.delete(
                `http://localhost:8000/api/v1/company/${company._id}`,
                {
                    withCredentials: true
                }
            );

            console.log(
                "DELETE COMPANY RESPONSE:",
                response.data
            );


            if (response.data.success) {

                alert(
                    response.data.message ||
                    "Company deleted successfully"
                );

                setCompany(null);

                setFormData({
                    companyName: "",
                    description: "",
                    website: "",
                    location: ""
                });

            }

        } catch (error) {

            console.log(
                "DELETE COMPANY ERROR:",
                error
            );

            console.log(
                "BACKEND RESPONSE:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                "Company deletion failed"
            );

        }

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (
            <div className="company-container">

                <h2>
                    Loading company...
                </h2>

            </div>
        );

    }


    // =====================================
    // PAGE
    // =====================================

    return (

        <div className="company-container">

            <h2>
                {company
                    ? "My Company"
                    : "Create Company"
                }
            </h2>


            <form
                className="company-form"
                onSubmit={
                    company
                        ? handleUpdateCompany
                        : handleCreateCompany
                }
            >

                {/* COMPANY NAME */}

                <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                />


                {/* DESCRIPTION */}

                <textarea
                    name="description"
                    placeholder="Company Description"
                    value={formData.description}
                    onChange={handleChange}
                />


                {/* WEBSITE */}

                <input
                    type="text"
                    name="website"
                    placeholder="Company Website"
                    value={formData.website}
                    onChange={handleChange}
                />


                {/* LOCATION */}

                <input
                    type="text"
                    name="location"
                    placeholder="Company Location"
                    value={formData.location}
                    onChange={handleChange}
                />


                {/* SAVE BUTTON */}

                <button
                    type="submit"
                    disabled={saving}
                >

                    {saving
                        ? "Saving..."
                        : company
                            ? "Update Company"
                            : "Create Company"
                    }

                </button>


                {/* DELETE */}

                {company && (

                    <button
                        type="button"
                        onClick={handleDeleteCompany}
                        className="delete-company-btn"
                    >
                        Delete Company
                    </button>

                )}

            </form>


            {/* COMPANY INFORMATION */}

            {company && (

                <div className="company-info">

                    <h3>
                        Company Information
                    </h3>

                    <p>
                        <strong>Name:</strong>{" "}
                        {company.companyName}
                    </p>

                    <p>
                        <strong>Description:</strong>{" "}
                        {company.description || "N/A"}
                    </p>

                    <p>
                        <strong>Website:</strong>{" "}
                        {company.website || "N/A"}
                    </p>

                    <p>
                        <strong>Location:</strong>{" "}
                        {company.location || "N/A"}
                    </p>

                </div>

            )}

        </div>

    );

};

export default Company;