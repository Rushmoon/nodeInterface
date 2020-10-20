const Koa = require('koa');
const koaBody = require('koa-body');
//webscoket 不需要跨域代理
//const cors = require('koa-cors2');

// const routers = require('./routers/index');

//websocket 创建链接即可

const app = new Koa();

//app.use(cors());
// app.use(logger());
// app.use(koaBody(({ multipart: true })));
// app.use(routers.routes()).use(routers.allowedMethods());

app.listen(process.env.PORT || 8080);

console.log('call-club is starting at port 8080');
