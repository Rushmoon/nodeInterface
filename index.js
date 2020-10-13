const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/',function (req,res) {
   // res.send('<h3>本地调试中<h3>');
    res.sendFile(__dirname+'/dist/clients/main/index.html')
});
io.on('connection',function (socket) {
    let username = '';
   console.log('an user connected');
    socket.on('login',function (name) {
        username = name;
        socket.broadcast.emit('connection', username + ' connected')
    });

    socket.on('chat',(msg)=>{
        let result = {
            name : username,
            message :msg
        };
       io.emit('chat',result)
    })
});
http.listen(1003,()=>{
   console.log("server start");
});
