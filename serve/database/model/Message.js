const Sequelize = require('sequelize')
const seq = require('../seq')

const Msg = seq.define('msgList',{
   form_id:{
       type:Sequelize.STRING,
       allowNull:false
   },
   to_id:{
    type:Sequelize.STRING,
    allowNull:false
   },
   msg:{
    type:Sequelize.STRING,
    allowNull:false
   },
   status:{
       type:Sequelize.DECIMAL,
       defaultValue:0,
       //是否已读，默认未读
   }
})


module.exports = Msg