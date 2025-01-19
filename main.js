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
    constructor(x, y, image, imageBool) {
        super(x, y, image)
        this.type = 'Pawn'
        if (this.player == 1 && imageBool) {
            this.image = loadImage('images/pawn.png')
        } else {
            this.image = loadImage('images/black_pawn.png')
        }
    }
    GetMoves(c) {
        let moves = []
        if (this.player == 1) {
            if (this.y + 1 < 8 && gameGrid[this.y + 1][this.x] == null) {
                moves.push([this.x, this.y + 1])
                if (this.numMoves == 0 && this.y +2 < 8 && gameGrid[this.y + 2][this.x] == null){
                    moves.push([this.x, this.y + 2])
                }
            }
            if (this.x +1 < 8 && this.y +1 < 8 && gameGrid[this.y +1][this.x +1] != null && gameGrid[this.y +1][this.x +1].player != this.player){
                moves.push([this.x +1, this.y +1])
            }
            if (this.x - 1 >= 0 && this.y +1 < 8 && gameGrid[this.y +1][this.x -1] != null && gameGrid[this.y +1][this.x -1].player != this.player){
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
            /*let n = this.y - 1
            console.log("y " + this.y)
            if(this.y == 0){
                console.log(this.player, this.x, this.y)
            }
            console.log("n " + n)*/
            if (this.y -1 >= 0 && gameGrid[this.y -1][this.x] == null){
                moves.push([this.x, this.y - 1])
                if (this.numMoves == 0 && this.y -2 >= 0 && gameGrid[this.y -2][this.x] == null){
                    moves.push([this.x, this.y - 2])
                }
            }
            if (this.y - 1 >= 0 && this.x +1 < 8 && gameGrid[this.y -1][this.x +1] != null && gameGrid[this.y -1][this.x +1].player != this.player){
                moves.push([this.x +1, this.y -1])
            }
            if (this.y - 1 >= 0 && this.x -1 >= 0 && gameGrid[this.y -1][this.x -1] != null && gameGrid[this.y -1][this.x -1].player != this.player){
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
        if(c){
            moves = removeLostMoves(moves, this.player, this)
        }
        return moves
    }
}

class Rook extends Piece {
    constructor(x, y, image, imageBool) {
        super(x, y, image)
        this.type = "Rook"
        if (this.player == 1 && imageBool) {
            this.image = loadImage('images/rook.png')
        } else {
            this.image = loadImage('images/black_rook.png')
        }
    }
    GetMoves(c) {
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
        if(c){
            moves = removeLostMoves(moves, this.player, this)
        }
        return moves
    }
}

class Bishop extends Piece {
    constructor(x, y, image, imageBool) {
        super(x, y, image)
        this.type = "Bishop"
        if (this.player == 1 && imageBool) {
            this.image = loadImage('images/bishop.png')
        } else {
            this.image = loadImage('images/black_bishop.png')
        }
    }

    GetMoves(c) {
        let moves = []
        let temp = true;
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
        if(c){
            moves = removeLostMoves(moves, this.player, this)
        }
        return moves;
    }

}

class Knight extends Piece {
    constructor(x, y, image, imageBool){
        super(x, y, image);
        this.type = "Knight";
        if (this.player == 1 && imageBool){
            this.image = loadImage('images/horse.png');
        }
        else{
            this.image = loadImage('images/black_horse.png');
        }
    }
    GetMoves(c){
        let moves = []
        if (this.x + 2 < 8 && this.y + 1 < 8){
            if (gameGrid[this.y +1][this.x +2] == null){
                moves.push([this.x +2, this.y +1])
            }else if (gameGrid[this.y +1][this.x +2].player != this.player){
                moves.push([this.x +2, this.y +1])
            }}
        if (this.x - 2 >= 0 && this.y + 1 < 8){
            if (gameGrid[this.y +1][this.x -2] == null){
                moves.push([this.x -2, this.y +1])
            }else if (gameGrid[this.y +1][this.x -2].player != this.player){
                moves.push([this.x -2, this.y +1])
            }
        }
        if (this.x +2 < 8 && this.y - 1 >= 0){
            if (gameGrid[this.y -1][this.x +2] == null){
                moves.push([this.x +2, this.y -1])
            }else if (gameGrid[this.y -1][this.x +2].player != this.player){
                moves.push([this.x +2, this.y -1])
            }
        }
        if (this.x - 2 >= 0 && this.y - 1 >= 0){
            if (gameGrid[this.y -1][this.x -2] == null){
                moves.push([this.x -2, this.y -1])
            }else if (gameGrid[this.y -1][this.x -2].player != this.player){
                moves.push([this.x -2, this.y -1])
            }
        }
        if (this.y + 2 < 8 && this.x + 1 < 8){
            if (gameGrid[this.y +2][this.x +1] == null){
                moves.push([this.x +1, this.y +2])
            }else if (gameGrid[this.y +2][this.x +1].player != this.player){
                moves.push([this.x +1, this.y +2])
            }}
        if (this.y + 2 < 8 && this.x - 1 >= 0){
            if (gameGrid[this.y +2][this.x -1] == null){
                moves.push([this.x -1, this.y +2])
            }else if (gameGrid[this.y +2][this.x -1].player != this.player){
                moves.push([this.x -1, this.y +2])
            }}
        if (this.y - 2 >= 0 && this.x + 1 < 8){
            if (gameGrid[this.y -2][this.x +1] == null){
                moves.push([this.x +1, this.y -2])
            }else if (gameGrid[this.y -2][this.x +1].player != this.player){
                moves.push([this.x +1, this.y -2])
            }}
        if (this.y - 2 >= 0 && this.x - 1 >= 0){
            if (gameGrid[this.y -2][this.x -1] == null){
                moves.push([this.x -1, this.y -2])
            }else if (gameGrid[this.y -2][this.x -1].player != this.player){
                moves.push([this.x -1, this.y -2])
            }}
        if(c){
            moves = removeLostMoves(moves, this.player, this)
        }
        return moves
    }
}

class King extends Piece {
    constructor(x, y, image, imageBool){
        super(x, y, image);
        this.type = "King";
        if (this.player == 1 && imageBool){
            this.image = loadImage('images/king.png')
        }else{
            this.image = loadImage('images/black_king.png')
        }
    }
    GetMoves(c){
        let moves = []
        if (this.x + 1 < 8 && this.y + 1 < 8){
            if (gameGrid[this.y +1][this.x +1] == null){
                moves.push([this.x +1, this.y +1])
            }else if (gameGrid[this.y +1][this.x +1].player != this.player){
                moves.push([this.x +1, this.y +1])
            }}
        if (this.x - 1 >= 0 && this.y + 1 < 8){
            if (gameGrid[this.y +1][this.x -1] == null){
                moves.push([this.x -1, this.y +1])
            }else if (gameGrid[this.y +1][this.x -1].player != this.player){
                moves.push([this.x -1, this.y +1])
            }
        }
        if (this.x +1 < 8 && this.y - 1 >= 0){
            if (gameGrid[this.y -1][this.x +1] == null){
                moves.push([this.x +1, this.y -1])
            }else if (gameGrid[this.y -1][this.x +1].player != this.player){
                moves.push([this.x +1, this.y -1])
            }
        }
        if (this.x - 1 >= 0 && this.y - 1 >= 0){
            if (gameGrid[this.y -1][this.x -1] == null){
                moves.push([this.x -1, this.y -1])
            }else if (gameGrid[this.y -1][this.x -1].player != this.player){
                moves.push([this.x -1, this.y -1])
            }
        }
        if (this.y + 1 < 8){
            if (gameGrid[this.y +1][this.x] == null){
                moves.push([this.x, this.y +1])
            }else if (gameGrid[this.y +1][this.x].player != this.player){
                moves.push([this.x, this.y +1])
            }}
        if (this.y - 1 >= 0){
            if (gameGrid[this.y -1][this.x] == null){
                moves.push([this.x, this.y -1])
            }else if (gameGrid[this.y -1][this.x].player != this.player){
                moves.push([this.x, this.y -1])
            }}
        if (this.x + 1 < 8){
            if (gameGrid[this.y][this.x +1] == null){
                moves.push([this.x +1, this.y])
            }else if (gameGrid[this.y][this.x +1].player != this.player){
                moves.push([this.x +1, this.y])
            }}
        if (this.x - 1 >= 0){
            if (gameGrid[this.y][this.x -1] == null){
                moves.push([this.x -1, this.y])
            }else if (gameGrid[this.y][this.x -1].player != this.player){
                moves.push([this.x -1, this.y])
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
        if(c){
            let removeMoves = []
            for (let i = 0; i <8; i++){
                for (let j = 0; j < 8; j++){
                    if (gameGrid[i][j] != null && gameGrid[i][j].player != this.player){
                        removeMoves.push(gameGrid[i][j].GetMoves(false));
                        if (gameGrid[i][j].type == "Pawn"){
                            removeMoves[removeMoves.length -1].push([gameGrid[i][j].x, gameGrid[i][j].y]);
                        }
                    }
                }
            }
            for (let i = 0; i < removeMoves.length; i++){
                for (let j = 0; j < removeMoves[i].length; j++){
                    for (let k = 0; k < moves.length; k++){
                        if (removeMoves[i][j][0] == moves[k][0] && removeMoves[i][j][1] == moves[k][1]){
                            moves.splice(k, 1);
                        }
                    }
                }
            }
        }
        return moves
    }
}

class Queen extends Piece {
    constructor(x, y, image, imageBool){
        super(x, y, image);
        this.type = "Queen";
        if (this.player == 1 && imageBool){
            this.image = loadImage('images/queen.png')
        }else{
            this.image = loadImage('images/black_queen.png')
        }
    }
    GetMoves(c){
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
        if(c){
            moves = removeLostMoves(moves, this.player, this)
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
let currentPlayer = "white"
let baseSize = 0;
let moveHistory = []
let historyOffset = 0;
let enemy = "player"

function Undo(){
    //console.log(moveHistory.length + " length");
    if (moveHistory.length - historyOffset > 1){
        historyOffset++;
        if (moveHistory.length - historyOffset < 0){
            historyOffset--;
            return;
        }
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                let t = moveHistory.length - historyOffset - 1;
                //console.log("t " + t)
                //console.log("history " + typeof(moveHistory[t][0][i][j]))
                if (moveHistory[t][0][i][j] != null){
                    gameGrid[i][j] = moveHistory[t][0][i][j];
                    gameGrid[i][j].x = j;
                    gameGrid[i][j].y = i;
                }else{
                    gameGrid[i][j] = null;
                }
            }
        }
        moveHistory[moveHistory.length - historyOffset][1].numMoves--;
        //console.log("num moves " + moveHistory[moveHistory.length - historyOffset][1].numMoves)
        //console.log("type " + moveHistory[moveHistory.length - historyOffset][1].type)
        //console.log("undoed")
        currentPlayer = currentPlayer == "white" ? "black" : "white";
        document.getElementById("currentPlayerText").textContent = "Current Player: " + currentPlayer;
    }
}

function Redo(){
    console.log(moveHistory.length + " length");
    if (historyOffset > 0){
        historyOffset--;
        if (moveHistory.length - historyOffset < 0){
            historyOffset++;
            return;
        }
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                let t = moveHistory.length - historyOffset - 1;
                if (moveHistory[t][0][i][j] != null){
                    gameGrid[i][j] = moveHistory[t][0][i][j];
                    gameGrid[i][j].x = j;
                    gameGrid[i][j].y = i;
                }else{
                    gameGrid[i][j] = null;
                }
            }
        }
        try{
            moveHistory[moveHistory.length - historyOffset - 1][1].numMoves++;
            //console.log("num moves " + moveHistory[moveHistory.length - historyOffset - 1][1].numMoves)
        } catch{}
        currentPlayer = currentPlayer == "white" ? "black" : "white";
        document.getElementById("currentPlayerText").textContent = "Current Player: " + currentPlayer;
    }
}

function changeMode(){
    if (document.getElementById("btnradio1").checked){
        enemy = "player";
    }else{
        enemy = "bot";
    }
    resetGame();
    //console.log("changing mode to " + enemy);
}

function findBestMove(scores){
    let bestMove = []
    let bestScore = -1000000;
    for (let i = 0; i < scores.length; i++){
        if (scores[i][2] > bestScore){
            bestScore = scores[i][2];
            bestMove = [scores[i][0], scores[i][1], scores[i][3], scores[i][4]];
        }
        
    }
    //console.log("best move " + bestMove);
    //console.log("best move length " + bestMove.length);
    //console.log("score length " + scores.length)
    console.log("best score " + bestScore);
    if (bestScore == 0){
        let rand = Math.floor(Math.random() * scores.length);
        //console.log("random " + rand)
        bestMove = [scores[rand][0], scores[rand][1], scores[rand][3], scores[rand][4]];
    }
    
    return bestMove;
}

let controlVariable = 0;

function recursiveFunc(grid, scores, player, depth, desiredDepth){
    //console.log("score " + scores);
    //console.log(typeof(scores));
    let nP = player == "white" ? 1 : 2;
    //console.log(nP)
    //console.log("current player " + player);
    console.log("--------------jffjgfjffjgjffggfgjgjfgjjjf------------------")
    console.log(grid)
    let cPGrid = []
    for (let i = 0; i < 8; i++){
        cPGrid.push([]);
        for (let j = 0; j < 8; j++){
            if (grid[i][j] != null){
                cPGrid[i].push(new grid[i][j].constructor(grid[i][j].x, grid[i][j].y, grid[i][j].player, false));
                console.log("Created " + cPGrid[i][j].type + " at " + cPGrid[i][j].x + " " + cPGrid[i][j].y)
            }
            else{
                cPGrid[i].push(null);
            }
        }
    }
    //cPGrid[0][0] = cPGrid[1][0];
    //console.log(cPGrid)
    //return scores;
    console.log("[[[[[[[[[[[[[[[[[[[[[[[")
    console.log(cPGrid)
    let allMoveOptions = []
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (grid[i][j] != null && grid[i][j].player == nP){
                let moves = grid[i][j].GetMoves(false);
                //console.log("this ran")
                if (moves.length != 0){
                    allMoveOptions.push([cPGrid[i][j], moves]);
                }
            }
        }
    }
    console.log("pppppppppppppppppppppppppp")
    console.log(allMoveOptions);
    if (allMoveOptions.length == 0){
        return 0;
    }
    for (let i =0; i < allMoveOptions.length; i++){
        console.log(allMoveOptions[i])
        let originalX = allMoveOptions[i][0].x;
        let originalY = allMoveOptions[i][0].y;
        console.log(originalX, originalY)
        console.log(cPGrid[originalY][originalX])
        console.log("original " + cPGrid[originalY][originalX].type)
        for (let j = 0; j < allMoveOptions[i][1].length; j++){
            controlVariable++;
            console.log("move of " + allMoveOptions[i][0].type + " ran")
            let impossibleMove = false;
            cPGrid[allMoveOptions[i][1][j][1]][allMoveOptions[i][1][j][0]] = cPGrid[allMoveOptions[i][0].y][allMoveOptions[i][0].x];
            cPGrid[originalY][originalX] = null;
            /*console.log(" --------------------------------------------kkkkkkkkkkkkkkkkkkkkk")
            console.log("grids")
            console.log(grid)
            console.log(cPGrid)*/
            let newX = allMoveOptions[i][1][j][0];
            console.log(originalY, originalX)
            let newY = allMoveOptions[i][1][j][1];
            console.log(newY, newX)
            if (cPGrid[newY][newX] == null){
                console.log(cPGrid)
                console.log(allMoveOptions[i][1])
                console.log(allMoveOptions[i][0])
                //console.log(cPGrid[originalY][originalX].type)
            }
            cPGrid[newY][newX].x = newX;
            cPGrid[newY][newX].y = newY;
            let enemyPlayer = player == "white" ? "black" : "white";
            if (checkCheck(cPGrid, nP)){
                scores[i][2] -= 10000000000000;
                impossibleMove = true;
                console.log("impossibleMove at depth++++++++++++++++++++ "+depth)
            } else if (checkWin(cPGrid, enemyPlayer)){
                scores[i][2] += 1000;
            }
            if (depth < desiredDepth && impossibleMove == false){
                scores = recursiveFunc(cPGrid, scores, enemyPlayer, depth + 1, desiredDepth);
                console.log("depth is " + depth);
            }
            console.log("end of some moves reached")
            console.log(cPGrid)
            cPGrid[originalY][originalX] = cPGrid[newY][newX];
            cPGrid[newY][newX] = null;
            cPGrid[originalY][originalX].x = originalX;
            cPGrid[originalY][originalX].y = originalY;
            console.log(cPGrid)
        }
        cPGrid = []
        for (let i = 0; i < 8; i++){
            cPGrid.push([]);
            for (let j = 0; j < 8; j++){
                if (grid[i][j] != null){
                    cPGrid[i].push(new grid[i][j].constructor(grid[i][j].x, grid[i][j].y, grid[i][j].player, false));
                }else{
                    cPGrid[i].push(null);
                }
            }
        }
    }
    return scores;
}

function makeMove(move){
    let movingPiece = gameGrid[move[0]][move[1]];
    //console.log("moving piece " + movingPiece.type);
    //console.log(move)
    gameGrid[move[3]][move[2]] = movingPiece;
    gameGrid[movingPiece.y][movingPiece.x] = null;
    movingPiece.x = move[2];
    movingPiece.y = move[3];
    //console.log("new possition " + movingPiece.x, movingPiece.y);
}

function enemyDecision(){
    let bestMove = []
    let scores = []
    let desiredDepth = 1;
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (gameGrid[i][j] != null && gameGrid[i][j].player == 2){
                let moves = gameGrid[i][j].GetMoves(true);
                for (let k = 0; k < moves.length; k++){
                    scores.push([i, j, 0, moves[k][0], moves[k][1]]);
                }
        }
        }
    }
    console.log("-----------------------------------------------")
    console.log(scores);
    //console.log(gameGrid[0][0].image)
    cPGrid = []
    for (let i = 0; i < 8; i++){
        cPGrid.push([]);
        for (let j = 0; j < 8; j++){
            if (gameGrid[i][j] != null){
                cPGrid[i].push(gameGrid[i][j]);
            }else{
                cPGrid[i].push(null);
            }
        }
    }
    //console.log("image " + gameGrid[scores[0][0]][scores[0][1]].image)
    scores = recursiveFunc(cPGrid, scores, "black", 0, desiredDepth);
    console.log(controlVariable + " control variable")
    //console.log(gameGrid)
    //return;
    /*for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (gameGrid[i][j] != null){
                console.log("type " + gameGrid[i][j].type)
                console.log("image " + gameGrid[i][j].image)
            }
        }
    }*/
    bestMove = findBestMove(scores);
    makeMove(bestMove);
    updateHistory()
}

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

