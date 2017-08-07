'use strict';

angular.module('myApp.cardsView', ['ngRoute'])



    .controller('CardsViewCtrl', ["$http", "config", "$log", function ($http, config, $log) {
        var vm = this;

        vm.sendGet = function () {
            $http({
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer 5c07773bfa62c3cc744bffbbcd72f2fd'
                },
                url: config.URL + "cards",
            }).then(function (response) {
                vm.data = response.data;
                var data = [];
                for (var i = 0; i < vm.data.length; i++) {
                    vm.data[i].limit = (vm.data[i].limit/100).toFixed(2).toString().replace(".",",");
                    vm.data[i].available_limit = (vm.data[i].available_limit/100).toFixed(2).toString().replace(".",",");

                }
                
            }, function (response) {
                vm.data = response.data || 'Request failed';

            });
        }

        vm.deleteCard = function (id) {
            $log.info("Delete card " + id);
        }

        vm.editCard = function (id) {
            $log.info("Edit card " + id)
        }

        vm.sendGet();

    }]);
