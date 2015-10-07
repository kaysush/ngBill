var app = angular.module('ngBill', ['ngRoute']);


app.controller('MainController', function ($scope, $http) {
    $scope.requestToken = '';


    $scope.getRequestToken = function () {

          


        
        $http({ url: config.url, method: config.method, headers: oauth.toHeader(oauth.authorize(config)) }).
        success(function (data) {
            console.log(data);
        }).error(function () {
            console.log('some error occured');
        }); ;


    }

    $scope.getRequestToken();

});

