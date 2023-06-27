import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../../context/AppContext';

import styles from './Home.module.css';

function Home() {
  const navigate = useNavigate();
  const { token, user } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/api/users/active', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={styles.home}>
      {token === '' && navigate('/login')}
      <h1>SEJA BEM VINDO AO SICESV: {user.userName}</h1>
      <ul>
        {users ? (
          users.map((user) => (
            <li key={user.id}>
              {'Usuário: ' +
                user.userName +
                '     ' +
                'Senha: ' +
                user.password}
            </li>
          ))
        ) : (
          <li>Não há usuários cadastrados</li>
        )}
      </ul>
    </div>
  );
}

export default Home;
