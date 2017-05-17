var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        speed:200
    },

    // use this for initialization
    onLoad: function () {
		
    },
	
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
		this.node.x += this.speed*dt;
    }
});
