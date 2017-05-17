var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        v:50,
		vy:0,
		vx:0,
		g:10,
		rotation:75
    },

    // use this for initialization
    onLoad: function () {
		
		//cc.log('rotation is '+this.node.rotation);
		this.node.rotation = 75;
		//cc.log('rotation is '+this.node.rotation);
		this.v = 80;
		this.vy = this.v*Math.cos(this.node.rotation/360*2*Math.PI);
		this.vx = this.v*Math.sin(this.node.rotation/360*2*Math.PI);
	
    },
	
	changeRotation:function(x){
		this.node.x += this.vx * x;
		this.node.y += (this.vy+this.vy-this.g*x)/2*x;
		
		var angel;
		//一个dt之后的y方向的速度
		var vy2 = this.vy - this.g*x;
		//y轴方向的速度变为负值时，rotation的计算方法改变
		if(vy2>0)
		{
			angel = Math.atan(this.vx/vy2)/Math.PI*180;
		}
		else
		{
			var angel2 = Math.atan((-vy2)/this.vx)/Math.PI*180;
			angel = angel2 + 90;
		}
	//	cc.log(angel);
		this.node.rotation = angel;
	},
	
    // called every frame, uncomment this function to activate update callback
     update: function (dt) {	
		var distance = Math.abs(com.muO - this.node.x);
		if( distance< 10 && distance>=0){
			if(this.node.y<=com.muY)
			{
				this.node.destroy();
			}
		}
		var x = dt;
		this.changeRotation(x);
		//cc.log(this.node.rotation);
		this.vy -= this.g*dt;
     }
});
