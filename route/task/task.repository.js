// tracking.repository.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTasks = async () => {
    return await prisma.tracking.findMany();
};

const getTaskById = async (id) => {
    return await prisma.tracking.findUnique({
        where: { trackingId: Number(id) },
    });
};

const createTask = async (trackingData) => {
    return await prisma.tracking.create({
        data: trackingData,
    });
};


const deleteTaskById = async (id) => {
    return await prisma.tracking.delete({
        where: { id: Number(id) },
    });
};

const editTaskById = async (id, trackingData) => {
    try {
        const updatedTask = await prisma.tracking.update({
            where: { id: Number(id) },
            data: trackingData,
        });
        return updatedTask;
    } catch (error) {
        console.error("Error updating tracking:", error);
        throw new Error("Unable to update tracking.");
    }
};


module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    deleteTaskById,
    editTaskById,
};
