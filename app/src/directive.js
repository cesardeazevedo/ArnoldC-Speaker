angular.module('myApp.directives', []).
directive('arnoldcEditor', ['ngAudio', 'ArnoldCService', function(ngAudio, ArnoldC){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../editor.html',
        scope: {
            file:   '@',
            title:  '@',
            height: '@'
        },
        transclude: true,
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
                $scope.GoToLine($scope.playList[$scope.Index].line);
                $scope.PlaySound(ArnoldC.audios[$scope.playList[$scope.Index].key]);
            },

            $scope.PlaySound = function(audio){
                $scope.audio = audio;
                $scope.audio.play();
                $scope.audio.audio.addEventListener('ended', $scope.Next);
            };

            $scope.Next = function(){
                if($scope.Index >= $scope.playList.length-1)
                    return;

                $scope.Index++;
                $scope.editor.gotoLine($scope.playList[$scope.Index].line,0,true);
                $scope.PlaySound(ArnoldC.audios[$scope.playList[$scope.Index].key]);
            };

            $scope.GoToLine = function(line){
                $scope.editor.gotoLine(line,0,true);
            };
        }]
    }
}]);
