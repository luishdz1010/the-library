import {module} from 'angular';
import databaseService from '../database.service';
import customerData from './customers-data.json';

export default module('library.customers.service', [
  databaseService
])

  .service('customersService', class {
    constructor(dbService) {
      'ngInject';

      this.db = dbService.db;

      this.db.bulkDocs(customerData)
        .catch((e) => {
          console.error(e);
        });
    }

    findAll() {
      return this.db.allDocs({
        include_docs: true,
        attachments: true,
        startkey: 'user',
        endkey: 'user\uffff'
      });
    }
  })

  .name;
