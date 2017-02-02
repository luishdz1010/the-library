class BookEditController {

  constructor($state, booksService) {
    'ngInject';

    this.state = $state;
    this.booksService = booksService;
  }

  save(book) {
    this.booksService.save(book)
      .then(() => {
        this.state.go('booksGrid', {
          flash: `Book <em>${book.title}</em> successfully updated!`
        }, {reload:true, inherit: false});
      })
      .catch((e) => {
        alert('An error ocurred! ' + e);
      });
  }
}

export default {
  controller: BookEditController,
  bindings: {
    book: '<lbBook'
  },
  template: require('./book-edit.html')
};
