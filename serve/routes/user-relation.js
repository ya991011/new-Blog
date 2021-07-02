const router = require('koa-router')()

// const { loginCheck } = require('../middlewares/loginCheck')
const { getUserFans, getUserAtten, setAttention, deleteAttention } = require('../controller/user-relation')



router.prefix('/api')

// 粉丝列表
router.get('/getFans', async(ctx,next)=>{
    const { userId } = ctx.query
    const token = ctx.request.headers.token
    ctx.body = await getUserFans(userId,token)
})

// 关注人列表
router.get('/getAttention', async(ctx,next)=>{
    const { userId } = ctx.query
    ctx.body = await getUserAtten(userId)
})

// 关注接口
router.post('/attention', async(ctx,next)=>{
    const { userId, followerId } = ctx.request.body
    ctx.body = await setAttention(userId, followerId)
})

//取消关注
router.post('/deleteAttention', async(ctx,next)=>{
    const { userId, followerId } = ctx.request.body
    ctx.body = await deleteAttention(userId, followerId)
})



module.exports = router