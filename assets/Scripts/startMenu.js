cc.Class({
    extends: cc.Component,

    properties: {
		choose_level: {
			default: null,
			type: cc.Button
		},
		choose_SetAudio: {
			default: null,
			type: cc.Button
		},
		choose_Exit: {
			default: null,
			type: cc.Button
		}
    
    },

    // use this for initialization
    onLoad: function () {
		
    },
	choose1: function (){
		cc.director.loadScene('Choose_Level');
	},
	choose2: function (){
		cc.director.loadScene('SetAudioScene');
	},
	choose3: function (){
		cc.director.loadScene('ExitScene');
	}
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
