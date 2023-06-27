import { Link } from 'react-router-dom';
import Container from '../Container';
import { IoNotificationsSharp } from 'react-icons/io5';

import sicesv from '../../../img/sicesv_white.png';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/" className={styles.icon}>
          <img src={sicesv} alt="SICESV" />
        </Link>

        <ul>
          <li>
            <Link to={'/register'}>Cadastros</Link>
          </li>
          <li>
            <Link to={'/consult'}>Consultas</Link>
          </li>
          <li>
            <Link to={'/report'}>Relatórios</Link>
          </li>
          <li>
            <Link to={'/inspection'}>Inspeção</Link>
          </li>
        </ul>

        <div>
          <IoNotificationsSharp />
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
