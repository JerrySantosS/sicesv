import React, { useState } from 'react';

import styles from './VehicleItem.module.css';

export default function VehicleItem({ item, handleItems, isChecked }) {
  const [checked, setChecked] = useState(isChecked);

  const handleOnChange = (e) => {
    handleItems(e);
    setChecked(!checked);
  };

  return (
    <div className={styles.check} key={item.id}>
      <input
        type="checkbox"
        id={item.id}
        value={item.name}
        onChange={handleOnChange}
        checked={checked}
      />
      <label htmlFor={item.id}>{item.name}</label>
    </div>
  );
}
