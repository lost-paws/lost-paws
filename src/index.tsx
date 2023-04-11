import React from 'react';
import ReactDOM from "react-dom/client"
import { createRoot } from 'react-dom/client';
import App from './components/App';
import ErrorPage from "./error-page";
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import RegistrationPage from './components/RegistrationForm';


import { CookiesProvider } from 'react-cookie';



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
    }
])

const container = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(container).render(
    <CookiesProvider>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </CookiesProvider>
)


// const root = createRoot(container);
// root.render(<App />);
