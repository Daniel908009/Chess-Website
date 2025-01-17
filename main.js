class Piece {
    constructor(x, y, player) {
        this.x = x;
        this.y = y;
        this.player = player;
        this.selected = false;
        this.numMoves = 0
    }
}

class Pawn extends Piece {
    constructor(x, y, image) {
        super(x, y, image)
        this.type = 'Pawn'
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
            if (gameGrid[this.y +1][this.x +1] != null && gameGrid[this.y +1][this.x +1].player != this.player){
                moves.push([this.x +1, this.y +1])
            }
            if (gameGrid[this.y +1][this.x -1] != null && gameGrid[this.y +1][this.x -1].player != this.player){
                moves.push([this.x -1, this.y +1])
            }
            if (this.x + 1 < 8 && gameGrid[this.y][this.x + 1] != null && gameGrid[this.y][this.x + 1].player != this.player && gameGrid[this.y][this.x + 1].numMoves == 1){
                moves.push([this.x + 1, this.y + 1])
                specialMoves.push([this.x + 1, this.y + 1])
            }
            if (this.x - 1 >= 0 && gameGrid[this.y][this.x - 1] != null && gameGrid[this.y][this.x - 1].player != this.player && gameGrid[this.y][this.x - 1].numMoves == 1){
                moves.push([this.x - 1, this.y + 1])
                specialMoves.push([this.x - 1, this.y + 1])
            }
        }
        else {
            if (this.numMoves == 0) {
                moves.push([this.x, this.y - 2])
            }
            moves.push([this.x, this.y - 1])
            if (gameGrid[this.y -1][this.x +1] != null && gameGrid[this.y -1][this.x +1].player != this.player){
                moves.push([this.x +1, this.y -1])
            }
            if (gameGrid[this.y -1][this.x -1] != null && gameGrid[this.y -1][this.x -1].player != this.player){
                moves.push([this.x -1, this.y -1])
            }
            if (this.x + 1 < 8 && gameGrid[this.y][this.x + 1] != null && gameGrid[this.y][this.x + 1].player != this.player && gameGrid[this.y][this.x + 1].numMoves == 1){
                moves.push([this.x + 1, this.y - 1])
                specialMoves.push([this.x + 1, this.y - 1])
            }
            if (this.x - 1 >= 0 && gameGrid[this.y][this.x - 1] != null && gameGrid[this.y][this.x - 1].player != this.player && gameGrid[this.y][this.x - 1].numMoves == 1){
                moves.push([this.x - 1, this.y - 1])
                specialMoves.push([this.x - 1, this.y - 1])
            }
        }
        
        return moves
    }
}

class Rook extends Piece {
    constructor(x, y, image) {
        super(x, y, image)
        this.type = "Rook"
        if (this.player == 1) {
            this.image = loadImage('images/rook.png')
        } else {
            this.image = loadImage('images/black_rook.png')
        }
    }
    GetMoves() {
        let moves = []
        for (let i = 1; i < 8; i++) {
            if (this.x + i < 8) {
                if (gameGrid[this.y][this.x + i] == null) {
                    moves.push([this.x + i, this.y])
                } else if (gameGrid[this.y][this.x + i].player != this.player) {
                    moves.push([this.x + i, this.y])
                    break
                } else {
                    break
                }
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.x - i >= 0) {
                if (gameGrid[this.y][this.x - i] == null) {
                    moves.push([this.x - i, this.y])
                } else if (gameGrid[this.y][this.x - i].player != this.player) {
                    moves.push([this.x - i, this.y])
                    break
                } else {
                    break
                }
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.y + i < 8) {
                if (gameGrid[this.y + i][this.x] == null) {
                    moves.push([this.x, this.y + i])
                } else if (gameGrid[this.y + i][this.x].player != this.player) {
                    moves.push([this.x, this.y + i])
                    break
                } else {
                    break
                }
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.y - i >= 0) {
                if (gameGrid[this.y - i][this.x] == null) {
                    moves.push([this.x, this.y - i])
                } else if (gameGrid[this.y - i][this.x].player != this.player) {
                    moves.push([this.x, this.y - i])
                    break
                } else {
                    break
                }
            }
        }
        if (this.numMoves == 0){
            if (gameGrid[this.y][this.x -1] == null && gameGrid[this.y][this.x -2] == null && gameGrid[this.y][this.x -3] == null && gameGrid[this.y][this.x -4] != null && gameGrid[this.y][this.x -4].type == "Rook" && gameGrid[this.y][this.x -4].numMoves == 0){
                moves.push([this.x -2, this.y]);
                specialMoves.push([this.x -2, this.y]);
            }
            if (gameGrid[this.y][this.x +1] == null && gameGrid[this.y][this.x +2] == null && gameGrid[this.y][this.x +3] != null && gameGrid[this.y][this.x +3].type == "Rook" && gameGrid[this.y][this.x +3].numMoves == 0){
                moves.push([this.x +2, this.y]);
                specialMoves.push([this.x +2, this.y]);
            }
        }
        return moves
    }
}

