import React from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

//components
import RouteForm from '../../components/forms/RouteForm';

const Route = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let data = {};
  let type = '';

  // Setting variables data and type
  if (location.state) {
    data = location.state.route;
    type = location.state.type;
  }

  const create = (route) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/routes/active`, route)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));

    navigate('/routes');
  };

  const update = (route) => {
    axios
      .put(`${import.meta.env.VITE_API_URL}/routes/active/${route.id}`, route)
      .then((res) => {
        console.log(res);
        navigate('/routes');
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

  return <RouteForm handleSubmit={option()} data={data} />;
};

export default Route;
