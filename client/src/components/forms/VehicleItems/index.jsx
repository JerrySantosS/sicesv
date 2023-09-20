import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { GiCarWheel, GiSteeringWheel } from 'react-icons/gi';

//styles
import styles from './VehicleItems.module.css';
import Button from '../../form/Button';

const VehicleItems = ({ vehicleItems, setVehicleItems, setIsVisible }) => {
  const [hasItems, setHasItems] = useState(true);
  const [text, setText] = useState('');
  let items = [];

  useEffect(() => {
    if (vehicleItems.length === 0) {
      setHasItems(false);
      setText('Salvar');
      getItems();
    } else {
      setText('Editar');
    }
  }, []);

  const oldItems = useMemo(() => vehicleItems, []);
  async function getItems() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/items/active`
      );
      // oldItems = vehicleItems;
      setVehicleItems(res.data);
      console.log(oldItems);
      return;
    } catch (err) {
      return console.error(err);
    }
  }

  function handleOnChange(e) {
    console.log(e.target.checked);
    // Se um item for marcado, então é adicionado ao array
    if (e.target.checked) {
      items.push({
        id: e.target.id,
        name: e.target.value,
      });
      // Se for desmarcado, então é removido do array
    } else {
      items = items.filter((item) => item.id !== e.target.id);
    }

    console.log(items);
  }

  // Oculta o formulário de itens
  function hideForm() {
    if (hasItems) setVehicleItems(oldItems);
    setIsVisible(true);
  }

  // função responsável por definir os itens que já estão cadastrados
  // para um veículo. Assim o checkbox vai ficar marcado na tela de edição
  function isChecked(id) {
    console.log(oldItems);

    if (oldItems.length < 1) return false;

    const item = oldItems.find((item) => item.id === id);
    if (item === undefined) {
      return false;
    } else {
      console.log('iruuu \n\n');
      // Adiciona o item checado aos itens
      // caso o usuário desmarque, então é removido (handleOnChange)
      items.push(item);
      return true;
    }
  }

  async function handleButton() {
    let newItems;
    // Se o texto for 'Editar' então vamos pegar todos os itens da API
    // para que o usuário possa adicionar ou remover itens
    if (text === 'Editar') {
      console.log(oldItems);
      setText('Salvar');
      await getItems();
    } else {
      if (items.length > 0) {
        newItems = vehicleItems.filter((vehicleItem) =>
          items.some((item) => item.id == vehicleItem.id)
        );
        setVehicleItems(newItems);
      } else {
        setVehicleItems([]);
      }
      hideForm();
    }
  }

  return (
    <section className={styles.container}>
      <div className="header">
        <GiCarWheel /> Itens do Veículo <GiSteeringWheel />
      </div>
      {!hasItems && (
        <h1>
          Não há itens cadastrados. <br /> Selecione os itens para o veículo.
        </h1>
      )}
      {vehicleItems.map((item) => {
        return (
          <div className={styles.check} key={item.id}>
            <input
              type="checkbox"
              id={item.id}
              value={item.name}
              onChange={handleOnChange}
              // checked={isChecked(item.id)}
            />
            <label htmlFor={item.id}>{item.name}</label>
          </div>
        );
      })}
      <div className={styles.submit}>
        <Button onClick={hideForm} text={'Voltar'} />
        <Button onClick={handleButton} text={text} />
      </div>
    </section>
  );
};

export default VehicleItems;
