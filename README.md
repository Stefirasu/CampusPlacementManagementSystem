# 🎓 Campus Placement Management System (MERN Stack)

A full-stack web application to automate campus recruitment — built with
**MongoDB, Express.js, React.js, Node.js**.

## Workflow

- **Student** → Registers → Completes Profile → Applies for Jobs → Tracks Application Status
- **Recruiter** → Registers → Posts Jobs (admin approval required) → Reviews Applications → Shortlists / Selects Students
- **Admin** → Manages Students, Companies/Recruiters, Job Approvals, Placement Drives, and Reports

## Tech Stack

- **Frontend:** React.js, React Router, Bootstrap 5, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT + bcrypt.js

## Project Structure

```
campus-placement-mern/
├── backend/
│   ├── config/db.js
│   ├── models/          (User, Job, Application, Company, Drive)
│   ├── controllers/      (auth, student, recruiter, admin)
│   ├── routes/            (auth, student, recruiter, admin)
│   ├── middleware/auth.js (JWT protect + role authorize)
│   ├── seed.js            (creates default admin)
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/axios.js
    │   ├── context/AuthContext.js
    │   ├── components/ (Navbar, ProtectedRoute)
    │   └── pages/
    │       ├── student/  (Dashboard, Profile, JobList, MyApplications)
    │       ├── recruiter/(Dashboard, PostJob, MyJobs, JobApplications)
    │       └── admin/    (Dashboard, ManageStudents, ManageCompanies, ManageJobs, ManageDrives)
    └── .env.example
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB installed locally OR a MongoDB Atlas connection string

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set your `MONGO_URI` (local or Atlas) and a strong `JWT_SECRET`.

Create a default admin account:
```bash
node seed.js
```
This creates: **admin@campus.com / admin123** — change the password after first login (or edit `seed.js` before running).

Start the backend server:
```bash
npm run dev
```
Server runs at `http://localhost:5000`

### 2. Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
cp .env.example .env
npm start
```
App runs at `http://localhost:3000`

## How to Use

1. **Register** as a Student or Recruiter from the Register page.
2. **Student flow:** Login → Complete Profile → Browse Jobs → Apply → Track status in "My Applications".
3. **Recruiter flow:** Login → Post a Job (goes to "Pending" until admin approves) → once approved, view applications → Shortlist / Select / Reject candidates.
4. **Admin flow:** Login using the seeded admin account → Approve recruiters → Approve job postings → Add companies → Schedule placement drives → View reports/statistics on the dashboard.

## Key Features Implemented

- Role-based JWT authentication (Student / Recruiter / Admin)
- Student profile completion gate before applying to jobs
- Job posting with admin approval workflow
- Application tracking with statuses: Applied → Shortlisted → Selected/Rejected
- Company & recruiter approval management
- Placement drive scheduling
- Real-time placement statistics dashboard (total students, jobs, applications, placement %, department-wise breakdown)

## Notes / Future Scope (from POC document)

- Resume upload currently accepts a URL link (Drive/Dropbox); file upload via `multer` can be added.
- Future scope: mobile app, email/SMS notifications, online aptitude tests, interview scheduling, advanced analytics — as outlined in the original POC.
