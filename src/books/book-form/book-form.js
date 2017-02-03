import './book-form.scss';
import {module} from 'angular';
import uiSelect from '../../vendor/ui-select';
import uiDatePickerPopup from 'angular-ui-bootstrap/src/datepickerPopup';
import booksService from '../books.service';
import bookFormComponent from './book-form.component';

export default module('library.books.form', [
  uiSelect,
  uiDatePickerPopup,
  booksService
])

  .component('lbBookForm', bookFormComponent)

  .name;
