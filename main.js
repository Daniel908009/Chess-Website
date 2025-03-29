class Piece { // parent class of all pieces
    constructor(x, y, player) {
        this.x = x;
        this.y = y;
        this.player = player;
        this.selected = false;
        this.numMoves = 0;
    }
}

class Pawn extends Piece {
    constructor(x, y, player) {
        super(x, y, player);
        this.type = 'Pawn';
        this.movedTwoTiles = false; // important for en passant
        this.value = 1; // needed for the evaluation inside the decision making algorithm
        if (this.player == 1) {
            this.image = loadImage('images/pawn.png');
        } else{
            this.image = loadImage('images/black_pawn.png');
        }
    }
    GetMoves(c) { // all classes have this function, it returns all possible moves for the piece
        let moves = [];
        if (this.player == 2) {
            if (this.y + 1 < 8 && gameGrid[this.y + 1][this.x] == null) {
                moves.push([this.x, this.y + 1]);
                if (this.numMoves == 0 && this.y +2 < 8 && gameGrid[this.y + 2][this.x] == null) {
                    moves.push([this.x, this.y + 2]);
                }
            }
            if (this.x +1 < 8 && this.y +1 < 8 && gameGrid[this.y +1][this.x +1] != null && gameGrid[this.y +1][this.x +1].player != this.player){
                moves.push([this.x +1, this.y +1]);
            }
            if (this.x - 1 >= 0 && this.y +1 < 8 && gameGrid[this.y +1][this.x -1] != null && gameGrid[this.y +1][this.x -1].player != this.player){
                moves.push([this.x -1, this.y +1]);
            }
            if (this.x + 1 < 8 && gameGrid[this.y][this.x + 1] != null && gameGrid[this.y][this.x + 1].player != this.player && gameGrid[this.y][this.x + 1].numMoves == 1 && gameGrid[this.y][this.x + 1].type == "Pawn" && gameGrid[this.y][this.x + 1].movedTwoTiles){
                moves.push([this.x + 1, this.y + 1]);
                specialMoves.push([this.x + 1, this.y + 1]);
            }
            if (this.x - 1 >= 0 && gameGrid[this.y][this.x - 1] != null && gameGrid[this.y][this.x - 1].player != this.player && gameGrid[this.y][this.x - 1].numMoves == 1 && gameGrid[this.y][this.x - 1].type == "Pawn" && gameGrid[this.y][this.x - 1].movedTwoTiles){
                moves.push([this.x - 1, this.y + 1]);
                specialMoves.push([this.x - 1, this.y +1]);
            }
        }
        else {
            if (this.y -1 >= 0 && gameGrid[this.y -1][this.x] == null){
                moves.push([this.x, this.y - 1]);
                if (this.numMoves == 0 && this.y -2 >= 0 && gameGrid[this.y -2][this.x] == null){
                    moves.push([this.x, this.y - 2]);
                }
            }
            if (this.y - 1 >= 0 && this.x +1 < 8 && gameGrid[this.y -1][this.x +1] != null && gameGrid[this.y -1][this.x +1].player != this.player){
                moves.push([this.x +1, this.y -1]);
            }
            if (this.y - 1 >= 0 && this.x -1 >= 0 && gameGrid[this.y -1][this.x -1] != null && gameGrid[this.y -1][this.x -1].player != this.player){
                moves.push([this.x -1, this.y -1]);
            }
            if (this.x + 1 < 8 && gameGrid[this.y][this.x + 1] != null && gameGrid[this.y][this.x + 1].player != this.player && gameGrid[this.y][this.x + 1].numMoves == 1 && gameGrid[this.y][this.x + 1].type == "Pawn" && gameGrid[this.y][this.x + 1].movedTwoTiles ){
                moves.push([this.x + 1, this.y - 1]);
                specialMoves.push([this.x + 1, this.y - 1]);
            }
            if (this.x - 1 >= 0 && gameGrid[this.y][this.x - 1] != null && gameGrid[this.y][this.x - 1].player != this.player && gameGrid[this.y][this.x - 1].numMoves == 1 && gameGrid[this.y][this.x - 1].type == "Pawn" && gameGrid[this.y][this.x - 1].movedTwoTiles){
                moves.push([this.x - 1, this.y - 1]);
                specialMoves.push([this.x -1, this.y -1]);
            }
        }
        if(c){ // the c parameter is needed, because otherwise an infinite recursion would happen in some places of the code
            moves = removeLostMoves(moves, this.player, this);
        }
        return moves;
    }
}

const pawnTableBlack = [ // this is a table used for the evaluation of positions of pieces on the board, it is used by the decision making algorithm
    [0, 0, 0, 0, 0, 0, 0, 0],
    [5, 10, 10, -20, -20, 10, 10, 5],
    [5, -5, -10, 0, 0, -10, -5, 5],
    [0, 0, 0, 20, 20, 0, 0, 0],
    [5, 5, 10, 25, 25, 10, 5, 5],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [0, 0, 0, 0, 0, 0, 0, 0]
];
const pawnTableWhite = pawnTableBlack.slice().reverse();

class Rook extends Piece {
    constructor(x, y, player) {
        super(x, y, player);
        this.type = "Rook";
        this.value = 3;
        if (this.player == 1) {
            this.image = loadImage('images/rook.png');
        } else {
            this.image = loadImage('images/black_rook.png');
        }
    }
    GetMoves(c) {
        let moves = [];
        for (let i = 1; i < 8; i++) {
            if (this.x + i < 8) {
                if (gameGrid[this.y][this.x + i] == null) {
                    moves.push([this.x + i, this.y]);
                } else if (gameGrid[this.y][this.x + i].player != this.player) {
                    moves.push([this.x + i, this.y]);
                    break;
                } else {
                    break;
                }
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.x - i >= 0) {
                if (gameGrid[this.y][this.x - i] == null) {
                    moves.push([this.x - i, this.y]);
                } else if (gameGrid[this.y][this.x - i].player != this.player) {
                    moves.push([this.x - i, this.y]);
                    break;
                } else {
                    break;
                }
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.y + i < 8) {
                if (gameGrid[this.y + i][this.x] == null) {
                    moves.push([this.x, this.y + i]);
                } else if (gameGrid[this.y + i][this.x].player != this.player) {
                    moves.push([this.x, this.y + i]);
                    break;
                } else {
                    break;
                }
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.y - i >= 0) {
                if (gameGrid[this.y - i][this.x] == null) {
                    moves.push([this.x, this.y - i]);
                } else if (gameGrid[this.y - i][this.x].player != this.player) {
                    moves.push([this.x, this.y - i]);
                    break;
                } else {
                    break;
                }
            }
        }
        
        if(c){
            moves = removeLostMoves(moves, this.player, this);
        }
        return moves;
    }
}

const rookTableBlack = [
    [0, 0, 0, 5, 5, 0, 0, 0],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [5, 10, 10, 10, 10, 10, 10, 5],
    [0, 0, 0, 0, 0, 0, 0, 0]
];
/*
const rookTableBlack = [ // this is  for testing purposes
    [0, 0, 0, 5, 5, 0, 0, 0],
    [-5, -5, -5, -5, -5, -5, -5, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [5, 10, 10, 10, 10, 10, 10, 5],
    [0, 0, 0, 0, 0, 0, 0, 0]
];*/

const rookTableWhite = rookTableBlack.slice().reverse();

class Bishop extends Piece {
    constructor(x, y, player) {
        super(x, y, player);
        this.type = "Bishop";
        this.value = 3;
        if (this.player == 1) {
            this.image = loadImage('images/bishop.png');
        } else {
            this.image = loadImage('images/black_bishop.png');
        }
    }

    GetMoves(c) {
        let moves = [];
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
            moves = removeLostMoves(moves, this.player, this);
        }
        return moves;
    }

}

const bishopTableBlack = [
    [-20, -10, -10, -10, -10, -10, -10, -20],
    [-10, 0, 0, 0, 0, 0, 0, -10],
    [-10, 0, 5, 10, 10, 5, 0, -10],
    [-10, 5, 5, 10, 10, 5, 5, -10],
    [-10, 0, 10, 10, 10, 10, 0, -10],
    [-10, 10, 10, 10, 10, 10, 10, -10],
    [-10, 5, 0, 0, 0, 0, 5, -10],
    [-20, -10, -10, -10, -10, -10, -10, -20]
];

const bishopTableWhite = bishopTableBlack.slice().reverse();

class Knight extends Piece {
    constructor(x, y, player){
        super(x, y, player);
        this.type = "Knight";
        this.value = 3;
        if (this.player == 1){
            this.image = loadImage('images/horse.png');
        }
        else{
            this.image = loadImage('images/black_horse.png');
        }
    }
    GetMoves(c){
        let moves = [];
        if (this.x + 2 < 8 && this.y + 1 < 8){
            if (gameGrid[this.y +1][this.x +2] == null){
                moves.push([this.x +2, this.y +1]);
            }else if (gameGrid[this.y +1][this.x +2].player != this.player){
                moves.push([this.x +2, this.y +1]);
            }}
        if (this.x - 2 >= 0 && this.y + 1 < 8){
            if (gameGrid[this.y +1][this.x -2] == null){
                moves.push([this.x -2, this.y +1]);
            }else if (gameGrid[this.y +1][this.x -2].player != this.player){
                moves.push([this.x -2, this.y +1]);
            }
        }
        if (this.x +2 < 8 && this.y - 1 >= 0){
            if (gameGrid[this.y -1][this.x +2] == null){
                moves.push([this.x +2, this.y -1]);
            }else if (gameGrid[this.y -1][this.x +2].player != this.player){
                moves.push([this.x +2, this.y -1]);
            }
        }
        if (this.x - 2 >= 0 && this.y - 1 >= 0){
            if (gameGrid[this.y -1][this.x -2] == null){
                moves.push([this.x -2, this.y -1]);
            }else if (gameGrid[this.y -1][this.x -2].player != this.player){
                moves.push([this.x -2, this.y -1]);
            }
        }
        if (this.y + 2 < 8 && this.x + 1 < 8){
            if (gameGrid[this.y +2][this.x +1] == null){
                moves.push([this.x +1, this.y +2]);
            }else if (gameGrid[this.y +2][this.x +1].player != this.player){
                moves.push([this.x +1, this.y +2]);
            }}
        if (this.y + 2 < 8 && this.x - 1 >= 0){
            if (gameGrid[this.y +2][this.x -1] == null){
                moves.push([this.x -1, this.y +2]);
            }else if (gameGrid[this.y +2][this.x -1].player != this.player){
                moves.push([this.x -1, this.y +2]);
            }}
        if (this.y - 2 >= 0 && this.x + 1 < 8){
            if (gameGrid[this.y -2][this.x +1] == null){
                moves.push([this.x +1, this.y -2]);
            }else if (gameGrid[this.y -2][this.x +1].player != this.player){
                moves.push([this.x +1, this.y -2]);
            }}
        if (this.y - 2 >= 0 && this.x - 1 >= 0){
            if (gameGrid[this.y -2][this.x -1] == null){
                moves.push([this.x -1, this.y -2]);
            }else if (gameGrid[this.y -2][this.x -1].player != this.player){
                moves.push([this.x -1, this.y -2]);
            }}
        if(c){
            moves = removeLostMoves(moves, this.player, this);
        }
        return moves;
    }
}

