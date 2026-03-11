const express = require("express");
const router = express.Router();

const { createGem, getGems, likeGem, deleteGem, updateGem, getSingleGem, searchGems, getTrendingGems } = require("../controllers/gemController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/", protect, upload.single("image"), createGem);
router.get("/", protect, getGems);
router.get("/trending", protect, getTrendingGems);
router.get("/search", protect, searchGems);
router.get("/:id", protect, getSingleGem);
router.post("/:id/like", protect, likeGem);
router.delete("/:id", protect, deleteGem);
router.put("/:id", protect, updateGem);


module.exports = router;