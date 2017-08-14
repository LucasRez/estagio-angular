'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.cardsView',
    'myApp.insertCardView',
    'myApp.editCardView',
    'myApp.paymentsView',
    'myApp.cardServices',
    'ui.bootstrap',
    'ui.utils.masks',
    'ui.mask'
    ])

.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    localStorage.appKey = "5c07773bfa62c3cc744bffbbcd72f2fd"

    $routeProvider
    .when('/cards', {
        templateUrl: 'cardsView/cardsView.html',
        controller: 'CardsViewCtrl',
        controllerAs: 'vm',
    })
    .when('/addCard', {
        templateUrl: 'insertCardView/insertCardView.html',
        controller: 'InsertCardCtrl',
        controllerAs: 'vm',
    })
    .when('/cards/:cardId/payments', {
        templateUrl: 'paymentsView/paymentsView.html',
        controller: 'PaymentsViewCtrl',
        controllerAs: 'vm',
    })
    .when('/editCard/:cardId', {
        templateUrl: 'editCardView/editCardView.html',
        controller: 'EditCardCtrl',
        controllerAs: 'vm',
    });


    $routeProvider.otherwise({redirectTo: '/cards'});

}])

.constant('config', {
    "URL": "http://estagio.zagu.com.br/"
});
