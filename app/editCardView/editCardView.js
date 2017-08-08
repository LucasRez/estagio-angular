'use strict';

angular.module('myApp.editCardView', ['ngRoute'])

.controller('EditCardCtrl', ["$http", "config", "$scope", "$location", "$routeParams", function($http, config, $scope, $location, $routeParams) {
	var vm = this;
	$scope.anos = [];
	$scope.meses = [];
	$scope.newCard = {};

	vm.inicializa = function () {
		for (var i = 1; i < 13; i++) {
			$scope.meses.push(i);
		}

		for (var i = 2017; i < 2061; i++) {
			$scope.anos.push(i);
		}
	}

	vm.sendGet = function () {
		$http({
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer 5c07773bfa62c3cc744bffbbcd72f2fd'
			},
			url: config.URL + "cards/" + $routeParams.cardId,
		}).then(function (response) {
			$scope.card = response.data;
			$scope.card.limit /= 100;

		}, function (response) {
			$scope.card = response.data || 'Request failed';

		});
	}

	vm.inicializa();
	vm.sendGet();

	vm.enviaCartao = function (card) {
		angular.copy(card, $scope.newCard);

		$scope.erros = [];
		$scope.btnDisable = true;
		if (!$scope.newCard.brand) {
			$scope.erros.push({text:"Selecione a bandeira do cartão."});
		}
		if (!$scope.newCard.number || $scope.newCard.number.length !== 16) {
			$scope.erros.push({text:"Insira um número de cartão de 16 dígitos."});
		}
		if (!$scope.newCard.name) {
			$scope.erros.push({text:"Insira o nome do titular do cartão."});
		}
		if (!$scope.newCard.exp_month) {
			$scope.erros.push({text:"Selecione o mês de vencimento do cartão."});
		}
		if (!$scope.newCard.exp_year) {
			$scope.erros.push({text:"Selecione o ano de vencimento do cartão."});
		}
		if (!$scope.newCard.limit || $scope.newCard.limit < 0) {
			$scope.erros.push({text:"Insira um limite maior que R$ 0,00 para o cartão."});
		}

		if ($scope.erros.length > 0) {
			$scope.btnDisable = false;
			return;
		}
		$scope.newCard.limit *= 100;

		$http({
			method: "PATCH",
			url: config.URL + "cards/" + $routeParams.cardId,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer 5c07773bfa62c3cc744bffbbcd72f2fd'
			},
			data: $scope.newCard

		}).then(function (response) {
			$scope.data = response.data;
			$location.path('/cards')
		}, function (response) {
			$scope.data = response.data || $scope.erros.push({text:"Falha na conexão com o servidor"});
			$scope.btnDisable = false;
		});
	}
}]);