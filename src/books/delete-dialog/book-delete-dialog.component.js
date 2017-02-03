class BookDeleteDialogController {
  $onInit() {
    this.book = this.resolve.lbBook;
  }
}

export default {
  controller: BookDeleteDialogController,
  template: require('./book-delete-dialog.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};
