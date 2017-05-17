var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
		bgAudioSrc: {
         type: cc.AudioSource,
         default: null
		},
		gameoverAudioSrc: {
			type: cc.AudioSource,
			default: null
		},
		levelSuccessAudioSrc: {
			type: cc.AudioSource,
			default: null
		},
		runWolf: {
			default: null,
			type: cc.Prefab
		},
		sheep:{
			default:null,
			type: cc.Node
		},
		flys:{
			default:null,
			type:cc.Node
		},
		
		bullets:{
			default:null,
			type:cc.Node
		},
		runs:{
			default:null,
			type:cc.Node
		},
		fly:{//包含wolf 和 ball 
			default:null,
			type: cc.Prefab
		},
		//怪物到达横木之后的气球
		flyBall:{
			default:null,
			type: cc.Prefab
		},
		boomBall:{
			default:null,
			type: cc.Prefab
		},
		downWolf:{
			default:null,
			type: cc.Prefab
		},
		standWolf:{
			default:null,
			type: cc.Prefab
		},
		//控制产生狼的数量
		maxWolfNum:0,
		//狼的实时数量
		wolfNum: 0,
		//每次间隔多久产生一只狼
		timeForNewAWolf:3,
		//计时器
		timer :0
    },
	
	playBgMus: function () {
		if(com.flagAudio)
		{
			this.bgAudioSrc.loop = true;
			this.bgAudioSrc.play();
		//	cc.log('play bgMusic');
		}
	},
	stopBgMus: function () {
		this.bgAudioSrc.stop();
	},
	
	playGameoverMus: function(){
		if(com.flagAudio)
		{
			this.gameoverAudioSrc.play();
			this.gameoverAudioSrc.loop = false;
			cc.log('play gameover music');
		}
	},
	playLevelSuccessMus:function(){
		if(com.flagAudio)
		{
			this.levelSuccessAudioSrc.play();
			this.levelSuccessAudioSrc.loop = false;
			cc.log('play success music');
		}
	},
	setTimeForNewAWolf:function(){
		this.timeForNewAWolf = cc.random0To1()*10;
	},
	
    // use this for initialization
    onLoad: function () {
		
		cc.director.getScene().autoReleaseAssets = true;
		
		this.playBgMus();
		//this.playGameoverMus();模拟器有效，无法播放shoot音效
		this.wolfNum = 0;
		//不同的关卡最多出现大的狼的数量不同
		if(com.levelNum==1)
			this.maxWolfNum = 10;
		else if(com.levelNum==2)
			this.maxWolfNum = 20;
		else
			this.maxWolfNum = 25;
		
		// 生成一个新的狼
      //  this.newRunWolf();
		this.sheep.getComponent('sheep').game = this;
    },
	
	
	
	newRunWolf:function(){
		var runW  = cc.instantiate(this.runWolf);
		cc.find('Collider/runs').addChild(runW);
		runW.getComponent('wolfRun').game = this;
		runW.setPosition(cc.p(com.runStartX,com.groundY));
		
		this.setTimeForNewAWolf();
		this.wolfNum = this.wolfNum + 1;
	},
	
	newFly:function(x,y){
		var fly = cc.instantiate(this.fly);
		cc.find('Collider/flys').addChild(fly);
		fly.getComponent('fly').game = this;
		fly.setPosition(cc.p(x,y));
	},
	
	newFlyBall:function(x,y){
		var flyB = cc.instantiate(this.flyBall);
		this.node.addChild(flyB);
		flyB.getComponent('ballFly').game = this;
		flyB.setPosition(cc.p(x,y));
	},
	
	newDownWolf:function(x,y){
		var downW = cc.instantiate(this.downWolf);
		this.node.addChild(downW);
		downW.getComponent('wolfDown').game = this;
		downW.setPosition(cc.p(x,y));
	},
	
	newBoomBall:function(x,y){
		var boomB = cc.instantiate(this.boomBall);
		this.node.addChild(boomB);
		boomB.getComponent('ballBoom').game = this;
		boomB.setPosition(cc.p(x,y));
	},
	
	newStandWolf:function(x,y){
		var standW = cc.instantiate(this.standWolf);
		cc.find('Collider/stands').addChild(standW);
		standW.setPosition(cc.p(x,y));
		standW.getComponent('standWolf').game = this;
		if(y>com.groundY)
			com.wolfLijv += (standW.x - com.muO)* 30;
	},
	
	getSheepLijv:function(){
		var x = (com.muO - this.sheep.x)*80;
		return x;
	},
	
	isOver:function(){
		var sheepLijv = this.getSheepLijv();
		 var wolfLijv = com.wolfLijv;
		
		 //gameover
		 if(sheepLijv<wolfLijv)
		 {
			 com.gameState = -1;
			 this.rotate();
			 this.sheepDown(); 
			 return ;
		 }
		 //
		 if(this.wolfNum<this.maxWolfNum)
			 return ;
		 //
		 var runNode = cc.find('Collider/runs');//cc.log(runNode.getChildrenCount());
		 var flyNode = cc.find('Collider/flys');//cc.log(flyNode.getChildrenCount());
		 if(runNode.getChildrenCount()==0&&flyNode.getChildrenCount()==0)
		 {
			 com.gameState = 1;
		 }
		
	},
	
	rotate:function(){
		var ac = cc.rotateTo(2,50);
		var mu = cc.find('Canvas/level-bg/mu');
		mu.runAction(ac);
	},
	
	sheepDown:function(){
		var ac = cc.moveTo(3,cc.p(this.sheep.x,com.groundY));
		this.sheep.runAction(ac);
	},
	
	updateComData:function(x){
		com.wolfLijv = 0;
		com.gameState = 0;
		com.score = 0;
		if(x==1)//win
		{
				if(com.levelNum==1)
					com.level2State = true;
			
				else if(com.levelNum==2)
					com.level3State = true;
		}
		
	},
	
    // called every frame, uncomment this function to activate update callback
     update: function (dt) {//this.myCollider();
		this.timer += dt;
		if(this.wolfNum<this.maxWolfNum)
		{
			if(this.timer>=this.timeForNewAWolf)
			{
				this.newRunWolf();
				this.timer = 0;
			}
		}
		
		if(com.gameState==0)
		{
			this.isOver();
			//cc.log('gameState: '+com.gameState);
		}
		if(com.gameState==0)
			return ;
		if(com.gameState==-1)
		{
			//play gameoverAudioSrc
			if(this.bgAudioSrc.isPlaying)//无法判断,原生平台无此方法。因而模拟器在此中断
			{
				this.stopBgMus();
				this.playGameoverMus();
			}
			//change scene
			if(!this.gameoverAudioSrc.isPlaying)
			{
				//重设初始数据
				this.updateComData(-1);
				cc.director.loadScene('StartMenuScene');
				this.node.destroy();
			//cc.log('change scene');
			}
		//	cc.log('gameover');
		 }
		 else
		 {
			 //cc.log('success');
			 if(this.bgAudioSrc.isPlaying)//无法判断,原生平台无此方法。因而模拟器在此中断
			{
				this.stopBgMus();
				this.playLevelSuccessMus();
			}
			if(!this.levelSuccessAudioSrc.isPlaying)
			{
				//重设初始数据
				this.updateComData(1);
				cc.director.loadScene('StartMenuScene');
				this.node.destroy();
			//cc.log('change scene');
			}
		 }
     }
});
