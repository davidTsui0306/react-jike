import Layout from "@/pages/Layout";
import Login from "@/pages/Login";

import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from '@/components/AuthRoute'
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element:<AuthRoute><Layout /></AuthRoute>,
        children:[
            {
                index: true,          
                element: <Navigate to="home" />
            },
            {
                path:'home',
                element:<Home />
            },
            {
                path:'article',
                element:<Article />
            },
            {
                path:'publish',
                element:<Publish />
            }
        ]
    },
    {
        path: '/login',
        element:<Login />
    },
])

export default router