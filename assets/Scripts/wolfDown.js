var com = require('common'); 
cc.Class({
    extends: cc.Component,

    properties: {
        speed:0
    },

    // use this for initialization
    onLoad: function () {
		this.speed = 100;
		this.height = this.node.y - com.groundY;
		this.state = 'down';
    },
	
	updateState:function(){
		if(this.node.y<=com.groundY)
		{
			//if(this.height>100)//坠落高度大于100必死，否则站立但没法
				this.state = 'died'
		}
	},
	
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
		this.node.y -= this.speed *dt;
		this.updateState();
		if(this.state=='down')
			return ;
		else if(this.state=='died')
			this.node.destroy();
    }
});
