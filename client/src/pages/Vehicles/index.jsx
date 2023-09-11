import { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Table from '../../components/table/Table';

// columns
import { COLUMNS } from './columns.mjs';

import './style.css';
export default function Vehicles() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/vehicles/active').then((res) => {
      const users = res.data;
      setData(users);
    });
  }, []);

  const columns = useMemo(() => [COLUMNS], []);

  const options = {
    new: () => {
      navigate('/vehicle', {
        state: {
          vehicle: {},
          type: 'new',
        },
      });
    },
    view: (vehicle) => {
      navigate('/vehicle', {
        state: {
          vehicle,
          type: 'view',
        },
      });
    },
    edit: (vehicle) => {
      navigate('/vehicle', {
        state: {
          vehicle,
          type: 'edit',
        },
      });
    },
    delete: (vehicle) => {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/vehicles/active/${vehicle.id}`)
        .catch((err) => console.error(err.response));

      setData(data.filter((dataItem) => dataItem.id !== vehicle.id));
    },
  };

  return (
    <div className="container">
      <Table columns={columns} data={data} options={options} />
    </div>
  );
}
