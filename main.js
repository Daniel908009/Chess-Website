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
        if (this.player == 1) {
            if (this.y + 1 < 8 && gameGrid[this.y + 1][this.x] == null) {
                moves.push([this.x, this.y + 1]);
                if (this.numMoves == 0 && this.y +2 < 8 && gameGrid[this.y + 2][this.x] == null){
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
                specialMoves.push([this.x - 1, this.y + 1]);
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
                            if(gameGrid[i][j].player == 1){
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
let faze = "early";

function changeScenario(){ // function for changing scenarios
    scenario = document.getElementById("scenario").selectedIndex;
    resetGame();
}

let gameGridLayout = [[ // this is the layout of the game, the 1 and 2 represent the players that own the pieces
    [[Rook, 1], [Knight, 1], [Bishop, 1], [Queen, 1], [King, 1], [Bishop, 1], [Knight, 1], [Rook, 1]],
    [[Pawn, 1],[Pawn, 1],[Pawn, 1],[Pawn, 1],[Pawn, 1],[Pawn, 1],[Pawn, 1],[Pawn, 1]],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [[Pawn, 2],[Pawn, 2],[Pawn, 2],[Pawn, 2],[Pawn, 2],[Pawn, 2],[Pawn, 2],[Pawn, 2]],
    [[Rook, 2], [Knight, 2], [Bishop, 2], [Queen, 2], [King, 2], [Bishop, 2], [Knight, 2], [Rook, 2]],
], "white"];

let checkmateScenarioBlack = [[ // this is a layout used for testing the bots decision making
    [null, null, null, null, null, null, null, null],
    [null, [King, 1], null, null, null, null, [Rook, 2], null],
    [[Rook, 2], null, null, null, null, null, null, null],
    [[Rook, 2], null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, [King, 2]],
], "white"];

let checkmateScenarioWhite = [[ // this is the same as blacks checkmate but reversed
    [null, null, null, null, null, null, null, null],
    [null, [King, 2], null, null, null, null, [Rook, 1], null],
    [[Rook, 1], null, null, null, null, null, null, null],
    [[Rook, 1], null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, [King, 1]],
], "black"];


let gameGrid = []; // this is the actual game grid used in the game
for (let i = 0; i < 8; i++) {
    gameGrid.push([]);
    for (let j = 0; j < 8; j++) {
        gameGrid[i].push(null);
    }
}

// important variable that for reason needed to be globalized
let availableMoves = [];
let specialMoves = [];
let currentPlayer = "white";
let baseSize = 0;
let moveHistory = [];
let historyOffset = 0;
let enemy = "player";

function Undo(){ // function for undoing the a move
    if (moveHistory.length - historyOffset > 1){
        historyOffset++;
        if (moveHistory.length - historyOffset < 0){
            historyOffset--;
            return;
        }
        let movedPiece = null;
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                let t = moveHistory.length - historyOffset - 1;
                if (moveHistory[t][0][i][j] != null){
                    gameGrid[i][j] = moveHistory[t][0][i][j];
                    gameGrid[i][j].x = j;
                    gameGrid[i][j].y = i;
                    movedPiece = gameGrid[i][j];
                }else{
                    gameGrid[i][j] = null;
                }
            }
        }
        moveHistory[moveHistory.length - historyOffset][1].numMoves--;
        currentPlayer = currentPlayer == "white" ? "black" : "white";
        document.getElementById("currentPlayerText").textContent = "Current Player: " + currentPlayer;
        highlightTiles(movedPiece);
    }
}

function Redo(){ // function for redoing a move
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
        } catch{}
        currentPlayer = currentPlayer == "white" ? "black" : "white";
        oppositePlayer = currentPlayer == "white" ? "black" : "white";
        if (checkWin(gameGrid, currentPlayer) == "win"){
            document.getElementById("currentPlayerText").textContent = "Player " + oppositePlayer + " wins!";
        }else if (checkWin(gameGrid, currentPlayer) == "draw"){
            document.getElementById("currentPlayerText").textContent = "Draw!";
        }else{
            document.getElementById("currentPlayerText").textContent = "Current Player: " + currentPlayer;
        }
    }
}

function importGame(){ // function for importing games from a json file
    console.log("importing");
    let file = document.getElementById("import").files[0];
    if (file.type != "application/json"){
        alert("Please select a json file");
        return;
    }
    // this will be done later
}

