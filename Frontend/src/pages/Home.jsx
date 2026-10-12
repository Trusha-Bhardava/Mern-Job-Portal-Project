import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {

    const navigate = useNavigate();

    return (

        <div className="home-page">

            {/* =====================================
                HERO SECTION
            ===================================== */}

            <section className="hero-section">

                <div className="hero-content">

                    <p className="hero-small-title">
                        WELCOME TO JOBPORTAL
                    </p>

                    <h1>
                        Find the right job.
                        <br />
                        Build your future.
                    </h1>

                    <p className="hero-description">
                        Discover opportunities from companies,
                        apply for jobs and take the next step
                        in your career.
                    </p>


                    {/* SEARCH BOX */}

                    <div className="job-search-box">

                        <input
                            type="text"
                            placeholder="Search for jobs, skills or keywords"
                        />

                        <input
                            type="text"
                            placeholder="Location"
                        />

                        <button
                            onClick={() => navigate("/jobs")}
                        >
                            Find Jobs
                        </button>

                    </div>


                    <p className="popular-text">
                        Popular: React Developer • Java Developer •
                        Frontend Developer • Backend Developer
                    </p>

                </div>

            </section>


            {/* =====================================
                STATS
            ===================================== */}

            <section className="stats-section">

                <div className="stat-box">

                    <h2>500+</h2>

                    <p>
                        Job Opportunities
                    </p>

                </div>


                <div className="stat-box">

                    <h2>100+</h2>

                    <p>
                        Companies
                    </p>

                </div>


                <div className="stat-box">

                    <h2>1000+</h2>

                    <p>
                        Job Seekers
                    </p>

                </div>


                <div className="stat-box">

                    <h2>50+</h2>

                    <p>
                        Skills & Categories
                    </p>

                </div>

            </section>


            {/* =====================================
                POPULAR CATEGORIES
            ===================================== */}

            <section className="categories-section">

                <div className="section-heading">

                    <p>
                        EXPLORE OPPORTUNITIES
                    </p>

                    <h2>
                        Popular Job Categories
                    </h2>

                    <span>
                        Find opportunities that match your skills
                    </span>

                </div>


                <div className="categories-grid">

                    <div
                        className="category-card"
                        onClick={() => navigate("/jobs")}
                    >

                        <div className="category-icon">
                            💻
                        </div>

                        <h3>
                            IT & Software
                        </h3>

                        <p>
                            Development, programming and technology jobs
                        </p>

                    </div>


                    <div
                        className="category-card"
                        onClick={() => navigate("/jobs")}
                    >

                        <div className="category-icon">
                            🎨
                        </div>

                        <h3>
                            Design
                        </h3>

                        <p>
                            UI, UX, graphic and creative opportunities
                        </p>

                    </div>


                    <div
                        className="category-card"
                        onClick={() => navigate("/jobs")}
                    >

                        <div className="category-icon">
                            📊
                        </div>

                        <h3>
                            Marketing
                        </h3>

                        <p>
                            Digital marketing and business opportunities
                        </p>

                    </div>


                    <div
                        className="category-card"
                        onClick={() => navigate("/jobs")}
                    >

                        <div className="category-icon">
                            💰
                        </div>

                        <h3>
                            Finance
                        </h3>

                        <p>
                            Finance, accounting and banking jobs
                        </p>

                    </div>

                </div>

            </section>


            {/* =====================================
                WHY JOBPORTAL
            ===================================== */}

            <section className="why-section">

                <div className="section-heading">

                    <p>
                        WHY JOBPORTAL?
                    </p>

                    <h2>
                        Everything you need to find your next job
                    </h2>

                </div>


                <div className="features-grid">

                    <div className="feature-card">

                        <div className="feature-icon">
                            🔍
                        </div>

                        <h3>
                            Find the Right Job
                        </h3>

                        <p>
                            Search and explore job opportunities
                            based on your skills and interests.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            📝
                        </div>

                        <h3>
                            Easy Application
                        </h3>

                        <p>
                            Apply for jobs directly and keep
                            your application process simple.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            📋
                        </div>

                        <h3>
                            Track Applications
                        </h3>

                        <p>
                            Check your application status from
                            your profile.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            🚀
                        </div>

                        <h3>
                            Grow Your Career
                        </h3>

                        <p>
                            Connect with opportunities that can
                            help you move forward.
                        </p>

                    </div>

                </div>

            </section>


            {/* =====================================
                RECRUITER SECTION
            ===================================== */}

            <section className="recruiter-section">

                <div className="recruiter-content">

                    <p>
                        FOR RECRUITERS
                    </p>

                    <h2>
                        Find talented people for your company
                    </h2>

                    <span>
                        Create your company, post job opportunities
                        and manage applications from one place.
                    </span>

                    <button
                        onClick={() => navigate("/post-job")}
                    >
                        Post a Job
                    </button>

                </div>

            </section>


            {/* =====================================
                FINAL CTA
            ===================================== */}

            <section className="cta-section">

                <h2>
                    Ready to find your next opportunity?
                </h2>

                <p>
                    Start exploring jobs and take the next step
                    in your career.
                </p>

                <button
                    onClick={() => navigate("/jobs")}
                >
                    Explore Jobs
                </button>

            </section>


            {/* =====================================
                FOOTER
            ===================================== */}

            <footer className="home-footer">

                <div>

                    <h2>
                        JobPortal
                    </h2>

                    <p>
                        Connecting talented people with
                        great opportunities.
                    </p>

                </div>


                <div className="footer-links">

                    <h3>
                        Quick Links
                    </h3>

                    <button
                        onClick={() => navigate("/")}
                    >
                        Home
                    </button>

                    <button
                        onClick={() => navigate("/jobs")}
                    >
                        Jobs
                    </button>

                    <button
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>

                </div>


                <div className="footer-links">

                    <h3>
                        For Recruiters
                    </h3>

                    <button
                        onClick={() => navigate("/post-job")}
                    >
                        Post a Job
                    </button>

                    <button
                        onClick={() => navigate("/company")}
                    >
                        Company
                    </button>

                </div>

            </footer>


            <div className="copyright">

                <p>
                    © 2026 JobPortal. All rights reserved.
                </p>

            </div>

        </div>

    );

};

export default Home;