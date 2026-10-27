# Job Portal — MERN Stack

A full-stack Job Portal web application built using the MERN stack. The platform connects students looking for jobs with recruiters who want to publish job openings and manage applications.

## Features

### Authentication and User Management
- User registration and login
- Student and recruiter roles
- Password hashing using bcryptjs
- JWT-based authentication using HTTP-only cookies
- Profile management and logout

### Student Features
- Browse available jobs
- View job details
- Apply for jobs
- View applied jobs
- Track application status
- Update profile, bio, and skills

### Recruiter Features
- Create and manage company information
- Post job openings
- View jobs posted by the recruiter
- View job applicants
- Accept or reject applications
- View application dashboard and statistics

### Additional Features
- Search jobs by keyword
- Role-based navigation
- REST API integration
- MongoDB database integration
- Responsive user interface

## Technologies Used

### Frontend
- React.js
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- React Router DOM
- Axios
- React Hooks

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- cookie-parser
- CORS
- dotenv

## Project Structure


Job-Portal-project/
├── Client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   ├── Controller/
│   ├── Model/
│   ├── Route/
│   ├── middleware/
│   ├── utils/
│   ├── index.js
│   └── package.json
│
└── README.md

*Note: The folder names above illustrate the intended organization. Adjust them to match the actual folders in your repository.*

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB Atlas account or a local MongoDB installation
- Git
- Visual Studio Code

### 1. Clone the Repository

git clone https://github.com/Trusha-Bhardava/Job-Portal-project.git
cd Job-Portal-project


### 2. Set Up the Backend

Open a terminal in VS Code and navigate to the backend folder:


cd Backend
npm install

Create a `.env` file inside the backend folder:


PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_long_random_secret_key


Replace the placeholder values with your own configuration. Never commit your actual database credentials or secret key to GitHub.

Start the backend:


npm run dev

The backend should run at:

`http://localhost:8000`

### 3. Set Up the Frontend

Open a second terminal in VS Code:


cd Client
npm install
npm run dev


Vite will display the local frontend URL in the terminal, commonly:

`http://localhost:5173`

Open that URL in your browser.

> If your frontend or backend folder has a different name, use the actual folder name in these commands.

## API Overview

The backend exposes REST API endpoints for the main application modules.

| Module | Base API path | Purpose |
|---|---|---|
| User | `/api/v1/user` | Registration, login, logout, profile |
| Company | `/api/v1/company` | Company management |
| Job | `/api/v1/job` | Job creation, listing, search, deletion |
| Application | `/api/v1/application` | Apply for jobs and manage application status |

The exact endpoints for each action are defined in the backend route files.

## How the Application Works

1. Users register as students or recruiters.
2. Users log in and the backend verifies their credentials.
3. The backend creates an authentication token and sets it in an HTTP-only cookie.
4. Students browse job openings and submit applications.
5. Recruiters create company information and publish job openings.
6. Recruiters review applications and update their status.
7. Students can check the status of their applications in their profile.

## Security Notes

- Passwords are hashed before storage.
- Authentication middleware protects restricted API endpoints.
- Environment variables store sensitive configuration.
- HTTP-only cookies are used for authentication tokens.
- Role-based permissions should be enforced on the backend, not only in the frontend.

## Future Improvements

- Deploy the frontend and backend online
- Add email notifications for application updates
- Improve job filtering and pagination
- Add resume upload functionality
- Improve automated testing
- Add stronger role-based authorization and input validation

## Learning Outcomes

This project provides practical experience with:

- Full-stack web development using the MERN stack
- React components, hooks, and routing
- REST API development using Express.js
- MongoDB schemas and relationships using