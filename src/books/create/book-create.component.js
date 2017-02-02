class BookCreateController {

  constructor($state, booksService) {
    'ngInject';

    this.state = $state;
    this.booksService = booksService;
    this.book = {};
  }

  save(book) {
    this.booksService.save(book)
      .then(() => {
        this.state.go('booksGrid', {
          flash: `Book <em>${book.title}</em> successfully created!`
        }, {reload:true});
      })
      .catch((e) => {
        alert('An error ocurred! ' + e);
      });
  }
}

export default {
  controller: BookCreateController,
  template: require('./book-create.html')
};
