'use strict';

angular.module('myApp.insertCardView', ['ngRoute'])

.controller('InsertCardCtrl', ["$http", "config", "$scope", "$log", function($http, config, $scope, $log) {
	var vm = this;
	$scope.valid = {};
	$scope.anos = [];
	$scope.meses = [];
	$scope.card = {};
	$scope.newCard = {};

	vm.inicializa = function () {
		for (var i = 1; i < 13; i++) {
			$scope.meses.push(i);
		}

		for (var i = 2017; i < 2067; i++) {
			$scope.anos.push(i);
		}
	}

	vm.inicializa();
	vm.enviaCartao = function (card) {
		angular.copy(card, $scope.newCard);
		$scope.newCard.limit *= 100;
		$log.info($scope.newCard);
		$scope.valid.number = angular.isNumber($scope.card.number);
		$log.info($scope.valid);
	}
}]);