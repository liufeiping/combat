cc.Class({
    extends: cc.Component,

    properties: {
        speed:0,
    },

    // use this for initialization
    onLoad: function () {
        this.isMove = false;
    },

    moveRight:function(){
        this.isMove = true;
        this.speed = -1*Math.abs(this.speed);
    },

    moveLeft:function(){
        this.isMove = true;
        this.speed = Math.abs(this.speed);
    },

    stopMove:function(){
        this.isMove = false;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.isMove){
            var pos = this.node.getPosition();
            pos.x += this.speed*dt;
            this.node.setPosition(pos);
        }
    },
});
