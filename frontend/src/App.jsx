
import "./App.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import MyProfile from "./components/MyProfile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CreateCompany from "./components/admin/CreateCompany";
import CompanyProfileEdit from "./components/admin/CompanyProfileEdit";
import RecruiterJobs from "./components/admin/RecruiterJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectRoute from "./components/admin/ProtectRoute";
import RecommendedJobs from "./components/RecommendedJobs";

// import Header from "@/components/shared/Header";
// import { Button } from "@/components/ui/button";
import { Button } from "./components/ui/button";



const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/recommended",
    element: <RecommendedJobs />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <MyProfile />,
  },
  {
    path: "/description",
    element: <JobDescription />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },

  // // Recruiter
  {
    path: "/recruiter/companies",
    element: (
      <ProtectRoute>
        <Companies />
      </ProtectRoute>
    ),
  },
  {
    path: "/recruiter/companies/create",
    element: (
      <ProtectRoute>
        <CreateCompany />
      </ProtectRoute>
    ),
  },
  {
    path: "/recruiter/companies/:id",
    element: <CompanyProfileEdit />,
  },
  {
    path: "/recruiter/jobs",
    element: (
      // <ProtectedRoute>
      <RecruiterJobs />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/recruiter/jobs/create",
    element: (
      // <ProtectedRoute>
      <PostJob />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/recruiter/jobs/:id/applicants",
    element: (
      // <ProtectedRoute>
      <Applicants />
      // </ProtectedRoute>
    ),
  },
  
]);

function App() {
  return (
    <>
    
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </>
  );
}

export default App;
