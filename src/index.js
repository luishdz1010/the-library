import './style/index.scss';
import angular from 'angular';
import sanitize from 'angular-sanitize';
import animate from 'angular-animate';
import router from 'angular-ui-router';
import books from './books/books';

angular.module('library', [
  animate,
  sanitize,
  router,
  books
])

  .config(($urlRouterProvider) => {
    'ngInject';

    $urlRouterProvider.otherwise('/books');
  })

  .run(($trace, $rootScope, $urlRouter, $transitions, $document) => {
    'ngInject';

    $trace.enable('TRANSITION');

    let statesWithDefaultSubstate = {
      to: state => !!state.defaultSubstate
    };

    $transitions.onBefore(statesWithDefaultSubstate,
      trans => trans.router.stateService.target(trans.to().defaultSubstate));

    $rootScope.library = {};

    let unregister = $transitions.onSuccess({}, () => {
      $rootScope.library.isLoaded = true;
      angular.element($document[0].body).addClass('is-loaded');
      unregister();
    });
  });
