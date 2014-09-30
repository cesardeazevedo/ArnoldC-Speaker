
angular.module('myApp.controllers', []);
angular.module('myApp.controllers').
    controller('SpeakerController', SpeakerController);

    SpeakerController.$inject = ['$scope'];
    function SpeakerController($scope)
    {
        var editor = ace.edit("editor");
    }

