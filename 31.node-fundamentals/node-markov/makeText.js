/** Command-line tool to generate Markov text. */

const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');

//Generate text
function generateText(text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

//Read file to get text
function makeText(path){
    fs.readFile(path, 'utf8', function cb(err, data){
        if (err){
            console.error("Can't read file");
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}

//Read url to get text
async function makeUrlText(url){
    let res;
    try {
        res = await axios.get(url);
    } catch (err) {
        console.error("Can't read url");
        process.exit(1);
    }
    generateText(res.data);
}

//Pick between url or file
let [method, path] = process.argv.slice(2);
if (method === "file"){
    makeText(path);
}
else if (method === "url"){
    makeUrlText(path);
}
else {
    console.error("Unknown method");
    process.exit(1);
}