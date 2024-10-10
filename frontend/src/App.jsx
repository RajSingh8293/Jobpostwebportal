

import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Home from './pages/user/Home';
import Jobs from './pages/user/Jobs';
import Profile from './pages/user/Profile';
import AppliedJobs from './pages/user/AppliedJobs';
import JobDetails from './pages/user/JobDetails';
import MyJobs from './pages/admin/MyJobs';

import Applicants from './pages/admin/Applicants';
import MyJobDetails from './pages/admin/MyJobDetails';
import CreateJob from './pages/admin/CreateJob';
import ProtectedRoute from './pages/protectedRoute/ProtectedRoute';
import UserProtectedRoute from './pages/protectedRoute/UserProtectedRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PageNotFound from './pages/user/PageNotFound';
import { profileUser } from './redux/slices/userSlice';
import WhishList from './pages/user/WhishList';
import About from './pages/user/About';
import Contact from './pages/user/Contact';


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(profileUser())
  }, [dispatch])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/jobs",
      element: <Jobs />,
    },
    {
      path: "/whishlist",
      element: <WhishList />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
    {
      path: "/profile",
      element:
        <UserProtectedRoute>
          <Profile />,
        </UserProtectedRoute>
    },
    {
      path: "/applied-jobs",
      element:
        <UserProtectedRoute>
          <AppliedJobs />,
        </UserProtectedRoute>
    },
    {
      path: "/job/:id",
      element: <JobDetails />,
    },
    {
      path: "/myjobs",
      element:
        < ProtectedRoute >
          <MyJobs />
        </ProtectedRoute >
      ,
    },
    {
      path: "/create-job",
      element: <ProtectedRoute>
        <CreateJob />,
      </ProtectedRoute>
    },
    {
      path: "/job-applicants/:id",
      element: <ProtectedRoute>
        <Applicants />,
      </ProtectedRoute>
    },
    {
      path: "/my-job-details/:id",
      element:
        <ProtectedRoute>
          <MyJobDetails />,
        </ProtectedRoute>
    },
  ]);


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
