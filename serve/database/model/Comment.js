const Sequelize = require('sequelize')
const seq = require('../seq')


const Comm = seq.define('Comm',{
    blog_id:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    user_id:{
        type:Sequelize.STRING,
        allowNull:false
    },
    content:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Comm