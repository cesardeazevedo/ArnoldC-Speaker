angular.module('myApp.directives', []).
directive('arnoldcEditor', ['ngAudio', 'ArnoldCService', function(ngAudio, ArnoldC){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'editor.html',
        scope: {
            file:   '@',
            title:  '@',
            height: '@'
        },
        link: function(scope, element, attr){

            ArnoldC.GetFile(scope.file).success(function(data){
                scope.code = data;
                scope.editor.setValue(scope.code);
                scope.editor.clearSelection();
                scope.editor.gotoLine(0,0,true);
                scope.editor.on('change', function(e){
                    scope.$apply(function(){
                        scope.code = scope.editor.getValue();
                    });
                });
            });

            var editor = element[0].querySelector('#editor');
            editor.style.height = scope.height;

            scope.editor = ace.edit(editor);
            scope.editor.setFontSize(14);
        },controller: ['$scope', '$rootScope', function($scope, $rootScope){

            $scope.Stop = function(){
                ArnoldC.audio.restart();
            };

            $scope.isPaused = function(){
                return ArnoldC.audio.paused;
            };

            $scope.PlayAll = function(){

                $scope.playList = ArnoldC.Parser($scope.editor.session);
                $scope.increment = 100 / $scope.playList.length;
                $scope.progress = $scope.increment;
                if($scope.playList.length == 0)
                    return;

                $scope.Index = 0;
                $rootScope.CurrentScope = $scope.$id;
                gotoLine($scope.playList[$scope.Index].line);
                playSound(ArnoldC.audios[$scope.playList[$scope.Index].key]);
            };

            var playSound = function(audio){
                ArnoldC.audio = audio;
                ArnoldC.audio.play();
                ArnoldC.audio.audio.addEventListener('ended', next);
            };

            var next = function(){
                if($scope.Index >= $scope.playList.length-1 ||
                   $scope.$id != $rootScope.CurrentScope){
                    $scope.progress = 0;
                    return;
                }

                $scope.Index++;
                $scope.progress += $scope.increment;
                gotoLine($scope.playList[$scope.Index].line,0,true);
                playSound(ArnoldC.audios[$scope.playList[$scope.Index].key]);
            };

            var gotoLine = function(line){
                $scope.editor.gotoLine(line,0,true);
            };

        }]
    }
}]);
