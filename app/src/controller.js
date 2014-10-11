angular.module('myApp.controllers', []).
controller('SpeakerController', SpeakerController);

SpeakerController.$inject = ['$scope', 'ArnoldCService'];
function SpeakerController($scope, ArnoldC)
{
    $scope.getKeywords = function(){
        return ArnoldC.keywords;
    }
}
