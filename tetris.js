let canvas = document.getElementById("game-canvas")
let scoreboard = document.getElementById("scoreboard")
let ctx = canvas.getContext("2d")
ctx.scale(BLOCK_SIDE_LENGTH, BLOCK_SIDE_LENGTH)
let model = new GameModel(ctx)

let score = 0

setInterval(() => {
    newGameState()
}, GAME_CLOCK);


let newGameState = () => {
    fullSend()
    if (model.fallingPiece === null) {
        const rand = Math.round(Math.random() * 6) + 1
        const newPiece = new Piece(SHAPES[rand], ctx)
        model.fallingPiece = newPiece
        model.moveDown()
    } else {
        model.moveDown()
    }
}

const fullSend = () => {
    const allFilled = (row) => {
        for (let x of row) {
            if (x === 0) {
                return false
            }
        }
        return true
    }

    for (let i = 0; i < model.grid.length; i++) {
        if (allFilled(model.grid[i])) {
            score += SCORE_WORTH
            model.grid.splice(i, 1)
            model.grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        }
    }

    scoreboard.innerHTML = "Score: " + String(score)
}

document.addEventListener("keydown", (e) => {
    e.preventDefault()
    switch (e.key) {
        case "e":
            model.rotate()
            break
        case "E":
            model.rotate()
            break
        case "f":
            model.move(true)
            break
        case "F":
            model.move(true)
            break
        case "d":
            model.moveDown()
            break
        case "D":
            model.moveDown()
            break
        case "s":
            model.move(false)
            break
        case "S":
            model.move(false)
            break
    }
})
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        model.rotate()
    }
    else if (e.keyCode == '40') {
        model.moveDown()
    }
    else if (e.keyCode == '37') {
        model.move(false)
    }
    else if (e.keyCode == '39') {
        model.move(true)
    }

}