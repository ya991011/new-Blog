
const { DEFAULT_PICTURE, DEFAULT_NICKNAME } = require('../config/constans')
const { timeFormat } = require('../utils/dt')


/**
 * 用户默认头像
 * @param {Object} obj 用户对象
 */
 function _formatUserPicture(obj) {
    if (obj.picture == null || obj.nickname == null) {
        obj.picture = DEFAULT_PICTURE
        obj.nickname = DEFAULT_NICKNAME
    }
    return obj
}

function _formatPicture(obj){
    if(obj.picture == null){
        obj.picture = DEFAULT_PICTURE
    }

    return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户对象
 */
 function formatUser(list) {
    if (list == null) {
        return list
    }

    if (list instanceof Array) {
        // 数组 用户列表
        return list.map(_formatUserPicture)
    }

    // 单个对象
    return _formatUserPicture(list)
}


/**
 * 格式化数据的时间
 * @param {Object} obj 数据
 */
 function _formatDBTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updatedAtFormat = timeFormat(obj.updatedAt)
    return obj
}
/**
 * 格式化微博信息
 * @param {Array|Object} list 微博列表或者单个微博对象
 */
 function formatBlog(list) {
    if (list == null) {
        return list
    }

    if (list instanceof Array) {
        // 数组
        return list.map(_formatDBTime)
    }
    // 对象
    let result2 = list
    result2 = _formatDBTime(result2)
    // result = _formatContent(result)
    return result2
}


module.exports = {
   formatUser,
   _formatPicture,
   formatBlog
}