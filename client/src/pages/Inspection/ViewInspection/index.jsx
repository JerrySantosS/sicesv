// styles
import styles from './ViewInspection.module.css';
import { AppContext } from '../../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ViewInspection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useContext(AppContext);
  const [inspection, setInspection] = useState({
    exitDate: '',
    entryDate: '',
    exitKm: '',
    entryKm: '',
    route: '',
    Driver: {
      User: {
        name: '',
      },
    },
    Vehicle: {
      paca: '',
      model: '',
      Items: [],
    },
    Route: {
      name: '',
    },
    CheckLists: [],
  });

  useEffect(() => {
    if (location.state) {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/inspections/view/${
            location.state.id
          }`
        )
        .then((res) => {
          setInspection(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.err(err.message);
        });
    }
  }, []);

  // Converte data e hora para o formato String
  function parseDateToString(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();

    // Adiciona zeros antes dos números menores que 10
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    // Retorna a data e a hora no formato String
    return `${day}/${month}/${year} ${hour}:${minute}`;
  }

  return (
    <main className={styles.other}>
      <section>
        <div>
          <table className={styles.header_table}>
            <caption>Relatório de Check List</caption>
            <tr>
              <th scope="row">Placa:</th>
              <td>{inspection.Vehicle.paca || ''}</td>
              <th scope="row">Modelo:</th>
              <td>{inspection.Vehicle.model || ''}</td>
            </tr>

            <tr>
              <th scope="row">Motorista:</th>
              <td>{inspection.Driver.User.name || ''}</td>
              <th scope="row">Rota:</th>
              <td>{inspection.Route.name || ''}</td>
            </tr>

            <tr>
              <th scope="row">Saída: </th>
              <td>{parseDateToString(new Date(inspection.exitDate)) || ''}</td>
              <th scope="row">Chegada: </th>
              <td>{parseDateToString(new Date(inspection.entryDate)) || ''}</td>
            </tr>

            <tr>
              <th scope="row">Km saída: </th>
              <td>{inspection.exitKm || ''}</td>
              <th scope="row">Km chegada: </th>
              <td>{inspection.entryKm || ''}</td>
            </tr>
          </table>
        </div>
      </section>
      <section>
        <table className={styles.check_table}>
          <caption>Check List</caption>
          <thead>
            <tr>
              <th>Item</th>
              <th>Saída</th>
              <th>Entrada</th>
            </tr>
          </thead>
          <tbody>
            {inspection.Vehicle &&
              inspection.Vehicle.Items.map((item) => {
                let entry = null,
                  exit = null;

                inspection.CheckLists.forEach((check) => {
                  if (check.ItemId == item.id) {
                    if (check.type == 1) {
                      if (check.status) {
                        exit = 'OK';
                      } else {
                        exit = check.comment;
                      }
                    } else {
                      if (check.status) {
                        entry = 'OK';
                      } else {
                        entry = check.comment;
                      }
                    }
                  }
                });

                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{exit}</td>
                    <td>{entry}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default ViewInspection;