const knightTableBlack = [
    [-50, -40, -30, -30, -30, -30, -40, -50],
    [-40, -20, 0, 0, 0, 0, -20, -40],
    [-30, 0, 10, 15, 15, 10, 0, -30],
    [-30, 5, 15, 20, 20, 15, 5, -30],
    [-30, 0, 15, 20, 20, 15, 0, -30],
    [-30, 5, 10, 15, 15, 10, 5, -30],
    [-40, -20, 0, 5, 5, 0, -20, -40],
    [-50, -40, -30, -30, -30, -30, -40, -50]
];

const knightTableWhite = knightTableBlack.slice().reverse();

class King extends Piece {
    constructor(x, y, player){
        super(x, y, player);
        this.type = "King";
        this.value = 5;
        if (this.player == 1){
            this.image = loadImage('images/king.png');
        }else{
            this.image = loadImage('images/black_king.png');
        }
    }
    GetMoves(c){
        let moves = [];
        if (this.x + 1 < 8 && this.y + 1 < 8){
            if (gameGrid[this.y +1][this.x +1] == null){
                moves.push([this.x +1, this.y +1]);
            }else if (gameGrid[this.y +1][this.x +1].player != this.player){
                moves.push([this.x +1, this.y +1]);
            }}
        if (this.x - 1 >= 0 && this.y + 1 < 8){
            if (gameGrid[this.y +1][this.x -1] == null){
                moves.push([this.x -1, this.y +1]);
            }else if (gameGrid[this.y +1][this.x -1].player != this.player){
                moves.push([this.x -1, this.y +1]);
            }
        }
        if (this.x +1 < 8 && this.y - 1 >= 0){
            if (gameGrid[this.y -1][this.x +1] == null){
                moves.push([this.x +1, this.y -1]);
            }else if (gameGrid[this.y -1][this.x +1].player != this.player){
                moves.push([this.x +1, this.y -1]);
            }
        }
        if (this.x - 1 >= 0 && this.y - 1 >= 0){
            if (gameGrid[this.y -1][this.x -1] == null){
                moves.push([this.x -1, this.y -1]);
            }else if (gameGrid[this.y -1][this.x -1].player != this.player){
                moves.push([this.x -1, this.y -1]);
            }
        }
        if (this.y + 1 < 8){
            if (gameGrid[this.y +1][this.x] == null){
                moves.push([this.x, this.y +1]);
            }else if (gameGrid[this.y +1][this.x].player != this.player){
                moves.push([this.x, this.y +1]);
            }}
        if (this.y - 1 >= 0){
            if (gameGrid[this.y -1][this.x] == null){
                moves.push([this.x, this.y -1]);
            }else if (gameGrid[this.y -1][this.x].player != this.player){
                moves.push([this.x, this.y -1]);
            }}
        if (this.x + 1 < 8){
            if (gameGrid[this.y][this.x +1] == null){
                moves.push([this.x +1, this.y]);
            }else if (gameGrid[this.y][this.x +1].player != this.player){
                moves.push([this.x +1, this.y]);
            }}
        if (this.x - 1 >= 0){
            if (gameGrid[this.y][this.x -1] == null){
                moves.push([this.x -1, this.y]);
            }else if (gameGrid[this.y][this.x -1].player != this.player){
                moves.push([this.x -1, this.y]);
            }}
        if (this.numMoves == 0 && this.player != whosBot){
            if (gameGrid[this.y][this.x +1] == null && gameGrid[this.y][this.x +2] == null && gameGrid[this.y][this.x +3] != null && gameGrid[this.y][this.x +3].type == "Rook" && gameGrid[this.y][this.x +3].numMoves == 0){
                moves.push([this.x +2, this.y]);
                specialMoves.push([this.x +2, this.y]);
            }
            if (gameGrid[this.y][this.x -1] == null && gameGrid[this.y][this.x -2] == null && gameGrid[this.y][this.x -3] == null && gameGrid[this.y][this.x -4] != null && gameGrid[this.y][this.x -4].type == "Rook" && gameGrid[this.y][this.x -4].numMoves == 0){
                moves.push([this.x -2, this.y]);
                specialMoves.push([this.x -2, this.y]);
            }
        }
        if(c){ // because kings cant move into a check they need a different checking function compared to other piece classes
            // this could probably be optimized, but it is not that important to optimilize it yet
            let removeMoves = [];
            for (let i = 0; i <8; i++){
                for (let j = 0; j < 8; j++){
                    if (gameGrid[i][j] != null && gameGrid[i][j].player != this.player){
                        if(gameGrid[i][j].type != "Pawn"){
                            removeMoves.push(gameGrid[i][j].GetMoves(false));
                        }else{
                            let x = gameGrid[i][j].x;
                            let y = gameGrid[i][j].y;
                            if(gameGrid[i][j].player == 2){
                                if (x + 1 < 8 && y + 1 < 8){
                                    removeMoves.push([[x +1, y +1]]);
                                }
                                if (x - 1 >= 0 && y + 1 < 8){
                                    removeMoves.push([[x -1, y +1]]);
                                }
                            }else{
                                if (x + 1 < 8 && y - 1 >= 0){
                                    removeMoves.push([[x +1, y -1]]);
                                }
                                if (x - 1 >= 0 && y - 1 >= 0){
                                    removeMoves.push([[x -1, y -1]]);
                                }
                            }
                        }
                    }
                }
            }
            for (let l = 0; l < moves.length; l++){
                if (gameGrid[moves[l][1]][moves[l][0]] != null){
                    let original = gameGrid[moves[l][1]][moves[l][0]];
                    gameGrid[moves[l][1]][moves[l][0]] = gameGrid[this.y][this.x];
                    let x = this.x;
                    let y = this.y;
                    gameGrid[this.y][this.x] = null;
                    gameGrid[moves[l][1]][moves[l][0]].x = moves[l][0];
                    gameGrid[moves[l][1]][moves[l][0]].y = moves[l][1];
                    if(checkCheck(gameGrid, this.player)){
                        removeMoves.push(moves[l]);
                    }
                    gameGrid[y].splice(x, 0);
                    gameGrid[y].splice(x, 1, gameGrid[this.y][this.x]);
                    gameGrid[y][x].x = x;
                    gameGrid[y][x].y = y;
                    gameGrid[original.y].splice(original.x, 0);
                    gameGrid[original.y].splice(original.x, 1, original);
                }
            }
            for (let p = 0; p < removeMoves.length; p++){
                for (let j = 0; j < removeMoves[p].length; j++){
                    for (let k = 0; k < moves.length; k++){
                        if (removeMoves[p][j][0] == moves[k][0] && removeMoves[p][j][1] == moves[k][1]){
                            moves.splice(k, 1);
                        }
                    }
                }
            }
            removeMoves = [];
            for(let m = 0; m < moves.length; m++){
                let original = gameGrid[moves[m][1]][moves[m][0]];
                gameGrid[moves[m][1]][moves[m][0]] = gameGrid[this.y][this.x];
                let x = this.x;
                let y = this.y;
                gameGrid[y].splice(x, 0);
                gameGrid[y].splice(x, 1, null);
                gameGrid[moves[m][1]][moves[m][0]].x = moves[m][0];
                gameGrid[moves[m][1]][moves[m][0]].y = moves[m][1];
                if(checkCheck(gameGrid, this.player)){
                    removeMoves.push(moves[m]);
                }
                gameGrid[y].splice(x, 0);
                gameGrid[y].splice(x, 1, gameGrid[this.y][this.x]);
                gameGrid[y][x].x = x;
                gameGrid[y][x].y = y;
                gameGrid[moves[m][1]].splice(moves[m][0], 0);
                gameGrid[moves[m][1]].splice(moves[m][0], 1, original);
            }
            for(let t = 0; t < removeMoves.length; t++){
                for (let r = 0; r < moves.length; r++){
                    if (removeMoves[t][0] == moves[r][0] && removeMoves[t][1] == moves[r][1]){
                        moves.splice(r, 1);
                    }
                }
            }
        }
        return moves;
    }
}

const kingTableBlackEarly = [
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-20, -30, -30, -40, -40, -30, -30, -20],
    [-10, -20, -20, -20, -20, -20, -20, -10],
    [20, 20, 0, 0, 0, 0, 20, 20],
    [20, 30, 10, 0, 0, 10, 30, 20]
];

const kingTableWhiteEarly = kingTableBlackEarly.slice().reverse();

