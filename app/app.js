'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view2',
    'myApp.cardsView',
    'myApp.insertCardView',
    'ui.bootstrap'
])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider
            .when('/cards', {
                templateUrl: 'cardsView/cardsView.html',
                controller: 'CardsViewCtrl',
                controllerAs: 'vm',
            })
            .when('/view2', {
                templateUrl: 'view2/view2.html',
                controller: 'View2Ctrl',
                controllerAs: 'vm',
            })
            .when('/addCard', {
                templateUrl: 'insertCardView/insertCardView.html',
                controller: 'InsertCardCtrl',
                controllerAs: 'vm',
            });


        $routeProvider.otherwise({redirectTo: '/cards'});

    }])

    .constant('config', {
        "URL": "http://estagio.zagu.com.br/"
    });