function removeLostMoves(moves, player, movingPiece){
    let answer = []
    for (let i = 0; i < moves.length; i++){
        gameGrid[movingPiece.y][movingPiece.x] = null;
        let tilePiece = gameGrid[moves[i][1]][moves[i][0]];
        gameGrid[moves[i][1]][moves[i][0]] = movingPiece;
        //console.log("moves[i] " + moves[i]);
        if (checkCheck(gameGrid, player)){
            gameGrid[movingPiece.y][movingPiece.x] = movingPiece;
            gameGrid[moves[i][1]][moves[i][0]] = tilePiece;
            //console.log("removed a move because of check");
            continue;
        }else{
            //console.log("added a move");
            answer.push(moves[i]);
        }
        gameGrid[movingPiece.y][movingPiece.x] = movingPiece;
        gameGrid[moves[i][1]][moves[i][0]] = tilePiece;
    }

    return answer;
}

function checkCheck(grid, player){ // this might be integrated into checkWin in the future
    let king = null;
    //console.log("checking for check");
    //console.log(grid, "grid")
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (grid[i][j] != null && grid[i][j].type == "King" && grid[i][j].player == player){
                king = grid[i][j];
                //console.log("king is at ", king.x, king.y)
            }
        }
    }
    if (king == null){
        //console.log("no king found ---------------------------- ", grid);
        return false;
    }
    let moves = []
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (grid[i][j] != null && grid[i][j].player != player){
                moves.push(grid[i][j].GetMoves(false));
                if (grid[i][j].type == "Pawn"){
                    moves[moves.length -1].push([grid[i][j].x, grid[i][j].y]);
                }
            }
        }
    }
    for (let i = 0; i < moves.length; i++){
        for (let j = 0; j < moves[i].length; j++){
            if (moves[i][j][0] == king.x && moves[i][j][1] == king.y){
                //console.log("check");
                return true;
            }
        }
    }
    return false;
}

