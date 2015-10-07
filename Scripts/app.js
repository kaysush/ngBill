var app = angular.module('ngBill', ['ngRoute']);


app.controller('MainController', function ($scope, $http) {
    $scope.requestToken = '';


    $scope.getRequestToken = function () {

        var config = {
            url: 'https://secure.splitwise.com/api/v3.0/get_request_token',
            method: 'POST',
            data: {}
        };





        var oauth = OAuth({
            consumer: {
                public: 'E9CXT5qfXEdcw93pjseyNZ1751Gr4vFNwRlOKDz7',
                secret: 'b8ZvNVseethUYeA21ZWMT1EUfc7ZDuzdvBn4wLiR'
            },
            signature_method: 'HMAC-SHA1'
        });


        console.log(oauth.toHeader(oauth.authorize(config)));

        $http({ url: config.url, method: config.method, headers: oauth.toHeader(oauth.authorize(config)) }).
        success(function (data) {
            console.log(data);
        }).error(function () {
            console.log('some error occured');
        }); ;


    }

    $scope.getRequestToken();

});

