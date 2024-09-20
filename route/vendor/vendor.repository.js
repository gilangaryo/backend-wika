
// vendor.repository.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { convertToGMT7 } = require("../../utilities/gmt7");


const getAllVendors = async () => {
    return await prisma.vendor.findMany();
};

const getVendorById = async (id) => {
    return await prisma.vendor.findUnique({
        where: { vendorId: Number(id) },
    });
};
const getVendorByName = async (name) => {
    return await prisma.vendor.findUnique({
        where: { name: name },
    });
};

const createVendor = async (vendorData) => {
    return await prisma.vendor.create({
        data: {
            name: vendorData.name,
            role: vendorData.role,
            createdAt: convertToGMT7(new Date()),
            updatedAt: convertToGMT7(new Date())
        },
    });
};



const deleteVendorById = async (id) => {
    return await prisma.vendor.delete({
        where: { id: Number(id) },
    });
};

const editVendorById = async (id, vendorData) => {
    try {

        const updatedVendor = await prisma.Vendor.update({
            where: { id: Number(id) },
            data: {
                name: vendorData.name,
                role: vendorData.role,
                updatedAt: convertToGMT7(new Date())
            },
        });
        return updatedVendor;
    } catch (error) {
        console.error("Error updating vendor:", error);
        throw new Error("Unable to update vendor.");
    }
};


module.exports = {
    getAllVendors,
    getVendorById,
    getVendorByName,
    createVendor,
    deleteVendorById,
    editVendorById,
};
