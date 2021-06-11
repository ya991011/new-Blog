const Sequelize = require('sequelize')

const seq = new Sequelize('boke','root','root',{
    host:'localhost',
    dialect:'mysql'
})


module.exports = seq