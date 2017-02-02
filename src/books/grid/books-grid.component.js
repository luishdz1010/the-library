let empty = [];

class BooksGridComponent {

  constructor($scope, $uibModal, booksService) {
    'ngInject';

    this.modal = $uibModal;
    this.booksService = booksService;

    this.gridData = {
      appScopeProvider: this,
      enableColumnMenus: false,
      data: empty,
      rowHeight: 37,
      columnDefs: [
        {name: 'Title', field: 'book.title'},
        {name: 'Author', field: 'book.author'},
        {name: 'Category', field: 'book.category'},
        {name: 'Published Date', field: 'book.publishedDate', cellFilter: 'date:mediumDate'},
        {
          name: 'Borrowed By', field: 'borrowedBy.name',
          cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD || "No one" }}</div>'
        },
        {
          name: 'Actions', enableSorting: false, maxWidth: 100,
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

  remove(book) {
    console.log(book);
    let modal = this.modal.open({
      component: 'lbBookDeleteDialog',
      resolve: {
        lbBook: () => book.book
      }
    });

    modal.result
      .then(() => {
        this.booksService.remove(book.book);
      });
  }
}

export default {
  controller: BooksGridComponent,
  bindings: {
    initialBooks: '<?lbInitialBooks'
  },
  template: require('./books-grid.html')
};