function exportGame(){ // function for exporting the game to a json file
    //console.log("exporting");
    let name = document.getElementById("name").value;
    if (name == ""){
        name = "game";
    }
    let convertedGrid = []; // the gameGrid is converted to a format that can be exported to a json file
    let convertedHistory = []; // same for the moveHistory
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
    //console.log(moveHistory);
    for (let i = 0; i < moveHistory.length; i++){
        if (moveHistory[i][1] == null){
            convertedHistory.push([[moveHistory[i][0].type, moveHistory[i][0].player, moveHistory[i][0].numMoves, moveHistory[i][0].value], null]);
            continue;
        }
        convertedHistory.push([[moveHistory[i][0].type, moveHistory[i][0].player, moveHistory[i][0].numMoves, moveHistory[i][0].value], [moveHistory[i][1].type, moveHistory[i][1].player, moveHistory[i][1].numMoves, moveHistory[i][1].value]]);
    }
    let game = {
        "convertedGrid": convertedGrid,
        "currentPlayer": currentPlayer,
        "convertedHistory": convertedHistory,
        "historyOffset": historyOffset,
        "faze": faze,
        "enemy": enemy,
        "name": name
    };
    console.log(game);
    let json = JSON.stringify(game);
    let link = document.createElement('a');
    let blob = new Blob([json], {type: "application/json"});
    link.href = URL.createObjectURL(blob);
    link.download = name + ".json";
    //return;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function changeMode(){ // function for changing the enemy from player to bot and the other way around
    if (document.getElementById("btnradio1").checked){
        enemy = "player";
        document.getElementById("undoRedo").innerHTML = '<button class="btn-lg btn-primary w-50" id="undo" onclick="Undo()">Undo</button><button class="btn-lg btn-primary w-50" id="redo" onclick="Redo()">Redo</button>';
    }else{
        enemy = "bot";
        document.getElementById("undoRedo").innerHTML = "";
    }
    resetGame();
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

function findBestMove(scores){ // this function finds the best move for the bot from the scores array, that is generated in the enemyDecision function
    let bestMove = [];
    let bestScore = -1000000;
    for (let i = 0; i < scores.length; i++){
        if (scores[i][2] > bestScore){
            bestScore = scores[i][2];
            bestMove = [scores[i][0], scores[i][1], scores[i][3], scores[i][4]];
        }
        
    }
    if (bestScore == 0){
        let rand = Math.floor(Math.random() * scores.length);
        bestMove = [scores[rand][0], scores[rand][1], scores[rand][3], scores[rand][4]];
        console.log("random move");
    }
    
    return bestMove;
}

function valuePlayersPieces(grid, player){ // this function is used by the bot to evaluate the value of the board
    let value = 0;
    let nP = player == "white" ? 1 : 2;
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (grid[i][j] != null && grid[i][j].player == nP){
                value += grid[i][j].value;
                for (let k = 0; k < tableOfTables.length; k++){
                    if (grid[i][j].type != "King" && grid[i][j].type == tableOfTables[k][0]){
                        value = value + tableOfTables[k][grid[i][j].player][i][j]/100;
                    }else if (faze == "early"){
                        value = value + tableOfTables[k][grid[i][j].player][i][j]/100;
                    }else if (faze == "late"){
                        value = value + tableOfTables[k][grid[i][j].player + 2][i][j]/100;
                    }
                }
            }
        }
    }
    return value;
}

// two important global variables of the bot, scores for storing the values of each move during the recursion, and controlVariable that counts the number of tested moves, it is just for debugging since recursion is hard to debug
let controlVariable = 0;
let scores = [];