function checkWin(grid, player){
    let king = null;
    let checkingPiece = null;
    let nP = player == "white" ? 1 : 2;
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (grid[i][j] != null && grid[i][j].type == "King" && grid[i][j].player == nP){
                king = grid[i][j];
            }
        }
    }
    let moves = []
    let kingMoves = king.GetMoves(true);
    kingMoves.push([king.x, king.y]);
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (gameGrid[i][j] != null && gameGrid[i][j].player != nP){
                let currentAddedMoves = [];
                currentAddedMoves.push(gameGrid[i][j].GetMoves(false));
                if (gameGrid[i][j].type == "Pawn"){
                    currentAddedMoves[currentAddedMoves.length -1].push([gameGrid[i][j].x, gameGrid[i][j].y]);
                }
                for (let k = 0; k < currentAddedMoves.length; k++){
                    for (let l = 0; l < currentAddedMoves[k].length; l++){
                        for (let m = 0; m < kingMoves.length; m++){
                            if (currentAddedMoves[k][l][0] == kingMoves[m][0] && currentAddedMoves[k][l][1] == kingMoves[m][1]){
                                checkingPiece = gameGrid[i][j];
                            }
                        }
                    }
                }
                moves.push(currentAddedMoves);
            }
        }
    }
    if (checkingPiece != null){
        let cMoves = []
        cMoves = checkingPiece.GetMoves(false);
        for (let i = 0; i < cMoves.length; i++){
            for (let j = 0; j < kingMoves.length; j++){
                if (cMoves[i][0] == kingMoves[j][0] && cMoves[i][1] == kingMoves[j][1]){
                    kingMoves.splice(j, 1);
                }
            }
        }
    }
    //console.log("kingMoves " + kingMoves);
    if (kingMoves.length == 0){
        //console.log("-------------------------------------no king moves");
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                if (gameGrid[i][j] != null && gameGrid[i][j].player == nP){
                    let moves = gameGrid[i][j].GetMoves(true);
                    for (let k = 0; k < moves.length; k++){
                        let tempPiece = gameGrid[i][j];
                        gameGrid[moves[k][1]][moves[k][0]] = gameGrid[i][j];
                        gameGrid[i][j] = null;
                        if (!checkCheck(gameGrid, nP)){
                            //console.log("-------------------------game is not over");
                            gameGrid[tempPiece.y][tempPiece.x] = tempPiece;
                            gameGrid[moves[k][1]][moves[k][0]] = null;
                            return false;
                        }
                        gameGrid[tempPiece.y][tempPiece.x] = tempPiece;
                        gameGrid[i][j] = gameGrid[moves[k][1]][moves[k][0]];
                        gameGrid[moves[k][1]][moves[k][0]] = null;
                    }
                }
            }
        }
        //console.log("-------------------------game is over");
        return true;
    }
    return false;
}

