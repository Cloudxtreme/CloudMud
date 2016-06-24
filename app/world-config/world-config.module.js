var worldConfig = angular.module('worldConfig',[]);

worldConfig.directive('cmWorldConfig', function() {
    return {
        scope: false,
        templateUrl: 'world-config/world-config.template.html'
    }
});
