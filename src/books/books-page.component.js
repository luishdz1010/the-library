class BooksPageController {
  constructor($state) {
    'ngInject';

    this.flash = $state.params.flash;
  }

  closeFlash() {
    this.flash = null;
  }
}

export default {
  controller: BooksPageController,
  template: require('./books-page.html')
};
