import React, { useState } from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';

// components
import Input from '../../form/Input/Input';
import Submit from '../../form/Submit';
//style
import style from './RouteForm.module.css';

const RouteForm = ({ handleSubmit, data }) => {
  const [route, setRoute] = useState(data);

  function submit(e) {
    e.preventDefault();
    handleSubmit(route);
  }

  function handleOnChange(e) {
    setRoute({ ...route, [e.target.name]: e.target.value });
    console.log(route);
  }

  return (
    <form onSubmit={submit} className={style.form}>
      <div className="header">
        <FaMapMarkedAlt /> Rota
      </div>
      <section>
        <Input
          type="text"
          name="name"
          text={'Nome'}
          placeholder="Nome da rota"
          value={route.name || ''}
          handleOnChange={handleOnChange}
        />
      </section>
      <section className="submit-section">
        <Submit text="Salvar" />
      </section>
    </form>
  );
};

export default RouteForm;
