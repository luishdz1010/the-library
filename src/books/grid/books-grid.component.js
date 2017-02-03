import includes from 'lodash/includes';
import trim from 'lodash/trim';

const empty = [];

class BooksGridComponent {

  constructor($scope, $uibModal, booksService, uiGridConstants) {
    'ngInject';

    this.modal = $uibModal;
    this.booksService = booksService;

    this.search = '';
    this.filteredCategories = [];
    this.gridData = {
      appScopeProvider: this,
      enableColumnMenus: false,
      data: empty,
      rowHeight: 37,
      columnDefs: [
        {name: 'Title', field: 'book.title', sort: {direction: uiGridConstants.ASC, priority: 0}},
        {name: 'Author', field: 'book.author'},
        {name: 'Category', field: 'book.category'},
        {name: 'Published Date', field: 'book.publishedDate', cellFilter: 'date:mediumDate'},
        {
          name: 'Borrowed By', field: 'borrowedBy.name',
          cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD || "-" }}</div>'
        },
        {
          name: 'Actions', enableSorting: false, maxWidth: 150,
          cellClass: 'text-center',
          cellTemplate: require('./books-grid-actions.html')
        }
      ]
    };

    this.unregisterChangeListener = booksService.addChangeListener(() => {
      this.booksService.findAll()
        .then(books => {
          this.rawData = books;
          this.applyFilters();
          $scope.$apply();
        });
    });
  }

  $onChanges() {
    if (this.initialBooks && this.gridData.data === empty) {
      this.rawData = this.initialBooks;
      this.applyFilters();
    }
  }

  $onDestroy() {
    this.unregisterChangeListener();
  }

  searchChanged() {
    this.applyFilters();
  }

  filteredCategoriesChanged() {
    this.applyFilters()
  }

  applyFilters() {
    let data = this.rawData;

    let search = trim(this.search).toLowerCase();
    if (search) {
      data = data.filter(({book, borrowedBy}) =>
        includes(book.title.toLowerCase(), search) ||
        includes(book.author.toLowerCase(), search) ||
        (borrowedBy && includes(borrowedBy.name.toLowerCase(), search))
      )
    }

    if (this.filteredCategories.length)
      data = data.filter(({book}) => includes(this.filteredCategories, book.category));

    this.gridData.data = data;
  }

  clearFilters() {
    this.search = '';
    this.filteredCategories = [];
    this.applyFilters();
  }

  remove({book}) {
    let modal = this.modal.open({
      component: 'lbBookDeleteDialog',
      resolve: {
        lbBook: () => book
      }
    });

    modal.result
      .then(() => {
        this.booksService.remove(book)
          .catch(e => alert(e));
      })
      .catch(() => void 0);
  }

  borrow({book}) {
    let modal = this.modal.open({
      component: 'lbBookBorrowDialog',
      resolve: {
        lbBook: () => book
      }
    });

    modal.result
      .then((customer) => {
        book.borrowedBy = customer._id;
        this.booksService.save(book)
          .catch(e => alert(e));
      })
      .catch(() => 0);
  }

  returnBook({book, borrowedBy}) {
    let modal = this.modal.open({
      component: 'lbBookReturnDialog',
      resolve: {
        lbBook: () => book,
        lbBorrowedBy: () => borrowedBy
      }
    });

    modal.result
      .then(() => {
        book.borrowedBy = null;
        this.booksService.save(book)
          .catch(e => alert(e));
      })
      .catch(() => 0);
  }
}

export default {
  controller: BooksGridComponent,
  bindings: {
    initialBooks: '<?lbInitialBooks',
    categories: '<lbCategories'
  },
  template: require('./books-grid.html')
};
