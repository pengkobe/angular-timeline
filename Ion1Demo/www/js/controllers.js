angular
  .module('starter.controllers', [])

  .controller('DashCtrl', function($scope) {})

  .controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.expanders = [
      {
        title: '评价',
        tag: '未解决',
        username: '彭工',
        time: '2018-03-16 10:00',
        showMe: true,
        finished: false,
        state: 'todo',
        // todo doing done
        icons: ['17084.svg'],
      },
      {
        title: '处理',
        username: '王师傅',
        showMe: false,
        time: '2018-03-16 10:00',
        // todo doing done
        state: 'doing',
        tag: '已解决',
        finished: true,
        icons: ['17083.svg'],
      },
      {
        title: '签到',
        username: '张师傅',
        showMe: false,
        time: '2018-03-16 10:00',
        // todo doing done
        state: 'done',
        icons: ['17082.svg'],
      },
      {
        title: '接单',
        username: '李工',
        showMe: false,
        time: '2018-03-16 10:00',
        // todo doing done
        state: 'done',
        icons: ['17081.svg'],
      },
      {
        title: '派单',
        username: '王工',
        showMe: false,
        time: '2018-03-16 10:00',
        // todo doing done
        state: 'done',
        icons: ['17080.svg'],
      },
      {
        title: '工单',
        username: '彭工',
        showMe: false,
        time: '2018-03-16 10:00',
        // todo doing done
        state: 'done',
        icons: ['17079.svg'],
      },
    ];

    // 构建消息UI模板
    $scope.buildUrl = function(type) {
      var tplName;
      switch (type) {
        case '签到':
          tplName = 'signIn';
          break;
        case '处理':
          tplName = 'dealOrder';
          break;
        case '评价':
          tplName = 'judge';
          break;
        default:
          tplName = 'empty';
          break;
      }
      return 'js/stepTpl/' + tplName + '.html';
    };
  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true,
    };
  });
