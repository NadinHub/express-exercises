const express = require('express');
const bodyParser = require('body-parser');
const { isObject } = require('util');
const { Socket } = require('dgram');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static (__dirname));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const messages = [
    { name: 'Tim', message: 'Hi, it is Tim'},
    { name: 'Jane', message: 'Hello, it is Jane'}
]

app.get('/messages', (req, res) => {
    res.send(messages);
})

app.post('/messages', (req, res) => {
    console.log(req.body)
    messages.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('connection', (socket) =>{
    console.log("A user connected")
})

const server = http.listen(3000, () => {
    console.log('Server is listening on port', server.address().port)
});






//How to start server: node server.js
