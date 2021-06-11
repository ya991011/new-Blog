const { DECIMAL } = require('sequelize')
const Sequelize =  require('sequelize')
const seq = require('../seq')

const User = seq.define('user',{
    username:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    nickname:{
        type:Sequelize.STRING,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    picture:{
        type:Sequelize.STRING,
    },
    gender:{
        type:Sequelize.DECIMAL,
        allowNull:false,
        defaultValue:3,
        // (性别(1：男，2：女，3：保密))
    },
    phone:{
        type:Sequelize.STRING,
    },
    school:{
        type:Sequelize.STRING
    },
    special:{
        type:Sequelize.STRING
    },
    age:{
        type:Sequelize.DECIMAL
    }
},{
    timestamps:false
})

module.exports = User