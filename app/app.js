var cloudMudApp = angular.module('cloudMudApp', [
  'ui.bootstrap',
  'worldView',
  'worldConfig'
])

cloudMudApp.controller('cloudMudController', function($scope) {
    $scope.world = {
        connected: false,
        server: 'discworld.starturtle.net',
        port: 4243
    };
});
