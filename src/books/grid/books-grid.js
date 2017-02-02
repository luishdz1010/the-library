import 'angular-ui-grid/ui-grid.css';
import {module} from 'angular';
import uiGrid from 'angular-ui-grid';
import uiModal from 'angular-ui-bootstrap/src/modal';
import booksService from '../books.service';
import bookDeleteDialog from '../delete/book-delete-dialog';
import bookBorrowDialog from '../borrow-dialog/book-borrow-dialog';
import booksGridComponent from './books-grid.component.js';

export default module('library.books.grid', [
  uiGrid,
  uiModal,
  booksService,
  bookDeleteDialog,
  bookBorrowDialog
])

  .component('lbBooksGrid', booksGridComponent)

  .name;
