'use strict';
angular.module('myApp', ['myApp.controllers', 'myApp.directives', 'myApp.services']);


angular.module('myApp.controllers', ['ngAudio']).
controller('SpeakerController', SpeakerController);

SpeakerController.$inject = ['$scope','ngAudio'];
function SpeakerController($scope, ngAudio, ArnoldC)
{
}


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

angular.module('myApp.services', ['ngAudio']).
service('ArnoldCService',['$http','ngAudio', function($http, ngAudio) {

    var baseUrl = "src/arnoldc/";

    var keywords = [
        'I LIED',
        'NO PROBLEMO',
        'BECAUSE I\'M GOING TO SAY PLEASE',
        'BULLSHIT',
        'YOU HAVE NO RESPECT FOR LOGIC',
        'STICK AROUND',
        'CHILL',
        'GET UP',
        'GET DOWN',
        'YOU\'RE FIRED',
        'HE HAD TO SPLIT',
        'I LET HIM GO',
        'YOU ARE NOT YOU YOU ARE ME',
        'LET OFF SOME STEAM BENNET',
        'CONSIDER THAT A DIVORCE',
        'KNOCK KNOCK',
        'LISTEN TO ME VERY CAREFULLY',
        'GIVE THESE PEOPLE AIR',
        'I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE',
        'I\'LL BE BACK',
        'HASTA LA VISTA, BABY',
        'DO IT NOW',
        'GET YOUR ASS TO MARS',
        'HEY CHRISTMAS TREE',
        'YOU SET US UP',
        'IT\'S SHOWTIME',
        'YOU HAVE BEEN TERMINATED',
        'TALK TO THE HAND',
        'I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY',
        'GET TO THE CHOPPER',
        'HERE IS MY INVITATION',
        'ENOUGH TALK',
        'WHAT THE FUCK DID I DO WRONG'
    ];

    this.audios = [
        ngAudio.load('audio/ILied.mp3'),
        ngAudio.load('audio/NoProblemo.mp3'),
        ngAudio.load('audio/BecauseImGoingToSay.mp3'),
        ngAudio.load('audio/BullShit.mp3'),
        ngAudio.load('audio/RespectForLogic.mp3'),
        ngAudio.load('audio/StickAround.mp3'),
        ngAudio.load('audio/Chill.mp3'),
        ngAudio.load('audio/GetDown.mp3'), // Get Up Missing
        ngAudio.load('audio/GetDown.mp3'),
        ngAudio.load('audio/YouAreFired.mp3'),
        ngAudio.load('audio/HeHadToSplit.mp3'),
        ngAudio.load('audio/ILetHimGo.mp3'),
        ngAudio.load('audio/YouAreNotYou.mp3'),
        ngAudio.load('audio/LetOffSomeSteamBennet.mp3'),
        ngAudio.load('audio/ConsiderThatADivorce.mp3'),
        ngAudio.load('audio/KnockKnock.mp3'),
        ngAudio.load('audio/ListenToMe.mp3'),
        ngAudio.load('audio/GiveThesePeopleAir.mp3'),
        ngAudio.load('audio/INeedYourClothes.mp3'),
        ngAudio.load('audio/IWillBeBack.mp3'),
        ngAudio.load('audio/HastaLaVistaBaby.mp3'),
        ngAudio.load('audio/DoItNow.mp3'),
        ngAudio.load('audio/GetYourAssToMars.mp3'),
        ngAudio.load('audio/HeyChristmasTree.mp3'),
        ngAudio.load('audio/YouSetUsUp.mp3'),
        ngAudio.load('audio/ItsShowTime.mp3'),
        ngAudio.load('audio/Terminated.mp3'),
        ngAudio.load('audio/TalkToTheHand.mp3'),
        ngAudio.load('audio/IWantToAskYou.mp3'),
        ngAudio.load('audio/GetToTheChopper.mp3'),
        ngAudio.load('audio/HereIsMyInvitation.mp3'),
        ngAudio.load('audio/EnoughTalk.mp3'),
        ngAudio.load('audio/WTFDidIDoWrong.mp3')
    ];

    this.Keywords = function(index){
        return !index ? keywords : keywords[index];
    };

    this.GetFile = function(name){
        return $http.get(baseUrl+name);
    };

    /*
     * parser a arnoldc script, and extract a audio of keyword
     */
    this.Parser = function(script){

        var array = [];
        for(var i = 0; i < script.getLength(); i++) {
            var line = script.getLine(i);

            for(var KeyIndex in this.Keywords()) {
                if(new RegExp(this.Keywords(KeyIndex)+'\\b').test(line)) {
                    array.push({ line: i + 1, key: KeyIndex });
                    break;
                }
            }
        }
        return array;
    };
}]);

