export const COLUMNS = {
  Header: 'INSPEÇÕES',
  columns: [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Placa',
      accessor: 'paca',
    },
    {
      Header: 'Motorista',
      accessor: 'driver',
    },
    {
      Header: 'Rota',
      accessor: 'route',
    },
    {
      Header: 'Saída',
      accessor: 'exitDate',
      Cell: ({ value }) => {
        const exitDate = new Date(value);
        return `${exitDate.getDate()}/${exitDate.getMonth()}/${exitDate.getFullYear()}`;
      },
    },
  ],
};
