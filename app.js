const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

canv.width = window.innerWidth * 4/5;
canv.height = window.innerHeight * 4/5;
let leftup = false;
let leftdown = false;
let rightup = false;
let rightdown = false;


document.addEventListener("keydown", function(e) { 
    if (e.key.toLowerCase() == "s") {
        //leftPlayerY += 20;
        leftdown = true
    }
    if (e.key.toLowerCase() == "w") {
        //leftPlayerY -= 20;
        leftup = true
    }
    if (e.key.toLowerCase() == "arrowdown") {
        rightdown = true
        //rightPlayerY += 20;
    }   
    if (e.key.toLowerCase() == "arrowup") {
        //rightPlayerY -= 20;
        rightup = true
    }
    //console.log(e.key.toLowerCase())
 });


 document.addEventListener("keyup", function(e) { 
    if (e.key.toLowerCase() == "s") {
        //leftPlayerY += 20;
        leftdown = false
    }
    if (e.key.toLowerCase() == "w") {
        //leftPlayerY -= 20;
        leftup = false
    }
    if (e.key.toLowerCase() == "arrowdown") {
         rightdown = false
    }
        //rightPlayerY += 20;
        if (e.key.toLowerCase() == "arrowup") {
        //rightPlayerY -= 20;
        rightup = false
    }
    //console.log(e.key.toLowerCase())
 });



 

let leftPlayerX = 50;
let leftPlayerY = canv.height /2 - 150 /2;
let rightPlayerX = canv.width - 150;
let rightPlayerY = canv.height/2 - 150 / 2;

let playerW = 30;
let playerH = 150;
let ballX = canv.width / 2;
let ballY = canv.height / 2;
let ballW = 30;
let ballH = 30;

let ballSpeedX = -4;
let ballSpeedY = 6;
let originalBallXSpeed = 6;
let originalBalYSpeed = 4;
let ballIncrementX = 0
let ballIncrementY = 0
let leftScore = 0;
let rightScore = 0;

let ballTimer = Date.now();
let ballDelay = 1000;
let ballIsFrozen = false;
console.log(ballTimer)
 //gameloop
 setInterval(function() {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canv.width, canv.height);
    
    ctx.fillStyle = "yellow";
    ctx.fillRect(leftPlayerX, leftPlayerY, playerW, playerH);

    ctx.fillStyle = "Red";
    ctx.fillRect(rightPlayerX, rightPlayerY, playerW, playerH);

    ctx.fillStyle = "White";
    ctx.fillRect(ballX, ballY, ballW, ballH);

    ctx.font = "54px Arial"
    ctx.fillText(leftScore, 380, 100)
    ctx.font = "54px Arial"
    ctx.fillText("-", 470, 100)
    ctx.font = "54px Arial"
    ctx.fillText(rightScore, 550, 100)

    if (leftScore == 10) {
        ctx.fillText("Left Wins!", 380, 170)    
    }
    if (rightScore == 10) {
        ctx.fillText("Right Wins!", 380, 170)    
    }
    
    updateBall()
    updatePaddles()
 },33);

 function updatePaddles() {
    if (leftup && leftPlayerY > 0) {
        leftPlayerY -= 10;
    }

    if (leftdown && leftPlayerY < canv.height - playerH) {
        leftPlayerY += 10;
    }

    if (rightup && rightPlayerY > 0) {
        rightPlayerY -= 10;
    }

    if (rightdown && rightPlayerY
         < canv.height - playerH) {
        rightPlayerY += 10;
    }
 }
function ballReset() {
    ballX = canv.width / 2;
    ballY = canv.height / 2;
    ballSpeedX = 0
    ballSpeedY = 0
    ballIsFrozen = true;

}

 function updateBall() {
    ballX += ballSpeedX;
    ballY -= ballSpeedY;
    if (ballY < 0) {
        ballSpeedY *= -1
        
    }

    if (ballX < 0) {
        ballReset()
        // ballSpeedY * 1.05
        rightScore += 1;
        console.log(rightScore)
        if (rightScore == 10) {
            console.log("right player wins!")

        }
  
    }
// git add
// git commit
//git push

    if (ballX >= canv.width) {
       ballSpeedX *= -1;
       ballReset()
       leftScore += 1;
       if (leftScore == 10) {
        console.log("left player wins!")
     }
   
    } 

if (Date.now() - ballTimer > ballDelay && ballIsFrozen == true) {
    ballSpeedX = 4
    ballSpeedY = 6
    ballIsFrozen = false
    ballSpeedX = originalBallXSpeed + ballIncrementX
    ballSpeedY = originalBalYSpeed + ballIncrementY
    ballIncrementX += 1
    ballIncrementY += 1
}


    if (ballY >= canv.height) {
        ballSpeedY *= -1;
    }
  
    //left paddle colison
    //wsconsole.log(rightPlayerX, rightPlayerY, ballX, ballY)
    if (checkSquareCollision(ballX, ballY, ballW, ballH, leftPlayerX, leftPlayerY, playerW, playerH)) {
            ballSpeedX *= -1
        }
    //right paddle colision
    if (checkSquareCollision(ballX, ballY, ballW, ballH, rightPlayerX, rightPlayerY, playerW, playerH)) {
            ballSpeedX *= -1       
        }
    
        if (rightScore == 10 || leftScore == 10) {
            ballSpeedX = 0
            ballSpeedY = 0
            ballIsFrozen = true;
        }
        


    //if (ballX) RIGHT GETS POINT
 }

 function checkSquareCollision(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
    




    if (r2x < r1x + r1w) {
        if (r2x + r2w > r1x) {
            if (r2y + r2h > r1y) {
                if (r2y < r1y + r1h ) {
                    return true
                }
            }
        }
    }
    
    return false;
 }
 
//  if (rightScore == 10) {
//     console.log("right player wins!")
//  }
 
 


 //Rolltide2606!

