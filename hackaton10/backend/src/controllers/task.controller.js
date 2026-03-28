const { Task } = require("../models");

const createTask = async (req, res, next) => {
  try {
    const { title, description, deadline } = req.body;
    // req.usuario = usuario;
    console.log("req.usuario:", req.usuario.id);

    const task = await Task.create({
      title,
      description,
      deadline,
      userId: req.usuario.id,
    });

    // const created = await Task.findByPk(user.id);
    return res.status(201).json({ status: "ok", data: task });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask };
