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

            scope.audio = ArnoldC.audios[0];

            ArnoldC.GetFile(scope.file).success(function(data){
                scope.code = data;
                scope.editor.setValue(scope.code);
                scope.editor.clearSelection();
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
        },controller: ['$scope', function($scope){

            $scope.PlayAll = function(){

                $scope.playList = ArnoldC.Parser($scope.editor.session);
                if($scope.playList.length == 0)
                    return;

                $scope.Index = 0;
                gotoLine($scope.playList[$scope.Index].line);
                playSound(ArnoldC.audios[$scope.playList[$scope.Index].key]);
            };

            var playSound = function(audio){
                $scope.audio = audio;
                $scope.audio.play();
                $scope.audio.audio.addEventListener('ended', next);
            };

            var next = function(){
                if($scope.Index >= $scope.playList.length-1)
                    return;

                $scope.Index++;
                gotoLine($scope.playList[$scope.Index].line,0,true);
                playSound(ArnoldC.audios[$scope.playList[$scope.Index].key]);
            };

            var gotoLine = function(line){
                $scope.editor.gotoLine(line,0,true);
            };
        }]
    }
}]);
