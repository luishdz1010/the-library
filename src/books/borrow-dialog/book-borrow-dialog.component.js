class BookBorrowDialogController {

  constructor($scope, customersService) {
    'ngInject';

    this.scope = $scope;
    this.customersService = customersService;
  }

  $onInit() {
    this.book = this.resolve.lbBook;

    this.customersService.findAll()
      .then((customers) => {
        this.customers = customers;
        this.scope.$apply();
      });
  }
}

export default {
  controller: BookBorrowDialogController,
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  template: require('./book-borrow-dialog.html')
};
