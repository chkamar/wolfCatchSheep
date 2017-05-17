var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
		Level1_btn: {
			default: null,
			type: cc.Button
		},
		Level2_btn: {
			default: null,
			type: cc.Button
		},
		Level3_btn: {
			default: null,
			type: cc.Button
		}
        
    },

    // use this for initialization
    onLoad: function () {

    },
	
	toLevel1Scene: function(){
		cc.director.loadScene('Level');
	},
	
	toLevel2Scene: function(){
		if(com.level2State)
		{
			com.levelNum = 2;
			cc.director.loadScene('Level');
		}
		else{
			cc.director.loadScene('Hint');
		}
	},
	
	toLevel3Scene: function(){
		if(com.level3State)
		{
			com.levelNum = 3;
			cc.director.loadScene('Level');
		}
		else{
			cc.director.loadScene('Hint');
		}
	}
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
