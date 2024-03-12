export const COLUMNS = {
  Header: 'VEÍCULOS',
  columns: [
    {
      Header: 'Id',
      accessor: 'id',
      /* The first column is the id value on database.
                  It's not necessary to insert the column into the table, so
                  it wont be inserted */
      isVisible: false,
    },
    {
      Header: 'Placa',
      accessor: 'paca',
    },
    {
      Header: 'Tipo',
      accessor: 'type',
    },
    {
      Header: 'Modelo',
      accessor: 'model',
    },
    {
      Header: 'RENAVAM',
      accessor: 'renavam',
    },
    {
      Header: 'capacidade',
      accessor: 'capacity',
    },
    // {
    //   Header: 'Ano de fabricação',
    //   accessor: 'manufactureDate',
    //   Cell: ({ value }) => {
    //     return new Date(value).getFullYear();
    //   },
    // },
  ],
};
