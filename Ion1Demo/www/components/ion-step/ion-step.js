myModule.directive('ion-step',function(){
    return {
            restrict : 'EA',
            replace : true,
            transclude : true,
            template : '<div ng-transclude></div>',
            controller : function() {
                var expanders = [];
                this.gotOpened = function(selectedExpander) {
                    angular.forEach(expanders, function(expander) {
                        if (selectedExpander != expander) {
                            expander.showMe = false;
                        }
                    });
                };
                this.addExpander = function(expander) {
                    expanders.push(expander);
                };
            }
        };
  });


  myModule.directive('ion-step-item', function(){
    return {
            restrict : 'EA',
            replace : true,
            transclude : true,
            require : '^?accordion',
            scope : {
                expanderTitle : '='
            },
            template : '<div>'
                     + '<div class="ex-title" ng-click="toggle()">{{expanderTitle}}</div>'
                     + '<div class="ex-body" ng-show="showMe" ng-transclude></div>'
                     + '</div>',
            link : function(scope, iElement, iAttrs, accordionController) {
                scope.showMe = false;
                accordionController.addExpander(scope);
                scope.toggle = function toggle() {
                    scope.showMe = !scope.showMe;
                    accordionController.gotOpened(scope);
                };
            }
        };
  });