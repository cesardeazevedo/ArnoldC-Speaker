"use strict";function SpeakerController(e){e.code='IT\'S SHOWTIME\nTALK TO THE HAND "hello world"\nYOU HAVE BEEN TERMINATED';var o=ace.edit("editor");o.setValue(e.code),o.clearSelection(),o.on("change",function(){e.$apply(function(){e.code=o.getValue()})})}angular.module("myApp",["myApp.controllers"]),angular.module("myApp.controllers",[]).controller("SpeakerController",SpeakerController),SpeakerController.$inject=["$scope"];