import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import './App.css';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
    </>
  );
}

export default App;
