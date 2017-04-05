cc.Class({
    extends: cc.Component,

    properties: {
        hero:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        var heroScr = this.hero.getComponent("hero");
        this.enableAttack = true;
        //按钮按下
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            if(this.enableAttack){
                heroScr.attack();
                this.enableAttack = false;
                var self = this;
                this.scheduleOnce(function(){
                    self.enableAttack = true;
                },0.7);
            }
        }.bind(this));
        //按钮松开
        this.node.on(cc.Node.EventType.TOUCH_END, function(event){
           // heroScr.idle();
        }.bind(this));
        //按钮松开
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(event){
           // heroScr.idle();
        }.bind(this));
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
