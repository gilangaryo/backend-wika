const express = require("express");
const {
    fetchAllPoles,
    fetchPoleById,
    addPole,
    updatePoleById,
    removePoleById,
} = require("./pole.service");

const router = express.Router();

// Get all poles
router.get("/", async (req, res) => {
    try {
        const poles = await fetchAllPoles();
        res.status(200).send({
            status: 200,
            message: "get all poles success",
            data: poles,
        });
    } catch (error) {
        res.status(400).send({
            status: 400,
            message: "get all poles failed",
            error: error.message,
        });
    }
});

// Get pole by ID
router.get("/:id", async (req, res) => {
    try {
        const poleId = req.params.id;
        const pole = await fetchPoleById(poleId);
        if (pole) {
            res.status(200).send({
                status: 200,
                message: "get pole success",
                data: pole,
            });
        } else {
            res.status(404).send({
                status: 404,
                message: "pole not found",
            });
        }
    } catch (error) {
        res.status(400).send({
            status: 400,
            message: "get pole failed",
            error: error.message,
        });
    }
});

// Create a new pole
router.post("/", async (req, res) => {
    try {
        const newPoleData = req.body;
        const pole = await addPole(newPoleData);
        res.status(201).send({
            status: 201,
            message: "create pole success",
            data: pole,
        });
    } catch (error) {
        res.status(400).send({
            status: 400,
            message: "create pole failed",
            error: error.message,
        });
    }
});

// Update a pole by ID
router.put("/:id", async (req, res) => {
    try {
        const poleId = req.params.id;
        const poleData = req.body;
        const pole = await updatePoleById(poleId, poleData);
        if (pole) {
            res.status(200).send({
                status: 200,
                message: "edit pole success",
                data: pole,
            });
        } else {
            res.status(404).send({
                status: 404,
                message: "pole not found",
            });
        }
    } catch (error) {
        res.status(400).send({
            status: 400,
            message: "edit pole failed",
            error: error.message,
        });
    }
});

// Delete a pole by ID
router.delete("/:id", async (req, res) => {
    try {
        const poleId = req.params.id;
        const deletedPole = await removePoleById(poleId);
        if (deletedPole) {
            res.status(200).send({
                status: 200,
                message: "pole delete success",
            });
        } else {
            res.status(404).send({
                status: 404,
                message: "pole not found",
            });
        }
    } catch (error) {
        res.status(400).send({
            status: 400,
            message: "delete pole failed",
            error: error.message,
        });
    }
});

module.exports = router;
