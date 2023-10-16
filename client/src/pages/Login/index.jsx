import { useContext } from 'react';
import Container from '../../components/layout/Container/Container';
import { AppContext } from '../../context/AppContext';

import sicesv from '../../img/sicesv_l.png';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const { token, setToken, user, setUser } = useContext(AppContext);

  async function submit(e) {
    e.preventDefault();
    console.log('submit');

    const form = e.target;
    const userName = form.elements.user.value;
    const password = form.elements.password.value;
    try {
      let res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        userName,
        password,
      });

      setToken(res.data.token);
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container customClass={'column'}>
      {token !== '' && navigate('/')}
      <div className={styles.main}>
        <section className={styles.container}>
          <img src={sicesv} alt="SICESV" />
          <h1>Sistema de controle de Entrada e Saída de Veículos</h1>
          <p className={styles.entre}>
            Entre com seu usuário e senha para ter acesso às funcionalidades do
            sistema.
          </p>
        </section>
        <section className={styles.container}>
          <div className={styles.form_container}>
            <form onSubmit={submit} className={styles.form}>
              <div className={styles.input}>
                <label htmlFor="user">Usuário</label>
                <input type="text" name="user" />
              </div>

              <div className={styles.input}>
                <label htmlFor="password">Senha</label>
                <input type="password" name="password" />
              </div>

              <button type="submit">Entrar</button>
            </form>

            <div id={styles.forgot}>
              <p>
                Esqueceu a senha? <a href="#">Clique aqui</a>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default Login;
