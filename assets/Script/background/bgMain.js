const HeroDirc = require("types").HeroDirection;
const RoadPath = require("types").RoadPath;

cc.Class({
    extends: cc.Component,

    properties: {
        bgBack:cc.Node,
        houseNode:cc.Node,
        enemyPfb:cc.Prefab,
        enemyPfb2:cc.Prefab,
        roadNode:cc.Node,
        heroNode:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.bgBackScr = this.bgBack.getComponent("bgBack");
        this.houseScr = this.houseNode.getComponent("bgHouse");
        //添加enemy
        var heroPosY = this.heroNode.getPositionY();
        var roadWidth = cc.find(RoadPath).getContentSize().width;   //单个道路图片宽
        var self = this;
        this.schedule(function(){
            var enemy;
            if(cc.random0To1() > 0.5)
                enemy =  cc.instantiate(self.enemyPfb);
            else
                enemy =  cc.instantiate(self.enemyPfb2);
            self.roadNode.addChild(enemy);
            enemy.setPosition(cc.random0To1()*3*roadWidth, heroPosY);
        },0.05,10);
    },

    moveRight:function(){
        this.bgBackScr.moveRight();
        this.houseScr.moveRight();
    },

    moveLeft:function(){
        this.bgBackScr.moveLeft();
        this.houseScr.moveLeft();
    },

    stopMove:function(){
        this.bgBackScr.stopMove();
        this.houseScr.stopMove();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
