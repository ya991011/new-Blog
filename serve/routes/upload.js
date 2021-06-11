
const router = require('koa-router')()

// const koaFrom = require('formidable-upload-koa')

const { saveFile } = require('../controller/utils')




router.prefix('/api')

router.post('/upload', async(ctx,next)=>{
    const file = ctx.request.files.file
    if (!file) {
        return
    }
    const { size, path, name, type } = file
   ctx.body =  await saveFile({name, type, size, filePath: path})
})

module.exports = router