const HeroDirection = cc.Enum({
    WALK_LEFT:-1,
    WALK_RIGHT:-1,
});

const HeroNodePath = "Canvas/bgNode/roadNode/hero";     //hero的cc.find（路径）
const RoadPath = "Canvas/bgNode/roadNode/bgRoad";     //bgRoad.find（路径）

const RoleState = cc.Enum({
    IDLE:-1,        //空闲
    WALK:-1,        //走路
    HURT:-1,        //受伤
    ATTACK:-1,      //攻击
    DIE:-1,         //死亡
});

module.exports = {
    HeroDirection,
    HeroNodePath,
    RoleState,
    RoadPath,
};