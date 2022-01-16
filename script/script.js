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



class Semente {
    constructor(colo) {
        this.colors = colo;
        this.moved = true;
        this.posX = 0;
        this.posY = 0;
        this.ang = 0;
    }

    getStr() {
        return "rgb(" + this.colors[0] + ", " + this.colors[1] + ", " + this.colors[2] + ")";
    }
}

function DropSeedHTML(cav, seed, isWarehouse) {

    //create semente
    let seme = document.createElement("div");
    seme.classList.add("Semente");

    if (seed.moved) {
        seme.style.animation = "0.75s drop_seme";
        /*
        https://www.w3schools.com/howto/howto_js_animate.asp
        */

        //random rotation
        seed.ang = Math.random() * 360;

        //random horizontal position
        seed.posX = Math.random() * 45 - 22.5;

        if (isWarehouse) //random vertical position in warehouse
            seed.posY = Math.random() * 220 - 110;

        else //random vertical position
            seed.posY = Math.random() * 110 - 55;
    }

    seme.style.transform = "translate(" + seed.posX + "px, " + seed.posY + "px) rotate(" + seed.ang + "deg)";

    //seme.style.left = horiPos + "px";
    //seme.style.top = vertPos + "px";

    //color
    seme.style.background = "linear-gradient(45deg, " + seed.getStr() + " 40%, white 80%, " + seed.getStr() + " 100%)";

    cav.appendChild(seme);
    seed.moved = false;
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

    ClearSeeds() {
        this.sementes = [];
    }

    SetSeedsToMove() {
        for (let s = 0; s < this.sementes.length; s++) {
            this.sementes[s].moved = true;
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
            document.getElementById("message_displayer").innerHTML = "This room is already full.";
            //alert("this room is already full");
        }
    }
}

