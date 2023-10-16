// Bibliotecas
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// componetes
import { AppContext } from '../../../context/AppContext';

// icons
import { IoNotificationsSharp, IoMenu, IoClose } from 'react-icons/io5';
import { GiExitDoor, GiHamburgerMenu } from 'react-icons/gi';

//images
import sicesv from '../../../img/sicesv_white.png';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);
  const [mobile, setMobile] = useState(false);

  function toggleMobile() {
    if (mobile) {
      setMobile(!mobile);
    }
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="icon">
          <img src={sicesv} alt="SICESV" onClick={toggleMobile} />
        </Link>
      </div>

      <div className={mobile ? 'nav-list-mobile' : 'nav-list'}>
        <ul onClick={toggleMobile}>
          <li className="nav-item">
            <Link to={'/users'}>Usuários</Link>
          </li>
          <li className="nav-item">
            <Link to={'/vehicles'}>Veículos</Link>
          </li>
          <li className="nav-item">
            <Link to={'/items'}>Itens</Link>
          </li>
          <li className="nav-item">
            <Link to={'/routes'}>Rotas</Link>
          </li>
          <li className="nav-item">
            <Link to={'/inspections'}>Inspeção</Link>
          </li>
        </ul>
      </div>

      <div className="action-buttons">
        <button onClick={toggleMobile}>
          <IoNotificationsSharp />
        </button>

        <button
          onClick={() => {
            toggleMobile;
            setToken('');
            navigate('/login');
          }}
        >
          <GiExitDoor />
        </button>
      </div>

      <div className="mobile-menu-icon">
        <button
          onClick={() => {
            setTimeout(() => {
              setMobile(!mobile);
            }, 100);
          }}
        >
          {mobile ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
