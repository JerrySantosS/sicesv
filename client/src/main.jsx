import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Login from './pages/Login';
import Home from './pages/Home/Home.jsx';
import Register from './pages/Register/Register.jsx';
import Consult from './pages/Consult/Consult.jsx';
import Report from './pages/Report/Report.jsx';
import Inspection from './pages/Inspection/Inspection.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/consult', element: <Consult /> },
      { path: '/report', element: <Report /> },
      { path: '/inspection', element: <Inspection /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);

// <coreProvider>
// <BrowserRouter>
//   <Routes>
//     <Route element={<App />}>
//       <Route path="/" element={<Login />} />
//       <Route path="/login" element={<Login />} />
//       {/* <Route path='/' element={<Home />} /> */}
//     </Route>
//   </Routes>
// </BrowserRouter>
// </coreProvider>
