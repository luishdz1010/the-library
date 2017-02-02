import 'ui-select/dist/select.css';
import './book-form.scss';
import {module} from 'angular';
import uiSelect from 'ui-select';
import booksService from '../books.service';
import bookFormComponent from './book-form.component';

export default module('library.books.form', [
  uiSelect,
  booksService
])

  .component('lbBookForm', bookFormComponent)

  .name;
