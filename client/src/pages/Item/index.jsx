import React from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

// components
import ItemForm from '../../components/forms/ItemForm';

// importação dos tipos
import types from './types.mjs';

export default function Item() {
  const navigate = useNavigate();
  const location = useLocation();

  let data = {};
  let type = '';

  // Setting variables data and type
  if (location.state) {
    data = location.state.item;
    type = location.state.type;
  }

  const create = (item) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/items/active`, item)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));

    navigate('/items');
  };

  const update = (item) => {
    axios
      .put(`${import.meta.env.VITE_API_URL}/items/active/${item.id}`, item)
      .then((res) => {
        console.log(res);
        navigate('/items');
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

  return <ItemForm types={types} handleSubmit={option()} data={data} />;
}
