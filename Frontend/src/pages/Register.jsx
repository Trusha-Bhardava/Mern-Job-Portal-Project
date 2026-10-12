import { useState } from "react";
import axios from "axios";

const Register = () => {

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",

        // Company details
        companyName: "",
        companyDescription: "",
        companyWebsite: "",
        companyLocation: ""
    });


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const response = await axios.post(
                "http://localhost:8000/api/v1/user/register",
                formData,
                {
                    withCredentials: true
                }
            );


            console.log("Registration Response:", response.data);


            if (response.data.success) {

                alert(response.data.message);


                // Clear form

                setFormData({
                    fullname: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                    role: "",

                    companyName: "",
                    companyDescription: "",
                    companyWebsite: "",
                    companyLocation: ""
                });

            }


        } catch (error) {

            console.log("Registration Error:", error);

            console.log(
                "Backend Response:",
                error.response?.data
            );


            alert(
                error.response?.data?.message ||
                "Registration failed"
            );

        }

    };


    return (

        <div className="auth-container">

            <h2>Create Account</h2>


            <form onSubmit={handleSubmit}>


                {/* ========================= */}
                {/* USER INFORMATION */}
                {/* ========================= */}


                <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                />


                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />


                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />


                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />


                {/* ========================= */}
                {/* ROLE */}
                {/* ========================= */}


                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Role
                    </option>

                    <option value="student">
                        Student
                    </option>

                    <option value="recruiter">
                        Recruiter
                    </option>

                </select>


                {/* ========================= */}
                {/* RECRUITER COMPANY DETAILS */}
                {/* ========================= */}


                {formData.role === "recruiter" && (

                    <div className="company-registration">

                        <h3>
                            Company Information
                        </h3>


                        <input
                            type="text"
                            name="companyName"
                            placeholder="Company Name"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                        />


                        <textarea
                            name="companyDescription"
                            placeholder="Company Description"
                            value={formData.companyDescription}
                            onChange={handleChange}
                            required
                        />


                        <input
                            type="text"
                            name="companyWebsite"
                            placeholder="Company Website"
                            value={formData.companyWebsite}
                            onChange={handleChange}
                        />


                        <input
                            type="text"
                            name="companyLocation"
                            placeholder="Company Location"
                            value={formData.companyLocation}
                            onChange={handleChange}
                            required
                        />

                    </div>

                )}


                {/* ========================= */}
                {/* REGISTER BUTTON */}
                {/* ========================= */}


                <button type="submit">
                    Register
                </button>


            </form>

        </div>

    );

};


export default Register;