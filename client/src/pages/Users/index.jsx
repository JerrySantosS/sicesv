import { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// commponents
import Table from '../../components/table/Table';

// columns
import { COLUMNS } from './columns.mjs';

// Styles
import './style.css';

export default function Users() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/users/active`).then((res) => {
      const users = res.data;
      setData(users);
      console.error(users);
    });
  }, []);

  const options = {
    new: () => {
      navigate('/user', {
        state: {
          user: {},
          type: 'new',
        },
      });
    },
    view: (user) => {
      navigate('/user', {
        state: {
          user,
          type: 'view',
        },
      });
    },
    edit: (user) => {
      navigate('/user', {
        state: {
          user,
          type: 'edit',
        },
      });
    },
    delete: (user) => {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/items/active/${user.id}`)
        .catch((err) => console.error(err.response));

      setData(user.filter((dataItem) => dataItem.id !== user.id));
    },
  };

  const columns = useMemo(() => [COLUMNS], []);

  return (
    <div className="container">
      <Table columns={columns} data={data} options={options} />
    </div>
  );
}
