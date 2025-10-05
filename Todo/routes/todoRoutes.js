

const router = require('express').Router()



router.post("/signup", signup);
router.post("/login", login);
router.post("/tasks", auth, createTask);
router.get("/tasks", auth, getTasks);
router.put("/tasks/:id", auth, updateTask);
router.delete("/tasks/:id", auth, deleteTask);


module.exports = {router}