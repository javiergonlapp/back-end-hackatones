const sequelize = require("../db");
const { Model }  = require('sequelize');

const User = require("./User");
const Course = require("./Course");

[User, Course].forEach((M) => {
  if (!M || !(M.prototype instanceof Model)) {
    throw new Error(
      `Model ${M?.name ?? M} is not a valid Sequelize Model subclass.`,
    );
  }
});

User.hasMany(Course, { foreignKey: "ownerId", as: "ownedCourses" });
Course.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

// User.belongsToMany(Course, {
//   foreignKey: "userId",
//   otherKey: "courseId",
// });

module.exports = {
  sequelize,
  User,
  Course,
};
