import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Main from './Components/Main/Main.jsx';
import AuthProvider from './Components/Firebase/AuthProvider.jsx';
import Login from './Components/Pages/Login.jsx';
import Register from './Components/Pages/Register.jsx';
import Home from './Components/Home/Home.jsx';
import DashBoard from './Components/DashBoard/DashBoard.jsx';
import PrivateRoute from './Components/Firebase/PrivateRoute.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import EmployeeChart from './Components/DashBoard/EmployeeChart.jsx';
import EmployeeList from './Components/DashBoard/EmployeeList.jsx';
import EmployeeForm from './Components/DashBoard/Employee/EmployeeForm.jsx';
import PaymentHistory from './Components/DashBoard/Employee/PaymentHistory.jsx';
import WorkProgress from './Components/DashBoard/WorkProgress.jsx';
import AllEmHRList from './Components/DashBoard/Admin/AllEmHRList.jsx';
import Contact from './Components/Pages/Contact.jsx';
import Message from './Components/DashBoard/Admin/Message.jsx';
import AdminRoute from './Components/DashBoard/AdminRoute.jsx';
import EmployeeRoute from './Components/DashBoard/EmployeeRoute.jsx';
import HRRoute from './Components/DashBoard/HRRoute.jsx';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/contact-us',
        element: <Contact></Contact>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
    ]
  },

  {
    path: 'dashboard',
    element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
    children: [
      // hr  
      {
        path: 'employee-list',
        element: <HRRoute><EmployeeList></EmployeeList></HRRoute>
      },
      {
        path: 'employee-details/:_id',
        element: <HRRoute><EmployeeChart></EmployeeChart></HRRoute>,
        loader: ({ params }) => fetch(`https://employee-management-server-sigma.vercel.app/users/${params._id}`)
      },
      {
        path: 'progress',
        element: <HRRoute><WorkProgress></WorkProgress></HRRoute>,
      },
      // employee 
      {
        path: 'work-sheet',
        element: <EmployeeRoute><EmployeeForm></EmployeeForm></EmployeeRoute>,
      },
      {
        path: 'payment-history',
        element: <EmployeeRoute><PaymentHistory></PaymentHistory></EmployeeRoute>,
      },
      // admin 
      {
        path: 'all-employee-list',
        element: <AdminRoute><AllEmHRList></AllEmHRList></AdminRoute>,
      },
      {
        path: 'message',
        element: <AdminRoute><Message></Message></AdminRoute>,
      },
    ]
  },



]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
