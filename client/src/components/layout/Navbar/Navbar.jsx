import { Link } from 'react-router-dom';
import Container from '../Container';

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
            <Link></Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default Navbar;
