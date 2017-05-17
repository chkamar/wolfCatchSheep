cc.Class({
    extends: cc.Component,

    properties: {
        timer:0
    },

    // use this for initialization
    onLoad: function () {
		//cc.log('bommBall is on '+this.node.x+'	'+this.node.y);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
		this.timer += dt;
		if(this.timer>=0.5)
		{
			this.node.destroy();
		}
    }
});
