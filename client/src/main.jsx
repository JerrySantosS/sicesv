import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//context
import { AppProvider } from './context/AppContext.jsx';
// components
import App from './App.jsx';
import Login from './pages/Login';
import Home from './pages/Home';
import Users from './pages/Users';
import User from './pages/User';
import Inspection from './pages/Inspection';
import Inspections from './pages/Inspections';
import Vehicles from './pages/Vehicles';
import Vehicle from './pages/Vehicle';
import Items from './pages/Items';
import Item from './pages/Item';
import Routes from './pages/Routes';
import Route from './pages/Route';
// styles
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/users', element: <Users /> },
      { path: '/user', element: <User /> },
      { path: '/vehicles', element: <Vehicles /> },
      { path: '/vehicle', element: <Vehicle /> },
      { path: '/items', element: <Items /> },
      { path: '/item', element: <Item /> },
      { path: '/routes', element: <Routes /> },
      { path: '/route', element: <Route /> },
      { path: '/inspections', element: <Inspections /> },
      { path: '/inspection', element: <Inspection /> },
    ],
  },
]);
try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </React.StrictMode>
  );
} catch (err) {
  console.error(err);
}