const kingTableBlackLate = [
    [-50, -30, -30, -30, -30, -30, -30, -50],
    [-30, -30, 0, 0, 0, 0, -30, -30],
    [-30, 0, 20, 30, 30, 20, 0, -30],
    [-30, 0, 30, 40, 40, 30, 0, -30],
    [-30, 0, 30, 40, 40, 30, 0, -30],
    [-30, 0, 20, 30, 30, 20, 0, -30],
    [-30, -30, 0, 0, 0, 0, -30, -30],
    [-50, -30, -30, -30, -30, -30, -30, -50]
];

const kingTableWhiteLate = kingTableBlackLate.slice().reverse();

class Queen extends Piece {
    constructor(x, y, player){
        super(x, y, player);
        this.type = "Queen";
        this.value = 4;
        if (this.player == 1){
            this.image = loadImage('images/queen.png');
        }else{
            this.image = loadImage('images/black_queen.png');
        }
    }
    GetMoves(c){
        let moves = [];
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
            moves = removeLostMoves(moves, this.player, this);
        }
        return moves;
    }
}

const queenTableBlack = [
    [-20, -10, -10, -5, -5, -10, -10, -20],
    [-10, 0, 0, 0, 0, 0, 0, -10],
    [-10, 0, 5, 5, 5, 5, 0, -10],
    [-5, 0, 5, 5, 5, 5, 0, -5],
    [0, 0, 5, 5, 5, 5, 0, -5],
    [-10, 5, 5, 5, 5, 5, 0, -10],
    [-10, 0, 5, 0, 0, 0, 0, -10],
    [-20, -10, -10, -5, -5, -10, -10, -20]
];

const queenTableWhite = queenTableBlack.slice().reverse();

const tableOfTables = [["Pawn", pawnTableWhite,pawnTableBlack], ["Rook", rookTableWhite, rookTableBlack], ["Bishop", bishopTableWhite, bishopTableBlack], ["Knight", knightTableWhite, knightTableBlack], ["King", kingTableWhiteEarly, kingTableBlackEarly, kingTableWhiteLate, kingTableBlackLate], ["Queen", queenTableWhite, queenTableBlack]];

let scenario = 0;
let faze = ["early", "early"]; // this is important for the bot to know what phase of the game it is in since some of the tables are different for early and late game

function changeScenario(){ // function for changing between scenarios
    scenario = document.getElementById("scenario").selectedIndex;
    document.getElementById("changeColourSpinner").selectedIndex = allGridLayouts[scenario][1][1] == "white" ? 0 : 1;
    resetGame(true);
}

let gameGridLayout = [[ // this is the layout of the game, the 1 and 2 represent the players that own the pieces
    [[Rook, 2, 0], [Knight, 2, 0], [Bishop, 2, 0], [Queen, 2, 0], [King, 2, 0], [Bishop, 2, 0], [Knight, 2, 0], [Rook, 2, 0]],
    [[Pawn, 2, 0],[Pawn, 2, 0],[Pawn, 2, 0],[Pawn, 2, 0],[Pawn, 2, 0],[Pawn, 2, 0],[Pawn, 2, 0],[Pawn, 2, 0]],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [[Pawn, 1, 0],[Pawn, 1, 0],[Pawn, 1, 0],[Pawn, 1, 0],[Pawn, 1, 0],[Pawn, 1, 0],[Pawn, 1, 0],[Pawn, 1, 0]],
    [[Rook, 1, 0], [Knight, 1, 0], [Bishop, 1, 0], [Queen, 1, 0], [King, 1, 0], [Bishop, 1, 0], [Knight, 1, 0], [Rook, 1, 0]],
], "white", [], 0, ["early", "early"], "player", [], [], [], []];

let checkmateScenarioBlack = [[ // this is a layout used for testing the bots decision making
    [null, null, null, null, null, null, null, null],
    [null, [King, 1, 0], null, null, null, null, [Rook, 2, 0], null],
    [[Rook, 2, 0], null, null, null, null, null, null, null],
    [[Rook, 2, 0], null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, [King, 2, 0]],
], "white", [], 0, ["early", "early"], "bot", [], [], [], []];

let checkmateScenarioWhite = [[ // this is the same as blacks checkmate but reversed
    [null, [King, 2, 0], null, null, null, null, null, null],
    [null, null, null, null, null, null, [Rook, 1, 0], null],
    [[Rook, 1, 0], null, null, null, null, null, null, null],
    [[Rook, 1, 0], null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, [King, 1, 0]],
], "white", [], 0, ["early", "early"], "bot", [], [], [], []]; // added these informations to the end of the layout, so it has the same size? or variables as the imported game layouts

let checkmateTwoMoves = [[ // this is to test the bots abilities in deeper recursions
[[King, 1, 1],null,null,null,null,null,null,null],
[null,null,null,null,null,[Rook, 2, 1],null, null],
[null,null,null,null,null,[Rook, 2, 1],null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,[King, 2, 1]],
],  "white", [], 0, ["late", "early"], "bot", [], [], [], []];
/*
let checkmateTwoMoves = [[ // this is to test the bots abilities in deeper recursions
    [[King, 1, 1],null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null, null],
    [null,null,[Pawn, 1, 1],null,null,[Rook, 2, 1],null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,[King, 2, 1]],
    ],  "white", [], 0, ["late", "early"], "bot", [], [], [], []];*/

// this is the array containing all the different layouts, the base layouts and the imported ones
// the false at the end of each layout is to determine if the layout is a base layout or not, this is important for the deleteGame function
let allGridLayouts = [["Full game", gameGridLayout, false], ["Checkmate Black", checkmateScenarioBlack, false], ["Checkmate White", checkmateScenarioWhite, false], ["Checkmate in Two Moves", checkmateTwoMoves, false]];

let gameGrid = []; // this is the actual game grid used in the game
for (let i = 0; i < 8; i++) {
    gameGrid.push([]);
    for (let j = 0; j < 8; j++) {
        gameGrid[i].push(null);
    }
}

// important variable that for some reason needed to be globalized
let availableMoves = [];
let specialMoves = [];
let currentPlayer = "white";
let baseSize = 0;
let moveHistory = [];
let historyOffset = 0;
let enemy = "player";
let whosBot = 2;

function Undo(){ // function for undoing the a move
    if (moveHistory.length - historyOffset >= 1){
        historyOffset++;
        if (moveHistory.length - historyOffset < 0){
            historyOffset--;
            return;
        }
        // puting the piece back to its original position
        let oldX = moveHistory[moveHistory.length - historyOffset][0][0];
        let oldY = moveHistory[moveHistory.length - historyOffset][0][1];
        let newX = moveHistory[moveHistory.length - historyOffset][1][0];
        let newY = moveHistory[moveHistory.length - historyOffset][1][1];
        let takenPiece = null;
        let name = "";
        if (moveHistory[moveHistory.length - historyOffset][2] != null){
            name = moveHistory[moveHistory.length - historyOffset][2][0];
        }
        if (name != ""){ // a horific way to do this, but it works
            if (name == "Pawn"){
                takenPiece = new Pawn(newX, newY, moveHistory[moveHistory.length - historyOffset][2][1]);
                takenPiece.numMoves = moveHistory[moveHistory.length - historyOffset][2][2];
            }else if (name == "Rook"){
                takenPiece = new Rook(newX, newY, moveHistory[moveHistory.length - historyOffset][2][1]);
                takenPiece.numMoves = moveHistory[moveHistory.length - historyOffset][2][2];
            }else if (name == "Bishop"){
                takenPiece = new Bishop(newX, newY, moveHistory[moveHistory.length - historyOffset][2][1]);
                takenPiece.numMoves = moveHistory[moveHistory.length - historyOffset][2][2];
            }else if (name == "Knight"){
                takenPiece = new Knight(newX, newY, moveHistory[moveHistory.length - historyOffset][2][1]);
                takenPiece.numMoves = moveHistory[moveHistory.length - historyOffset][2][2];
            }else if (name == "King"){
                takenPiece = new King(newX, newY, moveHistory[moveHistory.length - historyOffset][2][1]);
                takenPiece.numMoves = moveHistory[moveHistory.length - historyOffset][2][2];
            }else if (name == "Queen"){
                takenPiece = new Queen(newX, newY, moveHistory[moveHistory.length - historyOffset][2][1]);
                takenPiece.numMoves = moveHistory[moveHistory.length - historyOffset][2][2];
            }
        }
        // if some piece was taken in the move, it is recreated and put back to its position 
        gameGrid[oldY].splice(oldX, 0);
        gameGrid[oldY].splice(oldX, 1, gameGrid[newY][newX]);
        gameGrid[oldY][oldX].x = oldX;
        gameGrid[oldY][oldX].y = oldY;
        gameGrid[oldY][oldX].numMoves--;
        gameGrid[newY].splice(newX, 0);
        gameGrid[newY].splice(newX, 1, takenPiece);
        currentPlayer = currentPlayer == "white" ? "black" : "white";
        document.getElementById("currentPlayerText").textContent = "Current Player: " + currentPlayer;
        highlightedTiles = [];
        checkedKing = [];
        checkWin(gameGrid, currentPlayer, true, true); // also checking if there is something to highlight, since you can undo a move into a check
        checkWin(gameGrid, currentPlayer == "white" ? "black" : "white", true, true);
    }
}

