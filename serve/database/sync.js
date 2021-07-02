const seq = require('./seq')

// require('./model/Blog')
// require('./model/User')
// require('./model/Comment')
// require('./model/Answer')
require('./model/UserRelation')


// 测试连接
seq.authenticate().then(()=>{
    console.log('auth ok')
}).catch(()=>{
    console.log('auth err')
})

seq.sync({ force: true}).then(()=>{
    console.log('sync ok')
    process.exit()
})