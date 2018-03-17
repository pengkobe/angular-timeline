angular
  .module('starter.controllers')
  .directive('ionStep', function() {
    return {
      restrict: 'EA',
      replace: false,
      transclude: true,
      templateUrl: function(element, attributes) {
        return attributes.template || 'js/ionStep.html';
      },
      controller: function() {
        var steps = ['工单', '派单', '接单', '到场', '签到', '处理', '评价'];
        var expanders = [];
        this.addExpander = function(expander) {
          expanders.push(expander);
        };

        /**
         * 选中某一步
         */
        this.selectStep = function(name) {
          angular.forEach(expanders, function(expander) {
            if (expander.name == name) {
              expander.showMe = true;
            }
          });
        };

        /**
         * 前往下一步
         */
        this.toNextStep = function(name) {
          var index = steps.indexOf(name);
          this.selectStep(steps[index + 1]);
        };
      },
    };
  })
  .directive('ionStepItemHeader', function() {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      require: '^?ionStep',
      scope: {
        title: '=',
        finished: '=',
        tag: '=',
        username: '=',
        time: '=',
        state: '=',
        icons: '=',
      },
      templateUrl: function(element, attributes) {
        return attributes.template || 'js/ionStepItemHeader.html';
      },
      link: function(scope, iElement, iAttrs, ionStepController) {
        scope.headIcon = 'img/' + scope.icons[0];
      },
    };
  })
  .directive('ionStepItem', function() {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      require: '^?ionStep',
      scope: {
        expanderTitle: '=',
        showMe:'=',
      },
      templateUrl: function(element, attributes) {
        return attributes.template || 'js/ionStepItem.html';
      },
      link: function(scope, iElement, iAttrs, ionStepController) {
        // scope.showMe = false;
        // debugger;
        ionStepController.addExpander(scope);

        scope.toNextStep = function toNextStep() {
          ionStepController.toNextStep(scope);
        };
      },
    };
  });
