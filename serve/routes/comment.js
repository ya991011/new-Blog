const router = require('koa-router')()


const { getBlogComm, getCommList, setAnswer, getAnswer } = require('../controller/comment')
const { loginCheck } = require('../middlewares/loginCheck')


router.prefix('/api')
// 发表评论
router.post('/comment',loginCheck, async(ctx,next)=>{
    const token = ctx.headers.token
    const { content, blog_id } = ctx.request.body
    // console.log(ctx.request.body)
    ctx.body = await getBlogComm(token, content, blog_id)
})

// 评论列表
router.post('/commlist',  async(ctx,next)=>{
    const { blog_id } = ctx.request.body
    console.log(blog_id)
    ctx.body = await getCommList(blog_id)
    // ctx.body ="ok"
})

// 用户回复
router.post('/answer', async(ctx,next)=>{
    const { user_id, comment_id, text } = ctx.request.body
    const token = ctx.request.headers.token
    // ctx.body = "ok"
    ctx.body = await setAnswer(user_id, comment_id, text, token)
})

// 用户回复列表
router.get('/answerList', async(ctx,next)=>{
    ctx.body = await getAnswer()
})

module.exports = router