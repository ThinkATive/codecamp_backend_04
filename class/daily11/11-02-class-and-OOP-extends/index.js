const dayInfo = new Date();

console.log(dayInfo.getFullYear());
console.log(dayInfo.getMonth() + 1);


class Monster {
    constructor(power){
        this.power = power;
    }

    attack() {
        console.log("공격하자!!");
        console.log("내 공격력은 " + this.power + "야!!!");
    }
}

class SkyMonster extends Monster {
    constructor(qqq){
        super(qqq);
    }
    run() {
        console.log("날라서 도망가자!!");
    }
}

class GroundMonster extends Monster {
    constructor(aaa){
        super(aaa);
    }
    run() {
        console.log("뛰어서 도망가자!!");
    }
}

const mymonster1 = new SkyMonster(10);
mymonster1.attack();
mymonster1.run();

const mymonster2 = new GroundMonster(50);
mymonster2.attack();
mymonster2.run();