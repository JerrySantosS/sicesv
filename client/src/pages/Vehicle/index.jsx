import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaTruck  } from 'react-icons/fa';

// components
import Input from '../../components/form/Input/Input';
import Select from '../../components/form/Select/Select';

// styles
import './style.css';

export default function Vehicle() {
  const location = useLocation();

  return (
    <form onSubmit={''}>
      <div className='header'>
      <FaTruck /> Veículo
      </div>
      <section>
        <Input type="text" name="paca" text={'Placa'} placeholder="ZZZ-0000" />

        <Input
          type="text"
          name="model"
          text={'Modelo'}
          placeholder="Modelo do veículo"
        />

        <Input type="date" name="manufacture_date" text={'Ano de Fabricação'} />

        <Select
          type="text"
          name="type"
          text={'Tipo de Veículo'}
          options={types.type}
        />

        <Select
          type="text"
          name="body_type"
          text={'Tipo de carroceria'}
          options={types.bodyType}
        />

        <Input
          type="number"
          name="capacity"
          text={'Capacidade'}
          placeholder="Capacidade máxima do veículo"
        />

        <Input
          type="text"
          name="renavam"
          text={'RENAVAM'}
          placeholder="Número do renavam"
        />

        <Select
          type="text"
          name="owner"
          text={'Proprietário'}
          options={types.owner}
        />
      </section>
      <section className='submit-section'>
        <input type="submit" value="Salvar" />
        <input type="submit" value="Editar" />
      </section>
    </form>
  );
}

const types = {
  owner: [
    {
      id: 1,
      name: 'Serra Grande Bebidas',
    },
    {
      id: 2,
      name: 'Transportadora Nova Era',
    },
  ],
  type: [
    {
      id: 1,
      name: '3/4 (VUC)',
    },
    {
      id: 2,
      name: 'TOCO',
    },
    {
      id: 3,
      name: 'TRUCK',
    },
    {
      id: 4,
      name: 'CAVALO MECÂNICO SIMPLES',
    },
    {
      id: 5,
      name: 'CAVALO MECÂNICO TRUCADO',
    },
    {
      id: 6,
      name: 'CARRO COMUM',
    },
    {
      id: 7,
      name: 'MOTOCICLETA',
    },
  ],
  bodyType: [
    {
      id: 1,
      name: 'GRADE DE MADEIRA',
    },
    {
      id: 2,
      name: 'GRADE DE METAL',
    },
    {
      id: 3,
      name: 'BAÚ',
    },
    {
      id: 4,
      name: 'SIDER',
    },
    {
      id: 5,
      name: 'PLATAFORMA',
    },
  ],
};
