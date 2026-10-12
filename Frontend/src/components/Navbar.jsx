import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {

    const [user, setUser] = useState(null);

    const navigate = useNavigate();


    // =====================================
    // GET LOGGED-IN USER
    // =====================================

    useEffect(() => {

        const checkUser = () => {

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

                    setUser(null);

                }

            } else {

                setUser(null);

            }

        };


        checkUser();


        // Check again when storage changes
        window.addEventListener(
            "storage",
            checkUser
        );


        return () => {

            window.removeEventListener(
                "storage",
                checkUser
            );

        };

    }, []);


    // =====================================
    // LOGOUT
    // =====================================

    const handleLogout = async () => {

        try {

            await axios.get(
                "http://localhost:8000/api/v1/user/logout",
                {
                    withCredentials: true
                }
            );

        } catch (error) {

            console.log(
                "Logout Error:",
                error
            );

        } finally {

            // Remove logged-in user
            localStorage.removeItem("user");

            // Update navbar immediately
            setUser(null);

            // Go home
            navigate("/");

        }

    };


    // =====================================
    // GET USER ROLE
    // =====================================

    const role =
        user?.role?.toLowerCase() || "";


    return (

        <nav className="navbar">

            <div className="navbar-container">


                {/* LOGO */}

                <Link
                    to="/"
                    className="logo"
                >
                    JobPortal
                </Link>


                <div className="nav-links">


                    {/* ALWAYS SHOW */}

                    <Link to="/">
                        Home
                    </Link>


                    <Link to="/profile">
                        Profile
                    </Link>


                    <Link to="/jobs">
                        Jobs
                    </Link>


                    {/* ================================= */}
                    {/* LOGGED OUT */}
                    {/* ================================= */}

                    {!user && (

                        <>

                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/register">
                                Register
                            </Link>

                        </>

                    )}


                    {/* ================================= */}
                    {/* STUDENT */}
                    {/* ================================= */}

                    {user &&
                        role === "student" && (

                        <button
                            onClick={handleLogout}
                            className="logout-btn"
                        >
                            Logout
                        </button>

                    )}


                    {/* ================================= */}
                    {/* RECRUITER */}
                    {/* ================================= */}

                    {user &&
                        role === "recruiter" && (

                        <>

                            <Link to="/company">
                                Company
                            </Link>


                            <Link to="/post-job">
                                Post Job
                            </Link>


                            <Link to="/my-jobs">
                                My Jobs
                            </Link>

                            <Link to="/application-dashboard">
                                Dashboard
                            </Link>


                            <button
                                onClick={handleLogout}
                                className="logout-btn"
                            >
                                Logout
                            </button>

                        </>

                    )}

                </div>

            </div>

        </nav>

    );

};

export default Navbar;