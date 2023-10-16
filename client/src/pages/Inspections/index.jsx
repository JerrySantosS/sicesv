import { FaCalendarCheck, FaSearch } from 'react-icons/fa';

import InspectionForm from '../../components/forms/InspectionForm';
import styles from './Inspection.module.css';
import { useNavigate } from 'react-router-dom';

function Inspections() {
  const navigate = useNavigate();

  const doInspection = () => {
    navigate('/inspection', {
      state: { type: 'new' },
    });
  };

  return (
    <div className="options">
      <h1>Inspeção</h1>
      <button type="button" className="option" onClick={doInspection}>
        <FaCalendarCheck />
        Fazer Inspeção
      </button>
      <button type="button" className="option">
        <FaSearch />
        Ver Inspeções
      </button>
    </div>
    // <InspectionForm />;
  );
}

export default Inspections;
