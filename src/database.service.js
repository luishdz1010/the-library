import {module} from 'angular';
import PouchDB from 'pouchdb-browser';

export default module('library.database', [])

  .service('dbService', class {
    constructor($window) {
      'ngInject';

      this.db = new PouchDB('library');

      if (process.env.NODE_ENV === 'development') {
        // PouchDB.debug.enable('*');
        $window.db = this.db;
      }
    }
  })

  .name;
