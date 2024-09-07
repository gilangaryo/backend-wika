// task.repository.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTasks = async () => {
    return await prisma.task.findMany(
        {
            include: {
                vendor: { select: { name: true } },
                pole: { select: { type: true } },
                status: { select: { status: true } },
                location: { select: { name: true } },
                driver: { select: { name: true } },
            },
        }
    );
};

const getTaskById = async (id) => {
    return await prisma.task.findUnique({
        where: { id: Number(id) },
    });
};

const createTask = async (taskData) => {
    return await prisma.task.create({
        data: taskData,
    });
};


const deleteTaskById = async (id) => {
    return await prisma.task.delete({
        where: { id: Number(id) },
    });
};

const editTaskById = async (id, taskData) => {
    try {
        const updatedTask = await prisma.task.update({
            where: { id: Number(id) },
            data: taskData,
        });
        return updatedTask;
    } catch (error) {
        console.error("Error updating task:", error);
        throw new Error("Unable to update task.");
    }
};


module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    deleteTaskById,
    editTaskById,
};
