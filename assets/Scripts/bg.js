var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
       levelNum: {
			default: null,
			type: cc.Label
		},
		
		scoreLabel:{
			default:null,
			type: cc.Label
		} 
		
    },
	
	updateScore:function(){
		this.scoreLabel.string = "Money : "+ com.score.toString();
	},
	
	updateLevelNum:function(){
		this.levelNum.string = "Level-"+ com.levelNum.toString();
	},
	
	
    // use this for initialization
    onLoad: function () {
		
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
		this.updateScore();
		this.updateLevelNum();
    }
});
