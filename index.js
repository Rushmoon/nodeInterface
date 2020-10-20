const http=require('http');
const Koa=require('koa');
const io=require('socket.io');
const uuid=require('uuid/v4');

//
let server=new Koa();

//
let httpServer=http.createServer(server.callback());
httpServer.listen(8080);

//
let wsServer=io.listen(httpServer);

wsServer.on('connection', sock=>{
    console.log('connected');

    const ID=uuid();

    sock.emit('ID', ID);

    sock.on('msg', (user, msg)=>{
        wsServer.emit('broadcast', ID, user, msg);
    });
});

