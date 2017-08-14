'use strict';

angular.module('myApp.paymentsView', ['ngRoute'])



.controller('PaymentsViewCtrl', ["$http", "config", "$scope", "$location", "$routeParams", "CardServices", "PaymentServices", function($http, config, $scope, $location, $routeParams, CardServices, PaymentServices) {
    var vm = this;
    $scope.formOpen = false;
    $scope.erros = [];

    vm.getCard = function (cardId) {
        CardServices.getCard(cardId)
        .then(function (response) {
            $scope.card = response.data;
            $scope.card.limit /= 100;
            $scope.card.available_limit /= 100;
        }, function (response) {
            $scope.card = response.data || 'Request failed';

        });

    }

    vm.getPayments = function (cardId) {
        PaymentServices.getPayments(cardId)
        .then(function (response) {
            $scope.payments = response.data;
            for (var i = 0; i < $scope.payments.length; i++) {
                $scope.payments[i].amount = ($scope.payments[i].amount/100).toFixed(2).toString().replace(".",",");
            }
        }, function (response) {
            $scope.payments = response.data || 'Request failed';

        });
    }

    vm.refresh = function() {
        $scope.payments = vm.getPayments($routeParams.cardId);
        $scope.card = vm.getCard($routeParams.cardId);
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

        PaymentServices.insertPayment($scope.newPayment)
        .then(function (response) {
            $scope.data = response.data;
            vm.refresh();
            vm.closeForm();
        }, function (response) {
            $scope.data = response.data || $scope.erros.push({text:"Falha na conexão com o servidor"});
            $scope.btnDisable = false;
        });

    }

    vm.setPaymentStatus = function(status, payment) {
        $scope.payment = {};
        $scope.payment.status = payment.status;
        $scope.payment.id = payment.id;

        PaymentServices.editPayment($scope.payment)
        .then(function (response) {
            $scope.data = response.data;
            vm.refresh();
        }, function (response) {
            $scope.data = response.data || $scope.erros.push({text:"Falha na conexão com o servidor"});
        });
    }

    vm.deletePayment = function (paymentId) {
        if (confirm("Você deseja realmente excluir esse pagamento?")){
            $scope.deleteId = paymentId;
            PaymentServices.deletePayment($scope.deleteId)
            .then(function (response) {
                $scope.data = response.data;
                vm.refresh();
            }, function (response) {
                $scope.data = response.data || $scope.erros.push({text:"Falha na conexão com o servidor"});
            });
        }
    }

    vm.closeForm = function() {
        $scope.btnDisable = false;
        $scope.erros = [];
        $scope.formOpen = false;
    }
}]);
