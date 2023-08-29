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
        state: '',
        type: 'new',
      });
    },
    view: (data) => {
      navigate('/vehicle', {
        state: data,
        type: 'view',
      });
    },
    edit: (data) => {
      navigate('/vehicle', {
        state: data,
        type: 'view',
      });
    },
    delete: (data) => {},
  };

  return (
    <div className="container">
      <Table columns={columns} data={data} options={options} />
    </div>
  );
}
