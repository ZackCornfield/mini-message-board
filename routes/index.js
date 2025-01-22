const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// Routes
router.get("/", messageController.getMessages);
router.get("/new", messageController.newMessageForm);
router.post("/new", messageController.addMessage);
router.get("/message/:id", messageController.getMessageDetails);

module.exports = router;
