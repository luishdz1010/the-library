import {module} from 'angular';
import bookForm from '../book-form/book-form';
import booksService from '../books.service';
import bookEditComponent from './book-edit.component';

export default module('library.books.edit', [
  bookForm,
  booksService
])

  .component('lbBookEdit', bookEditComponent)

  .name;
