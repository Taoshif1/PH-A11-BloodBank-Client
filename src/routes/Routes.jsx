import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DonationRequests from "../pages/DonationRequests";
import DonationDetails from "../pages/DonationDetails";
import SearchDonors from "../pages/SearchDonors";
import Funding from "../pages/Funding";
import PrivateRoute from "../components/PrivateRoute";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/dashboard/Profile";
import CreateDonationRequest from "../pages/dashboard/CreateDonationRequest";
import MyDonationRequests from "../pages/dashboard/MyDonationRequests";
import AllUsers from "../pages/dashboard/AllUsers";
import AllBloodDonationRequests from "../pages/dashboard/AllBloodDonationRequests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/donation-requests",
        element: <DonationRequests />,
      },
      {
        path: "/donation-requests/:id",
        element: (
          <PrivateRoute>
            <DonationDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/search-donors",
        element: <SearchDonors />,
      },
      {
        path: "/funding",
        element: (
          <PrivateRoute>
            <Funding />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/create-donation-request",
        element: <CreateDonationRequest />,
      },
      {
        path: "/dashboard/my-donation-requests",
        element: <MyDonationRequests />,
      },
      {
        path: "/dashboard/all-users",
        element: <AllUsers />,
      },
      {
        path: "/dashboard/all-blood-donation-request",
        element: <AllBloodDonationRequests />,
      },
      // {
      //   path: "/dashboard/donation-requests/:id",
      //   element: <DonationRequestDetails />,
      // },
    ],
  },
]);

export default router;
