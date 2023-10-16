import { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// components
import Table from '../../components/table/Table';

// columns
import { COLUMNS } from './columns.mjs';

export default function Routes() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/routes/active`).then((res) => {
      const routes = res.data;
      setData(routes);
      console.log(routes);
    });
  }, []);

  const columns = useMemo(() => [COLUMNS], []);

  const options = {
    new: () => {
      navigate('/route', {
        state: {
          route: {},
          type: 'new',
        },
      });
    },
    view: (route) => {
      navigate('/route', {
        state: {
          route,
          type: 'view',
        },
      });
    },
    edit: (route) => {
      navigate('/route', {
        state: {
          route,
          type: 'edit',
        },
      });
    },
    delete: (route) => {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/routes/active/${route.id}`)
        .catch((err) => console.error(err.response));

      setData(data.filter((dataItem) => dataItem.id !== route.id));
    },
  };

  return (
    <div className="container">
      <Table columns={columns} data={data} options={options} />
    </div>
  );
}
