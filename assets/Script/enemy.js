const types = require("types");
const RoleState = require("types").RoleState;
const RoadPath = require("types").RoadPath;

cc.Class({
    extends: cc.Component,

    properties: {
        blood:0,
        attackVal:0,
        enemyMvSpeed:0,
        enemyHitNode:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.anim = this.node.getComponent(cc.Animation);
        this.roleState = RoleState.IDLE;        //当前角色状态
        this.heroNode = cc.find(types.HeroNodePath);
        // this.heroScr = this.heroNode.getComponent("hero");
        this.hitBoxWidth = this.enemyHitNode.getContentSize().width;
        this.colldWidth = this.node.getComponent(cc.BoxCollider).size.width;
        this.heroColldWidth = this.heroNode.getComponent(cc.BoxCollider).size.width;
        this.roadWidth = cc.find(RoadPath).getContentSize().width;
        this.schedule(this.myUpdate,0);
    },

    hurt:function(hurtVal){
        if(this.roleState != RoleState.HURT && this.roleState != RoleState.DIE){
            this.roleState = RoleState.HURT;
            //受伤时enemy方向朝向hero
            if(this.heroNode.getPositionX() < this.node.getPositionX()){
                //hero在enemy的左侧，enemy需要flipx
                this.node.runAction(cc.flipX(true));
            }else{
                this.node.runAction(cc.flipX(false));
            }
            this.anim.stop();
            this.anim.play("enemyHurt");
            this.blood -= hurtVal;
            if(this.blood <= 0){
                this.die();
            }
        }
    },

    walk:function(){
        if(this.roleState != RoleState.HURT){
            this.roleState = RoleState.WALK;
            this.anim.stop();
            this.anim.play("enemyWalk");
        }
    },

    idle:function(){
        this.roleState = RoleState.IDLE;
        this.anim.stop();
        this.anim.play("enemyIdle");
    },

    attack:function(){
        if(this.roleState != RoleState.HURT && this.roleState != RoleState.ATTACK && this.roleState != RoleState.DIE){
            this.roleState = RoleState.ATTACK;
            this.anim.stop();
            this.anim.play("enemyAttack");
        }
    },

    die:function(){
        this.roleState = RoleState.DIE;
        this.anim.stop();
        this.anim.play("enemyDie");
    },
    //攻击动画完成后
    onAttackEnd:function(){
        this.enemyHitNode.active = false;
        this.idle();
        this.scheduleOnce(function(){
            this.schedule(this.myUpdate, 0);
        }, 0.3 + cc.random0To1()*2.0 );
    },
    //攻击动画进行到一半
    onAttackHalf:function(){
        this.enemyHitNode.active = true;
    },

    //受伤动画完成后
    onHurtEnd:function(){
        this.idle();
        this.unschedule(this.myUpdate);
        this.scheduleOnce(function(){
            this.schedule(this.myUpdate, 0);
        }, cc.random0To1()*0.5 );
    },

    onDieEnd:function(){
        var seq = cc.sequence(cc.fadeOut(0.5), cc.removeSelf());
        this.node.runAction(seq);
    },

    // called every frame, uncomment this function to activate update callback
    myUpdate: function (dt) {
        //--------------向hero移动-----------------
        var distX = this.node.getPositionX() - this.heroNode.getPositionX();
        //距离hero太远enemy不动
        if(distX > this.roadWidth*0.5)
            return;
        var scalex = this.node.getScaleX();
        //根据位置改变enemy朝向
        if(distX >0){
            this.node.runAction(cc.flipX(true));
        }else{
            this.node.runAction(cc.flipX(false));
        }
        if(Math.abs(distX) > this.hitBoxWidth*scalex + this.colldWidth*scalex/2 +this.heroColldWidth*scalex/2){
            if(this.roleState != RoleState.WALK){
                this.walk();
            }
            if(distX >0){
                //敌人在hero右边,往左边移动
                this.enemyMvSpeed = -1*Math.abs(this.enemyMvSpeed);
                // this.node.runAction(cc.flipX(true));
            }else{
                this.enemyMvSpeed = Math.abs(this.enemyMvSpeed);
                // this.node.runAction(cc.flipX(false));
            }
            this.node.setPositionX(this.node.getPositionX() + dt* this.enemyMvSpeed);
        }else{
            //在可攻击范围内,发动攻击
            this.attack();
            this.unschedule(this.myUpdate);
        }
    },
});
