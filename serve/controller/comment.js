

const { Answer } = require('../database/model')
const { setCommentFail, getCommListInfo, setLike, query } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { SuccessInfo, getUserInfoSuccess } = require('../model/SuccessInfo')
const { getComm,getCommentList, AnswerOn, getAnswerList } = require('../service/comment')



// 发表评论
async function getBlogComm(token,content, blog_id){
    const result = await getComm(token,content, blog_id)
    if(!result){
        return new ErrorModel(setCommentFail)
    }
    return new SuccessModel(SuccessInfo)
}


// 获取评论
async function getCommList(blog_id){
    const result = await getCommentList(blog_id)
    if(!result){
        return new ErrorModel(getCommListInfo)
    }
    return new SuccessModel(getUserInfoSuccess, result)
}

// 用户回复
async function setAnswer(user_id, comment_id, text, token){
    const result = await AnswerOn(user_id, comment_id, text, token)
    if(!result){
        return new ErrorModel(setLike)
    }
    return new SuccessModel(result, SuccessInfo)
}

// 用户回复列表
async function getAnswer(){
    const result = await getAnswerList()
    if(!result){
        return new ErrorModel(query)
    }
    return new SuccessModel(result, getUserInfoSuccess)
}


module.exports = {
    getBlogComm,
    getCommList,
    setAnswer,
    getAnswer
}