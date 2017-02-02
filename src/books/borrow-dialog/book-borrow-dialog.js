import {module} from 'angular';
import bookBorrowDialogComponent from './book-borrow-dialog.component';
// import borrowDialog from '';

export default module('library.books.borrow', [])

  .component('lbBookBorrowDialog', bookBorrowDialogComponent)

  .name;
