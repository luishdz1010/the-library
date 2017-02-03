import {module} from 'angular';
import uiSelect from '../../vendor/ui-select';
import customersService from '../../customers/customers.service';
import bookBorrowDialogComponent from './book-borrow-dialog.component';

export default module('library.books.borrow-dialog', [
  uiSelect,
  customersService
])

  .component('lbBookBorrowDialog', bookBorrowDialogComponent)

  .name;
