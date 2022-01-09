const fs = require('fs');
const process = require('process');
const axios = require('axios');

//Step 1: Display content of file
function cat(path, out){
    fs.readFile(path, 'utf8', (err, data) => {
        if (err){
            console.error(`Error reading: ${path}: ${err}`)
            process.exit(1);
        } else {
            writeFile(data, out);
        }
    });
}

//Step 2: Display content of web url
async function webCat(url, out){
  try{
    let res = await axios.get(url);
    writeFile(res.data, out);
    } catch (err){
        console.error(`Error finding ${url}: ${err}`);
        process.exit(1);
    }
}

//Step 3: Output file
function writeFile(text, out){
    if (out){
      fs.writeFile(out, text, 'utf8', function(err){
          if(err){
              console.error(`Couldn't write file ${out}: ${err}`);
              process.exit(1);
          }
          });
      } else {
          console.log(text)
      }
}


let path;
let out;

if (process.argv[2] === '--out'){
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0,4) === 'http'){
    webCat(path, out);
} else {
    cat(path, out);
}
