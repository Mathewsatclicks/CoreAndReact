import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

export const routes: RouteObject[] =
    [
        {
            path: '/',
            element: <App />,
            children: [
                { path: '', element: <HomePage /> },
                { path: 'activities', element: <ActivityDashBoard /> },
                { path: 'activities/:id', element: <ActivityDetails /> },
                { path: 'createACtivity', element: <ActivityForm key='create' /> },
                { path: 'manage/:id', element: <ActivityForm key='manage' /> },
                { path: 'errors', element: <TestErrors /> },
                { path: 'not-found', element: <NotFound /> },
                { path: 'server-error', element: <ServerError /> },
                { path: '*', element: <Navigate replace to='/not-found' /> }
            ]
        }
    ]
export const router = createBrowserRouter(routes);
