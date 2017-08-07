'use strict';

angular.module('myApp.insertCardView', ['ngRoute'])

	.controller('InsertCardCtrl', ["$http", "config", "$log", function($http, config, $log) {
		var vm = this

		vm.submit = function () {
			$log.info(vm.card)
		}
	}]);