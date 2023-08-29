import { FaUser, FaTruck, FaMapMarkedAlt } from 'react-icons/fa';
import { GiCarWheel } from 'react-icons/gi';

import Container from '../Container/index.mjs';
import './Options.css';

export default function Options({ title }) {
  return (
    <Container customClass="column">
      <div className="options">
        <h1>{title}</h1>
        <button type="button" className="option">
          <FaUser />
          Usuário
        </button>
        <button type="button" className="option">
          <FaTruck />
          Veículo
        </button>
        <button type="button" className="option">
          <GiCarWheel />
          Item
        </button>
        <button type="button" className="option">
          <FaMapMarkedAlt />
          Rota
        </button>
      </div>
    </Container>
  );
}
