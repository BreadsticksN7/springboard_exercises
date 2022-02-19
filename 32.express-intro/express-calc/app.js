const express = require('express');
const ExpressError = require('./errorHandle'); 
const {convertAndValidateNumsArray, createFrequencyCounter,findMean, findMedian, findMode} = require('./helpers');

const app = express();


//const NUMS = [1,3,5,7]

app.get('/mean', (req, res, next) => {
      if (!req.query.nums) {
          throw new ExpressError('Pass a num', 400)
      }
      let numsAsStrings = req.query.nums.split(',');
      let nums = convertAndValidateNumsArray(numsAsStrings);
      let results = { operation: "mean", result: findMean(nums)};
      console.log(results)
    //   if (nums instanceof Error){
    //     return next(new ExpressError(nums.message))        
    //   }
      if (nums instanceof Error) {
          throw new ExpressError(nums.message);
      }
      return res.send(results)
})

app.get('/median', (req, res, next) => {
    if (!req.query.nums) {
      throw new ExpressError('Pass a num', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numsAsStrings);
    
    if (nums instanceof Error) {
      throw new ExpressError(nums.message);
    }
    let results = { operation: "median", result: findMedian(nums) };
    console.log(results)
    return res.send(results);
})

app.get('/mode', (req, res, next) => {
  if (!req.query.nums) {
    throw new ExpressError('Pass a num', 400)
  }
  let numsAsStrings = req.query.nums.split(',');
  let nums = convertAndValidateNumsArray(numsAsStrings);
  
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }
  let results = { operation: "mode", result: findMode(nums) };
  console.log(results)
  return res.send(results);
})


// If no other route matches, respond with a 404
app.use((req, res, next) => {
  const e = new ExpressError("Page Not Found", 404)
  next(e)
})

// Error handler
app.use(function (err, req, res, next) { 
  let status = err.status || 500;
  let message = err.message;

  return res.status(status).json({
    error: { message, status }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000")
});
