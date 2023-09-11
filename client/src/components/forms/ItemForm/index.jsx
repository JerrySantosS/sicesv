import React, { useState } from 'react';
import { GiCarWheel } from 'react-icons/gi';

// components
import Input from '../../form/Input/Input';
import Select from '../../form/Select/Select';
import Submit from '../../form/Submit';

//style
import style from './ItemFrom.module.css';

export default function ItemForm({ types, handleSubmit, data }) {
  const [item, setItem] = useState(data);

  function submit(e) {
    e.preventDefault();
    handleSubmit(item);
  }

  function handleOnChange(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
    console.log(item);
  }

  function handleSelect(e) {
    setItem({
      ...item,
      [e.target.name]: e.target.options[e.target.selectedIndex].text,
    });
    console.log(item);
  }

  function setType() {
    let value = '';

    if (item.type) {
      value = types.type.find((type) => type.name === item.type);
      return value.id;
    }
    return value;
  }

  function setArea() {
    let value = '';

    if (item.area) {
      value = types.area.find((area) => area.name === item.area);
      return value.id;
    }
    return value;
  }

  return (
    <form onSubmit={submit} className={style.form}>
      <div className="header">
        <GiCarWheel /> Item
      </div>
      <section>
        <Input
          type="text"
          name="name"
          text={'Nome'}
          placeholder="Nome do item"
          value={item.name || ''}
          handleOnChange={handleOnChange}
        />

        <Select
          type="text"
          name="area"
          text={'Area do item'}
          options={types.area}
          value={setArea()}
          handleOnChange={handleSelect}
        />

        <Select
          type="text"
          name="type"
          text={'Tipo de item'}
          options={types.type}
          value={setType()}
          handleOnChange={handleSelect}
        />
      </section>
      <section className="submit-section">
        <Submit text="Salvar" />
      </section>
    </form>
  );
}
