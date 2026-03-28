const { appError } = require("../middlewares/errorHandler.js");
const { User } = require("../models");
const { generateToken } = require("../utils/jwt.handle.js");

const tokenBlackList = new Set();

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

const authLogout = (req, res, next) => {
  try {

    const token = req.headers.authorization?.split(" ")[1];

    if(token) {
      tokenBlackList.add(token);
    }

    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: '/'
    })

    return res.status(200).json({
      success: true,
      message: "Session cerrada correctamente"
    })
  } catch (error) {
    next(error);
  }
};

module.exports = { authLogin, authLogout, tokenBlackList };