function updateHistory(lastMovedPiece){
    let temp = []
    for (let i = 0; i < 8; i++){
        temp.push([]);
        for (let j = 0; j < 8; j++){
            if (gameGrid[i][j] != null){
                temp[i].push(gameGrid[i][j]);
            }else{
                temp[i].push(null);
            }
        }
    }
    if (historyOffset > 0){
        moveHistory.splice(moveHistory.length - historyOffset, historyOffset);
        historyOffset = 0;
    }
    moveHistory.push([temp, lastMovedPiece]);
}

function resetGame(){
    gameGrid = []
    moveHistory = []
    currentPlayer = "white";
    document.getElementById("currentPlayerText").textContent = "Current Player: " + currentPlayer;
    availableMoves = [];
    specialMoves = [];
    for (let i = 0; i < 8; i++){
        gameGrid.push([]);
        for (let j = 0; j < 8; j++){
            gameGrid[i].push(null);
        }
    }
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if (gameGridLayout[y][x] != null) {
                gameGrid[y][x] = new gameGridLayout[y][x][0](x, y, gameGridLayout[y][x][1], false);
            }
        }
    }
    updateHistory(null);
}

function setup() {
    width = windowWidth * 0.8;
    height = windowHeight * 0.8;
    size = width > height ? height : width;
    canvas = createCanvas(size, size);
    baseSize = height / 8;
    canvas.parent('chessboard');
    resetGame();
}

