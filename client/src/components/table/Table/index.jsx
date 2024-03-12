import { useTable } from 'react-table';

// Styles
import './style.css';
import { useEffect, useState } from 'react';

export default function Table({ columns, data, options }) {
  const [value, setValue] = useState({});
  const [tableRow, setTRow] = useState();

  // Utilizando o hook useTable e passando as colunas com os dados.
  // É retornado para a gente todas as informações necessárias para
  // montar a tabela.
  const {
    getTableProps, // propriedades da tabela
    getTableBodyProps, // propriedades do corpo da tabela
    headerGroups, // os valores de agrupamento de tabela, caso sua tabela use
    rows, // linhas da tabela baseado nos dados e colunas
    prepareRow, // Prepara a linha (Essa função deve ser chamada para cada linha)
  } = useTable({
    columns,
    data,
    initialState: { hiddenColumns: ['id'] },
  });

  function changeRowColor(clickedRow) {
    // Change row color for table default color
    if (
      tableRow === clickedRow &&
      tableRow.style.backgroundColor === 'rgb(120, 241, 118)'
    ) {
      tableRow.style.backgroundColor = '';
      return;
    }
    if (tableRow !== undefined) tableRow.style.backgroundColor = '';
    //Change the background color of the row.
    clickedRow.style.backgroundColor = 'rgb(120, 241, 118)';
    //Get the row that was clicked on.
    setTRow(clickedRow);
  }

  /*
    Aqui renderizamos a nossa tabela.
    Como já sabemos, o React Table não possui nenhum comportamento visual, logo,
    depende que a gente adicione os elementos e estilo.
    O React Table vai ajudar a gente a controlar os estados e lógicas da tabela.
  */
  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, i) => {
              return (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              onClick={(e) => {
                // change the line bg color
                changeRowColor(e.target.closest('tr'));
                // get the value of the id of line data row.values.id
                // to use identify on the data array
                // getting the value in the data array
                setValue(data.find((item) => item.id === row.values.id));
              }}
            >
              {row.cells.map((cell, i) => {
                // render the line cells
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={columns[0].columns.length}>
            <div className="action-buttons">
              <button id="veiw" onClick={() => options.view(value)}>
                Ver
              </button>
              <button id="create" onClick={() => options.new()}>
                Criar
              </button>
              <button id="edit" onClick={() => options.edit(value)}>
                Editar
              </button>
              <button id="delete" onClick={() => options.delete(value)}>
                Excluir
              </button>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
