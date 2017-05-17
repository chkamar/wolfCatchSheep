var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        anim:cc.Animation,
		inflexion: 0,
		
    },
	run:function(){
		this.anim.play('wolfRun');
	},
	stop:function(){
		this.anim.stop('wolfRun');
	},
	after_frame:function(){
		//设置每一帧在X轴移动的动作。
		var action ;
		//不同的关卡不同的移动速度
		if(com.levelNum==1)
			action = cc.moveTo(0.1,cc.p(this.node.x-8,this.node.y));
		else if(com.levelNum==2)
			action = cc.moveTo(0.1,cc.p(this.node.x-10,this.node.y));
		else
			action = cc.moveTo(0.1,cc.p(this.node.x-15,this.node.y));
		
		this.node.runAction(action);
	},
	
    // use this for initialization
    onLoad: function () {
		//cc.log(this.game.muY);//出错，没有定义wolfNum属性
		//cc.log('the runwolf\'s num = '+this.n);
		this.state = 'run';
		this.setInflexion();
		this.run();
    },
	
	setInflexion:function(){
		var i = Math.floor(Math.random()*5);
		var arr = new Array(500,600,700,800,880);
		this.inflexion = arr[i];
	},
	
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
		if(com.gameState==0)
		{
				if(this.node.x<=this.inflexion)
				{
					this.stop();
					this.state = 'fly';
				}
				else
					return ;
		}
		else //if(com.gameState!=0)
		{
			this.stop();
			this.state = 'stand';
		}
		
		var x= this.node.x;
		var y = this.node.y;
		
		if(this.state=='fly')
			this.game.newFly(x,y);
	
		else if(this.state=='stand')
			this.game.newStandWolf(x,y);
		
		this.node.destroy();
     }
});
