function countDown(num){
    let timer = setInterval(function(){
        num--;
        if (num <= 0){
            clearInterval(timer);
            console.log('Done!');
        }
        else {
            console.log(num);
        }
    }, 1000)
}



function randomGame(){
    let total = 0;
    let num;
 //   let round = Math.round(num * 100) / 100;
    let timer = setInterval(function(){
        num = Math.random();
        total++
        if (num > .75){
            clearInterval(timer);
            console.log(total + " tries with a winning:" + Math.round(num * 100) / 100);
        }
    }, 1000)
}
