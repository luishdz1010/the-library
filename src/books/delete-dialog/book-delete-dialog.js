import {module} from 'angular';
import bookDeleteDialogComponent from './book-delete-dialog.component';

export default module('library.books.delete-dialog', [])

  .component('lbBookDeleteDialog', bookDeleteDialogComponent)

  .name;
