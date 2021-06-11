

const router = require('koa-router')()
const { getPerson, editUserInfo, getUserImage} = require('../controller/user')

router.prefix('/api')


// 查询个人信息
router.get('/person', async (ctx,next)=>{
    const tokenn = ctx.request.headers.token
    ctx.body =  await getPerson(ctx,tokenn)

})


// 修改个人信息
router.post('/edituserInfo', async (ctx,next)=>{
    const userInfo = ctx.request.body
    ctx.body =  await editUserInfo(ctx,userInfo)
})


// 查询用户头像
router.get('/getuserImage', async(ctx,next)=>{
    const tokenn = ctx.request.headers.token
    ctx.body =  await getUserImage(ctx,tokenn)
})
module.exports = router