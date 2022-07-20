class Car{
    constructor(model, power, color){
        this.model = model;
        this.power = power;
        this.color = color;
    }

    go(){
        console.log(`${this.color} ${this.model}가 ${this.power}마력으로 출발합니다.`);
    }

    stop(){
        console.log(`${this.color} ${this.model}가 멈췄습니다.`);
    }
}