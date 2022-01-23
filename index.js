const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
//const conf = require('./conf.js');

const port = process.env.PORT || 3000

const server = http.createServer((request, response) => {
    const preq = url.parse(request.url, true);
    const pathname = preq.pathname;
    let answer = {};

    
    switch (request.method) {
        case 'GET':
            answer = doGet(pathname, request, response);
            break;
        case 'POST':
            answer = doPost(pathname, request, response);
            break;
        default:
            answer.status = 400;
    }
    
/*
    switch(preq.pathname){
        case '/register':
            console.log('register in console.log');
            response.write('register in response.write \n'); response.end();
            const mancala = require('./server/mancala.js');
            let game = new mancala.Mancala(6, 4, 'ola', 'teste');
            console.log(JSON.stringify(game));
            break;

        case '/join':
            console.log('join');
            break;

        case '/ranking':
            console.log('ranking');
            break;

        case '/update':
            console.log('update');
            break;
    }
*/


})

server.listen(port, () => {
    console.log(`Server running at port ${port}`)
})


function doGet(pathname, request, response) {
    let answer = {};
    switch (pathname) {
        case '/update':
            updater.remember(response);
            request.on('close', () =>
                updater.forget(response));
            setImmediate(() =>
                updater.update(counter.get()));
            answer.style = 'sse';
            break;
        default:
            answer.status = 400;
            break;
    }
    return answer;
}

function doPost(pathname, request, response) {
    let answer = {};
    switch (pathname) {
        case '/register':
            console.log('entrou /register');
            
            let user;

            request.on('data', (data) => {
                user = JSON.parse(data);
                console.log(user);
                
                fs.writeFileSync('users.txt', JSON.stringify(user));
            });
            
            
            console.log('saiu /register');
            break;
        default:
            answer.status = 400;
            break;
    }
    return answer;
}


/*
//get 

const options = {
    hostname: 'example.com',
    port: 443,
    path: '/todos',
    method: 'GET'
}

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
    })
})

req.on('error', error => {
    console.error(error)
})

req.end()

//post / out / delete

const data = new TextEncoder().encode(
    JSON.stringify({
        todo: 'Buy the milk 🍼'
    })
)

const options = {
    hostname: 'whatever.com',
    port: 443,
    path: '/todos',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
}

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
    })
})

req.on('error', error => {
    console.error(error)
})

req.write(data)
req.end()



//post method

const data = JSON.stringify({
    todo: 'Buy the milk'
})

const options = {
    hostname: 'whatever.com',
    port: 443,
    path: '/todos',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
}

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
    })
})

*/