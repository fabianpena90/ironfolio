import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';


import {
  generateRows,
  defaultColumnValues,
} from '../../../demo-data/generator';

const getRowId = row => row.id;

 function Testing() {
  const [columns] = useState([
    { name: 'name', title: 'Name' },
    { name: 'gender', title: 'Gender' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
  ]);
  const [rows, setRows] = useState(generateRows({
    columnValues: { id: ({ index }) => index, ...defaultColumnValues },
    length: 8,
  }));

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <EditingState
          onCommitChanges={commitChanges}
        />
        <Table />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn
          showAddCommand
          showEditCommand
          showDeleteCommand
        />
      </Grid>
    </Paper>
  );
};

export default Testing;