var com = require('common');  
cc.Class({
    extends: cc.Component,

    properties: {
		quesText: {
			default: null,
			type: cc.RichText
		},
		openAudio:{
			default:null,
			type:cc.Button
		},
		closeAudio:{
			default:null,
			type:cc.Button
		}
    },

    // use this for initialization
    onLoad: function () {

    },
	open_Audio:function(){
		com.flagAudio = true;
		//cc.log("Audio is opening");
		cc.director.loadScene('StartMenuScene');
	},
	close_Audio:function(){
		com.flagAudio = false;
		//cc.log("Audio is closed");
		cc.director.loadScene('StartMenuScene');
	}
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
