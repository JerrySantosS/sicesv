import React, { useState } from 'react';
import { FaTruck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
// components
import Input from '../../form/Input/Input';
import Select from '../../form/Select/Select';
import Button from '../../form/Button/index';
import VehicleItems from '../VehicleItems';

function VehicleForm({ types, data, handleSubmit }) {
  const [vehicle, setVehicle] = useState(data);
  const [vehicleItems, setVehicleItems] = useState(data.Items || []);
  const [isVisible, setIsVisible] = useState(true);

  function submit(e) {
    e.preventDefault();
    console.log(vehicle);

    handleSubmit(vehicle);
  }

  function handleOnChange(e) {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    console.log(vehicle);
  }

  function handleSelect(e) {
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.options[e.target.selectedIndex].text,
    });
    console.log(vehicle);
  }

  function updateData() {
    let capacity = parseInt(vehicle.capacity);
    let items = [];

    if (vehicleItems.length > 0) {
      vehicleItems.forEach((vehicleItem) =>
        items.push({ ItemId: vehicleItem.id })
      );

      setVehicleItems(items);
    }

    setVehicle({ ...vehicle, capacity, VehicleItems: items });
  }

  function setType() {
    let value = '';

    if (vehicle.type) {
      value = types.type.find((type) => type.name === vehicle.type);
      return value.id;
    }
    return value;
  }

  function setBodyType() {
    let value = '';

    if (vehicle.bodyType) {
      value = types.bodyType.find(
        (bodyType) => bodyType.name === vehicle.bodyType
      );
      return value.id;
    }
    return value;
  }

  function setOwner() {
    let value = '';

    if (vehicle.owner) {
      value = types.owner.find((owner) => owner.name === vehicle.owner);
      return value.id;
    }
    return value;
  }

  function setDate(data) {
    if (data) return data.split('T')[0];

    return '';
  }

  return (
    <form onSubmit={submit}>
      {isVisible ? (
        <>
          <div className="header">
            <FaTruck /> Veículo
          </div>

          <section>
            <Input
              type="text"
              name="paca"
              text={'Placa'}
              placeholder="ZZZ-0000"
              value={vehicle.paca}
              handleOnChange={handleOnChange}
            />

            <Input
              type="text"
              name="model"
              text={'Modelo'}
              placeholder="Modelo do veículo"
              value={vehicle.model}
              handleOnChange={handleOnChange}
            />

            <Input
              type="date"
              name="manufactureDate"
              text={'Ano de Fabricação'}
              handleOnChange={handleOnChange}
              value={setDate(vehicle.manufactureDate)}
            />

            <Select
              type="text"
              name="type"
              text={'Tipo de Veículo'}
              options={types.type}
              value={setType()}
              handleOnChange={handleSelect}
            />

            <Select
              type="text"
              name="bodyType"
              text={'Tipo de carroceria'}
              options={types.bodyType}
              value={setBodyType()}
              handleOnChange={handleSelect}
            />

            <Input
              type="number"
              name="capacity"
              text={'Capacidade'}
              placeholder="Capacidade máxima do veículo"
              value={vehicle.capacity}
              handleOnChange={handleOnChange}
            />

            <Input
              type="text"
              name="renavam"
              text={'RENAVAM'}
              placeholder="Número do renavam"
              value={vehicle.renavam}
              handleOnChange={handleOnChange}
            />

            <Select
              type="text"
              name="owner"
              text={'Proprietário'}
              options={types.owner}
              value={setOwner()}
              handleOnChange={handleSelect}
            />
          </section>
          <section className="submit-section">
            <input type="submit" value="Salvar" onClick={updateData} />
            <Button
              onClick={() => {
                setIsVisible(false);
              }}
              text={'Ver Itens'}
            />
          </section>
        </>
      ) : (
        <VehicleItems
          vehicleItems={vehicleItems}
          setVehicleItems={setVehicleItems}
          setIsVisible={setIsVisible}
        />
      )}
    </form>
  );
}

export default VehicleForm;
