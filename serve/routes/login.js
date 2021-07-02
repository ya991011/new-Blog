const router = require('koa-router')()




const { login } = require('../controller/user')

router.prefix('/api')

router.post('/login', async(ctx,next)=>{
    const {username,pass}  = ctx.request.body
    ctx.body =  await login(ctx,username,pass)

})


module.exports = router