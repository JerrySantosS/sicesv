import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import InspectionForm from '../../components/forms/InspectionForm';

const Inspection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let type = '';

  // Setting variables data and type
  if (location.state) {
    type = location.state.type;
  }

  const create = (inspection) => {
    try {
      axios
        .post(`${import.meta.env.VITE_API_URL}/inspections`, inspection)
        .then((res) => {
          alert('Inspeção adicionada com sucesso!');
          navigate('/inspections');
        });
    } catch (err) {
      console.log(err);
    }
  };

  const update = (inspection) => {
    try {
      axios
        .put(
          `${import.meta.env.VITE_API_URL}/inspections/${inspection.id}`,
          inspection
        )
        .then((res) => {
          alert('Inspeção finalizada com sucesso!');
          navigate('/inspections');
        });
    } catch (err) {
      console.log(err);
    }
  };

  const options = { create: create, update: update };

  return <InspectionForm handleSubmit={options} />;
};

export default Inspection;
