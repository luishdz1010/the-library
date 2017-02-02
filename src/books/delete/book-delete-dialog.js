import {module} from 'angular';
import bookDeleteDialogComponent from './book-delete-dialog.component';

export default module('library.books.delete', [])

  .component('lbBookDeleteDialog', bookDeleteDialogComponent)

  .name;
