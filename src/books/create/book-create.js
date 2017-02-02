import {module} from 'angular';
import bookForm from '../book-form/book-form';
import bookCreateComponent from './book-create.component';

export default module('library.books.create', [
  bookForm
])
  
  .component('lbBookCreate', bookCreateComponent)

  .name;
