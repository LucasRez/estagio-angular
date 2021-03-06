'use strict';

angular.module('myApp.cardsView', ['ngRoute'])



.controller('CardsViewCtrl', ["config", "$location", "CardServices", function (config, $location, CardServices) {
    var vm = this;

    vm.sendGet = function () {
        CardServices.getCards()
        .then(function (response) {
            vm.data = response.data;
            for (var i = 0; i < vm.data.length; i++) {
                vm.data[i].limit = (vm.data[i].limit / 100).toFixed(2).toString().replace(".",",");
                vm.data[i].available_limit = (vm.data[i].available_limit / 100).toFixed(2).toString().replace(".",",");
                vm.data[i].number = vm.data[i].number.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4")
            }
            
        }, function (response) {
            vm.data = response.data || 'Request failed';
        });
    }

    vm.deleteCard = function (id) {
        if (confirm("Você deseja realmente excluir este cartão?")) {
            CardServices.deleteCard(id)
            .then(function (response) {
                vm.del = response.data;
                vm.sendGet();                
            }, function (response) {
                vm.del = response.data || 'Request failed';

            });
        }
    }

    vm.editCard = function (id) {
        $location.path('/editCard/' + id)
    }

    vm.viewPayments = function (id) {
        $location.path('cards/' + id + '/payments')
    }

    vm.card = vm.sendGet();
}]);
