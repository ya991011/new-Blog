

const { Comm, User, Answer } = require("../database/model/index")
const { SECRET } = require("../config/constans");
var jwt = require('jsonwebtoken');


// 发表评论
async function getComm(token,content, blog_id){
    // 引入token解析用户信息
     const userInfo  = jwt.verify(token,SECRET)
     const user_id = userInfo.id
     console.log(user_id)
     const result = await Comm.create({
         user_id,
         blog_id,
         content
     })
     console.log(result)

     return result.dataValues //发表成功
}


// 获取评论
async function getCommentList(blog_id){
    const result = await Comm.findAndCountAll({
        where:{ blog_id },
        order:[
            ['id','desc']
        ],
        include:[
            {
                model:User,
                attributes:['id','username','picture']
            },
        ]
    })
    let CommList = result.rows.map(row=>row.dataValues)
    return {
        CommList,
        count:result.count,
    }
}


// 用户回复
async function AnswerOn(user_id, comment_id, text, token){
    var jwt = require('jsonwebtoken');
    const userInfo  = jwt.verify(token,SECRET)
    const answerUser = userInfo.id
    const result = await Answer.create({user_id, comment_id, answerUser, text})
    return result.dataValues
}

// 用户回复列表
async function getAnswerList(){
    const result = await Answer.findAll({
        // include:[
        //     {
        //         model:User
        //     }
        // ]
    })
    console.log(result.dataValues)

    try{
            return result
    }catch(ex){
        console.log(ex)

    }
}

module.exports = {
    getComm,
    getCommentList,
    AnswerOn,
    getAnswerList
}