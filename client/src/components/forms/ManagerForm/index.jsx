import React from 'react';

// componentes
import Input from '../../form/Input/Input';

const ManagerForm = () => {
  return (
    <section>
      <Input
        type="email"
        name="email"
        text="Endereço de Email"
        placeholder="email@example.com"
      />
    </section>
  );
};

export default ManagerForm;
