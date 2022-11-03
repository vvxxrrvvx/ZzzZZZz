const papanGame = document.querySelector("#papanGame");
const ctx = papanGame.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = papanGame.width;
const gameHeight = papanGame.height;
const backgroundPapan = "white";
const warnaUlar = "lightgreen";
const borderUlar = "black";
const warnaMakanan = "red";
const ukuranUnit = 25;
let running= false;
let xVelocity = ukuranUnit;
let yVelocity = 0;
let makananX;
let makananY;
let score = 0;
let Ular = [
    {x:ukuranUnit * 4, y:0},
    {x:ukuranUnit * 3, y:0},
    {x:ukuranUnit * 2, y:0},
    {x:ukuranUnit, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running = true;
    scoreText.textContent = score;
    buatMakanan();
    gambarMakanan();
    nextTick();
};

function nextTick(){
    if(running){
        setTimeout(()=>{
            clearPapan();
            gambarMakanan();
            gerakanUlar();
            gambarUlar();
            checkGameOver();
            nextTick();
        }, 75);
       
    }
    else{
        displayGameOver();
    }
};

function clearPapan(){
    ctx.fillStyle = backgroundPapan;
    ctx.fillRect(0, 0, gameWidth, gameHeight); 
};

function checkGameOver(){
    switch(true){
        case(Ular[0].x < 0):
        running = false;
        break;
        case(Ular[0].x >= gameWidth):
        running = false;
        break;
        case(Ular[0].y < 0):
        running = false;
        break;
        case(Ular[0].y >= gameHeight):
        running = false;
        break;
    }
    for(let i = 1; i < Ular.length; i+=1){
        if(Ular[i].x == Ular[0].x && Ular[i].y == Ular[0].y){
            running = false;
        }
    }
};

function buatMakanan(){
    function randomMakanan(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / ukuranUnit) * ukuranUnit;
        return randNum;
    }
    makananX = randomMakanan(0, gameWidth - ukuranUnit);
    makananY = randomMakanan(0, gameWidth - ukuranUnit);
};

function gerakanUlar(){
    const head = {x: Ular[0].x + xVelocity,
                  y: Ular[0].y + yVelocity};
    Ular.unshift(head);
    if(Ular[0].x == makananX && Ular[0].y == makananY){
        score+=1;
        scoreText.textContent = score;
        buatMakanan();
    }
    else{
        Ular.pop();
    }
};

function gambarMakanan(){
    ctx.fillStyle = warnaMakanan;
    ctx.fillRect(makananX, makananY, ukuranUnit, ukuranUnit);
};

function gambarUlar(){
    ctx.fillStyle = warnaUlar;
    ctx.strokeStyle = borderUlar;
    Ular.forEach(bagianUlar => {
        ctx.fillRect(bagianUlar.x, bagianUlar.y, ukuranUnit, ukuranUnit); 
        ctx.strokeRect(bagianUlar.x, bagianUlar.y, ukuranUnit, ukuranUnit);
    })
};

function changeDirection(event){
    const keyPressed = event.keyCode;
    console.log(keyPressed);
    const KIRI = 37;
    const KANAN = 39;
    const ATAS = 38;
    const BAWAH = 40;

    const menujuAtas = (yVelocity == -ukuranUnit);
    const menujuBawah = (yVelocity == ukuranUnit);
    const menujuKanan = (xVelocity == ukuranUnit);
    const menujuKiri = (xVelocity == -ukuranUnit);

    switch(true){
        case(keyPressed == KIRI && !menujuKanan):
        xVelocity = -ukuranUnit;
        yVelocity = 0;
        break;
        case(keyPressed == ATAS && !menujuBawah):
        xVelocity = 0;
        yVelocity = -ukuranUnit;
        break;
        case(keyPressed == KANAN && !menujuKiri):
        xVelocity = ukuranUnit;
        yVelocity = 0;
        break;
        case(keyPressed == BAWAH && !menujuAtas):
        xVelocity = 0;
        yVelocity = ukuranUnit;
        break;
    }
};

function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText = "GAME OVER:(", gameWidth / 2, gameHeight / 2;
    running = false;
};

function resetGame(){
    score = 0;
    xVelocity = ukuranUnit;
    yVelocity = 0;
    Ular = [
        {x:ukuranUnit * 4, y:0},
        {x:ukuranUnit * 3, y:0},
        {x:ukuranUnit * 2, y:0},
        {x:ukuranUnit, y:0},
        {x:0, y:0}
    ];
    gameStart();
};
