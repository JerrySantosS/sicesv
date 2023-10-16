import { useEffect, useState } from 'react';

// styles
import styles from './CheckListForm.module.css';
import CheckItem from './CheckItem';

const CheckListForm = ({ inspection, handleInspection, vehicle }) => {
  const [CheckLists, setCheckLists] = useState([]);
  let type = inspection.entryDate ? 2 : 1;

  // Sempre que o state checkList é atualizado, o state inspection também
  // o é com o novo valor de checkList
  useEffect(() => {
    if (CheckLists.length > 0) {
      handleInspection(CheckLists);
    }
  }, [CheckLists]);

  // Permite que o state checkList seja atualizado pelo componente checkItem
  const handleCheckLists = (checkItem) => {
    // Adiciona o tipo e o id da inspeção
    checkItem.type = type;
    checkItem.InspectionId = inspection.id;

    // Filtra o CheckList, removendo valor anterior do checkItem
    // a partir do id do item. Isso se havia o valor anterior.
    // Se não, então o checkItem é adicionado
    let filteredCheckLists = CheckLists.filter(
      (item) => item.ItemId !== checkItem.ItemId
    );

    // Atualiza checkList com o novo valor do checkItem
    setCheckLists([...filteredCheckLists, checkItem]);
  };

  return (
    <section>
      {vehicle.Items.map((item) => {
        return <CheckItem item={item} handleCheckLists={handleCheckLists} />;
      })}
    </section>
  );
};

export default CheckListForm;
