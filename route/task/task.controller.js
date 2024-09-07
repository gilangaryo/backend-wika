const express = require("express");
const {
    fetchAllTasks,
    fetchTaskById,
    addTask,
    updateTaskById,
    removeTaskById,
} = require("./task.service");

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await fetchAllTasks();
        res.status(200).send({
            status: 200,
            message: "get all tasks success",
            data: tasks,
        });
    } catch (error) {
        res.status(400).send({
            status: 400,
            message: "get all tasks failed",
            error: error.message,
        });
    }
});

// Get task by ID
router.get("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await fetchTaskById(taskId);
        if (task) {
            res.status(200).send({
                status: 200,
                message: "get task success",
                data: task,
            });
        } else {
            res.status(404).send({
                status: 404,
                message: "task not found",
            });
        }
    } catch (error) {
        res.status(400).send({
            status: 400,
            message: "get task failed",
            error: error.message,
        });
    }
});

// Create a new task
router.post("/", async (req, res) => {
    try {
        const newTaskData = req.body;
        const task = await addTask(newTaskData);
        res.status(201).send({
            status: 201,
            message: "create task success",
            data: task,
        });
    } catch (error) {
        res.status(400).send({
            status: 400,
            message: "create task failed",
            error: error.message,
        });
    }
});

// Update task by ID
router.put("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;
        const task = await updateTaskById(taskId, taskData);
        res.status(200).send({
            status: 200,
            message: "edit task success",
            data: task,
        });
    } catch (error) {
        res.status(400).send({
            status: 400,
            message: "edit task failed",
            error: error.message,
        });
    }
});

// Delete task by ID
router.delete("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        await removeTaskById(taskId);
        res.status(200).send({
            status: 200,
            message: "task delete success",
        });
    } catch (error) {
        res.status(400).send({
            status: 400,
            message: "delete task failed",
            error: error.message,
        });
    }
});

module.exports = router;
