// 创建博客

const {  Blog, User } = require('../database/model/index')
const { PAGESIZE } = require('../config/constans')

// 引入token解析用户信息
var jwt = require('jsonwebtoken');
const { SECRET } = require("../config/constans");



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
                attributes:['id','nickname','picture']
            }
        ]
    })

    let blogList = result.rows.map(row=>row.dataValues)

    return {
        count:result.count,
        blogList,
        PAGESIZE
    }
}


// 加载博客详情
async function blogDetail(id){
    // console.log(id)
    const result = await Blog.findOne({
        where:{id},
        include:[
            {
                model:User,
                attributes:['id','nickname','picture']
            }
        ]
    })
    if(!result){
        return result
    }
    return result.dataValues
}



module.exports= {
    createBlog,
    blogList,
    blogDetail
}