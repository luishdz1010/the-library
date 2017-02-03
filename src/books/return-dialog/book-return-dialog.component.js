class BookReturnDialogController {
  $onInit() {
    console.log(this.resolve);
    ({lbBook: this.book, lbBorrowedBy: this.borrowedBy} = this.resolve);
  }
}

export default {
  controller: BookReturnDialogController,
  template: require('./book-return-dialog.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};
