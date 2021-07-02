const User = require('./User')
const { Blog, op } = require('./Blog')
const Comm = require('./Comment')
const UserRelation = require('./UserRelation')


Blog.belongsTo(User,{
    foreignKey:'user_id'
})
Comm.belongsTo(User,{
    foreignKey:'user_id'
})
Blog.hasMany(Comm,{
    foreignKey:'id'
})
Comm.belongsTo(Blog,{
    foreignKey:'blog_id'
})
UserRelation.belongsTo(User,{
    foreignKey:'followerId'
})
User.hasMany(UserRelation,{
    foreignKey:'userId'
})


module.exports = {
    User,
    Blog,
    Comm,
    op,
    UserRelation
}