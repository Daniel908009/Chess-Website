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
            this.image = loadImage('images/black_pawn.png')
        }
    }
    GetMoves() {
        let moves = []
        if (this.player == 1) {
            if (this.numMoves == 0) {
                moves.push([this.x, this.y + 2])
            }
            moves.push([this.x, this.y + 1])
        }
        else {
            if (this.numMoves == 0) {
                moves.push([this.x, this.y - 2])
            }
            moves.push([this.x, this.y - 1])
        }
        return moves
    }
}

class Rook extends Piece {
    constructor(x, y, image) {
        super(x, y, image)
        if (this.player == 1) {
            this.image = loadImage('images/rook.png')
        } else {
            this.image = loadImage('images/black_rook.png')
        }
    }
    GetMoves() {
        let moves = []
        return moves
    }
}

class Bishop extends Piece {
    constructor(x, y, image) {
        super(x, y, image)
        if (this.player == 1) {
            this.image = loadImage('images/bishop.png')
        } else {
            this.image = loadImage('images/black_bishop.png')
        }
    }

    GetMoves() {
        let moves = []
        return moves
    }

}

class Knight extends Piece {
    constructor(x, y, image){
        super(x, y, image)
        if (this.player == 1){
            this.image = loadImage('images/horse.png')
        }
        else{
            this.image = loadImage('images/black_horse.png')
        }
    }
    GetMoves(){
        let moves = []
        /*moves.push([this.x, this.y])
        console.log(this.x, this.y)
        moves.push([this.x +2, this.y +1])
        
        moves.push([this.x +2, this.y -1])
        moves.push([this.x -2, this.y +1])
        moves.push([this.x -2, this.y -1])
        moves.push([this.x +1, this.y +2])
        moves.push([this.x -1, this.y +2])*/
        if (this.x + 2 < 8 && this.y + 1 < 8){
            if (gameGrid[this.y +1][this.x +2] == null){
                moves.push([this.x +2, this.y +1])
            }else if (gameGrid[this.y +1][this.x +2].player != this.player){
                moves.push([this.x +2, this.y +1])
                console.log(gameGrid[this.y +1][this.x +2].player)
            }else{
                console.log('this tile is occupied by your own piece')
                console.log(gameGrid[this.y +1][this.x +2])
        }}
        if (this.x - 2 >= 0 && this.y + 1 < 8){
            if (gameGrid[this.y +1][this.x -2] == null){
                moves.push([this.x -2, this.y +1])
            }else if (gameGrid[this.y +1][this.x -2].player != this.player){
                moves.push([this.x -2, this.y +1])
                console.log(gameGrid[this.y +1][this.x -2].player)
            }else{
                console.log('this tile is occupied by your own piece')
                console.log(gameGrid[this.y +1][this.x -2])
            }
        }
        if (this.x +2 < 8 && this.y - 1 >= 0){
            if (gameGrid[this.y -1][this.x +2] == null){
                moves.push([this.x +2, this.y -1])
            }else if (gameGrid[this.y -1][this.x +2].player != this.player){
                moves.push([this.x +2, this.y -1])
                console.log(gameGrid[this.y -1][this.x +2].player)
            }else{
                console.log('this tile is occupied by your own piece')
                console.log(gameGrid[this.y -1][this.x +2])
            }
        }
        if (this.x - 2 >= 0 && this.y - 1 >= 0){
            if (gameGrid[this.y -1][this.x -2] == null){
                moves.push([this.x -2, this.y -1])
            }else if (gameGrid[this.y -1][this.x -2].player != this.player){
                moves.push([this.x -2, this.y -1])
                console.log(gameGrid[this.y -1][this.x -2].player)
            }else{
                console.log('this tile is occupied by your own piece')
                console.log(gameGrid[this.y -1][this.x -2])
            }
        }
        if (this.y + 2 < 8 && this.x + 1 < 8){
            if (gameGrid[this.y +2][this.x +1] == null){
                moves.push([this.x +1, this.y +2])
            }else if (gameGrid[this.y +2][this.x +1].player != this.player){
                moves.push([this.x +1, this.y +2])
                console.log(gameGrid[this.y +2][this.x +1].player)
            }else{
                console.log('this tile is occupied by your own piece')
                console.log(gameGrid[this.y +2][this.x +1])
            }}
        if (this.y + 2 < 8 && this.x - 1 >= 0){
            if (gameGrid[this.y +2][this.x -1] == null){
                moves.push([this.x -1, this.y +2])
            }else if (gameGrid[this.y +2][this.x -1].player != this.player){
                moves.push([this.x -1, this.y +2])
                console.log(gameGrid[this.y +2][this.x -1].player)
            }else{
                console.log('this tile is occupied by your own piece')
                console.log(gameGrid[this.y +2][this.x -1])
            }}
        if (this.y - 2 >= 0 && this.x + 1 < 8){
            if (gameGrid[this.y -2][this.x +1] == null){
                moves.push([this.x +1, this.y -2])
            }else if (gameGrid[this.y -2][this.x +1].player != this.player){
                moves.push([this.x +1, this.y -2])
                console.log(gameGrid[this.y -2][this.x +1].player)
            }else {
                console.log('this tile is occupied by your own piece')
                console.log(gameGrid[this.y -2][this.x +1])
            }}
        if (this.y - 2 >= 0 && this.x - 1 >= 0){
            if (gameGrid[this.y -2][this.x -1] == null){
                moves.push([this.x -1, this.y -2])
            }else if (gameGrid[this.y -2][this.x -1].player != this.player){
                moves.push([this.x -1, this.y -2])
                console.log(gameGrid[this.y -2][this.x -1].player)
            }else{
                console.log('this tile is occupied by your own piece')
                console.log(gameGrid[this.y -2][this.x -1])
            }}
        //moves.push([this.x -1, this.y -2])
        return moves
    }
}

