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
        
    }
    GetMoves(c,gameGrid) { // all classes have this function, it returns all possible moves for the piece
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



class Rook extends Piece {
    constructor(x, y, player) {
        super(x, y, player);
        this.type = "Rook";
        this.value = 3;
    }
    GetMoves(c,gameGrid) {
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



class Bishop extends Piece {
    constructor(x, y, player) {
        super(x, y, player);
        this.type = "Bishop";
        this.value = 3;
    }

    GetMoves(c, gameGrid) {
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



class Knight extends Piece {
    constructor(x, y, player){
        super(x, y, player);
        this.type = "Knight";
        this.value = 3;
    }
    GetMoves(c, gameGrid){
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



class King extends Piece {
    constructor(x, y, player){
        super(x, y, player);
        this.type = "King";
        this.value = 5;
    }
    GetMoves(c, gameGrid){
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
                            removeMoves.push(gameGrid[i][j].GetMoves(false, gameGrid));
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
                console.log(gameGrid[moves[m][1]][moves[m][0]]);
                console.log("---------");
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



class Queen extends Piece {
    constructor(x, y, player){
        super(x, y, player);
        this.type = "Queen";
        this.value = 4;
    }
    GetMoves(c, gameGrid){
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
class Node{ // this is used during the recursion, it is a representation of a move
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


// important global variables of the bot, scores for storing the values of each move during the recursion, and controlVariable that counts the number of tested moves, it is just for debugging since recursion is hard to debug
let controlVariable = 0;
let scores = [];
let controlScores = []; // this is used to store the scores of the moves
let winningDepth = 10000000000000; // this is used to store the depth of the winning move to prevent extra recursion
let gameGrid = []; // this is a copy of the real grid, it is used for the calculations
let nodes = []; // this is used to store the nodes of the moves
let whosBot = 1; // this is used to determine which player is the bot
let currentPlayer = "white"; // this is used to determine which player is playing
let faze = ["early", "early"]; // this is used to determine the faze of the game, it is used to determine which table to use for the evaluation of the pieces
// currently doesnt do anything, but it is here for future use
let specialMoves = [];
onmessage = function (data) {
    console.log(data)
    specialMoves = [];
    /*for (let i = 0; i < gameGrid.length; i++){
        cpGrid.push([]);
        for (let j = 0; j < gameGrid[i].length; j++){
            if (gameGrid[i][j] != null){
                cpGrid[i].push([gameGrid[i][j].type, gameGrid[i][j].player, gameGrid[i][j].numMoves]);
            }else{
                cpGrid[i].push(null);
            }
        }
    }*/
    gameGrid = [];
    for (let i = 0; i < 8; i++){
        gameGrid.push([]);
        for (let j = 0; j < 8; j++){
            console.log(data.data[0][i][j]);
            if (data.data[0][i][j] != null){
                let type = data.data[0][i][j][0];
                let player = data.data[0][i][j][1];
                let numMoves = data.data[0][i][j][2];
                let x = j;
                let y = i;
                if (type == "Pawn"){
                    gameGrid[i].push(new Pawn(x, y, player));
                }else if (type == "Rook"){
                    gameGrid[i].push(new Rook(x, y, player));
                }else if (type == "Bishop"){
                    gameGrid[i].push(new Bishop(x, y, player));
                }else if (type == "Knight"){
                    gameGrid[i].push(new Knight(x, y, player));
                }else if (type == "King"){
                    gameGrid[i].push(new King(x, y, player));
                }else if (type == "Queen"){
                    gameGrid[i].push(new Queen(x, y, player));
                }
                console.log("piece created: " + gameGrid[i][j]);
                gameGrid[i][j].numMoves = numMoves;
                /*gameGrid[i][j].player = player;
                gameGrid[i][j].x = x;
                gameGrid[i][j].y = y;*/
            }else{
                gameGrid[i].push(null);
            }
        }
    }
    whosBot = data.data[1];
    currentPlayer = whosBot == 1 ? "white" : "black";
    let bestMove = main();
    //let bestMove = [0, 1, 0, 3];
    console.log("its here");
    console.log(gameGrid);
    postMessage(bestMove);
}

function main(){
    let bestMove = [];
    // 3 is a good balance of speed and like playability??? of the bot
    let desiredDepth = 3; // this is the most important variable for the bot, it determines how deep the recursion will go, the higher the number the better the bot will be
    // current maximum is 4, its not really simple to go further since websites can only run on a single thread and because at level 4 its already 160 000 possible move combinations
    /*if (numberOfPieces(gameGrid, "white") + numberOfPieces(gameGrid, "black") < 20){
        desiredDepth = 3;
    }else{
        desiredDepth = 2;
    }*/
    console.log("main fuction called");
    winningDepth = 10000000000000;
    scores = [];
    nodes = [];
    let num = 0;
    for (let i = 0; i < 8; i++){ // this loop fils up the scores with possible moves, because only the first round of moves actually need scoring, the other moves after them just simply give their score to one of these moves
        for (let j = 0; j < 8; j++){
            if (gameGrid[i][j] != null && gameGrid[i][j].player == whosBot){
                let moves = gameGrid[i][j].GetMoves(true, gameGrid);
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
            }else if (checkWin(gameGrid, whosBot == 1 ? "white":"black", false, true) == "win" || checkWin(gameGrid, whosBot == 1 ? "black":"white", false, true) == "draw"){
                endingMove = true;
                value = parseInt(parseFloat(value - 10000000) * 100) / 100;
            }
            let n = new Node(currentPlayer, 1, null, value);
            nodes.push([i, n]);
            if (!endingMove && 1 < desiredDepth && 1 < winningDepth){ // if the move isnt a move that would cause a loss or a win imeadiately, the recursive function is called, it will run until it reaches the desired depth of search
                recursiveFunc(gameGrid, currentPlayer, 1,  desiredDepth,n);
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
        let changedNodes = resNodes();
        console.log("changed nodes");
        bestMove = ideaFunc(nodes, desiredDepth, changedNodes[0], desiredDepth);

    }
    
    return bestMove;
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
    let kingMoves = king.GetMoves(true, grid);
    kingMoves.push([king.x, king.y]);
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (grid[i][j] != null && grid[i][j].player != nP){ // this part of the code is used to get all the moves of the enemy pieces and the piece that is currently checking the king
                let currentAddedMoves = [];
                currentAddedMoves.push(grid[i][j].GetMoves(false, grid));
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
                if (grid[i][j].GetMoves(true, grid).length != 0){
                    numOfAlliedPieces++;
                }
            }
        }
    }
    if (checkingPiece != null){ // this part of the code is used to remove the moves of the checking piece from kings moves
        let cMoves = [];
        cMoves = checkingPiece.GetMoves(false, grid);
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
                    let moves = grid[i][j].GetMoves(true, grid);
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
                    moves.push(grid[i][j].GetMoves(false, gameGrid));
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
    console.log("ideaFuncs best move:" + bestMove);
    return bestMove;
}

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
                let moves = grid[i][j].GetMoves(true, grid);
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
