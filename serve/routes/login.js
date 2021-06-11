const router = require('koa-router')()




const { login } = require('../controller/user')

router.prefix('/api')

router.post('/login', async(ctx,next)=>{
    const {username,password}  = ctx.request.body
    const userInfo = {username,password}
    ctx.body =  await login(ctx,username,password)

})


module.exports = router