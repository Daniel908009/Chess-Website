class Piece {
    constructor(x, y, player) {
        this.x = x;
        this.y = y;
        this.player = player;
    }
}

class Pawn extends Piece {
    constructor(x, y, image) {
        super(x, y, image)
        this.numMoves = 0
        if (this.player == 1) {
            this.image = loadImage('images/pawn.png')
        } else {
            this.image = loadImage('images/pawn.png')
        }
    }
    GetMoves() {
        let moves = []
        if (this.player == 1) {
            if (this.numMoves == 0) {
                moves.push([this.x, this.y + 2])
            }
            moves.push([this.x, this.y + 1])
            console.log(moves)
        }
        else {
            if (this.numMoves == 0) {
                moves.push([this.x, this.y - 2])
            }
            moves.push([this.x, this.y - 1])
            console.log(moves)
        }
        return moves
    }
}

let gameGridLayout = [
    [null, null, null, null, null, null, null, null],
    [Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn],
    [null, null, null, null, null, null, null, null],
]

let gameGrid = []
for (let i = 0; i < 8; i++) {
    gameGrid.push([]);
    for (let j = 0; j < 8; j++) {
        gameGrid[i].push(null);
    }
}

baseSize = 0;

window.addEventListener('resize', function () {
    resizeCanvas(window.innerWidth * 0.7, window.innerHeight * 0.7);
    baseSize = width > height ? height / 8 : width / 8;
    console.log("resized");
}
)


function setup() {
    canvas = createCanvas(window.innerWidth * 0.7, window.innerHeight * 0.7);
    baseSize = width > height ? height / 8 : width / 8;
    //background(200);
    canvas.parent('chessboard');
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (gameGridLayout[i][j] != null) {
                gameGrid[i][j] = new gameGridLayout[i][j](i, j, 1);
                //console.log(gameGrid[i][j]);
            }
        }
    }
    //console.log(gameGrid);
}

function drawTiles() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i + j) % 2 == 0) {
                fill(255);
            } else {
                fill(0);
            }
            rect(i * baseSize, j * baseSize, baseSize, baseSize);
        }
    }
}

function drawPieces() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (gameGrid[i][j] != null) {
                image(gameGrid[i][j].image, j * baseSize, i * baseSize, baseSize, baseSize);
                //console.log("pieces drawn");
            }
        }
    }
}

function draw() {
    drawTiles();
    //console.log("this is running");
    drawPieces();
}
