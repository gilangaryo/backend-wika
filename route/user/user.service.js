// user.service.js
const {
    getAllUsers,
    getUserById,
    getUserByName,
    createUser,
    deleteUserById,
    editUserById,
} = require("./user.repository");

const fetchAllUsers = async () => {
    return await getAllUsers();
};

const fetchUserById = async (id) => {
    return await getUserById(id);
};
const fetchUserByName = async (id) => {
    return await getUserByName(id);
};

const addUser = async (userData) => {
    if (!userData.name || typeof userData.name !== 'string' || userData.name.trim() === '') {
        throw new Error('User name is required!');
    }
    if (!userData.role || typeof userData.role !== 'string' || userData.role.trim() === '') {
        throw new Error('User role is required!');
    }

    return await createUser(userData);
};


const removeUserById = async (id) => {
    return await deleteUserById(id);
};

const updateUserById = async (id, userData) => {
    if (userData.name === '') {
        throw new Error('User name must be not empty!');
    }
    if (userData.role === '') {
        throw new Error('User role must be not empty!');
    }

    return await editUserById(id, userData);
};

module.exports = {
    fetchAllUsers,
    fetchUserById,
    fetchUserByName,
    addUser,
    removeUserById,
    updateUserById,
};
