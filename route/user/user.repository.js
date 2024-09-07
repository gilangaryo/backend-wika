
// user.repository.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { convertToGMT7 } = require("../../utilities/gmt7");


const getAllUsers = async () => {
    return await prisma.user.findMany();
};

const getUserById = async (id) => {
    return await prisma.user.findUnique({
        where: { id: Number(id) },
    });
};
const getUserByName = async (name) => {
    return await prisma.user.findUnique({
        where: { name: name },
    });
};

const createUser = async (userData) => {
    return await prisma.user.create({
        data: {
            name: userData.name,
            role: userData.role,
            createdAt: convertToGMT7(new Date()),
            updatedAt: convertToGMT7(new Date())
        },
    });
};



const deleteUserById = async (id) => {
    return await prisma.user.delete({
        where: { id: Number(id) },
    });
};

const editUserById = async (id, userData) => {
    try {

        const updatedUser = await prisma.User.update({
            where: { id: Number(id) },
            data: {
                name: userData.name,
                role: userData.role,
                updatedAt: convertToGMT7(new Date())
            },
        });
        return updatedUser;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Unable to update user.");
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    getUserByName,
    createUser,
    deleteUserById,
    editUserById,
};
