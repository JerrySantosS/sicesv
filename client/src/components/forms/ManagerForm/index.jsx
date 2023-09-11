import React from 'react';

// componentes
import Input from '../../form/Input/Input';

const ManagerForm = ({ manager = {}, setManager }) => {
  function handleOnChange(e) {
    setManager({ ...manager, [e.target.name]: e.target.value });
  }
  return (
    <section>
      <Input
        type="email"
        name="email"
        text="Endereço de Email"
        placeholder="email@example.com"
        handleOnChange={handleOnChange}
        value={manager.email}
      />
    </section>
  );
};

export default ManagerForm;
