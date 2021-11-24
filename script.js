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

function CreateSementeHTML(cav, num, seed){
    //create semente
    let seme = document.createElement("div");
    seme.classList.add("Semente");

    //random rotation
    let ang = Math.random() * 360;
    seme.style.transform = "rotate("+ ang + "deg)";

    //random horizontal position
    let horiPos = Math.random() * 25 - 12.5; 
    seme.style.left = horiPos + "px";

    //random vertical position
    let vertPos = Math.random() * 10 + 1.25 * num_sementes - 4 * num; //Porquê 4 * index perguntas? idk mas fica bem
    seme.style.top = vertPos + "px";

    //random color
    //let colo = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
    //let colorstr = "rgb(" + colo[0] + ", " + colo[1] + ", " + colo[2] + ")";
    seme.style.background = "linear-gradient(45deg, " + seed.getStr() + " 40%, white 80%, " + seed.getStr() + " 100%)";

    cav.appendChild(seme);
}

class Semente {
    constructor(colo){
        this.colors = colo;
    }

    getStr(){
        return "rgb(" + this.colors[0] + ", " + this.colors[1] + ", " + this.colors[2] + ")";
    }
}

class Cavidade {
    constructor(numSeme) {
        this.sementes = []
        for(let i = 0; i < numSeme; i++){
            this.sementes.push(new Semente([Math.random() * 255, Math.random() * 255, Math.random() * 255]));
        }
    }

    get sements() {
        return this.sementes;
    }

    AddSemente(seed) {
        this.sementes.push(seed);
    }

    RemoveSemente(seed) {
        for(let i = 0; i < this.sementes.length; i++){
            if(seed.getStr === this.sementes[i].getStr){
                this.sementes.splice(i, 1);
                break;
            }
        }
    }
}

class Armazem extends Cavidade {
    constructor() {
        super(0);
    }
}

class Lado {
    constructor(numCavi, numSeme) {
        this.cavidades = [];
        for (let i = 0; i < numCavi; i++) {
            this.cavidades.push(new Cavidade(numSeme));
        }
        this.armazem = new Armazem();
    }
}

class Mancala {
    constructor(cavi = 6, seme = 4) {
        this.numCavi = cavi;
        this.numSeme = seme
        this.playerSide = new Lado(this.numCavi, this.numSeme);
        this.oponentSide = new Lado(this.numCavi, this.numSeme);
        this.CreateGameHTML();
    }

    Semear(cavidade) {
        //shouldn't even be used
        if (cavidade == this.numCavi || cavidade == this.numCavi * 2 + 1) {
            alert("Error, não se pode Semear Armazens");
        }
        else if (cavidade > this.numCavi) {
            //oponent move
            let seedsToSow = this.oponentSide.cavidades[12 - cavidade].sements;
            let quantidadeSementes = seedsToSow.length;
            this.oponentSide.cavidades[12 - cavidade].sementes = [];
            let ondeSemear = cavidade + 1;

            while (quantidadeSementes > 0) {
                if (ondeSemear == this.numCavi) { //Player's Armazem
                    this.playerSide.armazem.AddSemente(seedsToSow.pop());
                }
                if (ondeSemear == this.numCavi * 2 + 1) { //Opponent's Armazem
                    this.oponentSide.armazem.AddSemente(seedsToSow.pop());
                }
                if (ondeSemear > this.numCavi) { //Opponent Side
                    this.oponentSide.cavidades[12 - ondeSemear].AddSemente(seedsToSow.pop());
                }
                if (ondeSemear < this.numCavi) { //Player Side
                    this.playerSide.cavidades[ondeSemear].AddSemente(seedsToSow.pop());
                }

                ondeSemear++;
                if (ondeSemear > this.numCavi * 2 + 1) { //Opponent's Armazem
                    ondeSemear = 0;
                }
                quantidadeSementes--;
            }
        }
        else if (cavidade < this.numCavi) {
            //player move
            let seedsToSow = this.playerSide.cavidades[cavidade].sements;
            let quantidadeSementes = seedsToSow.length;
            this.playerSide.cavidades[cavidade].sementes = [];
            let ondeSemear = cavidade + 1;

            while (quantidadeSementes > 0) {
                if (ondeSemear == this.numCavi) { //Player's Armazem
                    this.playerSide.armazem.AddSemente(seedsToSow.pop());
                }
                if (ondeSemear == this.numCavi * 2 + 1) { //Opponent's Armazem
                    this.oponentSide.armazem.AddSemente(seedsToSow.pop());
                }
                if (ondeSemear > this.numCavi) { //Opponent Side
                    this.oponentSide.cavidades[12 - ondeSemear].AddSemente(seedsToSow.pop());
                }
                if (ondeSemear < this.numCavi) { //Player Side
                    this.playerSide.cavidades[ondeSemear].AddSemente(seedsToSow.pop());
                }

                ondeSemear++;
                if (ondeSemear > this.numCavi * 2 + 1) { //Opponent's Armazem
                    ondeSemear = 0;
                }
                quantidadeSementes--;
            }
        }
    }

