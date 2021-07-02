const router = require('koa-router')()
const { create, getBlogList, getBlogDetail, getBlogListMy, getMyCodeBlog,
    getMyLifeBlog, getMyAllBlog, setlike, getSerach} = require('../controller/blog-create')


// 创建博客
router.prefix('/api')

router.post('/create_blog', async(ctx,next)=>{
    const { title, region, content, imageUrl } = ctx.request.body
    const token = ctx.request.headers.token
    ctx.body = await create( { title, region, content, imageUrl},token)
})


// 加载博客首页列表
router.get('/boke', async(ctx, next)=>{
    let   { page }   = ctx.query
    pageIndex = parseInt(page) - 1 //转换number类型
    ctx.body = await getBlogList(pageIndex)

})


// 加载博客详情
router.get('/blogDetail', async(ctx,next)=>{
    let { id } = ctx.query
    ctx.body = await getBlogDetail(id)
})


// 加载个人博客列表
router.post('/myblog', async(ctx,next)=>{
    const  token  = ctx.request.headers.token
    const   { page }   = ctx.request.query
    ctx.body = await getBlogListMy(token,page)

})


// 加载代码博客
router.get('/myCode', async(ctx,next)=>{
    const { page } = ctx.request.query
    ctx.body = await getMyCodeBlog(page)
})

// 加载life博客
router.get('/myLife', async(ctx,next)=>{
    ctx.body = await getMyLifeBlog()
})

// 加载归档博客
router.get('/myAllBlog', async(ctx, next)=>{
    const token = ctx.request.headers.token
    ctx.body = await getMyAllBlog(token)
})


// 点赞
router.get('/like', async(ctx,next)=>{
    const { id, like } = ctx.query
    ctx.body = await setlike(id, like)
})

// 搜索
router.post('/serach', async(ctx,next)=>{
    const { title } = ctx.request.body
    console.log(title)
    // ctx.body = 'ok'
    ctx.body = await getSerach(title)
})


module.exports = router
