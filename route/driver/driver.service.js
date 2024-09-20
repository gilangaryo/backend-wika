// driver.service.js
const {
    getAllDrivers,
    getDriverById,
    getDriverByName,
    createDriver,
    deleteDriverById,
    editDriverById,
} = require("./driver.repository");

const fetchAllDrivers = async () => {
    return await getAllDrivers();
};

const fetchDriverById = async (id) => {
    return await getDriverById(id);
};
const fetchDriverByName = async (id) => {
    return await getDriverByName(id);
};

const addDriver = async (driverData) => {
    if (!driverData.name || typeof driverData.name !== 'string' || driverData.name.trim() === '') {
        throw new Error('Driver name is required!');
    }
    if (!driverData.role || typeof driverData.role !== 'string' || driverData.role.trim() === '') {
        throw new Error('Driver role is required!');
    }

    return await createDriver(driverData);
};


const removeDriverById = async (id) => {
    return await deleteDriverById(id);
};

const updateDriverById = async (id, driverData) => {
    if (driverData.name === '') {
        throw new Error('Driver name must be not empty!');
    }
    if (driverData.role === '') {
        throw new Error('Driver role must be not empty!');
    }

    return await editDriverById(id, driverData);
};

module.exports = {
    fetchAllDrivers,
    fetchDriverById,
    fetchDriverByName,
    addDriver,
    removeDriverById,
    updateDriverById,
};
