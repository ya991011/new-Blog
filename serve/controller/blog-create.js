


const { createBlog, blogList, blogDetail } = require('../service/blog')
const { createBlogFailInfo, getblogListInfo } = require('../model/ErrorInfo')
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

module.exports = {
    create,
    getBlogList,
    getBlogDetail
}