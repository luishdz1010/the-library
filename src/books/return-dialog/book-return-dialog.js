import {module} from 'angular';
import bookReturnDialogComponent from './book-return-dialog.component';

export default module('library.books.return-dialog', [])

  .component('lbBookReturnDialog', bookReturnDialogComponent)

  .name;
