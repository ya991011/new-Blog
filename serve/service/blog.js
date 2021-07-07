// 创建博客

const {  Blog, op, User, Comm } = require('../database/model/index')
const { PAGESIZE } = require('../config/constans')
const { formatBlog } = require('./_format')

// 引入token解析用户信息
var jwt = require('jsonwebtoken');
const { SECRET } = require("../config/constans");


// 创建博客
async function createBlog({ title, region, content, imageUrl},token){
    const userInfo = jwt.verify(token,SECRET)
    const user_id = userInfo.id
    try{
        const result = await Blog.create({
            user_id,
            title,
            region,
            content,
            imageUrl
        })
        return result.dataValues
    }catch(err){
        console.log(err)


    }

}
// 加载首页博客

async function blogList(pageIndex){
    // 设置首页pageIndex
    const result = await Blog.findAndCountAll({
        limit:PAGESIZE, //每页多少条
        offset:PAGESIZE * pageIndex,  //跳过多少条
        order:[
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes:['id','username','picture']
            },
            {
                model:Comm
            }
        ]
    })

    let blogList = result.rows.map(row=>row.dataValues)
    blogList = formatBlog(blogList)

    return {
        count:result.count,
        blogList,
        PAGESIZE
    }
}


// 加载博客详情
async function blogDetail(id){
    const result = await Blog.findOne({
        where:{id},
        include:[
            {
                model:User,
                attributes:['id','username','picture']
            },
            {
                model:Comm,
            }
        ]
    })
    if(!result){
        return result
    }
    let blogDetail = result.dataValues
    blogDetail = formatBlog(blogDetail)
    return blogDetail
}



// 个人博客列表
async function getMyBlog(token,page){
    const userInfo = jwt.verify(token,SECRET)
    const user_id = userInfo.id
    const result = await Blog.findAndCountAll({
        limit: 3,
        offset: 3 * (page-1),
        where:{ user_id },
        order:[
            ['id','desc']
        ],
        include:[
            {
                model:Comm,
            }
        ]
    })
    let blogList = result.rows.map(row=>row.dataValues)
    blogList = formatBlog(blogList)
    return {
        blogList,
        count:result.count
    }
}


// 代码博客
async function getCodeBlog(page){
    const result = await Blog.findAndCountAll({
        limit: 5,
        offset: 5 * (page-1),
        where:{ region: "代码人生"},
        include:[
            {
                model:User,
                attributes:['username','picture']
            },
            {
                model:Comm,
            }

        ],
        order:[
            ['id','desc']
        ]
    })
    let codeBlog = result.rows.map(row=>row.dataValues)
    codeBlog = formatBlog(codeBlog)
    return {
        codeBlog,
        count: result.count,
        pagesize:9
    }
}

// Life博客
async function getLifeBlog(){
    const result = await Blog.findAndCountAll({
        where:{ region: "流年岁月"},
        include:[
            {
                model:User,
                attributes:['username','picture']
            }
        ]
    })
    let lifeBlog = result.rows.map(row=>row.dataValues)
    // lifeBlog = formatBlog(lifeBlog)
    return {
        lifeBlog,
        count: result.count
    }
}

// 个人归档
async function getAllBlog(token){
    const userInfo = jwt.verify(token,SECRET)
    const user_id = userInfo.id
    const result = await Blog.findAll({
        where:{user_id},
        attributes:[
            'title','updatedAt','createdAt'
        ],
        order:[
            ['id','desc']
        ]
    })
    if(!result){
        return result
    }
    let result2 =  result.map(row=>row.dataValues)
    console.log(result2)
    result2 = formatBlog(result2)
    return result2

}


// 点赞
async function likenumber(id, like){
    const result = await Blog.update({like},{
        where:{id}
    })

    return result[0] > 0 //更新成功

}

// 搜索
async function Serach(title){
    const result = await Blog.findAll({
        where:{
            title:{
                [op.like] : `%${title}%`
            },
        },
        include:[
            {
                model: User,
                attributes:['username','picture']
            }
        ]
    })
    console.log(result.blog)
    return result
}

module.exports= {
    createBlog,
    blogList,
    blogDetail,
    getMyBlog,
    getCodeBlog,
    getLifeBlog,
    getAllBlog,
    likenumber,
    Serach
}