angular.module('myApp.services', ['ngAudio']).
service('ArnoldCService',['$http','ngAudio', function($http, ngAudio) {

    var baseUrl = "src/arnoldc/";

    /*
     * ArnoldC Keywords
     */
    this.keywords = [
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

    /*
     * Load keywords sounds
     */
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

    this.audio = this.audios[0];

    this.Keywords = function(index){
        return !index ? this.keywords : this.keywords[index];
    };

    this.GetFile = function(name){
        return $http.get(baseUrl+name);
    };

    /*
     * parser a arnoldc script and extract a keyword sound
     */
    this.Parser = function(script){

        var array = [];
        for(var i = 0; i < script.getLength(); i++) {
            var line = script.getLine(i);

            for(var KeyIndex in this.Keywords()) {
                if(new RegExp(this.Keywords(KeyIndex)+'\\b').test(line)) {
                    array.push({ line: i + 1, keyword: this.Keywords(KeyIndex) ,key: KeyIndex });
                    break;
                }
            }
        }
        return array;
    };
}]);