class King extends Piece {
    constructor(x, y, image){
        super(x, y, image)
        if (this.player == 1){
            this.image = loadImage('images/king.png')
        }else{
            this.image = loadImage('images/black_king.png')
        }
    }
    GetMoves(){
        let moves = []
        return moves
    }
}

class Queen extends Piece {
    constructor(x, y, image){
        super(x, y, image)
        if (this.player == 1){
            this.image = loadImage('images/queen.png')
        }else{
            this.image = loadImage('images/black_queen.png')
        }
    }
    GetMoves(){
        let moves = []
        return moves
    }
}

let gameGridLayout = [
    [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook],
    [Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn],
    [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook],
]
let gameGridOwners = [ // there is for sure a better way to do this, so I will change it later
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2],
]

let gameGrid = []
for (let i = 0; i < 8; i++) {
    gameGrid.push([]);
    for (let j = 0; j < 8; j++) {
        gameGrid[i].push(null);
    }
}

let availableMoves = []
let baseSize = 0;

function resizeCanvasFunc(){
    width = document.getElementById('chessboard').offsetWidth;
    height = document.getElementById('chessboard').offsetHeight;
    size = width > height ? height : width;
    resizeCanvas(size, size);
    baseSize = height / 8;
}
window.addEventListener('resize', function () {
    resizeCanvasFunc();
}
)


function setup() {
    width = windowWidth * 0.8;
    height = windowHeight * 0.8;
    size = width > height ? height : width;
    canvas = createCanvas(size, size);
    baseSize = height / 8;
    canvas.parent('chessboard');
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if (gameGridLayout[y][x] != null) {
                gameGrid[y][x] = new gameGridLayout[y][x](x, y, gameGridOwners[y][x]);
            }
        }
    }
}

function drawTiles() {
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            let isAvailable = false;
            for (let k = 0; k < availableMoves.length; k++) {
                if (x == availableMoves[k][0] && y == availableMoves[k][1]) {
                    fill(0, 255, 0)
                    isAvailable = true;
                    console.log('this tile is available')
                }
            }
            if ((x + y) % 2 == 0 && !isAvailable) {
                fill(255);
            } else if (!isAvailable) {
                fill(0);
            }
            rect(x * baseSize, y * baseSize, baseSize, baseSize);
        }
    }
}

function drawPieces() {
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if (gameGrid[y][x] != null) {
                image(gameGrid[y][x].image, x * baseSize, y * baseSize, baseSize, baseSize);
            }
        }
    }
}

function mousePressed() {
    let x = Math.floor(mouseX / baseSize);
    let y = Math.floor(mouseY / baseSize);
    console.log('x: ' + x + ' y: ' + y)
    if (x < 8 && y < 8 && x >= 0 && y >= 0 && gameGrid[y][x] != null) {
        availableMoves = gameGrid[y][x].GetMoves();
    } else {
        availableMoves = []
        console.log(gameGrid)
        /*just for testing
        for (let i =0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                if (gameGrid[i][j] != null){
                    console.log(gameGrid[i][j].player)
                }
            }
        }*/
    }
}

function draw() {
    drawTiles();
    drawPieces();
}
