const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
//const conf = require('./conf.js');

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    const preq = url.parse(request.url, true);
    const pathname = preq.pathname;
    let answer = {};

    switch (request.method) {
        case 'GET':
            answer = doGet(pathname, request, response);
            break;
        case 'POST':
            //answer = 
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