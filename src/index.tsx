import React from 'react';
import ReactDOM from "react-dom/client"
import { createRoot } from 'react-dom/client';
import App from './components/App';
import ErrorPage from "./error-page";
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import LoginPage from './components/LoginPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
]);

const container = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(container).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)


// const root = createRoot(container);
// root.render(<App />);
