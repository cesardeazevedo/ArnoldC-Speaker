"use strict";function SpeakerController(){}angular.module("myApp",["myApp.controllers","myApp.directives","myApp.services"]),angular.module("myApp.controllers",["ngAudio"]).controller("SpeakerController",SpeakerController),SpeakerController.$inject=["$scope","ngAudio"],angular.module("myApp.directives",[]).directive("arnoldcEditor",["ngAudio","ArnoldCService",function(o,e){return{restrict:"E",replace:!0,templateUrl:"editor.html",scope:{file:"@",title:"@",height:"@"},link:function(o,i){o.audio=e.audios[0],e.GetFile(o.file).success(function(e){o.code=e,o.editor.setValue(o.code),o.editor.clearSelection(),o.editor.on("change",function(){o.$apply(function(){o.code=o.editor.getValue()})})});var a=i[0].querySelector("#editor");a.style.height=o.height,o.editor=ace.edit(a),o.editor.setFontSize(14)},controller:["$scope",function(o){o.PlayAll=function(){o.playList=e.Parser(o.editor.session),0!=o.playList.length&&(o.Index=0,d(o.playList[o.Index].line),i(e.audios[o.playList[o.Index].key]))};var i=function(e){o.audio=e,o.audio.play(),o.audio.audio.addEventListener("ended",a)},a=function(){o.Index>=o.playList.length-1||(o.Index++,d(o.playList[o.Index].line,0,!0),i(e.audios[o.playList[o.Index].key]))},d=function(e){o.editor.gotoLine(e,0,!0)}}]}}]),angular.module("myApp.services",["ngAudio"]).service("ArnoldCService",["$http","ngAudio",function(o,e){var i="src/arnoldc/",a=["I LIED","NO PROBLEMO","BECAUSE I'M GOING TO SAY PLEASE","BULLSHIT","YOU HAVE NO RESPECT FOR LOGIC","STICK AROUND","CHILL","GET UP","GET DOWN","YOU'RE FIRED","HE HAD TO SPLIT","I LET HIM GO","YOU ARE NOT YOU YOU ARE ME","LET OFF SOME STEAM BENNET","CONSIDER THAT A DIVORCE","KNOCK KNOCK","LISTEN TO ME VERY CAREFULLY","GIVE THESE PEOPLE AIR","I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE","I'LL BE BACK","HASTA LA VISTA, BABY","DO IT NOW","GET YOUR ASS TO MARS","HEY CHRISTMAS TREE","YOU SET US UP","IT'S SHOWTIME","YOU HAVE BEEN TERMINATED","TALK TO THE HAND","I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY","GET TO THE CHOPPER","HERE IS MY INVITATION","ENOUGH TALK","WHAT THE FUCK DID I DO WRONG"];this.audios=[e.load("audio/ILied.mp3"),e.load("audio/NoProblemo.mp3"),e.load("audio/BecauseImGoingToSay.mp3"),e.load("audio/BullShit.mp3"),e.load("audio/RespectForLogic.mp3"),e.load("audio/StickAround.mp3"),e.load("audio/Chill.mp3"),e.load("audio/GetDown.mp3"),e.load("audio/GetDown.mp3"),e.load("audio/YouAreFired.mp3"),e.load("audio/HeHadToSplit.mp3"),e.load("audio/ILetHimGo.mp3"),e.load("audio/YouAreNotYou.mp3"),e.load("audio/LetOffSomeSteamBennet.mp3"),e.load("audio/ConsiderThatADivorce.mp3"),e.load("audio/KnockKnock.mp3"),e.load("audio/ListenToMe.mp3"),e.load("audio/GiveThesePeopleAir.mp3"),e.load("audio/INeedYourClothes.mp3"),e.load("audio/IWillBeBack.mp3"),e.load("audio/HastaLaVistaBaby.mp3"),e.load("audio/DoItNow.mp3"),e.load("audio/GetYourAssToMars.mp3"),e.load("audio/HeyChristmasTree.mp3"),e.load("audio/YouSetUsUp.mp3"),e.load("audio/ItsShowTime.mp3"),e.load("audio/Terminated.mp3"),e.load("audio/TalkToTheHand.mp3"),e.load("audio/IWantToAskYou.mp3"),e.load("audio/GetToTheChopper.mp3"),e.load("audio/HereIsMyInvitation.mp3"),e.load("audio/EnoughTalk.mp3"),e.load("audio/WTFDidIDoWrong.mp3")],this.Keywords=function(o){return o?a[o]:a},this.GetFile=function(e){return o.get(i+e)},this.Parser=function(o){for(var e=[],i=0;i<o.getLength();i++){var a=o.getLine(i);for(var d in this.Keywords())if(new RegExp(this.Keywords(d)+"\\b").test(a)){e.push({line:i+1,key:d});break}}return e}}]);