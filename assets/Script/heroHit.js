cc.Class({
    extends: cc.Component,

    properties: {
        heroScr:require("hero"),
    },

    // use this for initialization
    // onEnable: function () {
    //     cc.director.getCollisionManager().enabled = true;
    //     cc.director.getCollisionManager().enabledDebugDraw = true;
    // },
    
    // onDisable: function () {
    //     cc.director.getCollisionManager().enabled = false;
    //     cc.director.getCollisionManager().enabledDebugDraw = false;
    // },
    
    onCollisionEnter: function (other, self) {
        // cc.log("Hero Hit onCollisionEnter！");
        if(cc.random0To1() < 0.75)
            other.getComponent("enemy").hurt(this.heroScr.attackVal);
    }

});
