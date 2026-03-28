const { appError } = require("../middlewares/errorHandler.js");
const { User } = require("../models");
const { generateToken } = require("../utils/jwt.handle.js");

const authLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userFind = await User.scope("withPassword").findOne({
      where: { email },
    });

    if (!userFind) {
      return next(
        appError(400, "USER_NOT_FOUND", "el usuario no ha sido encotnrado"),
      );
    }

    if (password !== userFind.passwordHash) {
      return next(
        appError(400, "INVALID_CREDENTIALS", "crenciales incorrectas"),
      );
    }
    
    const token = generateToken(userFind.id);
    // const created = await User.findByPk(user.id);
    return res.status(201).json({ status: "ok", data: token });
  } catch (error) {
    next(error);
  }
};

module.exports = { authLogin };
