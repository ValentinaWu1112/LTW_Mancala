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

function CreateSementeHTML(cav, num, seed) {
    //create semente
    let seme = document.createElement("div");
    seme.classList.add("Semente");

    //random rotation
    let ang = Math.random() * 360;

    //random horizontal position
    let horiPos = Math.random() * 45 - 22.5;

    //random vertical position
    let vertPos = Math.random() * 110 - 55;

    seme.style.transform = "translate(" + horiPos + "px, " + vertPos + "px) rotate(" + ang + "deg)";

    //random color
    //let colo = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
    //let colorstr = "rgb(" + colo[0] + ", " + colo[1] + ", " + colo[2] + ")";
    seme.style.background = "linear-gradient(45deg, " + seed.getStr() + " 40%, white 80%, " + seed.getStr() + " 100%)";

    seme.style.animation = "0.75s drop_seme";
    /*
    https://www.w3schools.com/howto/howto_js_animate.asp
    */

    cav.appendChild(seme);
}

class Semente {
    constructor(colo) {
        this.colors = colo;
    }

    getStr() {
        return "rgb(" + this.colors[0] + ", " + this.colors[1] + ", " + this.colors[2] + ")";
    }
}

class Cavidade {
    constructor(numSeme) {
        this.sementes = []
        for (let i = 0; i < numSeme; i++) {
            this.sementes.push(new Semente([Math.random() * 255, Math.random() * 255, Math.random() * 255]));
        }
    }

    AddSemente(seed) {
        this.sementes.push(seed);
    }