class Board {
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
            //alert("Error, não se pode Semear Armazens");
            document.getElementById("message_displayer").innerHTML = "You cannot sow stores.";
            return;
        } else if (cavidade > this.numCavi) {
            //oponent move
            let cavToPickUp = this.oponentSide.cavidades[(this.numCavi * 2) - cavidade];
            cavToPickUp.SetSeedsToMove();
            let seedsToSow = cavToPickUp.sementes;
            let quantidadeSementes = seedsToSow.length;
            cavToPickUp.ClearSeeds();

            while (quantidadeSementes > 0) {
                if (ondeSemear == this.numCavi) { //Player's Armazem
                    //seguindo as regras -> não semear e continuar
                    ondeSemear++; //primeira cavidade no lado do player
                    continue;
                } else if (ondeSemear == (this.numCavi * 2 + 1)) { //Opponent's Armazem
                    this.oponentSide.armazem.AddSemente(seedsToSow.pop());
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
            let cavToPickUp = this.playerSide.cavidades[cavidade];
            cavToPickUp.SetSeedsToMove();
            let seedsToSow = cavToPickUp.sementes;
            let quantidadeSementes = seedsToSow.length;
            cavToPickUp.ClearSeeds();

            while (quantidadeSementes > 0) {
                if (ondeSemear == this.numCavi) { //Player's Armazem
                    this.playerSide.armazem.AddSemente(seedsToSow.pop());
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
                //Shouldn't be used
                if (ondeSemear > (this.numCavi * 2 + 1)) { //Opponent's Armazem
                    ondeSemear = 0;
                }
                quantidadeSementes--;
            }
        }

        this.Check_Steal(cavidade, ondeSemear - 1);
    }

    Check_Steal(startCav, lastCav) {
        if (lastCav > this.numCavi && lastCav <= (this.numCavi * 2) && startCav > this.numCavi && startCav <= (this.numCavi * 2)) {
            //oponent side
            if (this.oponentSide.cavidades[(this.numCavi * 2) - lastCav].sementes.length == 1) {
                //needs to be a separate "if" cuz of array index 
                let cavOP = this.oponentSide.cavidades[(this.numCavi * 2) - lastCav];
                let cavPL = this.playerSide.cavidades[(this.numCavi * 2) - lastCav];
                cavOP.SetSeedsToMove();
                cavPL.SetSeedsToMove();
                let seedsToSowOP = cavOP.sementes;
                let seedsToSowPL = cavPL.sementes;
                cavOP.ClearSeeds();
                cavPL.ClearSeeds();

                for (let s = 0; s < seedsToSowOP.length; s++) {
                    this.oponentSide.armazem.AddSemente(seedsToSowOP[s]);
                }
                for (let s = 0; s < seedsToSowPL.length; s++) {
                    this.oponentSide.armazem.AddSemente(seedsToSowPL[s]);
                }
            }
        }
        if (lastCav < this.numCavi && lastCav >= 0 && startCav < this.numCavi && startCav >= 0) {
            //player side and oponent's turn
            if (this.playerSide.cavidades[lastCav].sementes.length == 1) {
                //needs to be a separated "if" cuz of array index 
                let cavOP = this.oponentSide.cavidades[lastCav];
                let cavPL = this.playerSide.cavidades[lastCav];
                cavOP.SetSeedsToMove();
                cavPL.SetSeedsToMove();
                let seedsToSowOP = cavOP.sementes;
                let seedsToSowPL = cavPL.sementes;
                cavOP.ClearSeeds();
                cavPL.ClearSeeds();
                for (let s = 0; s < seedsToSowOP.length; s++) {
                    this.playerSide.armazem.AddSemente(seedsToSowOP[s]);
                }
                for (let s = 0; s < seedsToSowPL.length; s++) {
                    this.playerSide.armazem.AddSemente(seedsToSowPL[s]);
                }
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
                DropSeedHTML(cav, this.playerSide.cavidades[c].sementes[s], false);
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
                DropSeedHTML(cav, this.oponentSide.cavidades[c].sementes[s], false);
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

    UpdateGameHTML() {
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
                DropSeedHTML(cavHTML, this.oponentSide.cavidades[c].sementes[s], false);
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
                DropSeedHTML(cavHTML, this.playerSide.cavidades[c].sementes[s], false);
            }
            continue;
        }

        //Oponent Armazem
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
                DropSeedHTML(armazHTML, this.oponentSide.armazem.sementes[s], true);
            }
        }

        //Player Armazem   
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
                DropSeedHTML(armazHTML, this.playerSide.armazem.sementes[s], true);
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
            //alert("game ended");
            document.getElementById("message_displayer").innerHTML = "Game over.";
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
            //alert("game ended");
            document.getElementById("message_displayer").innerHTML = "Game over.";
            this.End_game_gather();
            return;
        } else {
            alert("error in check_end_game -> whos_to_play");
        }
    }


    End_game_gather() {
        //player side
        for (let c = 0; c < this.numCavi; c++) {

            let cavToPickUp = this.playerSide.cavidades[c];
            cavToPickUp.SetSeedsToMove();
            let seedsToSow = cavToPickUp.sementes;
            cavToPickUp.ClearSeeds();

            if (seedsToSow.length > 0) {
                //Has seeds -> gather them in warehouse
                for (let s = 0; s < seedsToSow.length; s++) {
                    this.playerSide.armazem.AddSemente(seedsToSow[s]);
                }
            }
        }
        //oponent side
        for (let c = 0; c < this.numCavi; c++) {

            let cavToPickUp = this.oponentSide.cavidades[c];
            cavToPickUp.SetSeedsToMove();
            let seedsToSow = cavToPickUp.sementes;
            cavToPickUp.ClearSeeds();

            if (seedsToSow.length > 0) {
                //Has seeds -> gather them in warehouse
                for (let s = 0; s < seedsToSow.length; s++) {
                    this.oponentSide.armazem.AddSemente(seedsToSow[s]);
                }
            }
        }
        if (this.playerSide.armazem.sementes > this.oponentSide.armazem.sementes) {
            document.getElementById("message_displayer").innerHTML = "Congratulations, you won!";
            //alert("player won!")
        } else if (this.playerSide.armazem.sementes < this.oponentSide.armazem.sementes) {
            //alert("opponent won!")
            document.getElementById("message_displayer").innerHTML = "Opponent won. Better luck next time!";
        } else {
            //alert("both players are tied")
            document.getElementById("message_displayer").innerHTML = "Both player are tied. Nice match!";
        }
        //update display
        this.UpdateGameHTML();
    }

    AI_move() {
        if (this.AIlevel == 0) {
            //chose a random cav that's playable
            while (true) {
                let play = Math.floor(Math.random() * +this.numCavi);
                //console.log("AI PLAY: " + play + " It has: " + this.oponentSide.cavidades[this.numCavi - +play - 1].sementes.length + " seeds");
                if (this.oponentSide.cavidades[this.numCavi - +play - 1].sementes.length > 0) {
                    this.Semear(+play + +this.numCavi + 1);
                    return;
                }
            }
        } else if (this.AIlevel == 1) {
            let play = this.Get_best_play(Object.assign(this), 2);
            //console.log("AI PLAY: " + play + " It has: " + this.oponentSide.cavidades[this.numCavi - +play - 1].sementes.length + " seeds");
            this.Semear(play);
        } else if (this.AIlevel > 1) {
            alert("NOT YET IMPLEMENTED");
        }
    }

    Get_best_play(gam, turn) {
        let play = 0;

        //Get opponent's best move
        if (turn == 2) {
            let highest_value = gam.oponentSide.armazem.sementes.length;
            for (let c = 0; c < gam.numCavi; c++) {
                console.log("for loop " + c + "    play is: " + play);
                let temp = Object.assign(gam);
                if (temp.oponentSide.cavidades[c].sementes.length > 0) {
                    temp.Semear(+c + +temp.numCavi + 1);
                    if (temp.oponentSide.armazem.sementes.length > highest_value) {
                        play = c;
                        highest_value = temp.oponentSide.armazem.sementes.length;
                    }
                }
            }
        }
        //Get player's best move
        else if (turn == 1) {
            let highest_value = gam.playerSide.armazem.sementes.length;
            for (let c = 0; c < gam.numCavi; c++) {
                let temp = Object.assign(gam);
                if (temp.playerSide.cavidades[c].sementes.length > 0) {
                    temp.Semear(c + temp.numCavi);
                    if (temp.playerSide.armazem.sementes.length > highest_value) {
                        play = c;
                        highest_value = temp.playerSide.armazem.sementes.length;
                    }
                }
            }
        }
        return play;
    }
}

