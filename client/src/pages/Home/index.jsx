import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../../context/AppContext';

import sicesv from '../../img/sicesv_l.png';
import styles from './Home.module.css';
import Options from '../../components/layout/Options';

function Home() {
  const navigate = useNavigate();
  const { token, user } = useContext(AppContext);
  const [users, setUsers] = useState([]);

  return (
    <div className={styles.home}>
      {/* {token === '' && navigate('/login')} */}
      <h1>SEJA BEM VINDO AO SICESV: {user.name}</h1>
      <img src={sicesv} alt="" />
      {/* <Options /> */}
    </div>
  );
}

export default Home;
