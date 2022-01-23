urlProfs = 'http://twserver.alunos.dcc.fc.up.pt:8008';
urlLocal = 'http://localhost:9092';
var nick = "";
var password = "";

function register() {

    nick = document.getElementById("player_nick").value;
    pass = document.getElementById("player_password").value;

    fetch(urlProfs + '/register', {
            method: 'POST',
            body: JSON.stringify({ 'nick': nick, 'password': pass })
        })
        .then(response => response.json())
        .then(extra => {
            console.log(extra);
            document.getElementById("player_name").innerHTML = nick;
            document.getElementById("login").style.display = "none";
            document.getElementById("botao_join").style.display = "block";
            document.getElementById("botao_register").style.display = "none";
        })
    
    registerLocal();
}

function registerLocal() {

    nick = document.getElementById("player_nick").value;
    pass = document.getElementById("player_password").value;

    fetch(urlLocal + '/register', {
            method: 'POST',
            body: JSON.stringify({ 'nick': nick, 'password': pass })
        })
        .then(response => response.json())
        .then(extra => {
            console.log(extra);
        })
}

function join() {

    let group = document.getElementById("room_id").value;

    fetch(urlProfs + '/join', {
            method: 'POST',
            body: JSON.stringify({ 'nick': nick, 'password': pass, 'group': group, 'size': num_cavidades, 'initial': num_sementes })
        })
        .then(response => response.json())
        .then(extra => {
            game = extra.game;
            console.log(game);
            update(game);
            document.getElementById("join").style.display = "none";
        })
}

function leave() {

    fetch(urlProfs + '/leave', {
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

    fetch(urlProfs + '/notify', {
            method: 'POST',
            body: JSON.stringify({ 'nick': nick, 'password': pass, 'game': game, 'move': cav })
        })
        .then(response => response.json())
        .then(extra => {

            console.log(extra);
        })

}

function update(g) {

    let event = new EventSource(urlProfs + '/update?nick=' + nick + '&game=' + g);
    event.onerror = function(e) {
        console.log("error line 747");
    }

    event.onmessage = function(e) {
        let data = JSON.parse(e.data);

        if (data.board.turn != nick) {
            document.getElementById("oponent_name").innerHTML = data.board.turn;
        }

        let cav = whos_to_play == 1 ? +data.pit : +data.pit + (+num_cavidades + 1);
        jogo.Semear(cav);
        whos_to_play = data.board.turn == nick ? 1 : 2;
        jogo.UpdateGameHTML();
        ChangeCursor();
        ChangeColors();
    }

}


function ranking() {

    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/ranking', {
            method: 'POST',
            body: JSON.stringify({}),
        })
        .then(response => response.json())
        .then(temp => {
            /*
                0: {nick: 'abcdefghidasdas', victories: 454, games: 643}
                1: {nick: '123', victories: 324, games: 755}
                2: {nick: 'abcdefghi', victories: 189, games: 643}
                3: {nick: 'a', victories: 136, games: 262}
                4: {nick: 'group_21a', victories: 107, games: 167}
                5: {nick: 'amigo', victories: 101, games: 174}
                6: {nick: 'ola1', victories: 98, games: 180}
                7: {nick: 'dom11', victories: 97, games: 141}
                8: {nick: 'lol271998_', victories: 96, games: 134}
                9: {nick: 'owo', victories: 90, games: 167}
            */

            let rank = document.getElementById('classificacoes');
            rank.innerHTML = '';
            //Creating the table
            let table = document.createElement('table');

            //Creating a row
            let tr = table.insertRow();
            let td = tr.insertCell();
            td.appendChild(document.createTextNode('Position'));
            td.style.width = '100px';
            let td1 = tr.insertCell();
            td1.appendChild(document.createTextNode('Nick'));
            td1.style.width = '200px';
            let td2 = tr.insertCell();
            td2.appendChild(document.createTextNode('Victories'));
            td2.style.width = '100px';
            let td3 = tr.insertCell();
            td3.appendChild(document.createTextNode('Games'));
            td3.style.width = '100px';

            //adding the values
            for (let i = 0; i < 10; i++) {
                let entry = temp.ranking[i];
                console.log(entry);
                tr = table.insertRow();
                td = tr.insertCell();
                td.appendChild(document.createTextNode(i));
                td1 = tr.insertCell();
                td1.appendChild(document.createTextNode(entry.nick));
                td2 = tr.insertCell();
                td2.appendChild(document.createTextNode(entry.victories));
                td3 = tr.insertCell();
                td3.appendChild(document.createTextNode(entry.games));
            }

            rank.appendChild(table);

        })
}