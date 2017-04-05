cc.Class({
    extends: cc.Component,

    properties: {
        speed:0,

        house1:cc.Node,
        house2:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.isMove = false;
        this.visibleSize = cc.director.getVisibleSize();
        this.cttSize = this.house1.getContentSize();
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
            var self = this;
            function resetPos(house){
                var posx = house.getPositionX();
                posx += self.speed*dt;
                house.setPositionX(posx);
                //‘房子背景’运动到左边（屏幕外）,重新放到右边
                if(posx <= self.visibleSize.width - 2*self.cttSize.width ){
                    house.setPositionX(posx + 2*self.cttSize.width );
                }else if(posx > self.cttSize.width ){
                    //‘房子背景’运动到右边（屏幕外）,重新放到左边
                    house.setPositionX(posx - 2*self.cttSize.width );
                }
            }
            resetPos(this.house1);
            resetPos(this.house2);
        }
    },
});