class Bishop extends Piece {
    constructor(x, y, image) {
        super(x, y, image)
        this.type = "Bishop"
        if (this.player == 1) {
            this.image = loadImage('images/bishop.png')
        } else {
            this.image = loadImage('images/black_bishop.png')
        }
    }

    GetMoves() {
        let moves = []
        let temp = true;
        //console.log("this was called")
        let i = 1;
        while(temp){
            if (this.x + i < 8 && this.y + i < 8){
                if (gameGrid[this.y + i][this.x + i] == null){
                    moves.push([this.x + i, this.y + i]);
                }else if (gameGrid[this.y + i][this.x + i].player != this.player){
                    moves.push([this.x + i, this.y + i]);
                    temp = false;
                }else{
                    temp = false;
                    //console.log('friendly piece', gameGrid[this.y + i][this.x + i])
                }
                i++;
            }else{
                temp = false;
            }
        }
        temp = true;
        i = 1;
        while(temp){
            if (this.x - i >= 0 && this.y - i >= 0){
                if (gameGrid[this.y - i][this.x - i] == null){
                    moves.push([this.x - i, this.y -i]);
                }else if (gameGrid[this.y - i][this.x -i].player != this.player){
                    moves.push([this.x -i, this.y -i]);
                    temp = false;
                }else{
                    temp = false;
                }
                i++;
            }else{
                temp = false;
            }
        }
        temp = true;
        i = 1;
        while(temp){
            if (this.y + i < 8 && this.x - i >= 0){
                if (gameGrid[this.y + i][this.x -i] == null){
                    moves.push([this.x -i, this.y +i]);
                }else if (gameGrid[this.y +i][this.x -i].player != this.player){
                    moves.push([this.x - i, this.y +i]);
                    temp = false;
                }else{
                    temp = false;
                }
                i++;
            } else{
                temp = false;
            }
        }
        temp = true;
        i = 1;
        while(temp){
            if (this.y - i >= 0 && this.x + i < 8){
                if (gameGrid[this.y - i][this.x + i] == null){
                    moves.push([this.x + i, this.y - i]);
                }else if(gameGrid[this.y - i][this.x + i].player != this.player){
                    moves.push([this.x +i, this.y -i]);
                    temp = false;
                }else{
                    temp = false;
                }
                i++;
            }else{
                temp = false;
            }
        }
        return moves;
    }

}

