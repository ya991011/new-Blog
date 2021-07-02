// 登录校验中间件

const { loginCheckFailInfo } = require("../model/ErrorInfo")
const { ErrorModel } = require("../model/ResModel")

async function loginCheck(ctx, next){
    const token = ctx.request.headers.token
    if(token){
        await next()
        return
    }
    // 未登录
    ctx.body = new ErrorModel(loginCheckFailInfo)
}

module.exports = {
    loginCheck
}