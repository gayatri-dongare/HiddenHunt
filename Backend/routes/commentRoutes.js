const express = require("express");
const router = express.Router();

const { addComment, getComments } = require("../controllers/commentController");
const protect = require("../middleware/authMiddleware");

router.post("/:gemId", protect, addComment);
router.get("/:gemId", protect, getComments);

module.exports = router;