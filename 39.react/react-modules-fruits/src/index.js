import food from './food';
import {choice, remove} from './helpers';

let fruits = choice(food)
console.log({fruits});
console.log(`I'd like one ${fruits}, please.`);
console.log(`Here you go: ${fruits}`);
console.log(`May I have another?`)

let remFruits = remove(fruits, food);
console.log(remFruits);
console.log(`I'm sorry, we're all out.  We have ${remFruits.length} left.`)