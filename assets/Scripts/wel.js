cc.Class({
    extends: cc.Component,

    properties: {
		welLabel: {
			default: null,
			type: cc.Label
		},
		welbgmus: {
			default: null,
			url: cc.AudioClip
		}
        
    },

    // use this for initialization
    onLoad: function () {
		//play welbgmus
		cc.audioEngine.playEffect(this.welbgmus,false);
		
		// 初始化键盘输入监听
        this.setInputControl();
    },
	setInputControl: function () {
        var self = this;
        //add keyboard input listener to jump, turnLeft and turnRight
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // if press the key 'enter' ,will change scene to 'StartMenuScene'
            onKeyPressed: function(keyCode, event) {
				if(keyCode==cc.KEY.enter)
				{
					//cc.audioEngine.stopAll();
					cc.director.loadScene('StartMenuScene');
				}
            }
           
        }, self.node);
	}
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
