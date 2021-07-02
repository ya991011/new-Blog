

const { User, Blog } = require('../database/model/index')

const { SECRET } = require('../config/constans')
const { formatUser, _formatPicture } = require('./_format')

var jwt = require('jsonwebtoken');

// 登录
async function getUserInfo(username,pass){
    //  通过用户名查找用户是否存在，存在判断密码是否与数据库相等
        const result = await User.findOne({
        where:{username},
        attributes:['id','username','password']})
        if(!result){
            return result
        }
        else{
            if(result.password!==pass){
                return
            }
            const { id, username, password } = result
            const userInfo = {id, username, password}
            const token = jwt.sign(userInfo, SECRET,{expiresIn: '1d'});
            return  { token, result }
        }

}

// 个人信息查询
async function getPersonal(tokenn){
    const userInfo = jwt.verify(tokenn,SECRET)
    const username = userInfo.username
    const result = await User.findOne({where:{username}})
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
    const id = userInfo.id
    const result = await User.findOne({
        where:{ id },
        attributes:['picture']
    })
    if(!result){
        return result
    }
    const formatRes = _formatPicture(result.dataValues)
    return formatRes
}

// 个人中心

async function getCenter(id){
    console.log(id)
    const result = await User.findOne({
        where:{ id: id },
    })
    const result2 = await Blog.findAll({
        where:{ user_id:id },
    })
    if(!result && result2){
        return result && result2
    }
    return {
        result, result2
    }
}



module.exports = {
    getUserInfo,
    getPersonal,
    updateUserInfo,
    getImage,
    getCenter
}