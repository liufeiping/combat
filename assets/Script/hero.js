const HeroDirection = require("types").HeroDirection;
const RoleState = require("types").RoleState;
const RoadPath = require("types").RoadPath;

cc.Class({
    extends: cc.Component,

    properties: {
        heroSpeed:0,
        blood:0,
        attackVal:0,
        bgMain:cc.Node,
        roadNode:cc.Node,
        heroHitNode:cc.Node,
        hpProgBar:cc.ProgressBar,
    },

    onEnable: function () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    // use this for initialization
    onLoad: function () {
        this.anim = this.node.getComponent(cc.Animation);
        this.bgMainScr = this.bgMain.getComponent("bgMain");
        this.roadWidth = cc.find(RoadPath).getContentSize().width;
        this.curDirection = HeroDirection.WALK_RIGHT;
        this.visibleSize = cc.director.getVisibleSize();
        this.cSizeWidth = this.node.getContentSize().width;
        // this.hitScr = this.heroHitNode.getComponent("heroHit");
        this.roleState = RoleState.IDLE;        //角色当前状态
        this.curBlood = this.blood;
    },

    hurt:function(hurtVal){
        if(this.roleState != RoleState.HURT && this.roleState != RoleState.DIE){
            this.roleState = RoleState.HURT;
            this.anim.stop();
            this.anim.play("heroHurt");
            //停止移动hero
            this.isMovingHero = false;        
            this.bgMainScr.stopMove();
            this.curBlood -= hurtVal;
                        // cc.log(this.curBlood/this.blood);
            this.hpProgBar.progress = this.curBlood/this.blood;
            if(this.curBlood <= 0){
                this.die();
            }
        }
    },

    walk:function(heroDirection){
        if(this.roleState != RoleState.HURT && this.roleState != RoleState.DIE){
            if(heroDirection != this.curDirection){
                //hero左右翻转
                if(heroDirection == HeroDirection.WALK_LEFT){
                    this.node.runAction(cc.flipX(true));
                }else{
                    this.node.runAction(cc.flipX(false));
                }
            }
            this.roleState = RoleState.WALK;
            this.anim.stop();
            this.anim.play("heroWalk");
            // //当背景不能移动时，移动hero
            this.curDirection = heroDirection;
            this.moveHero();
        }
    },

    idle:function(){
        this.roleState = RoleState.IDLE;
        this.anim.stop();
        this.anim.play("heroIdle");
        this.bgMainScr.stopMove();
        this.isMovingHero = false;
    },

    attack:function(){
        if(this.roleState != RoleState.HURT && this.roleState != RoleState.DIE && this.roleState != RoleState.ATTACK){
            this.roleState = RoleState.ATTACK;
            this.anim.stop();
            this.anim.play("heroAttack");
            this.heroHitNode.active = true;
            this.bgMainScr.stopMove();
        }
        this.isMovingHero = false;
    },
    die:function(){
        this.roleState = RoleState.DIE;
        this.anim.stop();
        this.anim.play("heroDie");
        this.heroHitNode.active = false;
    },
    //攻击动画完成后
    onAttackEnd:function(){
        this.heroHitNode.active = false;
        this.idle();
    },
    //受伤动画完成后
    onHurtEnd:function(){
        this.idle();
    },
    //死亡动画完成后
    onDieEnd:function(){
        // this.node.runAction(cc.fadeOut(0.5));
    },
    //松开方向按钮
    walkBtnTouchEnd:function(){
        if(this.roleState == RoleState.WALK){
            this.idle();
        }
    },

    //移动hero (移动到最左/右侧时不再移动背景)
    moveHero:function(){
        this.isMovingHero = true; 
        if(this.curDirection == HeroDirection.WALK_LEFT){
            this.heroSpeed = -1*Math.abs(this.heroSpeed);
        }else{
            this.heroSpeed = Math.abs(this.heroSpeed);
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.isMovingHero){
            var posx = this.node.getPositionX();
            //限制hero不移出可视范围
            if(this.curDirection == HeroDirection.WALK_LEFT && posx <= this.cSizeWidth/2){
                return;
            }
            else if(this.curDirection == HeroDirection.WALK_RIGHT && posx >= 3*this.roadWidth - this.cSizeWidth){
                return;
            }
            posx += this.heroSpeed*dt;
            this.node.setPositionX(posx);
            if(posx >= 3*this.roadWidth - this.visibleSize.width/2 - this.cSizeWidth/2 || posx <= this.visibleSize.width/2){
                this.bgMainScr.stopMove();
            }
            else if(posx > this.visibleSize.width/2)
            {
                //移动道路
                var rposx = this.roadNode.getPositionX()
                rposx -= this.heroSpeed*dt;
                this.roadNode.setPositionX(rposx);
                //移动背景
                if(this.curDirection == HeroDirection.WALK_RIGHT)
                    this.bgMainScr.moveRight();
                else if(this.curDirection == HeroDirection.WALK_LEFT)
                    this.bgMainScr.moveLeft();
            }
        }
    },
});