    CreateGameHTML(){
        //oponent side
        for(let c = 0; c < this.numCavi; c++){
            let cav = document.createElement("div");
            cav.classList.add("Cavidade");

            for(let s = 0; s < this.numSeme; s++){
                CreateSementeHTML(cav, s, this.oponentSide.cavidades[c].sementes[s]);
            }
            document.getElementsByClassName("OponentRow")[0].appendChild(cav);
        }

        //player side
        for(let c = 0; c < this.numCavi; c++){
            let cav = document.createElement("div");
            cav.classList.add("Cavidade");

            for(let s = 0; s < this.numSeme; s++){
                CreateSementeHTML(cav, s, this.playerSide.cavidades[c].sementes[s]);
            }
            document.getElementsByClassName("PlayerRow")[0].appendChild(cav);
        }
    }

    ClearGameHTML(){
        //clearing the previous board
        let opRow = document.getElementsByClassName("OponentRow")[0];
        while(opRow.firstChild){
            opRow.removeChild(opRow.firstChild);
        }
        let plRow = document.getElementsByClassName("PlayerRow")[0];
        while(plRow.firstChild){
            plRow.removeChild(plRow.firstChild);
        }
    }

    UpdateGameInitialHTML(){
        this.ClearGameHTML();

        this.numSeme = num_sementes;
        this.numCavi = num_cavidades;
        this.playerSide = new Lado(this.numCavi, this.numSeme);
        this.oponentSide = new Lado(this.numCavi, this.numSeme);
        
        this.CreateGameHTML();
    }

    UpdateGameMiddleHTML(){
        //oponent side
        for(let c = 0; c < this.numCavi; c++){
            let seedsHTML = document.getElementById("oponent_row").children[c].children;
            let numseedsJS = this.oponentSide.cavidades[c].sements.length;
            if(seedsHTML.length == numseedsJS){
                //same size do nothing
                continue;
            }
            let cavHTML = document.getElementById("oponent_row").children[c];
            //removing all
            while(cavHTML.firstChild){
                cavHTML.removeChild(cavHTML.firstChild);
            }
            if(numseedsJS == 0) continue;
            //Adding the ones that should be there
            for(let s = 0; s < numseedsJS; s++){
                CreateSementeHTML(cavHTML, s, this.oponentSide.cavidades[c].sementes[s]);
            }
            continue;
        }

        //player side
        for(let c = 0; c < this.numCavi; c++){
            let seedsHTML = document.getElementById("player_row").children[c].children;
            let numseedsJS = this.playerSide.cavidades[c].sements.length;
            if(seedsHTML.length == numseedsJS){
                //same size do nothing
                continue;
            }
            let cavHTML = document.getElementById("player_row").children[c];
            //removing all
            while(cavHTML.firstChild){
                cavHTML.removeChild(cavHTML.firstChild);
            }
            if(numseedsJS == 0) continue;
            //Adding the ones that should be there
            for(let s = 0; s < numseedsJS; s++){
                CreateSementeHTML(cavHTML, s, this.playerSide.cavidades[c].sementes[s]);
            }
            continue;
        }
    }
}

let lastZ = 0;
function toggle_visibility(id) {
    var e = document.getElementById(id);
    if (e.style.display === "block"){
        e.style.display = "none";
        e.style.zIndex = 0;
    }
    else{
        e.style.display = "block";
        lastZ++;
        e.style.zIndex = lastZ;
    }
    //lastZ might explode withput this
    if(lastZ > 64) lastZ = 0;
}

function submit_changes(){
    num_cavidades = document.getElementById("numCavidades").value;
    num_sementes = document.getElementById("numSementes").value;
    num_jogadores = document.getElementById("numJogadores").value;
    jogo.UpdateGameInitialHTML();
}

var num_cavidades = document.getElementById("numCavidades").value;
var num_sementes = document.getElementById("numSementes").value;
var num_jogadores = document.getElementById("numJogadores").value;

jogo = new Mancala(num_cavidades, num_sementes);
/*
console.log(jogo.oponentSide.cavidades[12 - 7].sements[3].getStr());

jogo.Semear(7);

console.log(jogo.oponentSide.cavidades[12 - 7 - 1].sements[4].getStr());

jogo.UpdateGameMiddleHTML();
*/