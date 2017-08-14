'use strict';

angular.module('myApp.paymentsView', ['ngRoute'])



.controller('PaymentsViewCtrl', ["$http", "config", "$scope", "$location", "$routeParams", function($http, config, $scope, $location, $routeParams) {
    var vm = this;
    $scope.formOpen = false;
    $scope.erros = [];

    vm.getCard = function () {
        $http({
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.appKey
            },
            url: config.URL + "cards/" + $routeParams.cardId,
        }).then(function (response) {
            $scope.card = response.data;
            $scope.card.limit /= 100;
            $scope.card.available_limit /= 100;
        }, function (response) {
            $scope.card = response.data || 'Request failed';

        });

    }

    vm.getPayments = function () {
        $http({
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.appKey
            },
            url: config.URL + "cards/" + $routeParams.cardId + "/payments",
        }).then(function (response) {
            $scope.payments = response.data;
            for (var i = 0; i < $scope.payments.length; i++) {
                $scope.payments[i].amount = ($scope.payments[i].amount/100).toFixed(2).toString().replace(".",",");
            }
        }, function (response) {
            $scope.payments = response.data || 'Request failed';

        });
    }

    vm.refresh = function() {
        $scope.payments = vm.getPayments();
        $scope.card = vm.getCard();
    }
    vm.refresh();

    vm.openForm = function () {
        $scope.formOpen = true;
    }

    vm.submitForm = function(amount) {
        $scope.btnDisable = true;
        $scope.newPayment = {amount: amount*100, card_id: $routeParams.cardId}
        $scope.erros = [];

        if (amount > $scope.card.available_limit) {
            $scope.erros.push({text: "O valor do pagamento excede o limite disponível atual."})
        }
        if ($scope.newPayment.amount <= 0 || !$scope.newPayment.amount) {
            $scope.erros.push({text: "Insira um valor maior que zero."})
        }
        
        if ($scope.erros.length > 0) {
            $scope.btnDisable = false;
            return
        }

        $http({
            method: "POST",
            url: config.URL + "payments",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.appKey
            },
            data: $scope.newPayment

        }).then(function (response) {
            $scope.data = response.data;
            vm.refresh();
            vm.closeForm();
        }, function (response) {
            $scope.data = response.data || $scope.erros.push({text:"Falha na conexão com o servidor"});
            $scope.btnDisable = false;
        });

    }

    vm.setPaymentStatus = function(status, payment) {
        $scope.payment = angular.copy(payment);
        $scope.payment.status = status;
        $scope.payment.amount = parseFloat($scope.payment.amount)*100;

        $http({
            method: "PATCH",
            url: config.URL + "payments/" + $scope.payment.id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.appKey
            },
            data: $scope.payment

        }).then(function (response) {
            $scope.data = response.data;
            vm.refresh();
        }, function (response) {
            $scope.data = response.data || $scope.erros.push({text:"Falha na conexão com o servidor"});
        });
    }

    vm.deletePayment = function (paymentId) {
        $scope.deleteId = paymentId;
        $http({
            method: "DELETE",
            url: config.URL + "payments/" + $scope.deleteId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.appKey
            },

        }).then(function (response) {
            $scope.data = response.data;
            vm.refresh();
        }, function (response) {
            $scope.data = response.data || $scope.erros.push({text:"Falha na conexão com o servidor"});
        });

    }

    vm.closeForm = function() {
        $scope.btnDisable = false;
        $scope.erros = [];
        $scope.formOpen = false;
    }
}]);