function Redo(){ // function for redoing a move
    if (historyOffset > 0){ // this ensures that there is a move that can be redone
        historyOffset--;
        if (moveHistory.length - historyOffset < 0){ // this prevents an error that could happen if the user tries to redo even though there are no further moves to redo
            historyOffset++;
            return;
        }
        // putting the piece bact to the position it was moved to originally
        let oldX = moveHistory[moveHistory.length - historyOffset-1][0][0];
        let oldY = moveHistory[moveHistory.length - historyOffset-1][0][1];
        let newX = moveHistory[moveHistory.length - historyOffset-1][1][0];
        let newY = moveHistory[moveHistory.length - historyOffset-1][1][1];
        if (gameGrid[newY][newX] != null){ // if the move was a taking one, then storing all the important information about the taken piece, in case of an undo
            takenPiece = [gameGrid[newY][newX].type, gameGrid[newY][newX].player, gameGrid[newY][newX].numMoves];
        }
        gameGrid[newY].splice(newX, 0);
        gameGrid[newY].splice(newX, 1, gameGrid[oldY][oldX]);
        gameGrid[newY][newX].x = newX;
        gameGrid[newY][newX].y = newY;
        gameGrid[newY][newX].numMoves++;
        gameGrid[oldY].splice(oldX, 0);
        gameGrid[oldY].splice(oldX, 1, null);
        try{
            moveHistory[moveHistory.length - historyOffset - 1][1].numMoves++;
        } catch{}
        currentPlayer = currentPlayer == "white" ? "black" : "white";
        oppositePlayer = currentPlayer == "white" ? "black" : "white";
        // checking if some end condition happened because of the redo, and updating the text accordingly
        if (checkWin(gameGrid, currentPlayer, true, true) == "win"){
            document.getElementById("currentPlayerText").textContent = "Player " + oppositePlayer + " wins!";
        }else if (checkWin(gameGrid, currentPlayer, true, true) == "draw"){
            document.getElementById("currentPlayerText").textContent = "Draw!";
        }else{
            document.getElementById("currentPlayerText").textContent = "Current Player: " + currentPlayer;
        }
    }
}

function deleteAll(){ // function for deleting all extra scenarios from the game and local storage
    allGridLayouts = allGridLayouts.slice(0, 4); // this is not scalable, but it doesnt matter since there will not be more than 4 base scenarios
    scenario = 0;
    makeOptions();
    localStorage.clear();
}

function saveGame(n){ // function that saves the current game as a layout for a scenario, also saves the scenario to local storage
    localStorage.clear();
    let name = document.getElementById("name").value;
    if (n == null){
        if (name == ""){
        name = "game";
        }
    }else if (n != null){
        name = n;
    }
    let layout = [];
    for (let i = 0; i < 8; i++){
        layout.push([]);
        for (let j = 0; j < 8; j++){
            if (gameGrid[i][j] == null){
                layout[i].push(null);
            }else{ // the layout has to have constructors for the pieces
                layout[i].push([gameGrid[i][j].constructor, gameGrid[i][j].player, gameGrid[i][j].numMoves]);
            }
        }
    }
    allGridLayouts.push([name, [layout, currentPlayer, moveHistory, historyOffset, faze, enemy, availableMoves, specialMoves, highlightedTiles, checkedKing], true]);
    makeOptions();
    scenario = allGridLayouts.length - 1;
    document.getElementById("scenario").selectedIndex = scenario;
    document.getElementById("name").value = "";
    let allConvertedLayouts = []; // all grids are converted and saved at once into local storage
    for(let i = 0; i < allGridLayouts.length; i++){
        let saveG = allGridLayouts[i][1][0];
        let convertedGrid = []; // the gameGrid is converted to a format that can be saved to local storage
        for (let i = 0; i < 8; i++){
            convertedGrid.push([]);
            for (let j = 0; j < 8; j++){
                if (saveG[i][j] == null){
                    convertedGrid[i].push(null);
                }else{
                    if (saveG[i][j][0] == Pawn){ // horific way to do this-works
                        convertedGrid[i].push(["Pawn", saveG[i][j][1], saveG[i][j][2]]);
                    }else if (saveG[i][j][0] == Rook){
                        convertedGrid[i].push(["Rook", saveG[i][j][1], saveG[i][j][2]]);
                    }else if (saveG[i][j][0] == Bishop){
                        convertedGrid[i].push(["Bishop", saveG[i][j][1], saveG[i][j][2]]);
                    }else if (saveG[i][j][0] == Knight){
                        convertedGrid[i].push(["Knight", saveG[i][j][1], saveG[i][j][2]]);
                    }else if (saveG[i][j][0] == King){
                        convertedGrid[i].push(["King", saveG[i][j][1], saveG[i][j][2]]);
                    }else if (saveG[i][j][0] == Queen){
                        convertedGrid[i].push(["Queen", saveG[i][j][1], saveG[i][j][2]]);
                    }
                }
            }
        }
        let game = {
            "convertedGrid": convertedGrid,
            "currentPlayer": allGridLayouts[i][1][1],
            "moveHistory": allGridLayouts[i][1][2],
            "historyOffset": allGridLayouts[i][1][3],
            "faze": allGridLayouts[i][1][4],
            "enemy": allGridLayouts[i][1][5],
            "name": allGridLayouts[i][0],
            "availableMoves": allGridLayouts[i][1][6],
            "specialMoves": allGridLayouts[i][1][7],
            "highlightedTiles": allGridLayouts[i][1][8],
            "checkedKing": allGridLayouts[i][1][9],
            "canBeDeleted": allGridLayouts[i][2]
        };
        //console.log(allGridLayouts[i]);
        allConvertedLayouts.push(game);
    }
    localStorage.setItem("games", JSON.stringify(allConvertedLayouts));
}

function importGame(){ // function for importing games from a json file
    let file = document.getElementById("Import").files[0];
    let name = file.name;
    if (file == null || file.type != "application/json"){ // checking that the user selected the right file
        alert("Please select a json file");
        return;
    }
    try{ // the entire thing has to be in a try catch block, because the user could try to pass in an invalid json file
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(){
            let game = JSON.parse(reader.result);
            let grid = [];
            for (let i = 0; i < 8; i++){
                grid.push([]);
                for (let j = 0; j < 8; j++){
                    if (game.convertedGrid[i][j] == null){
                        grid[i].push(null);
                    }else{
                        if (game.convertedGrid[i][j][0] == "Pawn"){ // this is not really the best way to do this, but its not really that important
                            grid[i].push([Pawn, game.convertedGrid[i][j][1]]);
                        }else if (game.convertedGrid[i][j][0] == "Rook"){
                            grid[i].push([Rook, game.convertedGrid[i][j][1]]);
                        }else if (game.convertedGrid[i][j][0] == "Bishop"){
                            grid[i].push([Bishop, game.convertedGrid[i][j][1]]);
                        }else if (game.convertedGrid[i][j][0] == "Knight"){
                            grid[i].push([Knight, game.convertedGrid[i][j][1]]);
                        }else if (game.convertedGrid[i][j][0] == "King"){
                            grid[i].push([King, game.convertedGrid[i][j][1]]);
                        }else if (game.convertedGrid[i][j][0] == "Queen"){
                            grid[i].push([Queen, game.convertedGrid[i][j][1]]);
                        }
                    }
                }
            }
            saveGame(name);
            scenario = allGridLayouts.length - 1;
            document.getElementById("scenario").selectedIndex = scenario;
            document.getElementById("Import").value = "";
            resetGame(true);
            }
    }catch{
        alert("Invalid json file");
        scenario = 0;
        document.getElementById("scenario").selectedIndex = scenario;
        resetGame(true);
    }
}


function exportGame(){ // function for exporting the game to a json file
    let name = document.getElementById("name").value;
    if (name == ""){
        name = "game";
    }
    let convertedGrid = []; // the gameGrid is converted to a format that can be exported to a json file
    for (let i = 0; i < 8; i++){
        convertedGrid.push([]);
        for (let j = 0; j < 8; j++){
            if (gameGrid[i][j] == null){
                convertedGrid[i].push(null);
            }else{
                convertedGrid[i].push([gameGrid[i][j].type, gameGrid[i][j].player, gameGrid[i][j].numMoves, gameGrid[i][j].value]);
            }
        }
    }
    let game = {
        "convertedGrid": convertedGrid,
        "currentPlayer": currentPlayer,
        "moveHistory": moveHistory,
        "historyOffset": historyOffset,
        "faze": faze,
        "enemy": enemy,
        "name": name,
        "availableMoves": availableMoves,
        "specialMoves": specialMoves,
        "highlightedTiles": highlightedTiles,
        "checkedKing": checkedKing
    };
    let json = JSON.stringify(game);
    let link = document.createElement('a');
    let blob = new Blob([json], {type: "application/json"});
    link.href = URL.createObjectURL(blob);
    link.download = name + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    document.getElementById("name").value = "";
}

function changePlayersColour(){ // function for changing the colour of the player when the enemy is a bot
    //console.log("------------------------")
    //console.log(document.getElementById("ChangeColour").selectedIndex);
    whosBot = document.getElementById("ChangeColour").selectedIndex == 0 ? 2:1;
    //console.log(whosBot);
    if(whosBot == currentPlayer == "white" ? 1:2 && document.getElementById("currentPlayerText") != "Player " + currentPlayer + " wins!" && document.getElementById("currentPlayerText") != "Draw!"){
        //console.log("this ran");
        //console.log("bot is " + whosBot);
        //return;
        //console.log(whosBot);
        setTimeout(function(){
            enemyDecision();
        }, 50);
        //console.log(currentPlayer);
        setTimeout(function(){
            checkWinners();
        }, 100);
    }
}

function changeMode(){ // function for changing the enemy from player to bot and the other way around
    if (document.getElementById("btnradio1").checked){
        enemy = "player";
        // adding the undo and redo buttons, this cant be there when the enemy is a bot, however maybe it will be possible in the future
        document.getElementById("undoRedo").innerHTML = '<button class="btn-lg btn-primary w-50" id="undo" onclick="Undo()">Undo</button><button class="btn-lg btn-primary w-50" id="redo" onclick="Redo()">Redo</button>';
        document.getElementById("changeColourSpinner").innerHTML = "";
        whosBot = 2;
    }else{
        enemy = "bot";
        document.getElementById("undoRedo").innerHTML = "";
        // adding the spinner for changing the colour of the player when the enemy is a bot
        document.getElementById("changeColourSpinner").innerHTML = '<p class="display-6">Players Colour</p><select class= "form-select form-select-lg" id="ChangeColour" onchange="changePlayersColour()"><option value="0">White</option><option value="1">Black</option></select>';
        document.getElementById("ChangeColour").selectedIndex = whosBot == 1 ? 0:1;
        //console.log(whosBot);
    }
    resetGame(false);
}

