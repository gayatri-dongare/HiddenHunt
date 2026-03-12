const Gem = require("../models/Gem");
const cloudinary = require("../config/cloudinary");

// Create Gem
const createGem = async (req, res) => {
  try {

    const { title, description, location, category } = req.body;

    let imageUrl = "";

    if (req.file) {

      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "hiddenhunt"
        }
      );

      imageUrl = result.secure_url;
    }

    const gem = await Gem.create({
      title,
      description,
      location,
      category,
      images: imageUrl ? [imageUrl] : [],
      user: req.user.id
    });

    res.status(201).json({
      message: "Gem created successfully",
      gem
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get All Gems (Explore Feed)
const getGems = async (req, res) => {
  try {

    const gems = await Gem.find()
      .populate("user", "username name")
      .sort({ createdAt: -1 });

    res.json(gems);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Gem
const getSingleGem = async (req, res) => {
  try {

    const gem = await Gem.findById(req.params.id)
      .populate("user", "username name");

    if (!gem) {
      return res.status(404).json({ message: "Gem not found" });
    }

    res.json(gem);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like / Unlike Gem
const likeGem = async (req, res) => {
  try {

    const gem = await Gem.findById(req.params.id);

    if (!gem) {
      return res.status(404).json({ message: "Gem not found" });
    }

    const userId = req.user.id;

    // check if already liked
    const alreadyLiked = gem.likes.includes(userId);

    if (alreadyLiked) {
      // unlike
      gem.likes = gem.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // like
      gem.likes.push(userId);
    }

    await gem.save();

    res.json({
      message: alreadyLiked ? "Gem unliked" : "Gem liked",
      likesCount: gem.likes.length
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Gem
const deleteGem = async (req, res) => {
  try {

    const gem = await Gem.findById(req.params.id);

    if (!gem) {
      return res.status(404).json({ message: "Gem not found" });
    }

    // check ownership
    if (gem.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this gem" });
    }

    await gem.deleteOne();

    res.json({ message: "Gem deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Gem
const updateGem = async (req, res) => {
  try {

    const gem = await Gem.findById(req.params.id);

    if (!gem) {
      return res.status(404).json({ message: "Gem not found" });
    }

    // check ownership
    if (gem.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this gem" });
    }

    const { title, description, location, category } = req.body;

    gem.title = title || gem.title;
    gem.description = description || gem.description;
    gem.location = location || gem.location;
    gem.category = category || gem.category;

    await gem.save();

    res.json({
      message: "Gem updated successfully",
      gem
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search Gems
const searchGems = async (req, res) => {
  try {

    const query = req.query.q;

    const gems = await Gem.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } }
      ]
    }).populate("user", "username");

    res.json(gems);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Trending Gems
const getTrendingGems = async (req, res) => {
  try {

    const gems = await Gem.find()
      .populate("user", "username")
      .sort({ likes: -1 })
      .limit(5);

    res.json(gems);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Gems by User
const getUserGems = async (req, res) => {
  try {

    const gems = await Gem.find({ user: req.params.id })
      .sort({ createdAt: -1 });

    res.json(gems);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { createGem, getGems, likeGem, deleteGem, updateGem, getSingleGem, searchGems, getTrendingGems, getUserGems };