    RemoveSemente(seed) {
        for (let i = 0; i < this.sementes.length; i++) {
            if (seed.getStr === this.sementes[i].getStr) {
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

class Sala {
    contructor(nome, password) {
        this.nome = setNome(nome);
        this.password = setPassword(password);
        //this.tabuleiro = 
        this.user1 = "";
        this.user2 = "";
    }


    setNewUser(username) {
        if (this.user1 == "") {
            this.user1 = username;
        } else if (this.user2 == "") {
            this.user2 = username;
        } else {
            alert("this room is already full");
        }
    }
}

class Mancala {
    constructor(cavi = 6, seme = 4) {
        this.numCavi = cavi;
        this.numSeme = seme;
        this.playerSide = new Lado(this.numCavi, this.numSeme);
        this.oponentSide = new Lado(this.numCavi, this.numSeme);
        this.AIlevel = 0;
    }

    Semear(cavidade) {
        //shouldn't even be used
        let ondeSemear = cavidade + 1;
        if (cavidade == this.numCavi || cavidade == (this.numCavi * 2 + 1)) {
            alert("Error, não se pode Semear Armazens");
            return;
        } else if (cavidade > this.numCavi) {
            //oponent move
            let seedsToSow = this.oponentSide.cavidades[(this.numCavi * 2) - cavidade].sementes;
            let quantidadeSementes = seedsToSow.length;
            this.oponentSide.cavidades[(this.numCavi * 2) - cavidade].sementes = [];

            while (quantidadeSementes > 0) {
                if (ondeSemear == this.numCavi) { //Player's Armazem
                    //seguindo as regras -> não semear e continuar
                    ondeSemear++; //primeira cavidade no lado do player
                    continue;
                } else if (ondeSemear == (this.numCavi * 2 + 1)) { //Opponent's Armazem
                    this.oponentSide.armazem.AddSemente(seedsToSow.pop());
                    seme_arm[1] = true;
                    if (quantidadeSementes == 1) whos_to_play = 2; //play again
                } else if (ondeSemear > this.numCavi && ondeSemear < (this.numCavi * 2 + 1)) { //Opponent Side
                    this.oponentSide.cavidades[(this.numCavi * 2) - ondeSemear].AddSemente(seedsToSow.pop());
                } else if (ondeSemear < this.numCavi) { //Player Side
                    this.playerSide.cavidades[ondeSemear].AddSemente(seedsToSow.pop());
                } else {
                    alert("ERROR -> SEMEAR -> ondeSemear");
                }

                ondeSemear++;
                if (ondeSemear > (this.numCavi * 2 + 1)) { //Opponent's Armazem
                    ondeSemear = 0;
                }
                quantidadeSementes--;
            }
        } else if (cavidade < this.numCavi) {
            //player move
            let seedsToSow = this.playerSide.cavidades[cavidade].sementes;
            let quantidadeSementes = seedsToSow.length;
            this.playerSide.cavidades[cavidade].sementes = [];

            while (quantidadeSementes > 0) {
                if (ondeSemear == this.numCavi) { //Player's Armazem
                    this.playerSide.armazem.AddSemente(seedsToSow.pop());
                    seme_arm[0] = true;
                    if (quantidadeSementes == 1) whos_to_play = 1; //play again
                } else if (ondeSemear == (this.numCavi * 2 + 1)) { //Opponent's Armazem
                    //seguindo as regras -> não semear e continuar
                    ondeSemear = 0; //primeira cavidade no lado do player
                    continue;
                } else if (ondeSemear > this.numCavi && ondeSemear < (this.numCavi * 2 + 1)) { //Opponent Side
                    this.oponentSide.cavidades[(this.numCavi * 2) - ondeSemear].AddSemente(seedsToSow.pop());
                } else if (ondeSemear < this.numCavi) { //Player Side
                    this.playerSide.cavidades[ondeSemear].AddSemente(seedsToSow.pop());
                } else {
                    alert("ERROR -> SEMEAR -> ondeSemear");
                }

                ondeSemear++;
                if (ondeSemear > (this.numCavi * 2 + 1)) { //Opponent's Armazem
                    ondeSemear = 0;
                }
                quantidadeSementes--;
            }
        }

        if (ondeSemear != 0 || ondeSemear != this.numCavi) {
            //didn't end on warehouse
            this.Check_Steal(ondeSemear - 1);
        }
    }

    Check_Steal(lastCav) {
        if (lastCav > this.numCavi && whos_to_play == 1) {
            //oponent side and player's turn
            if (this.oponentSide.cavidades[(this.numCavi * 2) - lastCav].sementes.length == 1) {
                //needs to be a separate "if" cuz of array index 
                var seedsToSowOP = this.oponentSide.cavidades[(this.numCavi * 2) - lastCav].sementes;
                var seedsToSowPL = this.playerSide.cavidades[(this.numCavi * 2) - lastCav].sementes;
                this.oponentSide.cavidades[(this.numCavi * 2) - lastCav].sementes = [];
                this.playerSide.cavidades[(this.numCavi * 2) - lastCav].sementes = [];
                for (let s = 0; s < seedsToSowOP.length; s++) {
                    this.oponentSide.armazem.AddSemente(seedsToSowOP[s]);
                }
                for (let s = 0; s < seedsToSowPL.length; s++) {
                    this.oponentSide.armazem.AddSemente(seedsToSowPL[s]);
                }
                seme_arm[1] = true;
            }
        }
        if (lastCav < this.numCavi && whos_to_play == 2) {
            //player side and oponent's turn
            if (this.playerSide.cavidades[lastCav].sementes.length == 1) {
                //needs to be a separated "if" cuz of array index 
                var seedsToSowOP = this.oponentSide.cavidades[lastCav].sementes;
                var seedsToSowPL = this.playerSide.cavidades[lastCav].sementes;
                this.oponentSide.cavidades[lastCav].sementes = [];
                this.playerSide.cavidades[lastCav].sementes = [];
                for (let s = 0; s < seedsToSowOP.length; s++) {
                    this.playerSide.armazem.AddSemente(seedsToSowOP[s]);
                }
                for (let s = 0; s < seedsToSowPL.length; s++) {
                    this.playerSide.armazem.AddSemente(seedsToSowPL[s]);
                }
                seme_arm[0] = true;
            }
        }
    }

    CreateGameHTML() {
        //player side
        for (let c = 0; c < this.numCavi; c++) {
            let cav = document.createElement("div");
            cav.classList.add("Cavidade");
            cav.addEventListener('click', function() { ClickCavidade(c) }, false);
            cav.dataset.numSeeds = this.numSeme;

            for (let s = 0; s < this.numSeme; s++) {
                CreateSementeHTML(cav, s, this.playerSide.cavidades[c].sementes[s]);
            }
            document.getElementsByClassName("PlayerRow")[0].appendChild(cav);
        }

        //oponent side
        for (let c = 0; c < this.numCavi; c++) {
            let cav = document.createElement("div");
            cav.classList.add("Cavidade");
            let temp = +this.numCavi * 2 - +c; //Guess what this is for *facepalms in js*
            cav.addEventListener('click', function() { ClickCavidade(temp) }, false);
            cav.dataset.numSeeds = this.numSeme;

            for (let s = 0; s < this.numSeme; s++) {
                CreateSementeHTML(cav, s, this.oponentSide.cavidades[c].sementes[s]);
            }
            document.getElementsByClassName("OponentRow")[0].appendChild(cav);
        }


        let opArma = document.getElementById("oponent_armazem");
        opArma.dataset.numSeeds = 0;
        let plArma = document.getElementById("player_armazem");
        plArma.dataset.numSeeds = 0;
    }

    ClearGameHTML() {
        //clearing the previous board
        let opRow = document.getElementsByClassName("OponentRow")[0];
        while (opRow.firstChild) {
            opRow.removeChild(opRow.firstChild);
        }
        let plRow = document.getElementsByClassName("PlayerRow")[0];
        while (plRow.firstChild) {
            plRow.removeChild(plRow.firstChild);
        }
        let opArma = document.getElementById("oponent_armazem");
        while (opArma.firstChild) {
            opArma.removeChild(opArma.firstChild);
        }
        let plArma = document.getElementById("player_armazem");
        while (plArma.firstChild) {
            plArma.removeChild(plArma.firstChild);
        }
    }

    UpdateGameInitialHTML() {
        this.ClearGameHTML();

        this.numSeme = num_sementes;
        this.numCavi = num_cavidades;
        this.playerSide = new Lado(this.numCavi, this.numSeme);
        this.oponentSide = new Lado(this.numCavi, this.numSeme);

        this.CreateGameHTML();
    }

    UpdateGameMiddleHTML() {
        let numseedsJS = 0;
        let seedsHTML = 0;
        //oponent side
        for (let c = 0; c < this.numCavi; c++) {
            seedsHTML = document.getElementById("oponent_row").children[c].children;
            numseedsJS = this.oponentSide.cavidades[c].sementes.length;
            if (seedsHTML.length == numseedsJS) {
                //same size do nothing
                continue;
            }
            let cavHTML = document.getElementById("oponent_row").children[c];
            cavHTML.dataset.numSeeds = numseedsJS;
            //removing all
            while (cavHTML.firstChild) {
                cavHTML.removeChild(cavHTML.firstChild);
            }
            if (numseedsJS == 0) continue;
            //Adding the ones that should be there
            for (let s = 0; s < numseedsJS; s++) {
                CreateSementeHTML(cavHTML, s, this.oponentSide.cavidades[c].sementes[s]);
            }
            continue;
        }

        //player side
        for (let c = 0; c < this.numCavi; c++) {
            seedsHTML = document.getElementById("player_row").children[c].children;
            numseedsJS = this.playerSide.cavidades[c].sementes.length;
            if (seedsHTML.length == numseedsJS) {
                //same size do nothing
                continue;
            }
            let cavHTML = document.getElementById("player_row").children[c];
            cavHTML.dataset.numSeeds = numseedsJS;
            //removing all
            while (cavHTML.firstChild) {
                cavHTML.removeChild(cavHTML.firstChild);
            }
            if (numseedsJS == 0) continue;
            //Adding the ones that should be there
            for (let s = 0; s < numseedsJS; s++) {
                CreateSementeHTML(cavHTML, s, this.playerSide.cavidades[c].sementes[s]);
            }
            continue;
        }

        //Oponent Armazem
        if (seme_arm[1]) {
            seme_arm[1] = false;
            seedsHTML = document.getElementById("oponent_armazem").children;
            numseedsJS = this.oponentSide.armazem.sementes.length;
            if (numseedsJS != 0 && numseedsJS != seedsHTML) {
                let armazHTML = document.getElementById("oponent_armazem");
                armazHTML.dataset.numSeeds = numseedsJS;
                //removing all
                while (armazHTML.firstChild) {
                    armazHTML.removeChild(armazHTML.firstChild);
                }
                //Adding the ones that should be there
                for (let s = 0; s < numseedsJS; s++) {
                    CreateSementeHTML(armazHTML, s, this.oponentSide.armazem.sementes[s]);
                }
            }
        }
        //Player Armazem
        if (seme_arm[0]) {
            seme_arm[0] = false;
            seedsHTML = document.getElementById("player_armazem").children;
            numseedsJS = this.playerSide.armazem.sementes.length;
            if (numseedsJS != 0 && numseedsJS != seedsHTML) {
                let armazHTML = document.getElementById("player_armazem");
                armazHTML.dataset.numSeeds = numseedsJS;
                //removing all
                while (armazHTML.firstChild) {
                    armazHTML.removeChild(armazHTML.firstChild);
                }
                //Adding the ones that should be there
                for (let s = 0; s < numseedsJS; s++) {
                    CreateSementeHTML(armazHTML, s, this.playerSide.armazem.sementes[s]);
                }
            }
        }
    }

    Check_end_game() {
        if (whos_to_play == 1) {
            //player's move
            for (let c = 0; c < this.numCavi; c++) {
                if (this.playerSide.cavidades[c].sementes.length > 0) {
                    //Has a valid play -> not end game
                    return;
                }
            }
            //Has no valid plays -> gather all seeds and end game
            whos_to_play = 3;
            alert("game ended");
            this.End_game_gather();
            return;
        } else if (whos_to_play == 2) {
            //oponent's move
            for (let c = 0; c < this.numCavi; c++) {
                if (this.oponentSide.cavidades[c].sementes.length > 0) {
                    //Has a valid play -> not end game
                    return;
                }
            }
            //Has no valid plays -> gather all seeds and end game
            whos_to_play = 3;
            alert("game ended");
            this.End_game_gather();
            return;
        } else {
            alert("error in check_end_game -> whos_to_play");
        }
    }


    End_game_gather() {
        //player side
        for (let c = 0; c < this.numCavi; c++) {
            if (this.playerSide.cavidades[c].sementes.length > 0) {
                //Has seeds -> gather them in warehouse
                var seedsToSow = this.playerSide.cavidades[c].sementes;
                this.playerSide.cavidades[c].sementes = [];
                for (let s = 0; s < seedsToSow.length; s++) {
                    this.playerSide.armazem.AddSemente(seedsToSow[s]);
                }
                seme_arm[0] = true;
            }
        }
        //oponent side
        for (let c = 0; c < this.numCavi; c++) {
            if (this.oponentSide.cavidades[c].sementes.length > 0) {
                //Has seeds -> gather them in warehouse
                var seedsToSow = this.oponentSide.cavidades[c].sementes;
                this.oponentSide.cavidades[c].sementes = [];
                for (let s = 0; s < seedsToSow.length; s++) {
                    this.oponentSide.armazem.AddSemente(seedsToSow[s]);
                }
                seme_arm[1] = true;
            }
        }
        if (this.playerSide.armazem.sementes > this.oponentSide.armazem.sementes) {
            alert("player won!")
        } else if (this.playerSide.armazem.sementes < this.oponentSide.armazem.sementes) {
            alert("opponent won!")
        } else {
            alert("both players are tied")
        }
        //update display
        this.UpdateGameMiddleHTML();
    }

    AI_move() {
        if (this.AIlevel == 0) {
            //chose a random cav that's playable
            while (true) {
                var play = Math.floor(Math.random() * +this.numCavi);
                console.log("AI PLAY: " + play + " It has: " + this.oponentSide.cavidades[this.numCavi - +play - 1].sementes.length + " seeds");
                if (this.oponentSide.cavidades[this.numCavi - +play - 1].sementes.length > 0) {
                    this.Semear(+play + +this.numCavi + 1);
                    return;
                }
            }
        } else {
            this.Semear(this.Get_best_play(this.AIlevel));
        }
    }

    Get_best_play(dif) {
        var highest_value = 0;
        var play = 0;
        //checking allplays once
        for (let c = 0; c < this.numCavi; c++) {
            if (this.Acaba_semear_armfazem(c, 2)) {
                return c;
            } else if (this.Quant_semea_lado_oposto(c) > highest_value) {
                highest_value = this.Quant_semea_lado_oposto(c);
                play = c
            }
        }
        return play;
    }

    Acaba_semear_armazem(cav, player) {
        if (player == 1) {
            return this.playerSide.cavidades[cav].sementes.length == (this.numCavi - cav);
        } else if (player == 2) {
            return this.oponentSide.cavidades[cav].sementes.length == (this.numCavi - cav);
        }
        return false;
    }

    Quant_semea_lado_oposto(cav) {
        if (cav < this.numCavi) {
            return this.playerSide.cavidades[cav].sementes.length - this.numCavi;
        } else if (player == 2) {
            return this.oponentSide.cavidades[cav].sementes.length == (this.numCavi - cav);
        }
        return false;
    }
}

let lastZ = 0;

function toggle_visibility(id) {
    var e = document.getElementById(id);
    if (e.style.display === "block") {
        e.style.display = "none";
        e.style.zIndex = 0;
    } else {
        e.style.display = "block";
        lastZ++;
        e.style.zIndex = lastZ;
    }
    //lastZ might explode withput this
    if (lastZ > 64) lastZ = 0;
}

function submit_changes() {
    num_cavidades = document.getElementById("numCavidades").value;
    num_sementes = document.getElementById("numSementes").value;
    num_jogadores = document.getElementById("numJogadores").value;
    whos_to_play = 1;
    jogo.UpdateGameInitialHTML();
    ChangeCursor();
    toggle_visibility("configuracoes");
}

function ClickCavidade(cav) {

    if (whos_to_play == 1 && cav >= 0 && cav < num_cavidades) {
        whos_to_play = 2;

        if (jogo.playerSide.cavidades[cav].sementes.length == 0) {
            alert("That's not a valid play, try another move");
            whos_to_play = 1;
            ChangeCursor();
            return;
        }

        jogo.Semear(cav);
        jogo.UpdateGameMiddleHTML();
        jogo.Check_end_game();

        if (num_jogadores == 1 && whos_to_play == 2) {
            do { //To cover the cases where AI has to play again
                whos_to_play = 1;
                jogo.AI_move();
            } while (whos_to_play == 2);

            jogo.UpdateGameMiddleHTML();
            jogo.Check_end_game();
            ChangeCursor();
            return;
        }
    } else if (whos_to_play == 2 && ((+cav >= +num_cavidades + 1) && (+cav <= 2 * +num_cavidades))) {
        whos_to_play = 1;

        if (jogo.oponentSide.cavidades[num_cavidades * 2 - cav].sementes.length == 0) {
            alert("That's not a valid play, try another move");
            whos_to_play = 2;
            ChangeCursor();
            return;
        }
        jogo.Semear(cav);
        jogo.UpdateGameMiddleHTML();
        jogo.Check_end_game();
    } else if (whos_to_play == 3) {
        alert("The game has already ended");
    } else {
        alert("That's not a valid play, try another move");
    }

    ChangeCursor();
    ChangeColors();
}

function ChangeCursor() {
    if (whos_to_play == 1) {
        //Player's move
        for (let c = 0; c < num_cavidades; c++) {
            //player side <=> allowed
            if (jogo.playerSide.cavidades[c].sementes.length == 0) {
                document.getElementById("player_row").children[c].style.cursor = "not-allowed";
            } else {
                document.getElementById("player_row").children[c].style.cursor = "pointer";
            }
        }
        for (let c = 0; c < num_cavidades; c++) {
            //oponent side <=> not allowed
            document.getElementById("oponent_row").children[c].style.cursor = "not-allowed";
        }
    } else if (whos_to_play == 2) {
        //Oponent's move
        for (let c = 0; c < num_cavidades; c++) {
            //player side <=> not allowed
            document.getElementById("player_row").children[c].style.cursor = "not-allowed";
        }
        for (let c = 0; c < num_cavidades; c++) {
            //oponent side <=> allowed
            if (jogo.oponentSide.cavidades[c].sementes.length == 0) {
                document.getElementById("oponent_row").children[c].style.cursor = "not-allowed";
            } else {
                document.getElementById("oponent_row").children[c].style.cursor = "pointer";
            }
        }
    } else if (whos_to_play == 3) {
        //game ended
        for (let c = 0; c < num_cavidades; c++) {
            document.getElementById("player_row").children[c].style.cursor = "not-allowed";
        }
        for (let c = 0; c < num_cavidades; c++) {
            document.getElementById("oponent_row").children[c].style.cursor = "not-allowed";

        }
    } else {
        alert("Error in Changepointer() -> whos_to_play");
    }
}

function ChangeColors() {
    if (whos_to_play == 1) {
        document.getElementsByClassName("oponent_info")[0].style.borderColor = "rgb(200, 50, 50)";
        document.getElementsByClassName("oponent_name")[0].style.color = "rgb(200, 50, 50)";
        document.getElementsByClassName("player_info")[0].style.borderColor = "rgb(50, 150, 50)";
        document.getElementsByClassName("player_name")[0].style.color = "rgb(50, 150, 50)";
    } else if (whos_to_play == 2) {
        document.getElementsByClassName("oponent_info")[0].style.borderColor = "rgb(50, 150, 50)";
        document.getElementsByClassName("oponent_name")[0].style.color = "rgb(50, 150, 50)";
        document.getElementsByClassName("player_info")[0].style.borderColor = "rgb(200, 50, 50)";
        document.getElementsByClassName("player_name")[0].style.color = "rgb(200, 50, 50)";
    }
}

var num_cavidades = document.getElementById("numCavidades").value;
var num_sementes = document.getElementById("numSementes").value;
var num_jogadores = document.getElementById("numJogadores").value;
/**
 * 1 -> Player's turn \
 * 2 -> Oponent's turn \
 * 3 -> Game ended
 */
var whos_to_play = 1;
/**
 * 0 -> player's armazem \
 * 1 -> oponnent's armazem
 */
var seme_arm = new Array(false, false);

jogo = new Mancala(num_cavidades, num_sementes);
jogo.CreateGameHTML();
ChangeCursor();