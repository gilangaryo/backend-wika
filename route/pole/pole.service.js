// pole.service.js
const {
    getAllPoles,
    getPoleById,
    createPole,
    deletePoleById,
    editPoleById,
} = require("./pole.repository");

const fetchAllPoles = async () => {
    return await getAllPoles();
};

const fetchPoleById = async (id) => {
    return await getPoleById(id);
};

const addPole = async (poleData) => {
    return await createPole(poleData);
};

const removePoleById = async (id) => {
    return await deletePoleById(id);
};

const updatePoleById = async (id, poleData) => {
    return await editPoleById(id, poleData);
};

module.exports = {
    fetchAllPoles,
    fetchPoleById,
    addPole,
    removePoleById,
    updatePoleById,
};
