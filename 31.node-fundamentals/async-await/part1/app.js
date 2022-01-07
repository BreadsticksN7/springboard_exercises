// Step 1
let favNum = 10;
let numberUrl = "http://numbersapi.com";

async function part1(){
  let data = await $.getJSON(`${numberUrl}/${favNum}?json`);
  console.log(data);
}
part1();


// Step 2
let favNums = [1, 3, 4, 5]

async function part2(){
  let data = await $.getJSON(`${numberUrl}/${favNums}?json`);
  console.log(data);
}
part2();


// Step 3
async function part3(){
  let facts = await Promise.all(
      Array.from({ length: 4 }, () => $.getJSON(`${numberUrl}/${favNum}?json`))
    );
    facts.forEach(data => $("body").append(`<p>${data.text}`));
}
part3();
