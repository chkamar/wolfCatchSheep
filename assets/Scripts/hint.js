cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // use this for initialization
    onLoad: function () {

    },
	
	backToChooseLevel:function(){
		cc.director.loadScene('StartMenuScene');
	},
	
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