class Knight extends Piece {
    constructor(x, y, image){
        super(x, y, image);
        this.type = "Knight";
        if (this.player == 1){
            this.image = loadImage('images/horse.png');
        }
        else{
            this.image = loadImage('images/black_horse.png');
        }
    }
    GetMoves(){
        let moves = []
        if (this.x + 2 < 8 && this.y + 1 < 8){
            if (gameGrid[this.y +1][this.x +2] == null){
                moves.push([this.x +2, this.y +1])
            }else if (gameGrid[this.y +1][this.x +2].player != this.player){
                moves.push([this.x +2, this.y +1])
                console.log(gameGrid[this.y +1][this.x +2].player)
            }}
        if (this.x - 2 >= 0 && this.y + 1 < 8){
            if (gameGrid[this.y +1][this.x -2] == null){
                moves.push([this.x -2, this.y +1])
            }else if (gameGrid[this.y +1][this.x -2].player != this.player){
                moves.push([this.x -2, this.y +1])
                console.log(gameGrid[this.y +1][this.x -2].player)
            }
        }
        if (this.x +2 < 8 && this.y - 1 >= 0){
            if (gameGrid[this.y -1][this.x +2] == null){
                moves.push([this.x +2, this.y -1])
            }else if (gameGrid[this.y -1][this.x +2].player != this.player){
                moves.push([this.x +2, this.y -1])
                console.log(gameGrid[this.y -1][this.x +2].player)
            }
        }
        if (this.x - 2 >= 0 && this.y - 1 >= 0){
            if (gameGrid[this.y -1][this.x -2] == null){
                moves.push([this.x -2, this.y -1])
            }else if (gameGrid[this.y -1][this.x -2].player != this.player){
                moves.push([this.x -2, this.y -1])
                console.log(gameGrid[this.y -1][this.x -2].player)
            }
        }
        if (this.y + 2 < 8 && this.x + 1 < 8){
            if (gameGrid[this.y +2][this.x +1] == null){
                moves.push([this.x +1, this.y +2])
            }else if (gameGrid[this.y +2][this.x +1].player != this.player){
                moves.push([this.x +1, this.y +2])
                console.log(gameGrid[this.y +2][this.x +1].player)
            }}
        if (this.y + 2 < 8 && this.x - 1 >= 0){
            if (gameGrid[this.y +2][this.x -1] == null){
                moves.push([this.x -1, this.y +2])
            }else if (gameGrid[this.y +2][this.x -1].player != this.player){
                moves.push([this.x -1, this.y +2])
                console.log(gameGrid[this.y +2][this.x -1].player)
            }}
        if (this.y - 2 >= 0 && this.x + 1 < 8){
            if (gameGrid[this.y -2][this.x +1] == null){
                moves.push([this.x +1, this.y -2])
            }else if (gameGrid[this.y -2][this.x +1].player != this.player){
                moves.push([this.x +1, this.y -2])
                console.log(gameGrid[this.y -2][this.x +1].player)
            }}
        if (this.y - 2 >= 0 && this.x - 1 >= 0){
            if (gameGrid[this.y -2][this.x -1] == null){
                moves.push([this.x -1, this.y -2])
            }else if (gameGrid[this.y -2][this.x -1].player != this.player){
                moves.push([this.x -1, this.y -2])
                console.log(gameGrid[this.y -2][this.x -1].player)
            }}
        return moves
    }
}

class King extends Piece {
    constructor(x, y, image){
        super(x, y, image);
        this.type = "King";
        if (this.player == 1){
            this.image = loadImage('images/king.png')
        }else{
            this.image = loadImage('images/black_king.png')
        }
    }
    GetMoves(){
        let moves = []
        if (this.x + 1 < 8 && this.y + 1 < 8){
            if (gameGrid[this.y +1][this.x +1] == null){
                moves.push([this.x +1, this.y +1])
            }else if (gameGrid[this.y +1][this.x +1].player != this.player){
                moves.push([this.x +1, this.y +1])
                console.log(gameGrid[this.y +1][this.x +1].player)
            }}
        if (this.x - 1 >= 0 && this.y + 1 < 8){
            if (gameGrid[this.y +1][this.x -1] == null){
                moves.push([this.x -1, this.y +1])
            }else if (gameGrid[this.y +1][this.x -1].player != this.player){
                moves.push([this.x -1, this.y +1])
                console.log(gameGrid[this.y +1][this.x -1].player)
            }
        }
        if (this.x +1 < 8 && this.y - 1 >= 0){
            if (gameGrid[this.y -1][this.x +1] == null){
                moves.push([this.x +1, this.y -1])
            }else if (gameGrid[this.y -1][this.x +1].player != this.player){
                moves.push([this.x +1, this.y -1])
                console.log(gameGrid[this.y -1][this.x +1].player)
            }
        }
        if (this.x - 1 >= 0 && this.y - 1 >= 0){
            if (gameGrid[this.y -1][this.x -1] == null){
                moves.push([this.x -1, this.y -1])
            }else if (gameGrid[this.y -1][this.x -1].player != this.player){
                moves.push([this.x -1, this.y -1])
                console.log(gameGrid[this.y -1][this.x -1].player)
            }
        }
        if (this.y + 1 < 8){
            if (gameGrid[this.y +1][this.x] == null){
                moves.push([this.x, this.y +1])
            }else if (gameGrid[this.y +1][this.x].player != this.player){
                moves.push([this.x, this.y +1])
                console.log(gameGrid[this.y +1][this.x].player)
            }}
        if (this.y - 1 >= 0){
            if (gameGrid[this.y -1][this.x] == null){
                moves.push([this.x, this.y -1])
            }else if (gameGrid[this.y -1][this.x].player != this.player){
                moves.push([this.x, this.y -1])
                console.log(gameGrid[this.y -1][this.x].player)
            }}
        if (this.x + 1 < 8){
            if (gameGrid[this.y][this.x +1] == null){
                moves.push([this.x +1, this.y])
            }else if (gameGrid[this.y][this.x +1].player != this.player){
                moves.push([this.x +1, this.y])
                console.log(gameGrid[this.y][this.x +1].player)
            }}
        if (this.x - 1 >= 0){
            if (gameGrid[this.y][this.x -1] == null){
                moves.push([this.x -1, this.y])
            }else if (gameGrid[this.y][this.x -1].player != this.player){
                moves.push([this.x -1, this.y])
                console.log(gameGrid[this.y][this.x -1].player)
            }}
        if (this.numMoves == 0){
            if (gameGrid[this.y][this.x +1] == null && gameGrid[this.y][this.x +2] == null && gameGrid[this.y][this.x +3] != null && gameGrid[this.y][this.x +3].type == "Rook" && gameGrid[this.y][this.x +3].numMoves == 0){
                moves.push([this.x +2, this.y]);
                specialMoves.push([this.x +2, this.y]);
            }
            if (gameGrid[this.y][this.x -1] == null && gameGrid[this.y][this.x -2] == null && gameGrid[this.y][this.x -3] == null && gameGrid[this.y][this.x -4] != null && gameGrid[this.y][this.x -4].type == "Rook" && gameGrid[this.y][this.x -4].numMoves == 0){
                moves.push([this.x -2, this.y]);
                specialMoves.push([this.x -2, this.y]);
            }
        }
        return moves
    }
}

