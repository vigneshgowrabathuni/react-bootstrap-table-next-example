import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
const Table = (props) => {
  const { data, columns, pagination, rowEvents } = props;
  return (
    <div>
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
        pagination={pagination}
        rowEvents={rowEvents}
      />
    </div>
  );
};
export default Table;
