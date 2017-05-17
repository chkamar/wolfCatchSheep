var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
     bullet2Array:{
			default:[],
			type:[cc.Node]
		}
    },
	
    // use this for initialization
    onLoad: function () {
		this.state = 'stand';
    },
	
	standCollider:function(){
		var blt2Node = cc.find('Collider/bullet2');
		this.bullet2Array = blt2Node.getChildren();
		for(var i=0;i<this.bullet2Array.length;i++)
		{
			var blt2rec = this.bullet2Array[i].getBoundingBoxToWorld();
			//击中standwolf
				var stdrec = this.node.getBoundingBoxToWorld();
				if(cc.Intersection.rectRect(blt2rec,stdrec))
				{
				//	cc.log('enter');
					com.score += 10;
					this.bullet2Array[i].destroy();
					if(this.node.y!=com.groundY)
						com.wolfLijv -= (this.node.x - com.muO)* 30;
					this.state = 'down';
					break;
				}
		}
	},
	
    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
		 this.standCollider();
		if(com.gameState==-1||this.state=='down')
		 {
			 var x= this.node.x;
			 var y = this.node.y;
			this.game.newDownWolf(x,y);
			
			this.node.destroy();
		 }
    }
});
