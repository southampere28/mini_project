const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let foodX,foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let heading = "";
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

let gameOver = false;
let setIntervalId;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const changeDirection = (e) => {
    // console.log(e);
    if(e.key === "ArrowDown" && heading != "up") {
        velocityX = 0;
        velocityY = 1;
        heading = "down"
    } 
    else if (e.key === "ArrowUp" && heading != "down") {
        velocityX = 0;
        velocityY = -1;
        heading = "up"
    } 
    else if (e.key === "ArrowRight" && heading != "left") {
        velocityX = 1;
        velocityY = 0;
        heading = "right"
    } 
    else if (e.key === "ArrowLeft" && heading != "right") {
        velocityX = -1;
        velocityY = 0;
        heading = "left";
    } 
    initGame();
}

const handlerGameOver = () => {
    clearInterval(setIntervalId);
    alert("u got lost :(");
    location.reload();
}

const initGame = () => {

    if (gameOver) {
        return handlerGameOver();
    }

    let htmlMarkup = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;
    
    snakeX += velocityX;
    snakeY += velocityY;
    
    if (snakeX === 31) {
        snakeX = 1;
    } else if (snakeX === 0) {
        snakeX = 30;
    } else if (snakeY === 0) {
        snakeY = 30;
    } else if (snakeY === 31) {
        snakeY = 1;
    }
    
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        // console.log(snakeBody);
        score++;
        // highScore++;

        highScore = score >= highScore ? score : highScore;
        scoreElement.innerText = `Score:  ${score}`;
        localStorage.setItem("high-score", highScore);
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
    
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    
    snakeBody[0] = [snakeX, snakeY];


    for (let i = 0; i < snakeBody.length; i++) {

        htmlMarkup += `<div class="headsnake" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;

        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);