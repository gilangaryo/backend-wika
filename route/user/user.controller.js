const express = require("express");
const {
    fetchAllUsers,
    fetchUserById,
    fetchUserByName,
    addUser,
    updateUserById,
    removeUserById,
} = require("./user.service");

const router = express.Router();

// Fetch all users
router.get("/", async (req, res) => {
    try {
        const users = await fetchAllUsers();
        res.status(200).send({
            message: "success",
            data: users
        });
    } catch (error) {
        res.status(400).send({
            message: "failed to fetch users",
            error: error.message
        });
    }
});

// Fetch user by ID
router.get("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await fetchUserById(userId);
        if (user) {
            res.status(200).send({

                message: "success",
                data: user
            });
        } else {
            res.status(404).send({
                message: "user not found"
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "failed to fetch user",
            error: error.message
        });
    }
});

// Create a new user
router.post("/", async (req, res) => {
    try {
        const newUserData = req.body;
        const user = await addUser(newUserData);
        res.status(201).send({
            message: "create user success",
            data: user,
        });
    } catch (error) {
        res.status(400).send({
            message: "failed to create user",
            error: error.message
        });
    }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        await removeUserById(userId);
        res.status(200).send({
            message: "user delete success",
        });
    } catch (error) {
        res.status(400).send({
            message: "failed to delete user",
            error: error.message
        });
    }
});

// Update user by ID
router.put("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        console.log(userData);

        const user = await updateUserById(userId, userData);
        res.status(200).send({

            message: "edit user success",
            data: user,
        });
    } catch (error) {
        res.status(400).send({
            message: "failed to update user",
            error: error.message
        });
    }
});

module.exports = router;