function ClickCavidade(cav) {
    if (nick != "") {
        notify(cav);
        return;
    }

    if (whos_to_play == 1 && cav >= 0 && cav < num_cavidades) {
        whos_to_play = 2;

        if (jogo.playerSide.cavidades[cav].sementes.length == 0) {
            //alert("That's not a valid play, try another move");
            document.getElementById("message_displayer").innerHTML = "Invalid play, try another move.";
            whos_to_play = 1;
            ChangeCursor();
            return;
        }

        jogo.Semear(cav);
        jogo.UpdateGameHTML();
        jogo.Check_end_game();

        if (num_jogadores == 1 && whos_to_play == 2) {
            do { //To cover the cases where AI has to play again
                whos_to_play = 1;
                jogo.UpdateGameHTML();
                jogo.AI_move();
            } while (whos_to_play == 2);

            setTimeout(() => { jogo.UpdateGameHTML(); }, 1000);
            jogo.Check_end_game();
            ChangeCursor();
            return;
        }
    } else if (whos_to_play == 2 && ((+cav >= +num_cavidades + 1) && (+cav <= 2 * +num_cavidades))) {
        whos_to_play = 1;

        if (jogo.oponentSide.cavidades[num_cavidades * 2 - cav].sementes.length == 0) {
            //alert("That's not a valid play, try another move");
            document.getElementById("message_displayer").innerHTML = "Invalid play, try another move.";
            whos_to_play = 2;
            ChangeCursor();
            return;
        }
        jogo.Semear(cav);
        jogo.UpdateGameHTML();
        jogo.Check_end_game();
    } else if (whos_to_play == 3) {
        //alert("The game has already ended");
        document.getElementById("message_displayer").innerHTML = "The game has already ended.";
    } else {
        //alert("That's not a valid play, try another move");
        document.getElementById("message_displayer").innerHTML = "Invalid play, try another move.";
    }

    ChangeCursor();
    ChangeColors();
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

let lastZ = 0;

function toggle_visibility(id) {
    let e = document.getElementById(id);
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
    whos_to_play = document.getElementById("who_starts").value;
    AIdiff = document.getElementById("ai_diff").value;
    jogo.AIlevel = AIdiff;
    jogo.UpdateGameInitialHTML();
    ChangeCursor();
    toggle_visibility("configuracoes");
}

function register() {

    nick = document.getElementById("player_nick").value;
    pass = document.getElementById("player_password").value;

    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/register', {
            method: 'POST',
            body: JSON.stringify({ 'nick': nick, 'password': pass })
        })
        .then(response => response.json())
        .then(extra => {
            console.log(extra);
            document.getElementById("player_name").innerHTML = nick;
            document.getElementById("login").style.display = "none";
            join();
        })
}

