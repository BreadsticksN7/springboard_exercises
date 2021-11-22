// Setting crying to giveBirth function lets you pull the cry variable directly
const crying = giveBirth()
function giveBirth(){
    console.log("Giving birth!")
    return function cry() {
        return 'Waaah'
    }
}

// Set variable double to 2 will make it multiple by 2 when given a command
// double(3) = 6  (num is from makeMulti, x is from double variable)
const double = makeMulti(2)
function makeMulti(num){
    return function mult(x){
        return num * x;
    }
}

// Anonomyous function + Timer
setTimeout(function() {
    giveBirth();
    giveBirth();
    console.log("meow");
}, 1000);