// task.service.js
const {
    getAllTasks,
    getTaskById,
    createTask,
    deleteTaskById,
    editTaskById,
} = require("./task.repository");

const fetchAllTasks = async () => {
    return await getAllTasks();
};

const fetchTaskById = async (id) => {
    return await getTaskById(id);
};

const addTask = async (taskData) => {
    return await createTask(taskData);
};

const removeTaskById = async (id) => {
    return await deleteTaskById(id);
};

const updateTaskById = async (id, taskData) => {
    return await editTaskById(id, taskData);
};

module.exports = {
    fetchAllTasks,
    fetchTaskById,
    addTask,
    removeTaskById,
    updateTaskById,
};
