import { useEffect, useRef, useState } from 'react';
import { AiOutlineCheckSquare, AiOutlineCloseSquare } from 'react-icons/ai';

// styles
import styles from './CheckItem.module.css';

const CheckItem = ({ item, handleCheckLists }) => {
  const [checked, setChecked] = useState(undefined);
  const [checkItem, setCheckItem] = useState({
    ItemId: item.id,
    status: undefined,
    comment: '',
  });
  const commentRef = useRef('');

  const handleOnChange = () => {
    setCheckItem({ ...checkItem, comment: commentRef.current.value });
    handleCheckLists({ ...checkItem, comment: commentRef.current.value });
  };

  const handleOnClick = (value) => {
    if (value % 2 === 1) {
      setCheckItem({ ...checkItem, status: false });
      handleCheckLists({ ...checkItem, status: false });
    } else {
      setCheckItem({ ...checkItem, status: true, comment: '' });
      handleCheckLists({ ...checkItem, status: true, comment: '' });
    }
  };

  // gerencia o botão de não OK do checkItem
  const handleClose = () => {
    if (checked === undefined) {
      setChecked(1);
      handleOnClick(1);
    } else {
      setChecked((prev) => {
        handleOnClick(prev + 1);
        return prev + 1;
      });
    }
  };

  // gerencia o botão de OK no checkItem
  const handleCheck = () => {
    if (checked === undefined) {
      setChecked(2);
      handleOnClick(2);
    } else {
      setChecked((prev) => {
        handleOnClick(prev + 1);
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
      {checked % 2 == 1 && (
        <textarea
          type="text"
          name="comment"
          placeholder="Descreva as irregularidades encontradas no veículo"
          ref={commentRef}
          onChange={handleOnChange}
          rows={2}
          cols={25}
          value={checkItem.comment}
        />
      )}
    </div>
  );
};

export default CheckItem;