function deleteGame(){ // function that deletes the game from all places where the game is stored
    if (allGridLayouts.length == 1){
        alert("You can't delete the only game");
        return;
    }
    if(allGridLayouts[scenario][2]){ // checking that the scenario isnt one of the base game ones
        allGridLayouts.splice(scenario, 1);
    }else{
        alert("You cant delete a base game scenario");
    }
    // resetting the game, since the current scenario has been deleted
    makeOptions();
    changeScenario();
    resetGame(true);
}

function numberOfPieces(grid, player){ // function that counts the number of pieces of a player, it is mainly used for checking if the game is in late game or early game
    let nP = player == "white" ? 1:2;
    let count = 0;
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (grid[i][j] != null && grid[i][j].player == nP){
                count++;
            }
        }
    }
    return count;
}

function evaluateNodeLine(node){ // this function evaluates the value of the node and its parant and its parent, etc.
    let value = 0;
    //console.log("-------------------------");
    //console.log(node);
    value = node.value;
    while(node.parent != null){
        //minimazing or maximizing the value based on the player
        if (node.parent.player == "white"){
            for (let i = 0; i < node.parent.children.length; i++){
                if (node.parent.children[i].value < value){
                    value = node.parent.children[i].value;
                }
            }
            //console.log("minimazing");
        }
        if (node.parent.player == "black"){
            for (let i = 0; i < node.parent.children.length; i++){
                if (node.parent.children[i].value > value){
                    value = node.parent.children[i].value;
                }
            }
            //console.log("maximizing");
        }
        node = node.parent;
    }
    return value;
}

function findBestMove(nodes){ // this function finds the best move for the bot from the scores array, that is generated in the enemyDecision function
    let bestMove = [];
    let bestNodesNumber = 0;
    let bestValue = -100000000
    //console.log(nodes);
    for (let i = 0; i < nodes.length; i++){
        //console.log(nodes[i]);
        for (let j =0; j < nodes[i][1].length; j++){
            if (evaluateNodeLine(nodes[i][1][j]) > bestValue){
                bestValue = evaluateNodeLine(nodes[i][1][j]);
                bestNodesNumber = i;
                //console.log("best value changed to " + bestValue);
            }
        }
    }
    //console.log(bestNodesNumber + " is the best nodeline");
    //console.log(nodes[bestNodesNumber]);
    for (let x = 0; x < scores.length; x++){
        //console.log(scores);
        if (scores[x][2] == nodes[bestNodesNumber][0]){
            bestMove = [scores[x][0], scores[x][1], scores[x][3], scores[x][4]];
        }
    }
    //console.log(bestMove);
    //console.log("with a score of " +bestValue);
    return bestMove;
}

function valuePlayersPieces(grid, player){ // this function is used by the bot to evaluate the value of the board
    let value = 0;
    let index = 0;
    let nP = player == "white" ? 1 : 2;
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (grid[i][j] != null && grid[i][j].player == nP){  // this part of the code uses the tables to evaluate the value of the pieces more accurately
                value += grid[i][j].value;
                for (let k = 0; k < tableOfTables.length; k++){
                    if(grid[i][j].type == tableOfTables[k][0]){
                        index = k;
                    }
                }
                if (grid[i][j].type != "King" && grid[i][j].type == tableOfTables[index][0]){
                    value = value + tableOfTables[index][grid[i][j].player][i][j]/100;
                }else if (faze[nP - 1] == "early"){
                    value = value + tableOfTables[index][grid[i][j].player][i][j]/100;
                }else if (faze[nP - 1] == "late"){
                    value = value + tableOfTables[index][grid[i][j].player + 2][i][j]/100;
                }
            }
        }
    }
    return parseFloat(Math.round(value*100) / 100);
}

class Node{ // this is used during the recursion
    constructor(player, depth, parent, value){
        this.player = player;
        this.depth = depth;
        this.children = [];
        this.parent = parent;
        this.value = value;
    }
    addChild(child){
        this.children.push(child);
    }
}

// two important global variables of the bot, scores for storing the values of each move during the recursion, and controlVariable that counts the number of tested moves, it is just for debugging since recursion is hard to debug
let controlVariable = 0;
let scores = [];
let controlScores = [];
let winningDepth = 10000000000000;

function recursiveFunc(grid, player, depth, desiredDepth , NODE){ // this is a recursive function used by the bot to evaluate moves of the board
    //try{
    //console.log(player);
    // this is all still under construction, but can be experienced in the current state of the game
    depth++;
    //console.log("depth: " + depth);
    let originalPlayer = player;
    player = player == "white" ? "black" : "white";
    let nP = player == "white" ? 1 : 2;
    //console.log(player);
    let allMoveOptions = [];
    for (let i = 0; i < 8; i++){ // getting all the possible moves of the player
        for (let j = 0; j < 8; j++){
            if (grid[i][j] != null && grid[i][j].player == nP){
                let moves = grid[i][j].GetMoves(true);
                if (moves.length != 0){
                    allMoveOptions.push([grid[i][j], moves]);
                }
            }
        }
    }
    /*if (player == "white"){
        console.log(allMoveOptions);
        console.log("---------------");
    }*/
    for (let i =0; i < allMoveOptions.length; i++){ // this loop goes through all the possible moves and evaluates them, and if the desired depth of the recursion has not been reached yet it will create another layer of recursion
        for (let j = 0; j < allMoveOptions[i][1].length; j++){
            // removing the king from moves to prevent a bug
            controlVariable++;
            let movedPiece = allMoveOptions[i][0];
            let oX = movedPiece.x;
            let oY = movedPiece.y;
            let endingMove = false;
            let tInPlace = grid[allMoveOptions[i][1][j][1]][allMoveOptions[i][1][j][0]];
            grid[movedPiece.y].splice(movedPiece.x, 0);
            grid[movedPiece.y].splice(movedPiece.x, 1, null);
            let newX = allMoveOptions[i][1][j][0];
            let newY = allMoveOptions[i][1][j][1];
            grid[newY].splice(newX, 0);
            grid[newY].splice(newX, 1, movedPiece);
            grid[newY][newX].x = newX;
            grid[newY][newX].y = newY;
            //console.log("added child");
            let value = parseInt(parseFloat(valuePlayersPieces(gameGrid, whosBot == 1 ? "white":"black") - valuePlayersPieces(gameGrid, whosBot == 1 ? "black":"white"))*100)/100;
            //console.log(checkWin(gameGrid, whosBot == 1 ? "black":"white", false, true));
            //console.log(checkWin(gameGrid, whosBot == 1 ? "white":"black", false, true));
            //console.log("-------------------------");
            if (checkWin(gameGrid, whosBot == 1 ? "black":"white", false, true) == "win"){
                //console.log("win at depth: " + depth + " won");
                //console.log("/////////////////////////////////////");
                if (winningDepth == null || winningDepth > depth){
                    winningDepth = depth;
                }
                endingMove = true;
                value = parseInt(parseFloat(value + 10000000)*100)/100;
            }else if(checkWin(gameGrid, whosBot == 1 ? "black":"white", false, true) == "draw" || checkWin(gameGrid, whosBot == 1 ? "white":"black", false, true) == "draw"){
                endingMove = true;
                value = parseInt(parseFloat(value - 10000000)*100)/100;
                /*console.log("draw at depth: " + depth);
                console.log(gameGrid);
                console.log(currentPlayer);
                console.log(checkWin(gameGrid, whosBot == 1 ? "white":"black", false, true));*/
            }
            NODE.addChild(new Node(player, depth, NODE, value));
            if (depth < desiredDepth && !endingMove && depth < winningDepth){
                //console.log("depth: " + depth, "desiredDepth: " + desiredDepth);
                recursiveFunc(grid, player, depth, desiredDepth, NODE.children[NODE.children.length - 1]);
            }
            grid[newY].splice(newX, 0);
            grid[newY].splice(newX, 1, tInPlace);
            grid[oY].splice(oX, 0);
            grid[oY].splice(oX, 1, movedPiece);
            grid[oY][oX].x = oX;
            grid[oY][oX].y = oY;
        }
    }
    player = originalPlayer;
/*}catch{
    console.log(gameGrid);
    console.log("error");
}*/
}

function makeMove(move){ // this function is used by the bot to make the selected move
    // still under construction
    let movingPiece = gameGrid[move[0]][move[1]];
    //console.log(movingPiece);
    if (movingPiece == null){
        return;
    }
    gameGrid[move[3]].splice(move[2], 0);
    gameGrid[move[3]].splice(move[2], 1, movingPiece);
    gameGrid[move[3]][move[2]].x = move[2];
    gameGrid[move[3]][move[2]].y = move[3];
    gameGrid[move[0]].splice(move[1], 0);
    gameGrid[move[0]].splice(move[1], 1, null);
    if (movingPiece.type == "Pawn" && (move[3] == 0 || move[3] == 7)){
        gameGrid[move[3]].splice(move[2], 0);
        gameGrid[move[3]].splice(move[2], 1, new Queen(move[2], move[3], movingPiece.player));
        movingPiece = gameGrid[move[3]][move[2]];
    }
    movingPiece.numMoves++;
}

let answerList = []; // this might be replaced in the future, depends on if it works or not
function endNodesRecursive(node){ // this function will recursively find the end nodes of a starting move node
    //console.log(node);
    let children = node.children;
    //console.log(children);
    answerList.push(node);
    for (let i = 0; i < children.length; i++){
        endNodesRecursive(children[i]);
    }
    /*console.log("------");
    console.log(answerList);
    console.log("------");*/
}

let nodes = []; // this is an array of the first level depth nodes

