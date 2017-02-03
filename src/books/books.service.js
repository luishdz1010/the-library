import {module} from 'angular';
import databaseService from '../database.service';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';

const designId = '_design/books';

export default module('library.books.service', [
  databaseService
])

  .service('booksService', class {
    constructor(dbService) {
      'ngInject';

      this.db = dbService.db;

      let design = {
        _id: designId,
        views: {
          booksWithBorrower: {
            map: function (doc) {
              if (doc.type === 'book') {
                emit([doc.lastUpdated, doc.title], null);

                if (doc.borrowedBy)
                  emit([doc.lastUpdated, doc.title], {_id: doc.borrowedBy});
              }
            }.toString()
          }
        }
      };

      this.db.get(designId, (err, doc) => {
        if (!err)
          design._rev = doc._rev;

        this.db.put(design);
      });
    }

    scaffold(data) {
      this.db.put({_id: 'bookscaffold'})
        .then(() => {
          this.db.bulkDocs(data)
            .catch(alert);
        })
        .catch(() => void 0);
    }

    addChangeListener(listener) {
      let changes = this.db.changes({
        since: 'now',
        live: true,
        filter: '_view',
        view: 'books/booksWithBorrower'
      }).on('change', listener);

      return () => changes.cancel();
    }

    findAll() {
      return this.db.viewCleanup()
        .then(() =>
          this.db.query('books/booksWithBorrower', {
            include_docs: true,
            attachments: true
          })
        )
        .then((docs) => {
          let rows = map(groupBy(docs.rows, 'id'), values => ({
            book: get(values, '0.doc'),
            borrowedBy: get(values, '1.doc')
          }));

          rows.forEach(({book}) => {
            book.publishedDate = new Date(book.publishedDate);
          });

          return rows;
        });
    }

    find(bookId) {
      return this.db.get(bookId)
        .then(book => {
          book.publishedDate = new Date(book.publishedDate);
          return book;
        });
    }

    save(book) {
      book.type = 'book';
      book.lastUpdated = new Date();
      return book._id ? this.db.put(book) : this.db.post(book);
    }

    remove(book) {
      return this.db.get(book._id)
        .then((doc) => {
          doc._deleted = true;
          return this.db.put(doc);
        });
    }

    findAllCategories() {
      return [
        {title: 'Drama', description: ''},
        {title: 'Action and Adventure', description: ''},
        {title: 'Romance', description: ''},
        {title: 'Mystery', description: ''},
        {title: 'Horror', description: ''},
        {title: 'Self help', description: ''},
        {title: 'Health', description: ''},
        {title: 'Guide', description: ''},
        {title: 'Travel', description: ''}
      ];
    }
  })

  .name;