class Queen extends Piece {
    constructor(x, y, image){
        super(x, y, image);
        this.type = "Queen";
        if (this.player == 1){
            this.image = loadImage('images/queen.png')
        }else{
            this.image = loadImage('images/black_queen.png')
        }
    }
    GetMoves(){
        let moves = []
        for (let i = 1; i < 8; i++){
            if (this.x + i < 8){
                if (gameGrid[this.y][this.x +i] == null){
                    moves.push([this.x +i, this.y]);
                }else if (gameGrid[this.y][this.x +i].player != this.player){
                    moves.push([this.x +i, this.y]);
                    break;
                } else{
                    break;
                }
            }
        }
        for (let i = 1; i < 8; i++){
            if (this.x - i >= 0){
                if (gameGrid[this.y][this.x - i] == null){
                    moves.push([this.x - i, this.y]);
                }else if (gameGrid[this.y][this.x - i].player != this.player){
                    moves.push([this.x - i, this.y]);
                    break;
                }else{
                    break;
                }
            }
        }
        for (let i = 1; i < 8; i++){
            if (this.y + i < 8){
                if (gameGrid[this.y + i][this.x] == null){
                    moves.push([this.x, this.y + i]);
                }else if (gameGrid[this.y + i][this.x].player != this.player){
                    moves.push([this.x, this.y + i]);
                    break;
                }else{
                    break;
                }
            }
        }
        for (let i = 1; i < 8; i++){
            if (this.y - i >= 0){
                if (gameGrid[this.y - i][this.x] == null){
                    moves.push([this.x, this.y - i]);
                }else if (gameGrid[this.y - i][this.x].player != this.player){
                    moves.push([this.x, this.y - i]);
                    break;
                }else{
                    break;
                }
            }
        }

        let temp = true;
        let i = 1;
        while(temp){
            if (this.x + i < 8 && this.y + i < 8 && i < 8){
                if (gameGrid[this.y + i][this.x + i] == null){
                    moves.push([this.x + i, this.y + i]);
                }else if (gameGrid[this.y + i][this.x + i].player != this.player){
                    moves.push([this.x + i, this.y + i]);
                    temp = false;
                }else{
                    temp = false;
                }
                i++;
            } else{
                temp = false;
            }
        }
        temp = true;
        i = 1;
        while(temp){
            if (this.x - i >= 0 && this.y - i >= 0 && i < 8){
                console.log('i is', i)
                console.log('x is', this.x - i)
                console.log('y is', this.y - i)
                if (gameGrid[this.y - i][this.x - i] == null){
                    moves.push([this.x - i, this.y -i]);
                }else if (gameGrid[this.y - i][this.x -i].player != this.player){
                    moves.push([this.x -i, this.y -i]);
                    temp = false;
                }else{
                    temp = false;
                }
                i++;
            }else{
                temp = false;
            }
        }
        temp = true;
        i = 1;
        while(temp){
            if (this.y + i < 8 && this.x - i >= 0 && i < 8){
                if (gameGrid[this.y + i][this.x -i] == null){
                    moves.push([this.x -i, this.y +i]);
                }else if (gameGrid[this.y +i][this.x -i].player != this.player){
                    moves.push([this.x - i, this.y +i]);
                    temp = false;
                }else{
                    temp = false;
                }
                i++;
            }else{
                temp = false;
            }
        }
        temp = true;
        i = 1;
        while(temp){
            if (this.y - i >= 0 && this.x + i < 8 && i < 8){
                if (gameGrid[this.y - i][this.x + i] == null){
                    moves.push([this.x + i, this.y - i]);
                }else if(gameGrid[this.y -i][this.x +i].player != this.player){
                    moves.push([this.x +i, this.y - i]);
                    temp = false;
                }else{
                    temp = false;
                }
                i++;
            }else{
                temp = false;
            }
        }
        return moves;
    }
}

