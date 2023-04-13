import React from 'react';
import ReactDOM from "react-dom/client"
import { createRoot } from 'react-dom/client';
import App from './components/App';
import ErrorPage from "./error-page";
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import RegistrationPage from './components/RegistrationForm';
import LoginPage from './components/LoginPage';
import PetCard from './components/PetCard';





const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: "/register",
        element: <RegistrationPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />
    },
])

const container = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(container).render(
        // <React.StrictMode>
            <RouterProvider router={router} />
        // </React.StrictMode>
)


// const root = createRoot(container);
// root.render(<App />);
