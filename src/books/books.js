import {module} from 'angular';
import uiAlert from 'angular-ui-bootstrap/src/alert';
import booksService from './books.service';
import booksGrid from './grid/books-grid';
import bookEdit from './edit/book-edit';
import bookCreate from './create/book-create';
import booksPageComponent from './books-page.component';
import dummyBooks from './books-data.json';

export default module('library.books', [
  uiAlert,
  booksService,
  booksGrid,
  bookEdit,
  bookCreate
])

  .config(($stateProvider) => {
    'ngInject';

    $stateProvider.state({
      name: 'books',
      url: '/books',
      defaultSubstate: 'booksGrid',
      component: 'lbBooksPage',
      params: {
        flash: null
      }
    });

    $stateProvider.state({
      name: 'booksGrid',
      parent: 'books',
      views: {
        'content@books': 'lbBooksGrid'
      },
      resolve: {
        lbInitialBooks(booksService) {
          'ngInject';
          return booksService.findAll();
        },
        lbCategories(booksService) {
          'ngInject';
          return booksService.findAllCategories();
        }
      }
    });

    $stateProvider.state({
      name: 'bookEdit',
      parent: 'booksGrid',
      url: '/:book/edit',
      views: {
        'content@books': 'lbBookEdit'
      },
      resolve: {
        lbBook($stateParams, booksService) {
          'ngInject';
          return booksService.find($stateParams.book);
        }
      }
    });

    $stateProvider.state({
      name: 'bookCreate',
      parent: 'booksGrid',
      url: '/create',
      views: {
        'content@books': 'lbBookCreate'
      }
    });
  })

  .component('lbBooksPage', booksPageComponent)

  .run((booksService) => {
    'ngInject';

    booksService.scaffold(dummyBooks);
  })

  .name;
