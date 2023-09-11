import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// @components
import VehicleForm from '../../components/forms/VehicleForm';

// importação dos tipos
import types from './types.mjs';

// styles
import './style.css';
import axios from 'axios';

export default function Vehicle() {
  const navigate = useNavigate();
  const location = useLocation();

  let data = {};
  let type = '';

  // Setting variables data and type
  if (location.state) {
    data = location.state.vehicle;
    type = location.state.type;
    console.log(location.state.vehicle);
  }

  const create = (vehicle) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/vehicles/active`, vehicle)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));

    navigate('/vehicles');
  };

  const update = (vehicle) => {
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/vehicles/active/${vehicle.id}`,
        vehicle
      )
      .then((res) => {
        console.log(res);
        navigate('/vehicles');
      })
      .catch((err) => console.log(err.response));
  };

  function option() {
    switch (type) {
      case 'new':
        return create;
      case 'edit':
        return update;
      default:
        return create;
    }
  }

  return <VehicleForm types={types} handleSubmit={option()} data={data} />;
}
