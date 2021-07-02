const Sequelize =  require('sequelize')
const seq = require('../seq')

const UserRelation = seq.define('userRelation',{
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    followerId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})

module.exports = UserRelation