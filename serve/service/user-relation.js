const { User, UserRelation } = require('../database/model/index')
const { formatUser } = require('./_format')
const { SECRET } = require("../config/constans");
var jwt = require('jsonwebtoken');
const Sequelize = require('sequelize')


// 粉丝列表
async function getRelation(followerId,token){
     const userInfo  = jwt.verify(token,SECRET)
     const username = userInfo.username
    const result = await User.findAndCountAll({
        order:[
            ['id','desc']
        ],
        attributes:['id','username','nickname','picture'],
        include:[
            {
                model:UserRelation,
                where:{ followerId }
            }
        ]
    })
    //粉丝列表
    let userList = formatUser(result.rows.map(row=>row.dataValues))
    //我是否关注了此人
    const amIFollowed = userList.some(item => item.username === username)

    return {
        userList,
        count:result.count,
        amIFollowed
    }
}


//关注人列表
async function getAttention(userId){
    const result = await UserRelation.findAndCountAll({
        order:[
            ['id','desc']
        ],
        include:[
            {
                model:User,
                attributes:['id','username','nickname','picture'],
            }
        ],
        where:{
            userId
        }
    })
    let AttentionList = result.rows.map(row=>row.dataValues)
    return {
        AttentionList,
        count:result.count
    }
}


// 关注
async function Attention(userId,followerId){
    const result =await UserRelation.create({userId,followerId})
    return result.dataValues

}

// 取消关注
async function cancelAttention(userId,followerId){
    const result =await UserRelation.destroy({
        where:{
            userId,followerId
        }
    })
    return result > 0

}

module.exports = {
    getRelation,
    getAttention,
    Attention,
    cancelAttention
}