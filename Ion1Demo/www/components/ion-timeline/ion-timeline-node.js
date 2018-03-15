angular.module('nxt-angular-timeline').directive('wzStep', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            wzTitle: '@',
            wzHeadingTitle: '@',
            canenter : '=',
            canexit : '=',
            disabled: '@?wzDisabled',
            description: '@',
            wzData: '=',
            wzOrder: '@?'
        },
        require: '^ionTimeline',
        templateUrl: function(element, attributes) {
          return attributes.template || "ion-timeline-node.html";
        },
        link: function ($scope, $element, $attrs, ionTimeline) {
            $attrs.$observe('wzTitle', function (value) {
                $scope.title = $scope.wzTitle;
            });
            $scope.title = $scope.wzTitle;
            ionTimeline.addStep($scope);
            $scope.$on('$destroy', function(){
                ionTimeline.removeStep($scope);
            });
        }
    };
});