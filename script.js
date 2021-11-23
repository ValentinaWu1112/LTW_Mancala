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

function CreateSemente(cav, num){
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
    let colors = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
    let colorstr = "rgb(" + colors[0] + ", " + colors[1] + ", " + colors[2] + ")";
    seme.style.background = "linear-gradient(45deg, " + colorstr + " 40%, white 80%, " + colorstr + " 100%)";

    cav.appendChild(seme);
}

class Cavidade {
    constructor(numSeme) {
        this.sementes = numSeme;
    }

    AddSemente() {
        this.sementes++;
    }
}

class Armazem extends Cavidade {
    constructor() {
        super(0);
    }

    AddSemente() {
        this.sementes++;
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
    }

    Semear(cavidade) {
        if (cavidade == this.numCavi || cavidade == this.numCavi * 2 + 1) {
            alert("Error, não se pode Semear Armazens");
        }
        if (cavidade > this.numCavi) {
            //oponent move
            for (let i = 0; i < this.numCavi + 1; i++) {

            }
        }
        if (cavidade < this.numCavi) {
            //player move
            let quantidadeSementes = this.playerSide.cavidades[cavidade].sementes;
            this.playerSide.cavidades[cavidade].sementes = 0;
            let ondeSemear = cavidade + 1;

            while (quantidadeSementes > 0) {
                if (ondeSemear == this.numCavi) { //Player's Armazem
                    this.playerSide.armazem.AddSemente();
                }
                if (ondeSemear == this.numCavi * 2 + 1) { //Opponent's Armazem
                    this.oponentSide.armazem.AddSemente();
                }
                if (ondeSemear > this.numCavi) { //Opponent Side
                    this.oponentSide.cavidades[12 - ondeSemear].AddSemente();
                }
                if (ondeSemear < this.numCavi) { //Player Side
                    this.playerSide.cavidades[ondeSemear].AddSemente();
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
                CreateSemente(cav, s);
            }
            document.getElementsByClassName("OponentRow")[0].appendChild(cav);
        }

        //player side
        for(let c = 0; c < this.numCavi; c++){
            let cav = document.createElement("div");
            cav.classList.add("Cavidade");

            for(let s = 0; s < this.numSeme; s++){
                CreateSemente(cav, s);
            }
            document.getElementsByClassName("PlayerRow")[0].appendChild(cav);
        }
    }

    UpdateGameInitialHTML(){
        //clearing the previous board
        let opRow = document.getElementsByClassName("OponentRow")[0];
        while(opRow.firstChild){
            opRow.removeChild(opRow.firstChild);
        }
        let plRow = document.getElementsByClassName("PlayerRow")[0];
        while(plRow.firstChild){
            plRow.removeChild(plRow.firstChild);
        }

        this.numSeme = num_sementes;
        this.numCavi = num_cavidades;
        //oponent side
        for(let c = 0; c < this.numCavi; c++){
            let cav = document.createElement("div");
            cav.classList.add("Cavidade");

            for(let s = 0; s < this.numSeme; s++){
                CreateSemente(cav, s);
            }
            document.getElementsByClassName("OponentRow")[0].appendChild(cav);
        }

        //player side
        for(let c = 0; c < this.numCavi; c++){
            let cav = document.createElement("div");
            cav.classList.add("Cavidade");

            for(let s = 0; s < this.numSeme; s++){
                CreateSemente(cav, s);
            }
            document.getElementsByClassName("PlayerRow")[0].appendChild(cav);
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

    jogo.UpdateGameInitialHTML();
}

var num_cavidades = document.getElementById("numCavidades").value;
var num_sementes = document.getElementById("numSementes").value;
var num_jogadores = document.getElementById("numJogadores").value;

jogo = new Mancala(num_cavidades, num_sementes);
jogo.CreateGameHTML();
