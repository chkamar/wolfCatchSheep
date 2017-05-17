var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
		speed: 25,
		bullet1Array:{
			default:[],
			type:[cc.Node]
		},
		fast:true,
		timer:0
    },
	
    // use this for initialization
    onLoad: function () {
		this.timer = 0;
		this.state = 'fly';
		this.fast = true;
		if(com.levelNum==1)
			this.speed = 30;
		else if(com.levelNum==2)
			this.speed = 45;
		else
			this.speed = 50;
    },
	
	flyCollider:function(){
		 var blt1Node = cc.find('Collider/bullet1');
		 this.bullet1Array = blt1Node.getChildren();
		 for(var i=0;i<this.bullet1Array.length;i++)
		{
				var blt1rec = this.bullet1Array[i].getBoundingBoxToWorld();
			//击中气球
				var ballrec = this.node.getChildByName('ball').getBoundingBoxToWorld();
				var rec =new cc.rect();
				rec.xMin = ballrec.xMin;
				rec.xMax = ballrec.xMax;
				rec.yMin = ballrec.yMin + (ballrec.yMax - ballrec.yMin)/2 ;
				rec.yMax = rec.yMin + (ballrec.yMax - ballrec.yMin)/2 ;
				
				if(cc.Intersection.rectRect(blt1rec,rec))
				{
				//	cc.log('enter');
					this.state = 'down';
					if(com.gameState!=-1)
						com.score += 10;
					this.bullet1Array[i].destroy();
					break;
				}
		}
	},
	
	tryFast:function(){
		if(com.muY - this.node.y<= (this.speed+20) *3)
			{
				this.fast = false;
				this.state = 'flyFast';
				this.speed  += 20;
				return ;
			}
		var blt1Node = cc.find('Collider/bullet1');
		 this.bullet1Array = blt1Node.getChildren();
		 for(var i=0;i<this.bullet1Array.length;i++)
		{
			if(this.bullet1Array[i].x<this.node.x&&this.bullet1Array[i].y>this.node.y)
			{
				this.fast = false;
				this.state = 'flyFast';
				this.speed  += 20;
				break;
			}
		}
	},
	
    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
		if(this.fast)
		{
			this.tryFast();
		}
		if(this.state=='flyFast')
		{
			this.timer += dt;
			if(this.timer>=3)
			{
				this.state = 'fly';
				this.timer = 0;
				this.speed -= 20;
			}
		}
		this.node.y += this.speed * dt;
		//if(com.gameState!=0)
		//	return ;
		
		this.flyCollider();
		if(this.node.y>=com.muY)//到达横木高度
			this.state = 'stand';
		//更新状态后发现状态不变，则返回
		if(this.state=='fly'||this.state=='flyFast')
			return ;
		
		var x = this.node.x;
		var y = this.node.y;
		if(this.state=='stand'&&com.gameState==0)
		{
			this.game.newStandWolf(x,y);
			this.game.newFlyBall(x,y);
		}
		else if(this.state=='down')
		{
			this.game.newBoomBall(x,y);
			this.game.newDownWolf(x,y);
		}
		this.node.destroy();
     }
});
