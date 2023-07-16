const playBtn = document.getElementById("playBtn");
const displaySection = document.querySelector(".intro_section");
const gameSection = document.querySelector(".game_section");
const scoreTag = document.getElementById("score");
const gameArea = document.getElementById("game_area");
const targetCircleTag = document.getElementById("target_circle");
const startCircleTag = document.getElementById("start_circle");
const predictedPointTag = document.getElementById("predicted_point");

let gameAreaWidth = -1;
let gameAreaHeight = -1;
let scoreTagHeight = -1;

let prevPos = [];
let targetPos = [];

let clickCount = 0;
let score = 0;

// Event listener for starting playing the game
playBtn.addEventListener("click", (e) => {
    console.log("lets play the game")
    displaySection.classList.add("hide");
    gameSection.classList.remove("hide");
    gameSection.classList.add("hide_cursor");
    handleGetSize()
    createTarget();

    prevPos = [e.clientX, e.clientY];
    createStartPoint();

    gameSection.addEventListener("click", (e) => {
        clickCount++;
        handlePredict(e.clientX, e.clientY);
        scoreTag.innerText = `Clicks: ${clickCount} Score: ${score}`;
    })
})

// Event listener to get the height and width of the game area when window size is changed
window.addEventListener("resize", handleGetSize);

// Get the height and width of the game area
function handleGetSize() {
    gameAreaWidth = gameArea.offsetWidth;
    gameAreaHeight = gameArea.offsetHeight;
    scoreTagHeight = scoreTag.offsetHeight;
    console.log(gameAreaWidth);
}

// Get random position to generate target within the game board
function getRandomPosition() {
    let posX = 50 +  Math.floor(Math.random() * (gameAreaWidth-100));
    let posY = scoreTagHeight + 50 + Math.floor(Math.random() * (gameAreaHeight - scoreTagHeight - 100));

    return [posX, posY];
}

// Set target position
function createTarget(){
    targetPos = getRandomPosition();

    targetCircleTag.style.top = `${targetPos[1]}px`;
    targetCircleTag.style.left = `${targetPos[0]}px`;
}

// Set start position
function createStartPoint(){
    startCircleTag.style.top = `${prevPos[1]}px`;
    startCircleTag.style.left = `${prevPos[0]}px`;
}

function handlePredict(clientX, clientY){
    prevPos = [clientX, clientY];
    createStartPoint();
    
    if(isInsideCircle()){
        createTarget();
        score += 10;
    }
}

function isInsideCircle() {
    let x = (prevPos[0] - targetPos[0]) * (prevPos[0] - targetPos[0]);
    let y = (prevPos[1] - targetPos[1]) * (prevPos[1] - targetPos[1]);
    let r = 50;

    return ((x+y) <= r*r);
}