let empty = [];

class BooksGridComponent {

  constructor($scope, $uibModal, booksService, uiGridConstants) {
    'ngInject';

    this.modal = $uibModal;
    this.booksService = booksService;

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
          this.gridData.data = books;
          this.applyFilters();
          $scope.$apply();
        });
    });
  }

  $onChanges() {
    if (this.initialBooks && this.gridData.data === empty)
      this.gridData.data = this.initialBooks;
  }

  $onDestroy() {
    this.unregisterChangeListener();
  }

  applyFilters() {

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
        lbBook: () => book.book,
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
    initialBooks: '<?lbInitialBooks'
  },
  template: require('./books-grid.html')
};
