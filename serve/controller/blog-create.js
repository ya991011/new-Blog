


const { createBlog, blogList, blogDetail,  getMyBlog,
    getCodeBlog, getLifeBlog, getAllBlog,likenumber, Serach} = require('../service/blog')
const { createBlogFailInfo, getblogListInfo, setLike } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getUserInfoSuccess } = require('../model/SuccessInfo')


// 创建博客
async function create({title, region, content, imageUrl},token) {
    try{
        const blog = await createBlog(
            { title, region, content, imageUrl},token
        )

        return new SuccessModel(blog)


    }catch(ex){
        console.log(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)

    }
}

// 博客列表
async function getBlogList(pageIndex){
    const result = await blogList(pageIndex)
    if(!result){
        return new ErrorModel(getblogListInfo)
    }
    return new SuccessModel(getUserInfoSuccess,result)

}


// 博客详情
async function getBlogDetail(id){
    const result = await blogDetail(id)
    if(!result){
        return new ErrorModel(getblogListInfo)
    }
    return new SuccessModel(getUserInfoSuccess,result)
}


// 个人博客列表
async function getBlogListMy(token,page){
    const result = await getMyBlog(token,page)
    if(!result){
        return new ErrorModel(getblogListInfo)
    }
    return new SuccessModel(getUserInfoSuccess, result)
}

// 代码博客
async function getMyCodeBlog(page){
    const result = await getCodeBlog(page)
    if(!result){
        return new ErrorModel(getblogListInfo)
    }
    return new SuccessModel(getUserInfoSuccess, result)
}

// life博客
async function getMyLifeBlog(){
    const result = await getLifeBlog()
    if(!result){
        return new ErrorModel(getblogListInfo)
    }
    return new SuccessModel(getUserInfoSuccess, result)
}

// 个人归档
async function getMyAllBlog(token){
    const result = await getAllBlog(token)
    if(!result){
        return new ErrorModel(getblogListInfo)
    }
    return new SuccessModel(getUserInfoSuccess, result)
}

// 点赞
async function setlike(id, like){
    const result = await likenumber(id, like)
    if(!result){
        return new ErrorModel(setLike)
    }
    return new SuccessModel()
}

// 搜索
async function getSerach(title){
    const result = await Serach(title)
    if(!result){
        return new ErrorModel()
    }
    return new SuccessModel(getUserInfoSuccess,result)
}

module.exports = {
    create,
    getBlogDetail,
    getBlogList,
    getBlogListMy,
    getMyCodeBlog,
    getMyLifeBlog,
    getMyAllBlog,
    setlike,
    getSerach
}