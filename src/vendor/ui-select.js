import 'ui-select/dist/select.css';
import './ui-select.scss';
import {module} from 'angular';
import uiSelect from 'ui-select';

export default module('library.vendor.ui-select', [
  uiSelect
])
  .name;