function resNodes(){ // this function is used to restructure the scores array, this is done because of a recursion bug that I couldnt find a different solution for
    //console.log(nodes);
    //return;
    let Nodes = [];
        answerList = [];
    for (let i = 0; i < nodes.length; i++){
        endNodesRecursive(nodes[i][1]);/*
        for (let j = 0; j < answerList.length; j++){
            for (let k = 0; k < scores.length; k++){
                if (endNodes[i][1][j].parent == endNodes[i][1][j]){
                    endNodes[i][1].splice(j, 1);
                }
            }
        }*/
    }
    Nodes.push(answerList);
    /*console.log("-------------------------");
    console.log("ending nodes here: ");
    console.log(Nodes);
    console.log("-------------------------");*/
    return Nodes;
}
/*
function ideaRec(nodes){
    let nodesArray = [];
    for (let i = 0; i <nodes.length; i++){
        let node = nodes[i][1];
        while(node.children.length != 0){
            for (let j = 0; j < node.children.length; j++){
                nodesArray.push(node.children[j]);
            }
            node = node.children[0];
        }
    }
    return nodesArray;
}*/

function ideaFunc(nodes, desiredDepth, changedNodes, desiredDepth){ // i have an idea how to get the best move, I am not surre if it makes sense so I will try it in a special function separated from everything else
    //console.log(changedNodes.length);
    for (let i = desiredDepth; i >= 1; i--){
        let parents = [];
        for (let j = 0; j < changedNodes.length; j++){
            //console.log(changedNodes[j].depth);
            if (changedNodes[j].depth == i){
                let add = true;
                //console.log(i);
                //return;
                for (let k = 0; k < parents.length; k++){
                    if (changedNodes[j].parent == parents[k]){
                        add = false;
                    }
                }
                if (add && changedNodes[j].parent != null){
                    parents.push(changedNodes[j].parent);
                }
            }
        }
        //console.log(parents.length);
        /*if (parents.length == 1){
            //console.log("only one parent");
            //console.log(parents[0]);
            break;
        }*/
        //break;
        for (let x = 0; x < parents.length; x++){
            if (i % 2 != 0){ // maximizing
                let max = -10000000
                /*if (parents[x].children.length == 0){
                    console.log(parents[x]);
                }*/
                for (let k = 0; k < parents[x].children.length; k++){
                    if (parents[x].children[k].value > max){
                        max = parents[x].children[k].value;
                    }
                }
                parents[x].value = max;
            }else{ // minimazing
                let min = 10000000;
                for (let k = 0; k < parents[x].children.length; k++){
                    if (parents[x].children[k].value < min){
                        min = parents[x].children[k].value;
                    }
                }
                parents[x].value = min;
            }
        }
    }
    //console.log("hopefully results");
    //console.log(nodes);
    let bestMove = [];
    let bestValue = -100000000;
    let bestIndex = 0;
    for (let i = 0; i < nodes.length; i++){
        //console.log(nodes[i][1].value);
        //console.log(nodes[i][1].depth);
        //console.log("-----------------------------");
        if (nodes[i][1].value > bestValue){
            bestValue = nodes[i][1].value;
            bestIndex = i;
        }
    }
    for (let i = 0; i < scores.length; i++){
        if (scores[i][2] == bestIndex){
            bestMove = [scores[i][0], scores[i][1], scores[i][3], scores[i][4]];
        }
    }
    //console.log(bestValue);
    //console.log(bestMove);
    return bestMove;
}

function enemyDecision(){ // this is the main function of the bot, it is called when its bots turn
    // under construction
    //console.log(gameGrid);
    //return;
    let bestMove = [];
    // 3 is a good balance of speed and like playability??? of the bot
    let desiredDepth = 3; // this is the most important variable for the bot, it determines how deep the recursion will go, the higher the number the better the bot will be
    // current maximum is 4, its not really simple to go further since websites can only run on a single thread and because at level 4 its already 160 000 possible move combinations
    /*if (numberOfPieces(gameGrid, "white") + numberOfPieces(gameGrid, "black") < 20){
        desiredDepth = 3;
    }else{
        desiredDepth = 2;
    }*/
    winningDepth = 10000000000000;
    scores = [];
    nodes = [];
    let num = 0;
    for (let i = 0; i < 8; i++){ // this loop fils up the scores with possible moves, because only the first round of moves actually need scoring, the other moves after them just simply give their score to one of these moves
        for (let j = 0; j < 8; j++){
            if (gameGrid[i][j] != null && gameGrid[i][j].player == whosBot){
                let moves = gameGrid[i][j].GetMoves(true);
                for (let k = 0; k < moves.length; k++){
                    scores.push([i, j, num, moves[k][0], moves[k][1]]);
                    num++;
                }
            }
        }
    }
    if (scores.length != 0){ // this makes sure that there wont be any errors when the bot is in a checkmate
        for (let i = 0; i < scores.length; i++){ // one loop of the recursive function is basically here because the places for each moves score need to be asigned a place in the scores variable
            let movingPiece = gameGrid[scores[i][0]][scores[i][1]];
            let oX = movingPiece.x;
            let oY = movingPiece.y;
            let tInPlace = gameGrid[scores[i][4]][scores[i][3]];
            let endingMove = false;
            // moving the piece to the new place and checking how would that affect the board and the score
            gameGrid[movingPiece.y].splice(movingPiece.x, 0);
            gameGrid[movingPiece.y].splice(movingPiece.x, 1, null);
            gameGrid[scores[i][4]].splice(scores[i][3], 0);
            gameGrid[scores[i][4]].splice(scores[i][3], 1, movingPiece);
            gameGrid[scores[i][4]][scores[i][3]].x = scores[i][3];
            gameGrid[scores[i][4]][scores[i][3]].y = scores[i][4];
            let value = parseInt(parseFloat(valuePlayersPieces(gameGrid, whosBot == 1 ? "white":"black") - valuePlayersPieces(gameGrid, whosBot == 1 ? "black":"white")) * 100) / 100;
            if (checkWin(gameGrid, whosBot == 1 ? "black":"white", false, true) == "win"){
                winningDepth = 0;
                endingMove = true;
                value = parseInt(parseFloat(value + 10000000) * 100) / 100;
                //console.log("winning move at decision");
            }else if (checkWin(gameGrid, whosBot == 1 ? "white":"black", false, true) == "win" || checkWin(gameGrid, whosBot == 1 ? "black":"white", false, true) == "draw"){
                endingMove = true;
                value = parseInt(parseFloat(value - 10000000) * 100) / 100;
                //console.log("draw at decision");
            }
            //console.log(currentPlayer);
            let n = new Node(currentPlayer, 1, null, value);
            nodes.push([i, n]);
            if (!endingMove && 1 < desiredDepth && 1 < winningDepth){ // if the move isnt a move that would cause a loss or a win imeadiately, the recursive function is called, it will run until it reaches the desired depth of search
                //console.log("recursion");
                //console.log(currentPlayer);
                //console.log(gameGrid);
                recursiveFunc(gameGrid, currentPlayer, 1,  desiredDepth,n);
                //return;
            }
            // reseting the grid to its original state, so that the next move can be tested on the original board
            gameGrid[scores[i][4]].splice(scores[i][3], 0);
            gameGrid[scores[i][4]].splice(scores[i][3], 1, tInPlace);
            gameGrid[oY].splice(oX, 0);
            gameGrid[oY].splice(oX, 1, movingPiece);
            gameGrid[oY][oX].x = oX;
            gameGrid[oY][oX].y = oY;
        }
        controlVariable = 0;
        //console.log(nodes);
        //return;
        //let restructuredNodes = resNodes();
        /*console.log("restructured nodes");
        console.log(restructuredNodes);
        console.log("//////////");*/
        //return;
        let changedNodes = resNodes();
        //console.log(changedNodes);
        //console.log("////////////////////");
        bestMove = ideaFunc(nodes, desiredDepth, changedNodes[0], desiredDepth);
        //bestMove = findBestMove(restructuredNodes); // finding the best move from the restructuredNodes array, the one with the highest score is always selected
        //return;
        makeMove(bestMove); // making the move through a function since there is no simpler way to do it as far as I know
        // this is the part of the code that checks if an end result happened
    }
    currentPlayer = currentPlayer == "white" ? "black" : "white";
    document.getElementById("currentPlayerText").innerHTML = "Current Player: " + currentPlayer;
}

function resizeCanvasFunc(){ // function for resizing the working canvas, it is needed to make the game completely responsive
    width = document.getElementById('chessboard').offsetWidth;
    height = document.getElementById('chessboard').offsetHeight;
    size = width > height ? height : width;
    resizeCanvas(size, size);
    baseSize = height / 8;
}

window.addEventListener('resize', function () { // this ensures that canvas is resized when the window is resized
    resizeCanvasFunc();
}
)
document.addEventListener("fullscreenchange", function () { // this ensures that canvas is resized when the window is put in the fullscreen mode
    resizeCanvasFunc();
}
)
document.addEventListener("webkitfullscreenchange", function () { // this ensures resizing in safari
    resizeCanvasFunc();
}
)
document.addEventListener("mozfullscreenchange", function () { // this ensures resizing in firefox
    resizeCanvasFunc();
}
)
document.addEventListener("msfullscreenchange", function () { // this ensures resizing in edge
    resizeCanvasFunc();
}
)

function loadingLayouts(){ // this function is used to load the game layouts from local storage and converting them to a usable format
    let games = JSON.parse(localStorage.getItem("games"));
    if (typeof games == "undefined" || games == null){
        return;
    }
    allGridLayouts = [];
    let grid = [];
    for (let i = 0; i < games.length; i++){
        let cGrid = games[i]["convertedGrid"];
        grid = [];
        for (let j = 0; j < 8; j++){
            grid.push([]);
            for (let k = 0; k < 8; k++){
                if (cGrid[j][k] != null){
                    if (cGrid[j][k][0] == "Pawn"){
                        grid[j].push([Pawn, cGrid[j][k][1], cGrid[j][k][2]]);
                    }else if (cGrid[j][k][0] == "Rook"){
                        grid[j].push([Rook, cGrid[j][k][1], cGrid[j][k][2]]);
                    }else if (cGrid[j][k][0] == "Bishop"){
                        grid[j].push([Bishop, cGrid[j][k][1], cGrid[j][k][2]]);
                    }else if (cGrid[j][k][0] == "Knight"){
                        grid[j].push([Knight, cGrid[j][k][1], cGrid[j][k][2]]);
                    }else if (cGrid[j][k][0] == "King"){
                        grid[j].push([King, cGrid[j][k][1], cGrid[j][k][2]]);
                    }else if (cGrid[j][k][0] == "Queen"){
                        grid[j].push([Queen, cGrid[j][k][1], cGrid[j][k][2]]);
                    }
                }else{
                    grid[j].push(null);
                }
            }
        }
        allGridLayouts.push([games[i]["name"], [grid, games[i]["currentPlayer"], games[i]["moveHistory"], games[i]["historyOffset"], games[i]["faze"], games[i]["enemy"], games[i]["availableMoves"], games[i]["specialMoves"], games[i]["highlightedTiles"], games[i]["checkedKing"]], games[i]["canBeDeleted"]]);
    }
}

