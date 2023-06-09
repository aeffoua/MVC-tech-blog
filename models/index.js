const User = require("./User");
const Post = require("./Post");

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Comment.hasMany(Comment,{
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = { User, Post, Comment };
