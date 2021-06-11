

const { User } = require('../database/model/index')

const { SECRET } = require('../config/constans')
const { formatUser, _formatPicture } = require('./_format')

var jwt = require('jsonwebtoken');

// 登录
async function getUserInfo(username,password1){
    //  通过用户名查找用户是否存在，存在判断密码是否与数据库相等
        const result = await User.findOne({
        username,
        attributes:['id','username','password']})
        if(!result){
            return result
        }
        else{
            if(result.password!==password1){
                return
            }
            const { id, username, password } = result
            const userInfo = {id, username, password}
            var token = jwt.sign(userInfo, SECRET,{expiresIn: '2d'});
            return { token }
        }

}

// 个人信息查询
async function getPersonal(tokenn){
    const userInfo = jwt.verify(tokenn,SECRET)
    const user_id = userInfo.id
    const result = await User.findOne({user_id})
    if(!result){
        return result
    }

    const formatRes = formatUser(result.dataValues)
    return formatRes
}

// 修改个人基本信息
async function updateUserInfo(userInfo){
    const { username, nickname, age, phone, school, special, picture} = userInfo
    const result = await User.update({username, nickname, age, phone, school, special,picture},{
        where:{
            username:username
        }
    })
    return result[0] > 0 //修改的行数
}


// 查询用户头像

async function getImage(token){
    const userInfo = jwt.verify(token,SECRET)
    const user_id = userInfo.id
    const result = await User.findOne({
        user_id:user_id,
        attributes:['picture']
    })
    if(!result){
        return result
    }
    const formatRes = _formatPicture(result.dataValues)
    return formatRes
}



module.exports = {
    getUserInfo,
    getPersonal,
    updateUserInfo,
    getImage,
}