function drawTiles() {
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            let isAvailable = false;
            for (let k = 0; k < availableMoves.length; k++) {
                if (x == availableMoves[k][0] && y == availableMoves[k][1]) {
                    fill(0, 255, 0)
                    isAvailable = true;
                }
            }
            if (gameGrid[y][x] != null && gameGrid[y][x].selected){
                fill(0, 0, 255);
            }else if ((x + y) % 2 == 0 && !isAvailable) {
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
                try{
                    image(gameGrid[y][x].image, x * baseSize, y * baseSize, baseSize, baseSize);
                }catch{
                    console.log("error with drawing image")
                }
            }
        }
    }
}

function mousePressed() {
    let x = Math.floor(mouseX / baseSize);
    let y = Math.floor(mouseY / baseSize);
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
            specialMoves = []
            currentPlayer = currentPlayer == "white" ? "black": "white";
            document.getElementById("currentPlayerText").textContent = "Current Player: " + currentPlayer
            if (checkWin(gameGrid, currentPlayer)){
                document.getElementById("currentPlayerText").textContent = "Player " + currentPlayer + " wins!";
                setTimeout(function(){
                    alert("Player " + currentPlayer + " wins!");
                }, 100);
            }
            updateHistory(gameGrid[y][x]);
            if (enemy == "bot" && currentPlayer == "black"){
                //console.log("enemy decision");
                enemyDecision();
                currentPlayer = "white";
                document.getElementById("currentPlayerText").textContent = "Current Player: " + currentPlayer;
                //console.log(gameGrid)
            }
        }
    }
    let nP = currentPlayer == "white" ? 1 : 2;
    if (x < 8 && y < 8 && x >= 0 && y >= 0 && gameGrid[y][x] != null && !moveSelected && gameGrid[y][x].player == nP) {
        //console.log("this ran")
        //console.log(gameGrid[y][x].player)
        availableMoves = gameGrid[y][x].GetMoves(true);
        for (let j = 0; j < 8; j++) {
            for (let k = 0; k < 8; k++) {
                if (gameGrid[j][k] != null) {
                    gameGrid[j][k].selected = false;
                }
            }
        }
        gameGrid[y][x].selected = true;
    }else if (!moveSelected && availableMoves.length >= 0){
        availableMoves = []
        for (let j = 0; j < 8; j++) {
            for (let k = 0; k < 8; k++) {
                if (gameGrid[j][k] != null) {
                    gameGrid[j][k].selected = false;
                }
            }
        }
    }
}

function draw() {
    drawTiles();
    drawPieces();
}
