const HeroDirc = require("types").HeroDirection;

cc.Class({
    extends: cc.Component,

    properties: {
        hero:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        var heroScr = this.hero.getComponent("hero");
        //按钮按下
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            heroScr.walk(HeroDirc.WALK_LEFT);
        }.bind(this));
        //按钮松开
        this.node.on(cc.Node.EventType.TOUCH_END, function(event){
            heroScr.walkBtnTouchEnd();
        }.bind(this));
        //按钮松开
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(event){
            heroScr.walkBtnTouchEnd();
        }.bind(this));
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
