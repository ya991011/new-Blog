const Sequelize  = require('sequelize')
const seq = require('../seq')


const Blog = seq.define('blog',{
    user_id:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    region:{
        type:Sequelize.STRING,
        allowNull:false
    },
    imageUrl:{
        type:Sequelize.STRING,
        allowNull:false
    },
    content:{
        type:Sequelize.TEXT,
        allowNull:false
    },
})

module.exports = Blog