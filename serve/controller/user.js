//

const {
    loginFailInfo,
    changeInfoFailInfo
} = require('../model/ErrorInfo')

const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { loginSuccess, getUserInfoSuccess, updateSuccess } = require('../model/SuccessInfo')
const { getUserInfo, getPersonal, updateUserInfo, getImage, getCenter } = require('../service/user')


// 登录
async function login(ctx,username,pass){
    const userInfo = await getUserInfo(username,pass)
    if(!userInfo){
        return new ErrorModel(loginFailInfo)
    }else{
        return new SuccessModel(loginSuccess,userInfo)
    }
}

// 查询个人信息
async function getPerson(ctx,tokenn){
    const result = await getPersonal(tokenn)
    if(!result){
        return new ErrorModel()
    }
        return new SuccessModel(getUserInfoSuccess,result)
}


// 修改个人信息
async function editUserInfo(ctx,userInfo){
    const result = await updateUserInfo(userInfo)
    if(!result){
        return new ErrorModel(changeInfoFailInfo)
    }
        return new SuccessModel(updateSuccess)

}

// 查询用户头像
async function getUserImage(ctx,token){
    const result = await getImage(token)
    if(!result){
        return result
    }
    return result
}

// 个人中心
async function getPersonCenter(ctx,id){
    console.log(id)
    const result = await getCenter(id)
    if(!result){
        return new ErrorModel(changeInfoFailInfo)
    }
    return new SuccessModel(getUserInfoSuccess, result)

}

module.exports = {
    login,
    getPerson,
    editUserInfo,
    getUserImage,
    getPersonCenter
}