class MyFirstCar {
    constructor(make,model,year){
        this.make = make;
        this.model = model;
        this.year = year;
    }
    toString(){
        return `The car is a ${this.make} ${this.model} from ${this.year}.`;
    }
    honk(){
        return 'Beep';
    }
}

class FirstCar extends MyFirstCar{
    constructor(make,model,year){
        super(make,model,year);
         this.numWheels = '4';
    }
}

class MotorCycle extends MyFirstCar{
    constructor(make,model,year){
        super(make,model,year);
        this.numWheels = '2';
    }
    revEngine(){
        return 'Vrooom';
    }
}

class Garage {
    constructor(max){
        this.cars = [];
        this.max = max;
    }
    addCar(newCar){
        if(!(newCar instanceof MyFirstCar)) {
            return 'Only cars and bikes allowed';
        }
        if(this.cars.length >= this.max){
            return 'Full';
        }
        this.cars.push(newCar);
        return 'Added';
    }
}

