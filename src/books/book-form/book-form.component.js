class BookFormController {

  constructor(booksService) {
    'ngInject';

    this.booksService = booksService;
  }

  $onInit() {
    this.categories = this.booksService.findAllCategories();
  }
}

export default {
  controller: BookFormController,
  bindings: {
    book: '<lbBook',
    onSubmit: '&'
  },
  template: require('./book-form.html')
};
