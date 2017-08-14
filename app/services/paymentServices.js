angular.module("myApp.paymentServices", [])

.service("PaymentServices", ["$http", "config", function($http, config) {
    var payment = {}

    payment.getPayments = function(cardId) {
        return $http({
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.appKey
            },
            url: config.URL + "cards/" + cardId + "/payments",
        });
    }

    payment.insertPayment = function(newPayment) {
        return $http({
            method: "POST",
            url: config.URL + "payments",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.appKey
            },
            data: newPayment

        });
    }

    payment.editPayment = function(payment) {
        return $http({
            method: "PATCH",
            url: config.URL + "payments/" + payment.id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.appKey
            },
            data: payment

        });
    }

    payment.deletePayment = function(deleteId) {
        return $http({
            method: "DELETE",
            url: config.URL + "payments/" + deleteId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.appKey
            },

        })
    }

    return payment;

}])