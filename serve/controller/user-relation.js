const { ErrorModel, SuccessModel } = require("../model/ResModel")
const { getRelation, getAttention, Attention, cancelAttention } = require('../service/user-relation')
const { getUserInfoSuccess, AttentionSuccess } = require('../model/SuccessInfo')


// 粉丝列表
async function getUserFans(followerId,token){
    const result = await getRelation(followerId,token)
    if(!result){
        return new ErrorModel()
    }
    return new SuccessModel(getUserInfoSuccess,result)

}


// 关注人列表
async function getUserAtten(userId){
    const result = await getAttention(userId)
    if(!result){
        return new ErrorModel()
    }
    return new SuccessModel(getUserInfoSuccess,result)
}

// 关注
async function setAttention(userId,followerId){
    const result = await Attention(userId,followerId)
    if(!result){
        return new ErrorModel()
    }
    return new SuccessModel(AttentionSuccess,result)
}

//取消关注
async function deleteAttention(userId,followerId){
    const result = await cancelAttention(userId,followerId)
    if(!result){
        return new ErrorModel()
    }
    return new SuccessModel(AttentionSuccess,result)
}

module.exports = {
    getUserFans,
    getUserAtten,
    setAttention,
    deleteAttention
}
