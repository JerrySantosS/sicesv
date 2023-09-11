import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';

// componentes
import Input from '../../form/Input/Input';
import Select from '../../form/Select/Select';

// styles
import styles from './UserForm.module.css';
import DriverForm from '../DriverForm';
import ManagerForm from '../ManagerForm';

const UserForm = ({ types, handleSubmit, data }) => {
  const [user, setUser] = useState({});
  const [driver, setDriver] = useState({});
  const [manager, setManager] = useState({});

  // setando os estados
  useEffect(() => {
    if (data.Driver) {
      setManager({ id: data.id, email: data.email });
      setDriver({
        id: data.Driver.id,
        birthDate: data.Driver.birthDate,
        cnhNumber: data.Driver.cnhNumber,
        cnhValidity: data.Driver.cnhValidity,
        cnhCategory: data.Driver.cnhCategory,
        examValidity: data.Driver.examValidity,
        phone: data.Driver.phone,
      });
      setUser(data.Driver.User);
    } else if (data.User) {
      setDriver({
        id: data.id,
        birthDate: data.birthDate,
        cnhNumber: data.cnhNumber,
        cnhValidity: data.cnhValidity,
        cnhCategory: data.cnhCategory,
        examValidity: data.examValidity,
        phone: data.phone,
      });
      setUser(data.User);
    } else {
      setUser(data);
    }
  }, []);

  const setData = () => {
    if (user.type === 'Gestor de Frotas') {
      const driverRef = { ...driver, user };
      setManager({ ...manager, driver: driverRef });
    } else if (user.type === 'Motorista') {
      setDriver({ ...driver, user });
    }
  };

  function submit(e) {
    e.preventDefault();
    setData();
    // concatena as informações a depender do tipo de usuário
    if (user.type === 'Gestor de Frotas') {
      handleSubmit(manager);
    } else if (user.type === 'Motorista') {
      handleSubmit(driver);
    } else {
      handleSubmit(user);
    }
  }

  function handleOnChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSelect(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.options[e.target.selectedIndex].text,
    });
  }

  function SetType() {
    let value = '';

    if (user.type) {
      value = types.type.find((type) => type.name === user.type);
      return value.id;
    }
    return value;
  }

  return (
    <form onSubmit={submit}>
      <div className="header">
        <FaUser /> Usuário
      </div>
      <section className={styles.user}>
        <Input
          type="text"
          name="name"
          text={'Nome Completo'}
          placeholder="Nome completo do usuário"
          value={user.name || ''}
          handleOnChange={handleOnChange}
        />

        <Select
          type="text"
          name="type"
          text={'Tipo de Usuário'}
          options={types.type}
          value={SetType()}
          handleOnChange={handleSelect}
        />

        <Input
          type="text"
          name="userName"
          text={'Nome de Usuário'}
          placeholder="Nome para login"
          value={user.userName || ''}
          handleOnChange={handleOnChange}
        />

        <Input
          type="password"
          name="password"
          text={'Senha do Usuário'}
          placeholder=""
          handleOnChange={handleOnChange}
        />
      </section>

      {user.type === 'Motorista' && (
        <DriverForm
          types={types.cnhCategory}
          driver={driver}
          setDriver={setDriver}
        />
      )}
      {user.type === 'Gestor de Frotas' && (
        <>
          <DriverForm
            types={types.cnhCategory}
            driver={driver}
            setDriver={setDriver}
          />
          <ManagerForm manager={manager} setManager={setManager} />
        </>
      )}

      <section className="submit-section">
        <input type="submit" value="Salvar" onClick={setData} />
      </section>
    </form>
  );
};

export default UserForm;
