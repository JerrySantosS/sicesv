// componentes
import Input from '../../form/Input/Input';
import Select from '../../form/Select/Select';

// styles
import styles from './DriverForm.module.css';
const DriverForm = ({ types }) => {
  return (
    <section className={styles.driver}>
      <Input
        type="tel"
        name="cnh_number"
        text={'Número de Telefone'}
        placeholder="00)00000-0000"
      />

      <Input
        type="text"
        name="cnh_number"
        text={'Número da CNH'}
        placeholder="Número da CNH"
      />

      <Input type="date" name="birth_date" text={'Data de Nascimento'} />
      <Input type="date" name="birth_date" text={'Validade da CNH'} />

      <Select
        type="text"
        name="user_type"
        text={'Selecione a categoria da CNH'}
        options={types}
      />

      <Input
        type="date"
        name="birth_date"
        text={'Validade do exame toxicológico'}
      />
    </section>
  );
};

export default DriverForm;
