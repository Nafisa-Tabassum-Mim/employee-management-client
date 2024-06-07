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
        element: <EmployeeList></EmployeeList>
      },
      {
        path: 'employee-details/:_id',
        element: <EmployeeChart></EmployeeChart>,
        loader: ({ params }) => fetch(`http://localhost:5000/users/${params._id}`)
      },
      // employee 
      {
        path: 'work-sheet',
        element: <EmployeeForm></EmployeeForm>,
      }
    ]
  },



]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
