import { FaCalendarCheck, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

import Table from '../../components/table/Table';

import styles from './Inspection.module.css';

// columns
import { COLUMNS } from './columns.mjs';

function Inspections() {
  const [inspections, setInspections] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const columns = useMemo(() => [COLUMNS], []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/inspections/table/view`)
      .then((res) => {
        setInspections(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const options = {
    new: () => {
      navigate('/inspection', {
        state: {
          inspection: {},
          type: 'new',
        },
      });
    },
    view: (inspection) => {
      navigate('/view', {
        state: {
          id: inspection.id,
        },
      });
    },
    edit: (inspection) => {
      navigate('/inspection', {
        state: {
          inspection,
          type: 'edit',
        },
      });
    },
    delete: (inspection) => {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/inspections/${inspection.id}`)
        .catch((err) => console.error(err.response));

      setInspections(
        inspections.filter((dataItem) => dataItem.id !== inspection.id)
      );
    },
  };

  const doInspection = () => {
    navigate('/inspection');
  };

  return (
    <>
      {!isVisible ? (
        <div className="options">
          <h1>Inspeção</h1>
          <button type="button" className="option" onClick={doInspection}>
            <FaCalendarCheck />
            Fazer Inspeção
          </button>
          <button
            type="button"
            className="option"
            onClick={() => {
              setIsVisible(!isVisible);
            }}
          >
            <FaSearch />
            Ver Inspeções
          </button>
        </div>
      ) : (
        <div className="container">
          <Table columns={columns} data={inspections} options={options} />
        </div>
      )}
    </>
  );
}

export default Inspections;
