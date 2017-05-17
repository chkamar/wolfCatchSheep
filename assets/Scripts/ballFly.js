cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
		timer:0
    },
	
    // use this for initialization
    onLoad: function () {
		this.speed = 60;
		this.timer = 0;
		//this.node.group = 'Ball';
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
		this.node.y += this.speed * dt;
		this.timer += dt;
		if(this.timer>=3)
			this.node.destroy();
     },
});
