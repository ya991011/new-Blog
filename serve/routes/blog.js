const router = require('koa-router')()
const { create,getBlogList, getBlogDetail } = require('../controller/blog-create')


// 创建博客
router.prefix('/api')

router.post('/create_blog', async(ctx,next)=>{
    const { title, region, content, imageUrl } = ctx.request.body
    const token = ctx.request.headers.token
    console.log(token)
    ctx.body = await create( { title, region, content, imageUrl},token)
})


// 加载博客首页列表
router.get('/boke', async(ctx, next)=>{
    let   { page }   = ctx.query
    pageIndex = parseInt(page) - 1 //转换number类型
    const result = await getBlogList(pageIndex)
    ctx.body = result

})


// 加载博客详情
router.get('/blogDetail', async(ctx,next)=>{
    let { id } = ctx.query
    console.log(id)
    ctx.body = await getBlogDetail(id)
})

module.exports = router
