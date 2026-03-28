const { Router } = require("express");
const { createTask } = require("../controllers/task.controller");
const authMiddleware = require("../middlewares/auth");

const router = Router();

router.post("/", authMiddleware, createTask);
// router.post('/', createTask);
// listTaskByUser {
//  taras pendientes, tareas completadas , o toadas las tareas
// }
// updateTaskById :id =14
// deleteTaskById : id = 15
module.exports = router;
