module.exports = function(io){
   const hasName = {}
    io.on('connection',socket =>{
        // console.log('okkk')
        console.log('连接成功')
        //设置用户名与socket.id的对应关系
        socket.on('setName',data=>{
           const name = data
           hasName[name] = socket.id
           console.log(hasName)
        })
        //对不同的用户发送消息
        socket.on('test',data=>{
          console.log(data)
          let toName = data.toName
          let msg = data.message
          let setName = data.setName
              socket.to(hasName[toName]).emit('message',{
                  msg:msg,
                  to:toName,
                  setName: setName,
                  server:true
              })
        })
      })

}