function recursiveFunc(grid, player, depth, desiredDepth, scorePos){ // this is a recursive function used by the bot to evaluate moves of the board
    // this is all still under construction and can only be tested in a safe enviroment
    let originalPlayer = player;
    player = player == "white" ? "black" : "white";
    let nP = player == "white" ? 1 : 2;
    let allMoveOptions = [];
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (grid[i][j] != null && grid[i][j].player == nP){
                let moves = grid[i][j].GetMoves(true);
                if (moves.length != 0){
                    allMoveOptions.push([grid[i][j], moves]);
                }
            }
        }
    }
    for (let i =0; i < allMoveOptions.length; i++){
        for (let j = 0; j < allMoveOptions[i][1].length; j++){
            controlVariable++;
            let movedPiece = allMoveOptions[i][0];
            let oX = movedPiece.x;
            let oY = movedPiece.y;
            let losingMove = false;
            let tInPlace = grid[allMoveOptions[i][1][j][1]][allMoveOptions[i][1][j][0]];
            grid[movedPiece.y].splice(movedPiece.x, 0);
            grid[movedPiece.y].splice(movedPiece.x, 1, null);
            let newX = allMoveOptions[i][1][j][0];
            let newY = allMoveOptions[i][1][j][1];
            grid[newY].splice(newX, 0);
            grid[newY].splice(newX, 1, movedPiece);
            grid[newY][newX].x = newX;
            grid[newY][newX].y = newY;
            if (checkWin(grid, "white") == "win"){
                scores[scorePos][2] += parseInt(10000 - depth*1000);
            }else if(checkWin(grid, "black") == "win" || checkWin(grid, "white") == "draw"){
                scores[scorePos][2] -= parseInt(10000 - depth*1000);
                losingMove = true;
            }
            if (depth < desiredDepth && !losingMove){
                recursiveFunc(grid, player, depth + 1, desiredDepth, scorePos);
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
}

function makeMove(move){ // this function is used by the bot to make the selected move
    // still under construction
    let movingPiece = gameGrid[move[0]][move[1]];
    gameGrid[move[3]].splice(move[2], 0);
    gameGrid[move[3]].splice(move[2], 1, movingPiece);
    gameGrid[move[3]][move[2]].x = move[2];
    gameGrid[move[3]][move[2]].y = move[3];
    gameGrid[move[0]].splice(move[1], 0);
    gameGrid[move[0]].splice(move[1], 1, null);
    if (movingPiece.type == "Pawn" && (move[3] == 0 || move[3] == 7)){
        gameGrid[move[3]].splice(move[2], 0);
        gameGrid[move[3]].splice(move[2], 1, new Queen(move[2], move[3], movingPiece.player));
    }
    movingPiece.numMoves++;
}

function enemyDecision(){ // this is the main function of the bot, it is called when its bots turn
    // under construction
    let bestMove = [];
    let desiredDepth = 2;
    scores = [];
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
    for (let i = 0; i < scores.length; i++){ // one loop of the recursive function is basically here because the places for each moves score need to be asigned a place in the scores variable
        let movingPiece = gameGrid[scores[i][0]][scores[i][1]];
        let oX = movingPiece.x;
        let oY = movingPiece.y;
        let tInPlace = gameGrid[scores[i][4]][scores[i][3]];
        let losingMove = false;
        gameGrid[movingPiece.y].splice(movingPiece.x, 0);
        gameGrid[movingPiece.y].splice(movingPiece.x, 1, null);
        gameGrid[scores[i][4]].splice(scores[i][3], 0);
        gameGrid[scores[i][4]].splice(scores[i][3], 1, movingPiece);
        gameGrid[scores[i][4]][scores[i][3]].x = scores[i][3];
        gameGrid[scores[i][4]][scores[i][3]].y = scores[i][4];
        if (checkWin(gameGrid, "white") == "win"){
            scores[i][2] = parseInt(scores[i][2] + 10000);
        }else if (checkWin(gameGrid, "black") == "win" || checkWin(gameGrid, "white") == "draw"){
            scores[i][2] = parseInt(scores[i][2] - 10000);
            console.log("losing move");
            losingMove = true;
        }
        if (!losingMove){
            recursiveFunc(gameGrid, currentPlayer, 0,  desiredDepth-1, i);
        }

        gameGrid[scores[i][4]].splice(scores[i][3], 0);
        gameGrid[scores[i][4]].splice(scores[i][3], 1, tInPlace);
        gameGrid[oY].splice(oX, 0);
        gameGrid[oY].splice(oX, 1, movingPiece);
        gameGrid[oY][oX].x = oX;
        gameGrid[oY][oX].y = oY;
    }
    console.log(controlVariable);
    controlVariable = 0;
    console.log(scores);
    bestMove = findBestMove(scores);
    console.log(bestMove);
    makeMove(bestMove);
    if (checkWin(gameGrid, currentPlayer) == "win"){
        setTimeout(function(){alert("You won")}, 100);
    }else if(checkWin(gameGrid, currentPlayer) == "draw"){
        setTimeout(function(){alert("Draw!")}, 100);
    }else if (checkWin(gameGrid, currentPlayer == "white" ? "black" : "white") == "win"){
        setTimeout(function(){alert("You lost")}, 100);
    }else if (checkWin(gameGrid, currentPlayer == "white" ? "black" : "white") == "draw"){
        setTimeout(function(){alert("Draw!")}, 100);
    }
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

function removeLostMoves(moves, player, movingPiece){ // this function is used to remove moves of a piece that would put the pieces king in check, it is called by every pieces GetMoves function except kings
    let answer = [];
    for (let i = 0; i < moves.length; i++){
        gameGrid[movingPiece.y][movingPiece.x] = null;
        let tilePiece = gameGrid[moves[i][1]][moves[i][0]];
        gameGrid[moves[i][1]][moves[i][0]] = movingPiece;
        if (checkCheck(gameGrid, player)){
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
                return true;
            }
        }
    }
    return false;
}

let highlightedTiles = []; // this is used in the checkWin function and it is used to let player know how to get out of check
let checkedKing = []; // this is used for highlighting the king that is in check

function highlightTiles(checkingPiece){ // this function highlights the tiles that the player can move to in order to get out of check
    highlightedTiles = [];
    checkedKing = [];
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (gameGrid[i][j] != null && gameGrid[i][j].player != checkingPiece.player){
                let moves = gameGrid[i][j].GetMoves(false);
                if(gameGrid[i][j].type == "King"){
                    checkedKing = [i, j];
                }
                for (let k = 0; k < moves.length; k++){
                    if (moves[k][0] == checkingPiece.x && moves[k][1] == checkingPiece.y){
                        highlightedTiles.push([i, j]);
                    }
                }
            }
        }
    }
}

