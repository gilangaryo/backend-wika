const express = require("express");
const {
    fetchAllDrivers,
    fetchDriverById,
    fetchDriverByName,
    addDriver,
    updateDriverById,
    removeDriverById,
} = require("./driver.service");

const router = express.Router();

// Fetch all drivers
router.get("/", async (req, res) => {
    try {

        const drivers = await fetchAllDrivers();
        res.status(200).send({
            message: "success",
            data: drivers
        });
    } catch (error) {
        res.status(400).send({
            message: "failed to fetch drivers",
            error: error.message
        });
    }
});

// Fetch driver by ID
router.get("/:id", async (req, res) => {
    try {
        const driverId = req.params.id;
        if (isNaN(driverId)) return res.status(400).send({ error: "bad request" })
        const driver = await fetchDriverById(driverId);
        if (driver) {
            res.status(200).send({

                message: "success",
                data: driver
            });
        } else {
            res.status(404).send({
                message: "driver not found"
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "failed to fetch driver",
            error: error.message
        });
    }
});

// Create a new driver
router.post("/", async (req, res) => {
    try {
        const newDriverData = req.body;
        const driver = await addDriver(newDriverData);
        res.status(201).send({
            message: "create driver success",
            data: driver,
        });
    } catch (error) {
        res.status(400).send({
            message: "failed to create driver",
            error: error.message
        });
    }
});

// Delete a driver by ID
router.delete("/:id", async (req, res) => {
    try {
        const driverId = req.params.id;
        await removeDriverById(driverId);
        res.status(200).send({
            message: "driver delete success",
        });
    } catch (error) {
        res.status(400).send({
            message: "failed to delete driver",
            error: error.message
        });
    }
});

// Update driver by ID
router.put("/:id", async (req, res) => {
    try {
        const driverId = req.params.id;
        const driverData = req.body;
        console.log(driverData);

        const driver = await updateDriverById(driverId, driverData);
        res.status(200).send({

            message: "edit driver success",
            data: driver,
        });
    } catch (error) {
        res.status(400).send({
            message: "failed to update driver",
            error: error.message
        });
    }
});

module.exports = router;
