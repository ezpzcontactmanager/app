import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import axios from 'axios';

export const tablePaging = paginationFactory({
    sizePerPage: 10,
    showTotal: true
});

export const selectRow = {
    mode: 'radio',
    clickToSelect: true,
    clickToEdit: true,
    onSelect: (row, isSelect, rowIndex, e) => {
    return true;
     },
    style: { backgroundColor: '#c8e6c9' }
};
// This is the event that fires when a cell is edited. More specifically (beforeSaveCell)
export const cellEdit = cellEditFactory({
    mode: 'dbclick',
    beforeSaveCell(oldValue, newValue, row, column, done) {
        console.log(row)
    }
    });

export const nullChecker = cell => ((cell == "") ? "-" : cell);