function checkWin(grid, player){ // this function checks if a player has won, it is used in the actual game and in the bots decision making, it doesnt return true or false because there is a third option - draw
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
            if (gameGrid[i][j] != null && gameGrid[i][j].player == nP && gameGrid[i][j].type != "King"){
                numOfAlliedPieces++;
            }
        }
    }
    if (checkingPiece != null){
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
                if (gameGrid[i][j] != null && gameGrid[i][j].player == nP){
                    let moves = gameGrid[i][j].GetMoves(true);
                    for (let k = 0; k < moves.length; k++){
                        let tempPiece = gameGrid[i][j];
                        let movingPiece = gameGrid[moves[k][1]][moves[k][0]];
                        gameGrid[moves[k][1]].splice(moves[k][0], 0);
                        gameGrid[moves[k][1]].splice(moves[k][0], 1, gameGrid[i][j]);
                        gameGrid[i].splice(j, 0);
                        gameGrid[i].splice(j, 1, null);
                        if (!checkCheck(gameGrid, nP)){
                            gameGrid[tempPiece.y].splice(tempPiece.x, 0);
                            gameGrid[tempPiece.y].splice(tempPiece.x, 1, tempPiece);
                            gameGrid[moves[k][1]].splice(moves[k][0], 0);
                            gameGrid[moves[k][1]].splice(moves[k][0], 1, movingPiece);
                            highlightTiles(checkingPiece);
                            return "no winner";
                        }
                        gameGrid[tempPiece.y].splice(tempPiece.x, 0);
                        gameGrid[tempPiece.y].splice(tempPiece.x, 1, tempPiece);
                        gameGrid[i].splice(j, 0);
                        gameGrid[i].splice(j, 1, gameGrid[moves[k][1]][moves[k][0]]);
                        gameGrid[moves[k][1]].splice(moves[k][0], 0);
                        gameGrid[moves[k][1]].splice(moves[k][0], 1, null);
                    }
                }
            }
        }
        if (kingMoves.length != 0 && kingMoves[0][0] == king.x && kingMoves[0][1] == king.y){
            return "draw";
        }
        if (kingMoves.length == 0){
            return "win";
        }
    }
    if(checkingPiece != null){
        highlightTiles(checkingPiece);
    }
    return "no winner";
}

