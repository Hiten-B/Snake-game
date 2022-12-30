let inputDir = { x: 0, y: 0 }
let foodsound = new Audio("food.mp3")
let bgsound = new Audio("gamebg.mp3")
let movesound = new Audio("snakemove.mp3")
let oversound = new Audio("gameover.mp3")
let speed = 5
let score = 0
let lastpainttime = 0
let snakearr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 }


// functions

function main(ctime) {
    // console.log(ctime)
    window.requestAnimationFrame(main)

    if ((ctime - lastpainttime) / 1000 < 1 / speed) {
        return
    }
    lastpainttime = ctime

    gameengine()
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;

}

function gameengine() {
    bgsound.play()

    // part 1 = Update snake and food
    if (isCollide(snakearr)) {
        oversound.play()
        bgsound.pause()
        inputDir = { x: 0, y: 0 }
        alert("Game Over! Press Ok to continue.")
        snakearr = [{ x: 13, y: 15 }];
        bgsound.play()
        

    }

    // if you have eaten the food, increment the score and regenerate the food

    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        foodsound.play()
        snakearr.unshift({ x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Moving the snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }

    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;



    // part 2 = display snake and food
    board.innerHTML = ""
    snakearr.forEach((e, index) => {
        snakeelement = document.createElement("div")
        snakeelement.style.gridRowStart = e.y
        snakeelement.style.gridColumnStart = e.x
        board.appendChild(snakeelement)


        if (index == 0) {
            snakeelement.classList.add("head")

        }
        else {
            snakeelement.classList.add("snake")

        }


    })

    foodelement = document.createElement("div")
    foodelement.style.gridRowStart = food.y
    foodelement.style.gridColumnStart = food.x
    board.appendChild(foodelement)
    foodelement.classList.add("food")

}



// main logic

window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    movesound.play()
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0
            inputDir.y = -1
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0
            inputDir.y = 1
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1
            inputDir.y = 0
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1
            inputDir.y = 0
            break;

        default:
            break;


    }


})