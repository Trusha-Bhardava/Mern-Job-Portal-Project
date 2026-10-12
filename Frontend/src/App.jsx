import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";

import Navbar from "./components/Navbar";
import Jobs from "./components/Jobs";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Company from "./components/Company";
import PostJob from "./components/Postjob";
import MyJobs from "./components/MyJobs";
import Applications from "./components/Application";
import ApplicationDashboard from "./components/ApplicationDashboard";


function App() {
    return (
        <>
            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                 <Route path="/jobs" element={<Jobs />} />

                 <Route path="/profile" element={<Profile />} />

                 <Route path="/company" element={<Company />} />

                 <Route path="/post-job" element={<PostJob />} />

                 <Route  path="/my-jobs" element={<MyJobs />} />

                 <Route path="/applications/:id" element={<Applications />} />

                 <Route path="/application-dashboard" element={<ApplicationDashboard />}/>


            </Routes>
        </>
    );
}

export default App;