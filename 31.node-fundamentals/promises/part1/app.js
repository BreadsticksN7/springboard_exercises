// Step 1
let favNum = 10;
let numberUrl = "http://numbersapi.com";

$.getJSON(`${numberUrl}/${favNum}?json`)
    .then(res => {console.log(res);
    });


// Step 2
let favNums = [1, 3, 4, 5]

$.getJSON(`${numberUrl}/${favNums}?json`)
    .then(res => {console.log(res)
    });


// Step 3
Promise.all(
    Array.from({ length: 4 }, () => {
        return $.getJSON(`${numberUrl}/${favNum}?json`);
    })
).then(res => {
    res.forEach(results => $("body").append(`<p>${results.text}`));
});