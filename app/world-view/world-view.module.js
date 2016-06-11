var worldView = angular.module('worldView',[]);

worldView.directive('cmWorldView', function () {
    return {
        templateUrl: '/world-view/world-view.template.html'
    }
});