function removeLostMoves(moves, player, movingPiece){ // this function is used to remove moves of a piece that would put the pieces king in check, it is called by every pieces GetMoves function except kings
    let answer = [];
    for (let i = 0; i < moves.length; i++){
        gameGrid[movingPiece.y][movingPiece.x] = null;
        let tilePiece = gameGrid[moves[i][1]][moves[i][0]];
        gameGrid[moves[i][1]][moves[i][0]] = movingPiece;
        if (checkCheck(gameGrid, player)){ // this is done to check if the move is valid
            gameGrid[movingPiece.y][movingPiece.x] = movingPiece;
            gameGrid[moves[i][1]][moves[i][0]] = tilePiece;
            continue;
        }else{
            answer.push(moves[i]);
        }
        gameGrid[movingPiece.y][movingPiece.x] = movingPiece;
        gameGrid[moves[i][1]][moves[i][0]] = tilePiece;
    }

    return answer;
}

function checkCheck(grid, player){ // this function checks if a player is in check, it used throughout the code to check if moves are valid
    let king = null;
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (grid[i][j] != null && grid[i][j].type == "King" && grid[i][j].player == player){
                king = grid[i][j];
            }
        }
    }
    if (king == null){
        return false;
    }
    let moves = [];
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (grid[i][j] != null && grid[i][j].player != player){
                if (grid[i][j].type != "Pawn"){
                    moves.push(grid[i][j].GetMoves(false));
                }else{
                    if (grid[i][j].player == 1){
                        moves.push([grid[i][j].x + 1, grid[i][j].y + 1]);
                    }else{
                        moves.push([grid[i][j].x + 1, grid[i][j].y - 1]);
                    }
                }
            }
        }
    }
    for (let i = 0; i < moves.length; i++){
        for (let j = 0; j < moves[i].length; j++){
            if (moves[i][j][0] == king.x && moves[i][j][1] == king.y){
                return true;
            }
        }
    }
    return false;
}

let highlightedTiles = []; // this is used in the checkWin function and it is used to let player know how to get out of check
let checkedKing = []; // this is used for highlighting the king that is in check

function highlightTiles(checkingPiece){ // this function highlights the tiles that the player can move to in order to get out of check
    //console.log(checkingPiece);
    highlightedTiles = [];
    checkedKing = [];
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (gameGrid[i][j] != null && gameGrid[i][j].player != checkingPiece.player){
                let moves = gameGrid[i][j].GetMoves(true);
                //console.log(moves);
                if(gameGrid[i][j].type == "King"){
                    checkedKing = [i, j];
                }
                if (moves.length != 0 ){
                    highlightedTiles.push([i, j]);
                }
            }
        }
    }
    //console.log(highlightedTiles);
}

function checkWin(grid, player,c, t){ // this function checks if a player has won, it is used in the actual game and in the bots decision making, it doesnt return true or false because there is a third option - draw
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
    let numOfAlliedPieces = 0;
    let moves = [];
    let kingMoves = king.GetMoves(true);
    kingMoves.push([king.x, king.y]);
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (grid[i][j] != null && grid[i][j].player != nP){ // this part of the code is used to get all the moves of the enemy pieces and the piece that is currently checking the king
                let currentAddedMoves = [];
                currentAddedMoves.push(grid[i][j].GetMoves(false));
                if (grid[i][j].type == "Pawn"){
                    if (grid[i][j].player == 1){
                        currentAddedMoves[0].push([grid[i][j].x, grid[i][j].y + 1]);
                    }else{
                        currentAddedMoves[0].push([grid[i][j].x, grid[i][j].y - 1]);
                    }
                }
                for (let k = 0; k < currentAddedMoves.length; k++){
                    for (let l = 0; l < currentAddedMoves[k].length; l++){
                        for (let m = 0; m < kingMoves.length; m++){
                            if (currentAddedMoves[k][l][0] == king.x && currentAddedMoves[k][l][1] == king.y){
                                checkingPiece = grid[i][j];
                            }
                        }
                    }
                }
                moves.push(currentAddedMoves);
            }
            if (grid[i][j] != null && grid[i][j].player == nP && grid[i][j].type != "King"){
                if (grid[i][j].GetMoves(true).length != 0){
                    numOfAlliedPieces++;
                }
            }
        }
    }
    if (checkingPiece != null){ // this part of the code is used to remove the moves of the checking piece from kings moves
        let cMoves = [];
        cMoves = checkingPiece.GetMoves(false);
        for (let i = 0; i < cMoves.length; i++){
            for (let j = 0; j < kingMoves.length; j++){
                if (cMoves[i][0] == kingMoves[j][0] && cMoves[i][1] == kingMoves[j][1]){
                    kingMoves.splice(j, 1);
                }
            }
        }
    }
    if (kingMoves.length == 0 || kingMoves.length == 1 && numOfAlliedPieces == 0){
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                if (grid[i][j] != null && grid[i][j].player == nP){ // this part of the code checks if the player can move somewhere with any piece, if not then its either a draw or a win
                    let moves = grid[i][j].GetMoves(true);
                    for (let k = 0; k < moves.length; k++){
                        if (t){
                            //console.log("here is something happening");
                            let tempPiece = grid[i][j];
                            let pieceInPlace = grid[moves[k][1]][moves[k][0]];
                            let ans = false;
                            if (pieceInPlace != null){
                                if (c){
                                    highlightTiles(pieceInPlace);
                                }
                                return "no winner";
                            }
                            // moving to new place
                            grid[moves[k][1]].splice(moves[k][0], 0);
                            grid[moves[k][1]].splice(moves[k][0], 1, tempPiece);
                            // setting new x and y
                            grid[moves[k][1]][moves[k][0]].x = moves[k][0];
                            grid[moves[k][1]][moves[k][0]].y = moves[k][1];
                            // removing from old place
                            grid[i].splice(j, 0);
                            grid[i].splice(j, 1, null);
                            if (!checkCheck(grid, nP)){
                                if(c){
                                    highlightTiles(grid[moves[k][1]][moves[k][0]]);
                                }
                                ans = true;
                            }
                            // moving piece back to its original place
                            grid[moves[k][1]].splice(moves[k][0], 0);
                            grid[moves[k][1]].splice(moves[k][0], 1, pieceInPlace);
                            grid[i].splice(j, 0);
                            grid[i].splice(j, 1, tempPiece);
                            // setting x and y back to original
                            grid[i][j].x = j;
                            grid[i][j].y = i;
                            if(ans){
                                return "no winner";
                            }
                        }
                    }
                }
            }
        }
        if (kingMoves.length != 0 && kingMoves[0][0] == king.x && kingMoves[0][1] == king.y){ // checking if the king has anywhere to go appart from the place where he already is
            //console.log("draw");
            //console.log(kingMoves);
            return "draw";
        }
        if (kingMoves.length == 0){
            return "win";
        }
    }
    if(checkingPiece != null && c){ // this is used to make the yellow and red tile highlighting in the game
        //console.log("this ran");
        //something = elsed; // this was a test, I needed to cause an error
        highlightTiles(checkingPiece);
    }
    return "no winner";
}
 // this is some old code that caused issues with pieces disapearing
                            /*grid[moves[k][1]].splice(moves[k][0], 0);
                            grid[moves[k][1]].splice(moves[k][0], 1, grid[i][j]);
                            grid[i].splice(j, 0);
                            grid[i].splice(j, 1, null);
                            console.log("something is happening here");
                            if (!checkCheck(grid, nP)){
                                grid[tempPiece.y].splice(tempPiece.x, 0);
                                grid[tempPiece.y].splice(tempPiece.x, 1, tempPiece);
                                grid[moves[k][1]].splice(moves[k][0], 0);
                                grid[moves[k][1]].splice(moves[k][0], 1, movingPiece);
                                if(c){ // the c is used to prevent a bug that was caused by the bot exploring the possible moves
                                    highlightTiles(checkingPiece);
                                }
                                return "no winner";
                            }
                            grid[tempPiece.y].splice(tempPiece.x, 0);
                            grid[tempPiece.y].splice(tempPiece.x, 1, tempPiece);
                            grid[i].splice(j, 0);
                            grid[i].splice(j, 1, grid[moves[k][1]][moves[k][0]]);
                            grid[moves[k][1]].splice(moves[k][0], 0);
                            grid[moves[k][1]].splice(moves[k][0], 1, null);*/

function updateHistory(oldPos, newPos, takenPiece){ // this function is used to update the move history, it is called after every move, and its used for the undo and redo functions
    if (historyOffset > 0){
        moveHistory.splice(moveHistory.length - historyOffset, historyOffset);
        historyOffset = 0;
    }
    moveHistory.push([[oldPos.x, oldPos.y], newPos, takenPiece]);
}

