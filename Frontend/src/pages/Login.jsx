import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    // Check fields
    if (
        !formData.email ||
        !formData.password ||
        !formData.role
    ) {
        alert("Please fill all fields");
        return;
    }

    try {

        const response = await axios.post(
            "http://localhost:8000/api/v1/user/login",
            formData,
            {
                withCredentials: true
            }
        );

        console.log("Login Response:", response.data);


        // =========================
        // LOGIN SUCCESS
        // =========================

        if (response.data.success) {

            // Save logged-in user
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            // Show welcome message
            alert(response.data.message);


            // Get logged-in user
            const loggedInUser = response.data.user;


            // Get role
            const role =
                loggedInUser?.profile?.role ||
                loggedInUser?.role ||
                "";


            console.log("Logged-in role:", role);


            // =========================
            // RECRUITER
            // =========================

            if (role.toLowerCase() === "recruiter") {

                navigate("/company");

            }

            // =========================
            // STUDENT
            // =========================

            else {

                navigate("/");

            }
        }


    } catch (error) {

        console.log("Login Error:", error);

        console.log(
            "Backend Response:",
            error.response?.data
        );

        alert(
            error.response?.data?.message ||
            error.message ||
            "Login failed"
        );
    }
};

    return (
        <div className="auth-container">

            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
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

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
};

export default Login;