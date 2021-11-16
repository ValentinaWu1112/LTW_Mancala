//alert("hello world!");
/*
 ___  ___  ___  ___  ___  ___  ___  ___
|   ||   ||   ||   ||   ||   ||   ||   |
|   ||12 ||11 ||10 || 9 || 8 || 7 ||   |
|   ||___||___||___||___||___||___||   |
|13 | ___  ___  ___  ___  ___  ___ | 6 |
|   ||   ||   ||   ||   ||   ||   ||   |
|   || 0 || 1 || 2 || 3 || 4 || 5 ||   |
|___||___||___||___||___||___||___||___|
*/

class Cavidade{
    constructor(numSeme){
        this.sementes = numSeme;
    }

    AddSemente(){
        this.sementes++;
    }
}

class Armazem extends Cavidade{
    constructor(){
        super(0);
    }
}

class Lado{
    constructor(numCavi, numSeme){
        this.cavidades = [];
        for(let i = 0; i < numCavi; i++){
            this.cavidades.push(new Cavidade(numSeme));
        }
        this.armazem = new Armazem();
    }
}

class Mancala {
    constructor(cavi = 6, seme = 4){
        this.numCavi = cavi;
        this.playerSide = new Lado(this.numCavi, seme);
        this.oponentSide = new Lado(this.numCavi, seme);
    }
    getplayerSide(){
        return this.playerSide;
    }

    Semear(cavidade){
        if(cavidade == this.numCavi || cavidade == this.numCavi * 2 + 1) {
            alert("Error, não se pode Semear Armazens");
        }
        if(cavidade > this.numCavi){
            //oponent move
            for(let i = 0; i < this.numCavi + 1; i++){

            }
        }
        if (cavidade < this.numCavi){
            //player move
            let quantidadeSementes = this.playerSide.cavidades[cavidade].sementes;
            let ondeSemear = cavidade + 1;

            while(quantidadeSementes > 0){
                alert("Entrou 65 " + ondeSemear + ": " + quantidadeSementes);
                if(ondeSemear == this.numCavi){ //Player's Armazem
                    this.playerSide.Armazem.AddSemente();
                }
                if(ondeSemear == this.numCavi * 2 + 1){ //Opponent's Armazem
                    this.oponentSide.Armazem.AddSemente();
                }
                if(ondeSemear > this.numCavi){ //Opponent Side
                    this.oponentSide.cavidades[12 - cavidade].AddSemente();
                }
                if(ondeSemear < this.numCavi){//Player Side
                    this.oponentSide.cavidades[cavidade].AddSemente();
                }
                
                ondeSemear++;
                if(ondeSemear > this.numCavi * 2 + 1){ //Opponent's Armazem
                    ondeSemear = 0;
                }
                quantidadeSementes--;
            }
        }
    }
}

//INUTIL
function Find(cavidade, manc) {
    for(let i = 0; i < manc.playerSide.size(); i++){
        if(cavidade == manc.playerSide[i]) return i;
    }
    for(let i = 0; i < manc.oponentSide.size(); i++){
        if(cavidade == manc.oponentSide[i]) return i + manc.playerSide[i].numCavi;
    }
    return -1;
}

jogo = new Mancala();
jogo.playerSide.cavidades[0].sementes = 2;
alert("cav 0: " + jogo.playerSide.cavidades[0].sementes);
alert("cav 1: " + jogo.playerSide.cavidades[1].sementes);
jogo.Semear(0);
alert("cav 0: " + jogo.playerSide.cavidades[0].sementes);
alert("cav 1: " + jogo.playerSide.cavidades[1].sementes);

//alert(jogo.numCavi);
