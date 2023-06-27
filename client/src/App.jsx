import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import Container from './components/layout/Container/Container';

function App() {
  const { token } = useContext(AppContext);
  return (
    <div>
      {token !== 'u' && <Navbar />}

      <Container customClass="min_height">
        <Outlet />
      </Container>

      <Footer />
    </div>
  );
}

export default App;
