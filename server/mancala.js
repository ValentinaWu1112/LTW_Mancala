module.exports.Mancala = class Mancala {
    constructor(ini_size, ini_seeds, P1, P2){
        this.turn = P1;
        this.sides = Array(2);


        this.sides[0] = P1;
        this.sides[1] = P2;

        this.sides = {
            P1: {
                store : 0,
                pits : [ini_seeds],
            },

            P2: {
                store : 0,
                pits : [ini_seeds],
            }
        }


        
        /*
        this.sides[0] = Array(ini_size);
        this.sides[0].store = 0;
        this.sides[1] = Array(ini_size);
        this.sides[1].store = 0;
        for(let i = 0; i < ini_size; i++){
            this.sides[0][i] = ini_seeds;
            this.sides[1][i] = ini_seeds;
        }
        */
    }
}