function join() {

    let group = 3;

    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/join', {
            method: 'POST',
            body: JSON.stringify({ 'nick': nick, 'password': pass, 'group': group, 'size': num_cavidades, 'initial': num_sementes })
        })
        .then(response => response.json())
        .then(extra => {
            game = extra.game;
            console.log(game);
            update(game);
        })
}

function leave() {

    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/leave', {
            method: 'POST',
            body: JSON.stringify({ 'nick': nick, 'password': pass, 'game': game })
        })
        .then(response => response.json())
        .then(extra => {
            //sai sempre com sucesso!
            console.log(extra);
        })

}

function notify(cav) {

    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/notify', {
            method: 'POST',
            body: JSON.stringify({ 'nick': nick, 'password': pass, 'game': game, 'move': cav })
        })
        .then(response => response.json())
        .then(extra => {

            console.log(extra);
        })

}

function update(g) {

    let event = new EventSource('http://twserver.alunos.dcc.fc.up.pt:8008/update?nick=' + nick + '&game=' + g);
    event.onerror = function(e) {
        console.log("error line 747");
    }

    event.onmessage = function(e) {
        let data = JSON.parse(e.data);
        //document.getElementById("oponent_name").innerHTML = data.board.sides;
        console.log(data.board.sides['olateste']);
        console.log(data);
        console.log(data.board.turn);
        console.log(nick);
        console.log(nick == data.board.turn);
        
        if(data.board.turn != nick){
            document.getElementById("oponent_name").innerHTML = data.board.turn;
        }

        let cav = whos_to_play == 1 ? +data.pit : +data.pit + (+num_cavidades + 1);
        jogo.Semear(cav);
        whos_to_play = data.board.turn == nick ? 1 : 2;
        jogo.UpdateGameHTML();
        ChangeCursor();
        ChangeColors();
    }

    /*
    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/update?nick=' + nick + '&game=' + g,{
        method: 'GET',
    })
    .then(response => response.json())
    .then(extra => {
        console.log('entrou update');
        console.log(extra.board);
    })
    */

}


function ranking() {

}

var num_cavidades = document.getElementById("numCavidades").value;
var num_sementes = document.getElementById("numSementes").value;
var num_jogadores = document.getElementById("numJogadores").value;
var AIdiff = document.getElementById("ai_diff").value;
/**
 * 1 -> Player's turn \
 * 2 -> Oponent's turn \
 * 3 -> Game ended
 */
var whos_to_play = document.getElementById("who_starts").value;

var nick = "";
var password = "";


jogo = new Board(num_cavidades, num_sementes);
jogo.CreateGameHTML();
var game = "";
ChangeCursor();