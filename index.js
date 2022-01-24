const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
//const conf = require('./conf.js');

const port = process.env.PORT || 9092
const headers = {
    plain: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
    },
    sse: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Connection': 'keep-alive'
    },
    cors: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Credentials': 'false',
        'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
        'Access-Control-Max-Age': '86400'
    }
}

const usersStorage = 'server/database/users.txt';
const rankStorage = 'server/database/rank.json';


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
    let answer = {style: 'plain', status: 200};
    switch (pathname) {
        case '/register':
            let users = JSON.parse(fs.readFileSync(usersStorage));

            let userReceived;
            request.on('data', (data) => {
                userReceived = JSON.parse(data);
                
                if (!userReceived.nick || !userReceived.password) {
                    throw {message: {error: "Invalid body request."}, status: 400};
                }

                for (user of users) {
                    if (user.nick === userReceived.nick) {
                        if (user.password !== userReceived.password){
                            throw {message: {error: "User registered with a different password."}, status: 401};
                        }
                    }
                }
                
                users.push(userReceived);
                fs.writeFileSync(usersStorage, JSON.stringify(users));
            });
            answer.body = {};
            break;

        case '/ranking':
            let rank = JSON.parse(fs.readFileSync(rankStorage));
            console.log({ranking: rank.slice(0, 10)});
            answer.body = {ranking: rank.slice(0, 10)};
            break;

        default:
            answer.status = 400;
            break;
    }

    response.writeHead(answer.status, headers[answer.style]);
    response.end(JSON.stringify(answer.body));
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