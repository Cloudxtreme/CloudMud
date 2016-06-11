var cloudMudApp = angular.module('cloudMudApp', [
  'ngRoute',
  'ui.bootstrap',
  'worldView',
  'worldConfig'
]);

cloudMudApp.controler('cloudMudControler', function($scope) {
    $scope.world = new Object();
    $scope.world.connected = false;
    $scope.world.server = 'discworld.starturtle.net';
    $scope.world.port = 4243;
});
