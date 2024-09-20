// vendor.service.js
const {
    getAllVendors,
    getVendorById,
    getVendorByName,
    createVendor,
    deleteVendorById,
    editVendorById,
} = require("./vendor.repository");

const fetchAllVendors = async () => {
    return await getAllVendors();
};

const fetchVendorById = async (id) => {
    return await getVendorById(id);
};
const fetchVendorByName = async (id) => {
    return await getVendorByName(id);
};

const addVendor = async (vendorData) => {
    if (!vendorData.name || typeof vendorData.name !== 'string' || vendorData.name.trim() === '') {
        throw new Error('Vendor name is required!');
    }
    if (!vendorData.role || typeof vendorData.role !== 'string' || vendorData.role.trim() === '') {
        throw new Error('Vendor role is required!');
    }

    return await createVendor(vendorData);
};


const removeVendorById = async (id) => {
    return await deleteVendorById(id);
};

const updateVendorById = async (id, vendorData) => {
    if (vendorData.name === '') {
        throw new Error('Vendor name must be not empty!');
    }
    if (vendorData.role === '') {
        throw new Error('Vendor role must be not empty!');
    }

    return await editVendorById(id, vendorData);
};

module.exports = {
    fetchAllVendors,
    fetchVendorById,
    fetchVendorByName,
    addVendor,
    removeVendorById,
    updateVendorById,
};
