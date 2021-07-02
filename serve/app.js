const Koa = require('koa')
const app = new Koa()
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server,{cors:true});
server.listen(3001);
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
var cors = require('koa2-cors');
const koaBody = require('koa-body');
const path = require('path')
const koaStatic = require('koa-static')




app.use(koaBody({
  multipart: true,
  formidable: {
    maxFieldsSize: 200*1024*1024,
    keepExtensions: true,
  }
}));

const login = require('./routes/login')
const upload = require('./routes/upload')
const blog = require('./routes/blog')
const user = require('./routes/user')
const comm = require('./routes/comment')
const userRelation = require('./routes/user-relation')

// error handler
onerror(app)

// cors跨域处理


app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/test') {
      return false;
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  // maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept','token'],
}));

// middlewares

app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '.', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


//一对一聊天

io.on('connection', (socket) => {  console.log('ok')
 });
//存储所有用户
// // app.io.on( event, eventHandler )
// // The raw socket.io instance is attached as app._io if you need it
// io.on('setName', (ctx, data) => {
//   console.log('client sent data to message endpoint', data);
// });

app.use(login.routes(), login.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(comm.routes(), comm.allowedMethods())
app.use(userRelation.routes(), userRelation.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
