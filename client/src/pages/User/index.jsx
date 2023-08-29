import React from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

// @Component
import UserForm from '../../components/forms/UserForm';

// types
import types from './types.mjs';

// styles
import './style.css';

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let data = {};
  let type = '';

  // Setting variables data and type
  if (location.state) {
    data = location.state.user;
    type = location.state.type;
    console.log(location.state);
  }

  const create = (user) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/users/active`, user)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));

    navigate('/users');
  };

  const update = (user) => {
    axios
      .put(`${import.meta.env.VITE_API_URL}/users/active/${user.id}`, user)
      .then((res) => {
        console.log(res);
        navigate('/users');
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

  return <UserForm types={types} handleSubmit={option()} data={data} />;
};

export default User;