function changeEnemy(newEnemy){ // this function is used to change the enemy when loading a scenario
    if (newEnemy == "player"){
        enemy = "player";
        document.getElementById("btnradio1").checked = true;
        document.getElementById("undoRedo").innerHTML = '<button class="btn-lg btn-primary w-50" id="undo" onclick="Undo()">Undo</button><button class="btn-lg btn-primary w-50" id="redo" onclick="Redo()">Redo</button>';
        document.getElementById("changeColourSpinner").innerHTML = "";
    }else{
        enemy = "bot";
        document.getElementById("btnradio2").checked = true;
        document.getElementById("undoRedo").innerHTML = "";
        document.getElementById("changeColourSpinner").innerHTML = '<p class="display-6">Players Colour</p><select class= "form-select form-select-lg" id="ChangeColour" onchange="changePlayersColour()"><option value="0">White</option><option value="1">Black</option></select>';
        document.getElementById("ChangeColour").selectedIndex = whosBot == 1 ? 1:0;
        //console.log(whosBot);
    }
}

function resetGame(c){ // this function is used to reset the game, it is called when the game is started and when the reset button is pressed
    gameGrid = [];
    moveHistory = allGridLayouts[scenario][1][2];
    historyOffset = allGridLayouts[scenario][1][3];
    faze = allGridLayouts[scenario][1][4];
    currentPlayer = allGridLayouts[scenario][1][1];
    if (enemy == "bot"){
        document.getElementById("ChangeColour").selectedIndex = currentPlayer == "white" ? 0:1;
    }
    if(c){ // this is to prevent a bug that prevented the bot from being selected as the enemy
        whosBot = currentPlayer == "white" ? 2:1;
        changeEnemy(allGridLayouts[scenario][1][5]);
    }
    document.getElementById("currentPlayerText").textContent = "Current Player: " + currentPlayer;
    availableMoves = allGridLayouts[scenario][1][6];
    specialMoves = allGridLayouts[scenario][1][7];
    highlightedTiles = allGridLayouts[scenario][1][8];
    checkedKing = allGridLayouts[scenario][1][9];
    for (let i = 0; i < 8; i++){
        gameGrid.push([]);
        for (let j = 0; j < 8; j++){
            gameGrid[i].push(null);
        }
    }
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if (allGridLayouts[scenario][1][0][y][x]){ // filling the game grid with the pieces from the selected scenario
                gameGrid[y][x] = new allGridLayouts[scenario][1][0][y][x][0](x, y, allGridLayouts[scenario][1][0][y][x][1]);
                gameGrid[y][x].numMoves = allGridLayouts[scenario][1][0][y][x][2];
            }
        }
    }
}

function makeOptions(){ // this function is used to fill the select spinner with available scenarios
    let select = document.getElementById("scenario");
    select.innerHTML = "";
    for (let i = 0; i < allGridLayouts.length; i++){
        select.innerHTML += '<option value="' + i + '">' + allGridLayouts[i][0] + '</option>';
    }
}

function copyTime(){ // this is updating the copy time of the site
    let text = document.getElementById("bottomText");
    let date = new Date();
    let year = date.getFullYear();
    text.textContent = '© 2024-'+year+' Daniel Kriz';
}

function setup() { // simple setup function that creates the canvas and calls the resetGame function to fill in the new game grid
    width = windowWidth * 0.8;
    height = windowHeight * 0.8;
    size = width > height ? height : width;
    canvas = createCanvas(size, size);
    baseSize = height / 8;
    copyTime();
    canvas.parent('chessboard');
    loadingLayouts();
    makeOptions();
    changeScenario();
}

function drawTiles() { // this function is used to draw the tiles of the board, it is called 60 times per second by the draw function
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            let isAvailable = false;
            for (let k = 0; k < availableMoves.length; k++) {
                if (x == availableMoves[k][0] && y == availableMoves[k][1]) {
                    fill(0, 255, 0);
                    isAvailable = true;
                }
            }
            for (let k = 0; k < highlightedTiles.length; k++){
                if (x == highlightedTiles[k][1] && y == highlightedTiles[k][0]){
                    fill(255, 255, 0);
                    isAvailable = true;
                }
            }
            if(highlightedTiles.length !=0 && x == checkedKing[1] && y == checkedKing[0]){
                fill(255, 0, 0);
                isAvailable = true;
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

function drawPieces() { // this function is for drawing the pieces, it is called by the draw function
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if (gameGrid[y][x] != null) {
                try{
                    image(gameGrid[y][x].image, x * baseSize, y * baseSize, baseSize, baseSize);
                }catch{
                    console.log("error with drawing image");
                }
            }
        }
    }
}

function drawNumbersLetters(){ // this function is used to draw the numbers and letters on the board
    for (let i = 0; i < 8; i++){
        textSize(baseSize / 2);
        if (i % 2 == 0){
            fill(255);
        }else{
            fill(0);
        }
        text(String.fromCharCode(65 + i), i * baseSize + baseSize / 2 - baseSize / 2, height-2);
        if (i % 2 == 0){
            fill(0);
        }else{
            fill(255);
        }
        text(8 - i, 0, i * baseSize + baseSize / 2 - baseSize / 10 );
    }
}

function checkWinners(){ // this function is used to check if the game is over
    let enemyPlayer = currentPlayer == "white" ? "black" : "white";
    if (checkWin(gameGrid, currentPlayer, true, true) == "win"){
        document.getElementById("currentPlayerText").textContent = "Player " + enemyPlayer + " wins!";
        setTimeout(function(){
            alert("Player " + enemyPlayer + " wins!");
        }, 100);
    }else if (checkWin(gameGrid, enemyPlayer, true, true) == "win"){
        document.getElementById("currentPlayerText").textContent = "Player " + currentPlayer + " wins!";
        setTimeout(function(){
            alert("Player " + currentPlayer + " wins!");
        }, 100);
    } else if (checkWin(gameGrid, currentPlayer, true, true) == "draw" || checkWin(gameGrid, enemyPlayer, true, true) == "draw"){
        document.getElementById("currentPlayerText").textContent = "Draw!";
        setTimeout(function(){
            alert("Draw!");
        }, 100);
    }
    //console.log(highlightedTiles);
}

function mousePressed() { // this function is called when the mouse is pressed, it is used to for selecting and moving pieces
    let x = Math.floor(mouseX / baseSize); // this gets the tile that the player clicked on
    let y = Math.floor(mouseY / baseSize);
    let moveSelected = false;
    let selected = { x: 0, y: 0 };
    for (let i = 0; i < availableMoves.length; i++) {
        if (x == availableMoves[i][0] && y == availableMoves[i][1]) { // this is for moving a piece, it checks if the player clicked on a tile that is available for the selected piece
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
            let takenPiece = null;
            if (gameGrid[y][x] != null){
                takenPiece = [gameGrid[y][x].type, gameGrid[y][x].player, gameGrid[y][x].numMoves];
            }
            gameGrid[y][x] = gameGrid[selected.y][selected.x];
            gameGrid[y][x].x = x;
            gameGrid[y][x].y = y;
            gameGrid[y][x].numMoves++;
            gameGrid[selected.y][selected.x] = null;
            availableMoves = [];
            if(gameGrid[y][x].type == "Pawn" && (y == 0 || y == 7)){
                let queen = new Queen(x, y, currentPlayer == "white" ? 1 : 2);
                gameGrid[y].splice(x, 0);
                gameGrid[y].splice(x, 1, queen);
            }else if(gameGrid[y][x].type == "Pawn"){
                if (Math.abs(y - selected.y) == 2){
                    gameGrid[y][x].movedTwoTiles = true;
                }
            }
            if (specialMoves.length > 0){
                for (let j = 0; j < specialMoves.length; j++){
                    if (specialMoves[j][0] == x && specialMoves[j][1] == y && gameGrid[y][x].type == 'Pawn'){
                        if (gameGrid[y][x].player == 2){
                            gameGrid[y - 1][x] = null;
                        }else{
                            gameGrid[y + 1][x] = null;
                        }
                    }
                    if (specialMoves[j][0] == x && specialMoves[j][1] == y && gameGrid[y][x].type == "King"){
                        if (x == 6){
                            gameGrid[y][5] = new Rook(5, y, gameGrid[y][x].player);
                            gameGrid[y][5].numMoves = 1;
                            gameGrid[y].splice(7, 1);
                            gameGrid[y].splice(7, 0, null);
                        }else{
                            gameGrid[y][3] = new Rook(3, y, gameGrid[y][x].player);
                            gameGrid[y][3].numMoves = 1;
                            gameGrid[y].splice(0, 1);
                            gameGrid[y].splice(0, 0, null);
                        }
                    }
                }
            }
            specialMoves = [];
            highlightedTiles = [];
            checkedKing = [];
            currentPlayer = currentPlayer == "white" ? "black": "white";
            document.getElementById("currentPlayerText").textContent = "Current Player: " + currentPlayer;
            if (numberOfPieces(gameGrid, "white")){
                faze[0] = "late";
            }
            if(numberOfPieces(gameGrid, "black")){
                faze[1] = "late";
            }
            if (enemy == "bot"){
                //console.log(highlightedTiles);
                setTimeout(function(){
                    enemyDecision();
                }, 50); // there has to be some delay to allow the board on the page to update
                //console.log(t);
                //console.log("here");
            }
            //console.log(currentPlayer);
            setTimeout(function(){ // there has to be a timeout here because the bot would otherwise make a move that wouldnt be checked for a win or loss
                checkWinners();
                updateHistory(selected, [x, y], takenPiece);
            }, 100);
        }
    }
    let nP = currentPlayer == "white" ? 1 : 2;
    if (x < 8 && y < 8 && x >= 0 && y >= 0 && gameGrid[y][x] != null && !moveSelected && gameGrid[y][x].player == nP) { // this is for selecting a piece and displaying its available moves
        availableMoves = gameGrid[y][x].GetMoves(true);
        for (let j = 0; j < 8; j++) {
            for (let k = 0; k < 8; k++) {
                if (gameGrid[j][k] != null) {
                    gameGrid[j][k].selected = false;
                }
            }
        }
        gameGrid[y][x].selected = true;
    }else if (!moveSelected && availableMoves.length >= 0){ // this resets the selected piece if the player clicks on an empty tile
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

function draw() { // this is the main function of the game, it is called 60 times per second, it is predefined by p5.js
    drawTiles();
    drawPieces();
    drawNumbersLetters();
}
