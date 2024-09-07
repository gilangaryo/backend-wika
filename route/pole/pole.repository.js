// pole.repository.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllPoles = async () => {
    return await prisma.pole.findMany();
};

const getPoleById = async (id) => {
    return await prisma.pole.findUnique({
        where: { id: Number(id) },
    });
};

const createPole = async (poleData) => {
    return await prisma.pole.create({
        data: poleData,
    });
};


const deletePoleById = async (id) => {
    return await prisma.pole.delete({
        where: { id: Number(id) },
    });
};

const editPoleById = async (id, poleData) => {
    try {
        const updatedPole = await prisma.pole.update({
            where: { id: Number(id) },
            data: poleData,
        });
        return updatedPole;
    } catch (error) {
        console.error("Error updating pole:", error);
        throw new Error("Unable to update pole.");
    }
};


module.exports = {
    getAllPoles,
    getPoleById,
    createPole,
    deletePoleById,
    editPoleById,
};
