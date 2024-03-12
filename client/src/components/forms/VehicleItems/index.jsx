import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { GiCarWheel, GiSteeringWheel } from 'react-icons/gi';

//styles
import styles from './VehicleItems.module.css';
import Button from '../../form/Button';
import VehicleItem from './VehicleItem';

const VehicleItems = ({ vehicleItems, setVehicleItems, setIsVisible }) => {
  const [hasItems, setHasItems] = useState(true);
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (vehicleItems.length === 0) {
      setHasItems(false);
      setText('Salvar');
      getItems();
    } else {
      setText('Editar');
    }

    console.log(vehicleItems);
  }, []);

  const oldItems = useMemo(() => vehicleItems, []);

  async function getItems() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/items/active`
      );
      // oldItems = vehicleItems;
      setItems(res.data);
      console.log(oldItems);
      return;
    } catch (err) {
      return console.error(err);
    }
  }

  function handleOnChange(e) {
    let newItems = [];
    console.log(e.target.checked);
    // Se um item for marcado, então é adicionado ao array
    if (e.target.checked) {
      if (vehicleItems.find((item) => item.id == e.target.id) === undefined) {
        const item = items.find((item) => item.id == e.target.id);

        if (item) {
          newItems = [...vehicleItems, item];
          setVehicleItems(newItems);
          console.log(newItems);
        } else {
          alert('Ops!');
        }
      }
      // Se for desmarcado, então é removido do array
    } else {
      if (vehicleItems.find((item) => item.id == e.target.id)) {
        newItems = [...vehicleItems];
        const i = newItems.findIndex((item) => item.id == e.target.id);
        newItems.splice(i, 1);

        setVehicleItems(newItems);
        console.log(newItems);
      }
    }
  }

  // Oculta o formulário de itens
  function hideForm() {
    // if (hasItems) setVehicleItems(oldItems);
    setIsVisible(true);
  }

  // função responsável por definir os itens que já estão cadastrados
  // para um veículo. Assim o checkbox vai ficar marcado na tela de edição
  const isChecked = function (id) {
    if (oldItems.length < 1) return false;

    const item = oldItems.find((item) => item.id === id);
    if (item) {
      return true;
    } else {
      return false;
    }
  };

  async function handleButton() {
    let newItems;
    // Se o texto for 'Editar' então vamos pegar todos os itens da API
    // para que o usuário possa adicionar ou remover itens
    if (text === 'Editar') {
      console.log(oldItems);
      setText('Salvar');
      setHasItems(false);
      await getItems();
    } else {
      if (items.length > 0) {
        // newItems = vehicleItems.filter((vehicleItem) =>
        //   items.some((item) => item.id == vehicleItem.id)
        // );
        // setVehicleItems(newItems);
        setHasItems(false);
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
      {!hasItems && <h1>Selecione os itens para o veículo.</h1>}

      {!hasItems &&
        items.map((item) => {
          return (
            <VehicleItem
              item={item}
              handleItems={handleOnChange}
              isChecked={isChecked(item.id)}
            />
          );
        })}

      {hasItems &&
        vehicleItems.map((item) => {
          return (
            <VehicleItem item={item} handleItems={(e) => {}} isChecked={true} />
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
