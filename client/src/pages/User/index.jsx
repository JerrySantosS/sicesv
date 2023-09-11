import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

// @Component
import UserForm from '../../components/forms/UserForm';

// types
import types from './types.mjs';

// styles
import './style.css';

const User = () => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [user, setUser] = useState();
  const [option, setOption] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  let type = '';

  useEffect(() => {
    // Setting variables data and type
    if (location.state) {
      updateData(location.state.user);
      type = location.state.type;
      if (type === 'delete') remove(location.state.user);
    }
    setOption(options);
  }, []);

  const options = () => {
    switch (type) {
      case 'new':
        return create;
      case 'edit':
        return update;
      case 'delete':
        return remove;
      default:
        return create;
    }
  };

  const updateData = async (data) => {
    try {
      let updatedUser = {};
      if (data.type === 'Gestor de Frotas') {
        updatedUser = await axios.get(
          `${import.meta.env.VITE_API_URL}/managers/user/${data.id}`
        );
      } else if (data.type === 'Motorista') {
        updatedUser = await axios.get(
          `${import.meta.env.VITE_API_URL}/drivers/user/${data.id}`
        );
      } else {
        updatedUser.data = data;
      }

      setIsUpdated(true);
      setUser(updatedUser.data);
    } catch (err) {
      setUser(err.message);
    }
  };

  const create = (data) => {
    if (data.driver) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/managers/active`, data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.response));
    } else if (data.user) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/drivers/active`, data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.response));
    } else {
      axios
        .post(`${import.meta.env.VITE_API_URL}/users/active`, data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.response));
    }
    navigate('/users');
  };

  const update = (data) => {
    if (data.driver) {
      axios
        .put(`${import.meta.env.VITE_API_URL}/managers/active/${data.id}`, data)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.response));
    } else if (data.user) {
      axios
        .put(`${import.meta.env.VITE_API_URL}/drivers/active/${data.id}`, data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.response));
    } else {
      axios
        .put(`${import.meta.env.VITE_API_URL}/users/active/${data.id}`, data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.response));
    }
    navigate('/users');
  };

  const remove = (data) => {
    console.log(data);
    if (data.Driver) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/managers/active/${data.id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.response));
    } else if (data.data) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/drivers/active/${data.id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.response));
    } else {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/users/active/${data.id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.response));
    }
    navigate('/users');
  };
  return (
    <>
      {isUpdated ? (
        <UserForm types={types} data={user} handleSubmit={option} />
      ) : (
        <h1>error: {user}</h1>
      )}
    </>
  );
};

export default User;
