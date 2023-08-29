import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

// componentes
import Input from '../../form/Input/Input';
import Select from '../../form/Select/Select';

// styles
import styles from './UserForm.module.css';
import DriverForm from '../DriverForm';
import ManagerForm from '../ManagerForm';

const UserForm = ({ types, handleSubmit, data }) => {
  const [user, setUser] = useState(data);

  function submit(e) {
    e.preventDefault();
    handleSubmit(user);
  }

  function handleOnChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  }

  function handleSelect(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.options[e.target.selectedIndex].text,
    });
    console.log(user);
  }

  function SetType() {
    let value = '';

    if (user.type) {
      value = types.type.find((type) => type.name === user.type);
      console.log(user.type);
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
          name="Nome"
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
          name="user_name"
          text={'Nome de Usuário'}
          placeholder="Nome para login"
          value={user.userName || ''}
          handleOnChange={handleOnChange}
        />
      </section>

      {user.type === 'Motorista' && <DriverForm types={types.cnhCategory} />}
      {user.type === 'Gestor de Frotas' && (
        <>
          <DriverForm types={types.cnhCategory} />
          <ManagerForm />
        </>
      )}

      <section className="submit-section">
        <input type="submit" value="Salvar" />
        <input type="submit" value="Editar" />
      </section>
    </form>
  );
};

export default UserForm;
