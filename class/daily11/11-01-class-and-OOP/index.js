const dayInfo = new Date();

console.log(dayInfo.getFullYear());
console.log(dayInfo.getMonth() + 1);

class Monster {
  constructor(power) {
    this.power = power;
  }

  attack() {
    console.log("공격하자!!");
    console.log("내 공격력은 " + this.power + "야!!!");
  }
  run = () => {
    console.log("도망가자!!");
  };
}

const mymonster1 = new Monster(10);
const mymonster2 = new Monster(50);

mymonster1.attack();
mymonster2.attack();
