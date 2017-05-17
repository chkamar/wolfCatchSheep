cc.Class({
    extends: cc.Component,

    properties: {
		exitLabel: {
			default: null,
			type: cc.RichText
		},
		exitBtn: {
			default: null,
			type: cc.Button
		},
		returnBtn: {
			default: null,
			type: cc.Button
		}
    },

    // use this for initialization
    onLoad: function () {

    },
	
	toStartMenuScene: function(){
		cc.director.loadScene('StartMenuScene');
	},
	
	exitGame: function(){
		cc.director.end();
	}
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