let gameGridLayout = [
    [[Rook, 1], [Knight, 1], [Bishop, 1], [Queen, 1], [King, 1], [Bishop, 1], [Knight, 1], [Rook, 1]],
    [[Pawn, 1],[Pawn, 1],[Pawn, 1],[Pawn, 1],[Pawn, 1],[Pawn, 1],[Pawn, 1],[Pawn, 1]],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [[Pawn, 2],[Pawn, 2],[Pawn, 2],[Pawn, 2],[Pawn, 2],[Pawn, 2],[Pawn, 2],[Pawn, 2]],
    [[Rook, 2], [Knight, 2], [Bishop, 2], [Queen, 2], [King, 2], [Bishop, 2], [Knight, 2], [Rook, 2]],
]

let gameGrid = []
for (let i = 0; i < 8; i++) {
    gameGrid.push([]);
    for (let j = 0; j < 8; j++) {
        gameGrid[i].push(null);
    }
}

let availableMoves = []
let specialMoves = []
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
                gameGrid[y][x] = new gameGridLayout[y][x][0](x, y, gameGridLayout[y][x][1]);
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
   // console.log('x: ' + x + ' y: ' + y)
    //console.log(availableMoves)
    let moveSelected = false;
    let selected = { x: 0, y: 0 };
    for (let i = 0; i < availableMoves.length; i++) {
        if (x == availableMoves[i][0] && y == availableMoves[i][1]) {
            moveSelected = true;
            for (let j = 0; j < 8; j++) {
                for (let k = 0; k < 8; k++) {
                    if (gameGrid[j][k] != null) {
                        if (gameGrid[j][k].selected) {
                            gameGrid[j][k].selected = false;
                            selected = { x: k, y: j};
                            break;
                        }
                    }
                }
            }
            gameGrid[y][x] = gameGrid[selected.y][selected.x];
            gameGrid[y][x].x = x;
            gameGrid[y][x].y = y;
            gameGrid[y][x].numMoves++;
            gameGrid[selected.y][selected.x] = null;
            availableMoves = []
            if (specialMoves.length > 0){
                for (let j = 0; j < specialMoves.length; j++){
                    if (specialMoves[j][0] == x && specialMoves[j][1] == y && gameGrid[y][x].type == 'Pawn'){
                        gameGrid[y - 1][x] = null;
                    }
                    if (specialMoves[j][0] == x && specialMoves[j][1] == y && gameGrid[y][x].type == "King"){
                        if (x == 6){
                            gameGrid[y][5] = gameGrid[y][7];
                            gameGrid[y][5].x = 5;
                            gameGrid[y][7] = null;
                        }else{
                            gameGrid[y][3] = gameGrid[y][0];
                            gameGrid[y][3].x = 3;
                            gameGrid[y][0] = null;
                        }
                    }
                    if (specialMoves[j][0] == x && specialMoves[j][1] == y && gameGrid[y][x].type == "Rook"){
                        if (x == 2){
                            gameGrid[y][3] = gameGrid[y][0];
                            gameGrid[y][3].x = 3;
                            gameGrid[y][0] = null;
                        }else{
                            gameGrid[y][5] = gameGrid[y][7];
                            gameGrid[y][5].x = 5;
                            gameGrid[y][7] = null;
                        }
                    }
                }
            }
        }
    }
    if (x < 8 && y < 8 && x >= 0 && y >= 0 && gameGrid[y][x] != null && !moveSelected) {
        availableMoves = gameGrid[y][x].GetMoves();
        console.log(gameGrid[y][x], "selected")
        for (let j = 0; j < 8; j++) {
            for (let k = 0; k < 8; k++) {
                if (gameGrid[j][k] != null) {
                    gameGrid[j][k].selected = false;
                }
            }
        }
        gameGrid[y][x].selected = true;
    }else if (!moveSelected && availableMoves.length > 0){
        availableMoves = []
    }
}

function draw() {
    drawTiles();
    drawPieces();
}
