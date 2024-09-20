
// driver.repository.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { convertToGMT7 } = require("../../utilities/gmt7");


const getAllDrivers = async () => {
    return await prisma.driver.findMany();
};

const getDriverById = async (id) => {
    return await prisma.driver.findUnique({
        where: { driverId: Number(id) },
    });
};
const getDriverByName = async (name) => {
    return await prisma.driver.findUnique({
        where: { name: name },
    });
};

const createDriver = async (driverData) => {
    return await prisma.driver.create({
        data: {
            name: driverData.name,
            role: driverData.role,
            createdAt: convertToGMT7(new Date()),
            updatedAt: convertToGMT7(new Date())
        },
    });
};



const deleteDriverById = async (id) => {
    return await prisma.driver.delete({
        where: { id: Number(id) },
    });
};

const editDriverById = async (id, driverData) => {
    try {

        const updatedDriver = await prisma.Driver.update({
            where: { id: Number(id) },
            data: {
                name: driverData.name,
                role: driverData.role,
                updatedAt: convertToGMT7(new Date())
            },
        });
        return updatedDriver;
    } catch (error) {
        console.error("Error updating driver:", error);
        throw new Error("Unable to update driver.");
    }
};


module.exports = {
    getAllDrivers,
    getDriverById,
    getDriverByName,
    createDriver,
    deleteDriverById,
    editDriverById,
};
