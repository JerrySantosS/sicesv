import React, { useContext, useEffect, useState } from 'react';
import { FaCalendarCheck } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// componentes
import Input from '../../form/Input/Input';
import Select from '../../form/Select/Select';
import Button from '../../form/Button';
import CheckListForm from '../CheckListForm';

// styles
import styles from './InspectionForm.module.css';
import { AppContext } from '../../../context/AppContext';

const InspectionForm = ({ handleSubmit }) => {
  const { user } = useContext(AppContext);
  const [routes, setRoutes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [vehicle, setVehicle] = useState({});
  const [driver, setDriver] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [exitDate, setExitDate] = useState(new Date());
  const [entryDate, setEntryDate] = useState(null);
  const [inspection, setInspection] = useState({
    exitDate: new Date(),
    entryDate: null,
    exitKm: null,
    entryKm: null,
    RouteId: null,
    DriverId: null,
    VehicleId: null,
    comment: null,
    CheckLists: null,
  });

  const navigate = useNavigate();

  const getApiData = async (name) => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_API_URL}/${name}/active`
      );
      return response.data;
    } catch (err) {
      console.error(err);
      return {};
    }
  };

  // Pega, solicitando a api, os valores das rotas, dos veículos e dos itens
  useEffect(() => {
    (async () => {
      const res = await Promise.all([
        getApiData('routes'),
        getApiData('vehicles'),
      ]);

      setRoutes(res[0]);
      setVehicles(res[1]);

      // pegar o id de motorista pelo id de usuário
      if (user.type == 'Motorista' || user.type == 'Gestor de Frotas') {
        try {
          // Busca na api um motorista através do id de usuário
          let drvr = await axios.get(
            `${import.meta.env.VITE_API_URL}/drivers/user/${user.id}`
          );
          setDriver(drvr.data);
          // console.log(drvr);
          // vendo se existe alguma inspeção	em aberto
          let inspctn = await axios.get(
            `${import.meta.env.VITE_API_URL}/inspections/open/${drvr.data.id}`
          );

          // Se exitir uma data de saída, então alguns ajustes devem ser feitos:
          if (inspctn.data != null && inspctn.data.exitDate) {
            // setta a data de chegada
            let newDate = new Date();
            setEntryDate(newDate);
            setInspection({ ...inspctn.data, entryDate: newDate });

            // setta o state exitDate com a data de saída do BD
            setExitDate(new Date(inspctn.data.exitDate));
          } else {
            console.log(':)');
            setInspection({ ...inspection, DriverId: drvr.data.id });
          }
        } catch (err) {
          console.error(err.message);
        } finally {
          if (inspection.VehicleId)
            setVehicle(() => {
              return vehicles.find((v) => v.id === inspection.VehicleId);
            });
        }
      } else {
        alert('Você não têm acesso a essa funcionalidade.');
        navigate('/login');
      }
    })();
  }, []);

  function submit(e) {
    e.preventDefault();
    if (inspection.comment.length < 1 || !inspection.comment) {
      let cmmt = '';
      setInspection({ ...inspection, comment: cmmt });
    }

    if (inspection.entryDate) {
      handleSubmit.update(inspection);
    } else {
      handleSubmit.create(inspection);
    }
  }

  // Guarda os valores dos Km de saída e chegada
  function handleOnChange(e) {
    if (e.target.name === 'exitKm' || e.target.name === 'entryKm') {
      setInspection({
        ...inspection,
        [e.target.name]: parseFloat(e.target.value),
      });
    } else {
      setInspection({
        ...inspection,
        [e.target.name]: e.target.value,
      });
    }

    console.log(inspection);
  }

  // Guarda a rota selecionada
  function handleRoute(e) {
    setInspection({
      ...inspection,
      RouteId: parseInt(e.target.options[e.target.selectedIndex].value),
    });
  }

  function findVehicle(id) {
    return vehicles.find((v) => v.id === id);
  }
  // Guarda o veículo selecionado
  function handleVehicle(e) {
    setInspection({
      ...inspection,
      VehicleId: e.target.selectedIndex,
    });

    setVehicle(findVehicle(e.target.selectedIndex));
  }
  // converte o objeto vehicle para o formato do Select
  function parseVehicle() {
    if (vehicles.length > 0) {
      return vehicles.map((vehicle) => {
        return {
          id: vehicle.id,
          name: vehicle.paca,
        };
      });
    }

    return [{ id: 1, name: 'Não encontrado' }];
  }

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

  // função passada para o componente CheckListForm alterar o state inspection
  // com os dados do check list
  function handleInspection(CheckLists) {
    setInspection({ ...inspection, CheckLists });
    console.log(inspection);
  }

  return (
    <form onSubmit={submit}>
      <div className="header">
        <FaCalendarCheck /> Inspeção
      </div>
      {!isVisible && (
        <section className={styles.user}>
          <div className={styles.date}>
            <div>
              <p>Saída:</p>
              <span>{parseDateToString(exitDate)}</span>
            </div>
            <div>
              <p>Chegada:</p>
              <span>{entryDate && parseDateToString(entryDate)}</span>
            </div>
          </div>
          {/* Veículo a ser inspecionado*/}
          <Select
            type="text"
            name="vehicle"
            text={'Selecione o veículo'}
            options={parseVehicle()}
            handleOnChange={handleVehicle}
            value={inspection.VehicleId}
          />
          {/* Km de saída */}
          <Input
            type="text"
            name="exitKm"
            text={'Km de Saída'}
            placeholder=""
            value={inspection.exitKm || ''}
            handleOnChange={handleOnChange}
          />
          {/* Se existir data de chegada, o input é rendeirizado */}
          {entryDate && (
            <Input
              type="text"
              name="entryKm"
              text={'Km de Chegada'}
              placeholder=""
              value={inspection.entryKm || ''}
              handleOnChange={handleOnChange}
            />
          )}
          {/* Rota de Saída */}
          <Select
            type="text"
            name="route"
            text={'Selecione a rota'}
            options={routes}
            handleOnChange={handleRoute}
            value={inspection.RouteId}
          />
        </section>
      )}
      <section>
        {isVisible && (
          <>
            <CheckListForm
              inspection={inspection}
              handleInspection={handleInspection}
              vehicle={findVehicle(inspection.VehicleId)}
            />
            <div className={styles.comentario}>
              <label htmlFor="comentario">Comentário:</label>
              <textarea
                type="text"
                name="comment"
                placeholder="Descreva as irregularidades encontradas no veículo"
                onChange={handleOnChange}
                rows={5}
                cols={30}
                value={inspection.comment}
              />
            </div>
          </>
        )}
      </section>
      <section className="submit-section">
        <Button
          text={!isVisible ? 'Ir para o Check List' : 'Voltar'}
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        />
        {isVisible && <input type="submit" value="Salvar" />}
      </section>
    </form>
  );
};

export default InspectionForm;
