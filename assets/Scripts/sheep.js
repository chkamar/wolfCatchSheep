var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
		speed:0,
		
        // 加速度
        moveToRight: false,
		moveToLeft: false,
		//先按下D，不松开，再按下A，接着松开A，此时D未松开，但是玩家不往右移动
		//解决方法：false表示松开，true表示按下
		stateKeyA: false,
		stateKeyD: false,
		//发射音效
		shootAudio1:{
			default: null,
			type: cc.AudioSource
		},
		shootAudio2:{
			default: null,
			type: cc.AudioSource
		},
		bullet1:{
			default:null,
			type:cc.Prefab
		},
		bullet2:{
			default:null,
			type:cc.Prefab
		},
		timer:0
    },
	playShootSound: function (x) {
        // 调用声音引擎播放声音
		if(com.flagAudio)
		{
			if(x==1)
				this.shootAudio1.play();
			
			if(x==2)
				this.shootAudio2.play();
		//cc.log('play shoot audio');
		}
    },
	newBullet1:function(){
		//new a bullet1
			var bullet  = cc.instantiate(this.bullet1);
			var pnode = cc.find('Collider/bullet1');
			pnode.addChild(bullet);
			bullet.setPosition(cc.p(this.node.x,this.node.y));
			bullet.getComponent('bullet1').game = pnode ;
			
			//cc.log('success!');
	},
	newBullet2:function(){
		//new a bullet1
			var bullet  = cc.instantiate(this.bullet2);
			var pnode = cc.find('Collider/bullet2');
			pnode.addChild(bullet);
			bullet.setPosition(cc.p(this.node.x,this.node.y));
			bullet.getComponent('bullet2').game = pnode ;
	},
	setInputControl: function () {
        var self = this;
        // 添加键盘事件监听
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // 有按键按下时，判断是否是我们指定的方向控制键，并设置向对应方向加速
            onKeyPressed: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
						this.stateKeyA = true;
						//cc.log('accel to left');
                        self.moveToLeft = true;
                        self.moveToRight = false;
                        break;
                    case cc.KEY.d:
						this.stateKeyD = true;
						//cc.log('accel to right');
                        self.moveToLeft = false;
                        self.moveToRight = true;
                        break;
					case cc.KEY.j:
					//cc.log('new a bullet start:');
						
						if(self.timer>=2)
						{
							//播放射击声音
							self.playShootSound(1);
							//生成一颗子弹1
							self.newBullet1();
							self.timer = 0;
						}
						
						break;	
					case cc.KEY.q:
						
						if(com.score>=20&&self.timer>=3)
						{
							self.playShootSound(2);
							self.newBullet2();
							com.score -= 20;
							self.timer = 0;
						}
						
						break;
                }
            },
            // 松开按键时，停止向该方向的加速
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
						this.stateKeyA = false;
                        self.moveToLeft = false;
						if(this.stateKeyD)
							self.moveToRight = true;
                        break;
                    case cc.KEY.d:
						this.stateKeyD = false;
                        self.moveToRight = false;
						if(this.stateKeyA)
							self.moveToLeft = true;
                        break;
                }
            }
        }, self.node);
    },
	
    // use this for initialization
    onLoad: function () {
		  // 加速度方向开关
        this.moveToLeft = false;
        this.moveToRight = false;
        // 主角当前水平方向速度
        this.speed = 0;
		
        // 初始化键盘输入监听
        this.setInputControl();
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
		this.timer += dt;
		 if(com.muO - this.node.x <= 30||this.node.x - com.muO >= 0)
		 {
			 this.moveToRight = false;
		 }
		 if(this.node.x<=com.muLeft)
		 {
			 this.moveToLeft = false;
		 }
		// 根据当前加速度方向每帧更新速度
        if (this.moveToLeft) {
            this.speed = -80;
			
        } else if (this.moveToRight) {
            this.speed = 80;
        }else {
			this.speed = 0;
		}

        // 根据当前速度更新主角的位置
        this.node.x += this.speed * dt;
		
		if(this.node.y<=com.groundY)
			this.node.destroy();
     }
});
