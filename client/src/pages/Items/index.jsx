import { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// components
import Table from '../../components/table/Table';

// columns
import { COLUMNS } from './columns.mjs';

// Styles
// import './style.css';

export default function Items() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/items/active`).then((res) => {
      const items = res.data;
      setData(items);
      console.log(items);
    });

    console.log(import.meta.env.VITE_API_URL);
  }, []);

  const columns = useMemo(() => [COLUMNS], []);

  const options = {
    new: () => {
      navigate('/item', {
        state: {
          item: {},
          type: 'new',
        },
      });
    },
    view: (item) => {
      navigate('/item', {
        state: {
          item,
          type: 'view',
        },
      });
    },
    edit: (item) => {
      navigate('/item', {
        state: {
          item,
          type: 'edit',
        },
      });
    },
    delete: (item) => {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/items/active/${item.id}`)
        .catch((err) => console.error(err.response));

      setData(data.filter((dataItem) => dataItem.id !== item.id));
    },
  };

  return (
    <div className="container">
      <Table columns={columns} data={data} options={options} />
    </div>
  );
}
