const Sequelize  = require('sequelize')
const seq = require('../seq')
const op = Sequelize.Op


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
    like:{
        type:Sequelize.DECIMAL,
        defaultValue:0,
    }
})

module.exports = {
    Blog,
    op
}