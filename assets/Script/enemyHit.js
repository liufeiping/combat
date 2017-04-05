const HeroNodePath = require("types").HeroNodePath;

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad:function(){
        this.heroScr = cc.find(HeroNodePath).getComponent("hero");
    },
    
    onCollisionEnter: function (other, self) {
        // cc.log("enenmy onCollisionEnter")
        if(cc.random0To1() < 0.85)
            other.getComponent("hero").hurt(this.heroScr.attackVal);
    }

});
