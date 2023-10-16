// componentes
import Input from '../../form/Input/Input';
import Select from '../../form/Select/Select';

// styles
import styles from './DriverForm.module.css';

const DriverForm = ({ types, driver, setDriver }) => {
  function handleOnChange(e) {
    setDriver({ ...driver, [e.target.name]: e.target.value });
  }

  function handleSelect(e) {
    setDriver({
      ...driver,
      [e.target.name]: e.target.options[e.target.selectedIndex].text,
    });
  }

  function setDate(data) {
    if (data) return data.split('T')[0];

    return '';
  }

  function setType() {
    let value = '';

    if (driver.cnhCategory) {
      value = types.find((type) => type.name === driver.cnhCategory);
      return value.id;
    }
    return '';
  }

  return (
    <section className={styles.driver}>
      <Input
        type="text"
        name="cnhNumber"
        text={'Número da CNH'}
        placeholder="Número da CNH"
        handleOnChange={handleOnChange}
        value={driver.cnhNumber || ''}
      />
      <Input
        type="date"
        name="birthDate"
        text={'Data de Nascimento'}
        handleOnChange={handleOnChange}
        value={setDate(driver.birthDate)}
      />
      <Input
        type="date"
        name="cnhValidity"
        text={'Validade da CNH'}
        handleOnChange={handleOnChange}
        value={setDate(driver.cnhValidity)}
      />
      <Select
        type="text"
        name="cnhCategory"
        text={'Selecione a categoria da CNH'}
        options={types}
        handleOnChange={handleSelect}
        value={setType()}
      />
      <Input
        type="date"
        name="examValidity"
        text={'Validade do exame toxicológico'}
        handleOnChange={handleOnChange}
        value={setDate(driver.examValidity)}
      />
      <Input
        type="tel"
        name="phone"
        text={'Número de Telefone'}
        placeholder="00)00000-0000"
        handleOnChange={handleOnChange}
        value={driver.phone}
      />
    </section>
  );
};

export default DriverForm;
