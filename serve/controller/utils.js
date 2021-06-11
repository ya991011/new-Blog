const path = require('path')

const fse = require('fs-extra')
const { ErrorModel, SuccessModel } = require('../model/ResModel')

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', 'uploadFiles')
// 文件最大体积 1M
const MIX_SIZE = 1024 * 1024 * 1024

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist=>{
    if(!exist){
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

async function saveFile({name, type, size, filePath }){
    if(size>MIX_SIZE) {
        await fse.remove(filePath)
        return new ErrorModel('文件体积过大')
    }

    // 移动文件
    const extname = path.extname(name)
    const fileName = Date.now() + '.' + extname  //防止重名
    const distFilePath = path.join(DIST_FOLDER_PATH,fileName) //目的地
    await fse.move(filePath,distFilePath)
    // 返回信息
    return new SuccessModel({
        url:'http://localhost:3000/' + fileName
    })
}

module.exports = { saveFile }