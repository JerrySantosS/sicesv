import { useEffect, useState } from 'react';
import { AiOutlineCheckSquare, AiOutlineCloseSquare } from 'react-icons/ai';

// styles
import styles from './CheckItem.module.css';

const CheckItem = ({ item, handleCheckLists }) => {
  const [checked, setChecked] = useState(undefined);

  // Sempre que o state checked é atualizado, a função handleCheckList
  // é chamada para modificar, ou adicionar, o valor do checkItem no state
  // ChecckList
  useEffect(() => {
    let checkItem = { ItemId: item.id };
    if (checked != undefined) {
      if (checked % 2 === 0) {
        checkItem.status = true;
      } else if (checked % 2 === 1) {
        checkItem.status = false;
      }
      handleCheckLists(checkItem);
    }
  }, [checked]);

  // gerencia o botão de não OK do checkItem
  const handleClose = (e) => {
    if (checked === undefined) {
      setChecked(1);
    } else {
      setChecked((prev) => {
        return prev + 1;
      });
    }
  };

  // gerencia o botão de OK no checkItem
  const handleCheck = (e) => {
    if (checked === undefined) {
      setChecked(2);
    } else {
      setChecked((prev) => {
        return prev + 1;
      });
    }
  };

  return (
    <div key={item.id} id={item.id} className={styles.check_container}>
      <button
        type="button"
        className={styles.check}
        onClick={handleCheck}
        style={checked % 2 == 0 ? { backgroundColor: '#2eea63 ' } : {}}
      >
        <AiOutlineCheckSquare />
      </button>
      <button
        type="button"
        style={checked % 2 == 1 ? { backgroundColor: '#ff4b4b' } : {}}
        className={styles.no_check}
        onClick={handleClose}
      >
        <AiOutlineCloseSquare />
      </button>
      <label htmlFor={item.id}>{item.name}</label>
    </div>
  );
};

export default CheckItem;
