const express = require("express");
const {
    fetchAllVendors,
    fetchVendorById,
    fetchVendorByName,
    addVendor,
    updateVendorById,
    removeVendorById,
} = require("./vendor.service");

const router = express.Router();

// Fetch all vendors
router.get("/", async (req, res) => {
    try {

        const vendors = await fetchAllVendors();
        res.status(200).send({
            message: "success",
            data: vendors
        });
    } catch (error) {
        res.status(400).send({
            message: "failed to fetch vendors",
            error: error.message
        });
    }
});

// Fetch vendor by ID
router.get("/:id", async (req, res) => {
    try {
        const vendorId = req.params.id;
        if (isNaN(vendorId)) return res.status(400).send({ error: "bad request" })
        const vendor = await fetchVendorById(vendorId);
        if (vendor) {
            res.status(200).send({

                message: "success",
                data: vendor
            });
        } else {
            res.status(404).send({
                message: "vendor not found"
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "failed to fetch vendor",
            error: error.message
        });
    }
});

// Create a new vendor
router.post("/", async (req, res) => {
    try {
        const newVendorData = req.body;
        const vendor = await addVendor(newVendorData);
        res.status(201).send({
            message: "create vendor success",
            data: vendor,
        });
    } catch (error) {
        res.status(400).send({
            message: "failed to create vendor",
            error: error.message
        });
    }
});

// Delete a vendor by ID
router.delete("/:id", async (req, res) => {
    try {
        const vendorId = req.params.id;
        await removeVendorById(vendorId);
        res.status(200).send({
            message: "vendor delete success",
        });
    } catch (error) {
        res.status(400).send({
            message: "failed to delete vendor",
            error: error.message
        });
    }
});

// Update vendor by ID
router.put("/:id", async (req, res) => {
    try {
        const vendorId = req.params.id;
        const vendorData = req.body;
        console.log(vendorData);

        const vendor = await updateVendorById(vendorId, vendorData);
        res.status(200).send({

            message: "edit vendor success",
            data: vendor,
        });
    } catch (error) {
        res.status(400).send({
            message: "failed to update vendor",
            error: error.message
        });
    }
});

module.exports = router;
