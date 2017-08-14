angular.module('myApp.cardServices', [])

.service('CardServices', ["$http", "config", function ($http, config) {
    var card = {};

    card.getCard = function(cardId) {
        return $http({
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.appKey
            },
            url: config.URL + "cards/" + cardId,
        });
    }

    card.getCards = function() {
        return card.getCard("");
    }

    card.deleteCard = function(cardId) {
        return $http({
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.appKey
            },
            url: config.URL + "cards/" + cardId,
        });
    }

    card.editCard = function(newCard) {
        return $http({
			method: "PATCH",
			url: config.URL + "cards/" + newCard.id,
			headers: {
				'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.appKey
			},
			data: newCard

		});
    }

    card.insertCard = function(newCard) {
        return $http({
			method: "POST",
			url: config.URL + "cards",
			headers: {
				'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.appKey
			},
			data: newCard

		});
    }

    return card;
}])