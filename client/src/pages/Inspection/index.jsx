import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import InspectionForm from '../../components/forms/InspectionForm';

const Inspection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let data = {};
  let type = '';

  // Setting variables data and type
  if (location.state) {
    data = location.state.inspection;
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

  const options = { create, update };

  return <InspectionForm handleSubmit={options} data={data} />;
};

export default Inspection;
