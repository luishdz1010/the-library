import 'angular-ui-grid/ui-grid.css';
import './books-grid.scss';
import {module} from 'angular';
import uiGrid from 'angular-ui-grid';
import uiModal from 'angular-ui-bootstrap/src/modal';
import uiSelect from '../../vendor/ui-select';
import booksService from '../books.service';
import bookDeleteDialog from '../delete-dialog/book-delete-dialog';
import bookBorrowDialog from '../borrow-dialog/book-borrow-dialog';
import bookReturnDialog from '../return-dialog/book-return-dialog';
import booksGridComponent from './books-grid.component.js';

export default module('library.books.grid', [
  uiGrid,
  uiModal,
  uiSelect,
  booksService,
  bookDeleteDialog,
  bookBorrowDialog,
  bookReturnDialog
])

  .component('lbBooksGrid', booksGridComponent)

  .name;
