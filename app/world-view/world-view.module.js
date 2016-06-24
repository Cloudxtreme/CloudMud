var worldView = angular.module('worldView',[]);

worldView.directive('cmWorldView', function () {
    return {
        scope: false,
        templateUrl: '/world-view/world-view.template.html'
    }
});
