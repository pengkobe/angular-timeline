/**
 * Created by ws on 2018/3/7.
 */
angular.module('starter.directive')
  .directive('describeBox', ['$interval', '$ionicModal', '$timeout', 'pathUtil','CameraUtil','recordServ', function ($interval, $ionicModal, $timeout,pathUtil,CameraUtil, recordServ) {

    return {
      restrict: 'E',
      templateUrl: 'src/BPM/directives/describeBox/page.html',
      scope: {
        describeContent:'='
      },
      link: function (scope) {
        /**
         * ----------------------------------------------
         * describeContent : [obj]  指令双向绑定的描述信息
         *    + title    : [string] 文字信息
         *    + voiceList: [array]  语音数组
         *         + time: [string] 语音时长
         *         + recordName:[string] 语音资源路径
         *    + photoList: [array]  照片信息
         *         +url  :  [string] 图片路径
         * ----------------------------------------------
         * */
        // scope.describeContent = {
        //   title: '',
        //   voiceList: [],
        //   photoList:[]
        // };
        var mediaRec;
        var recordStartTime;
        var recordStopTime;
        var saveRecord = true;
        scope.contentOpen = false;
        scope.recordTitle = '按住说话';

        scope.openOrClose = function () {
          scope.contentOpen = !scope.contentOpen;
        };

        var timeInterval = null;
        scope.autoTextArea = function (obj) {
          timeInterval = $interval(function () {
            // console.log(obj);
            obj.target.style.height = obj.target.scrollHeight + 'px';
            //todo:行减少的时候高度没有减少
          }, 200);
        };
        scope.clearAuto = function () {
          if (timeInterval) {
            $interval.cancel(timeInterval);
          }
        };

        var voiceInterval = null;

        /**
         * 播放本条语音的动画
         * */
        scope.playVoice = function (data) {
          if (voiceInterval) {
            $interval.cancel(voiceInterval);
          }
          //停止其它语音
          for (var j = 0; j < scope.describeContent.voiceList.length; j++) {
            scope.describeContent.voiceList[j].haoroomsStyle = {"background-position":"0px 0px"};
          }
          //播放本条语音
          var i = 0;
          voiceInterval = $interval(frameAnmi, 300);
          function frameAnmi() {
            if (i > 4) {i = 0;}
            data.haoroomsStyle = {"background-position":"-" + i * 20 + "px 0px"};
            i++;
          }

          playThisVoice(data.recordName);
          //语音播放完之后动画停止
          $timeout(function () {
            if (voiceInterval) {
              $interval.cancel(voiceInterval);
            }
            data.haoroomsStyle = {"background-position":"0px 0px"};
            mediaRec.release();
            mediaRec = null;
          }, data.time * 1000);
        };
        /**
         * 播放音频文件
         * */
        function playThisVoice(src) {
          mediaRec = new Media(src,
            // success callback
            function () {console.log("recordAudio():Audio Success");},
            // error callback
            function (err) {console.log("recordAudio():Audio Error: " + err.code);});
          mediaRec.play();
        }

        /**
         * 打开录音界面
         * */
        scope.openRecord = function () {
          $ionicModal.fromTemplateUrl(
            'src/BPM/directives/describeBox/recordModal.html',
            {
              scope: scope,
              animation: 'fade-in'
            }).then(function (modal) {
            scope.modal = modal;
            scope.modal.show();
          });
        };
        scope.closeRecordModal = function () {
          scope.recordTitle = '按住说话';
          scope.modal.hide();
        };

        /**
         * 打开相机
         * */
        scope.openCamera = function () {
          CameraUtil.takePhoto('temp').then(function (data) {
            var photo = {};
            photo.url = data;
            scope.describeContent.photoList.push(photo);
          });
        };
        /**
         * 开始录音
         * */
        scope.startRecord = function () {
          scope.recordTitle = '松开保存';
          var src = pathUtil.getBasePath() + new Date().getTime();
          if (cordova.platformId === 'android') {
            src += '.mp3';
          } else {
            src += '.m4a';
          }
          mediaRec = new Media(src,
            // success callback
            function () {console.log("recordAudio():Audio Success");},
            // error callback
            function (err) {console.log("recordAudio():Audio Error: " + err.code);});
          // Record audio
          mediaRec.startRecord();
          scope.describeContent.voiceList.push({recordName: src});
          recordStartTime = new Date().getTime();
        };

        /**
         * saveRecord 为true时，停止录音并保存
         * */
        scope.stopAndSaveRecord = function () {
          mediaRec.stopRecord();
          mediaRec.release();
          mediaRec = null;
          if (saveRecord === true) {
            console.log('停止录音并保存');
            recordStopTime = new Date().getTime();
            afterSaveRecord();
          } else {
            console.log('停止录音并且不保存');
            scope.describeContent.voiceList.splice(scope.describeContent.voiceList.length - 1, 1);
            saveRecord = true;
            //todo:delete record source
          }
          scope.closeRecordModal();
        };

        /**
         * 设置saveRecord为false,不保存停止录音
         * */
        scope.cancelRecord = function () {
          if(saveRecord === true){saveRecord = false;}
        };

        /**
         * 删除本条语音
         * */
        scope.deleteRecord = function (data, index) {
          scope.describeContent.voiceList.splice(index, 1);
          //todo:delete record source
        };

        function afterSaveRecord() {
          var currentVoice = scope.describeContent.voiceList[scope.describeContent.voiceList.length - 1];
          currentVoice.time = parseInt((recordStopTime - recordStartTime) / 1000) + 1;
          currentVoice.eachVoiceWidth = {width:55 + currentVoice.time * 5 + 'px'}
        }

      }
    }
  }]);
