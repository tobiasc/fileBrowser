'use strict';

angular.module('myApp.view', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view', {
    templateUrl: 'view/view.html',
    controller: 'ViewCtrl'
  });
}])

.controller('ViewCtrl', function($scope, $http) {
    $scope.files = [];
    $scope.query = {
        baseFolder: '/Users/tobiaschristensen/Desktop/projects/fileBrowser',
        maxEntries: '10',
        currentPath: '',
        apiStatus: ''
    };
    $scope.object = {};

    $scope.getFolder = function () {
        $scope.files = [];
        $http.post('http://localhost:8080/folder/', $scope.query)
            .success(function (data, status, headers, config) {
                $scope.files = data;
                $scope.query.apiStatus = 'OK';
            })
            .error(function (data, status, header, config) {
                $scope.query.apiStatus = 'Error - ' + data;
            });
    }
    $scope.getFolder(); 

    $scope.showProperties = function (object) {
        if (object.isDir) {
            $scope.query.baseFolder = $scope.query.baseFolder + '/' + object.name;
            $scope.getFolder();  
        }
        $scope.object = object;
    }
});