angular.module('myApp.controllers', []).
    controller('SpeakerController', SpeakerController);

    SpeakerController.$inject = ['$scope'];
    function SpeakerController($scope)
    {
        $scope.code = 'IT\'S SHOWTIME\n'+
        'TALK TO THE HAND "hello world"\n'+
        'YOU HAVE BEEN TERMINATED';

        var editor = ace.edit("editor");
        editor.setValue($scope.code);
        editor.clearSelection();
        editor.on('change', function(e){
            $scope.$apply(function(){
                $scope.code = editor.getValue();
            });
        });
    }