function updateHistory(lastMovedPiece){ // this function is used to update the move history, it is called after every move, and its used for the undo and redo functions
    let temp = [];
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

function resetGame(){ // this function is used to reset the game, it is called when the game is started and when the reset button is pressed
    gameGrid = [];
    moveHistory = [];
    document.getElementById("currentPlayerText").textContent = "Current Player: " + currentPlayer;
    availableMoves = [];
    specialMoves = [];
    highlightedTiles = [];
    checkedKing = [];
    faze = "early";
    for (let i = 0; i < 8; i++){
        gameGrid.push([]);
        for (let j = 0; j < 8; j++){
            gameGrid[i].push(null);
        }
    }
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if (gameGridLayout[0][y][x] != null && scenario == 0) {
                gameGrid[y][x] = new gameGridLayout[0][y][x][0](x, y, gameGridLayout[0][y][x][1]);
                currentPlayer = gameGridLayout[1];
            }else if (checkmateScenarioBlack[0][y][x] != null && scenario == 1){
                gameGrid[y][x] = new checkmateScenarioBlack[0][y][x][0](x, y, checkmateScenarioBlack[0][y][x][1]);
                currentPlayer = checkmateScenarioBlack[1];
            }else if (checkmateScenarioWhite[0][y][x] != null && scenario == 2){
                gameGrid[y][x] = new checkmateScenarioWhite[0][y][x][0](x, y, checkmateScenarioWhite[0][y][x][1]);
                currentPlayer = checkmateScenarioWhite[1];
            }
        }
    }
    updateHistory(null);
}

function setup() { // simple setup function that creates the canvas and calls the resetGame function to fill in the new game grid
    width = windowWidth * 0.8;
    height = windowHeight * 0.8;
    size = width > height ? height : width;
    canvas = createCanvas(size, size);
    baseSize = height / 8;
    canvas.parent('chessboard');
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

function mousePressed() { // this function is called when the mouse is pressed, it is used to for selecting and moving pieces
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
            availableMoves = [];
            if(gameGrid[y][x].type == "Pawn" && (y == 0 || y == 7)){
                gameGrid[y][x] = new Queen(x, y, currentPlayer == "white" ? 1 : 2);
            }else if(gameGrid[y][x].type == "Pawn"){
                if (Math.abs(y - selected.y) == 2){
                    gameGrid[y][x].movedTwoTiles = true;
                }
            }
            if (specialMoves.length > 0){
                for (let j = 0; j < specialMoves.length; j++){
                    if (specialMoves[j][0] == x && specialMoves[j][1] == y && gameGrid[y][x].type == 'Pawn'){
                        if (gameGrid[y][x].player == 1){
                            gameGrid[y - 1][x] = null;
                        }else{
                            gameGrid[y + 1][x] = null;
                        }
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
            specialMoves = [];
            highlightedTiles = [];
            checkedKing = [];
            currentPlayer = currentPlayer == "white" ? "black": "white";
            enemyPlayer = currentPlayer == "white" ? "black" : "white";
            document.getElementById("currentPlayerText").textContent = "Current Player: " + currentPlayer;
            if (numberOfPieces(gameGrid, "white") < 10 && numberOfPieces(gameGrid, "black") < 10){
                faze = "late";
            }
            if (checkWin(gameGrid, currentPlayer) == "win"){
                document.getElementById("currentPlayerText").textContent = "Player " + enemyPlayer + " wins!";
                setTimeout(function(){
                    alert("Player " + enemyPlayer + " wins!");
                }, 100);
            } else if (checkWin(gameGrid, currentPlayer) == "draw"){
                document.getElementById("currentPlayerText").textContent = "Draw!";
                setTimeout(function(){
                    alert("Draw!");
                }, 100);
            }
            updateHistory(gameGrid[y][x]);
            if (enemy == "bot" && currentPlayer == "black"){
                enemyDecision();
                currentPlayer = "white";
                document.getElementById("currentPlayerText").textContent = "Current Player: " + currentPlayer;
            }
        }
    }
    let nP = currentPlayer == "white" ? 1 : 2;
    if (x < 8 && y < 8 && x >= 0 && y >= 0 && gameGrid[y][x] != null && !moveSelected && gameGrid[y][x].player == nP) {
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
    console.log(valuePlayersPieces(gameGrid, "white"));
}

function draw() { // this is the main function of the game, it is called 60 times per second, it is predefined by p5.js
    drawTiles();
    drawPieces();
}
