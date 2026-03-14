const Gem = require("../models/Gem");
const cloudinary = require("../config/cloudinary");

// Create Gem
const createGem = async (req, res) => {
  try {

    const { title, description, location, category, mapLink } = req.body;

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
      mapLink,
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

// Get All Gems
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

// Like / Unlike
const likeGem = async (req, res) => {
  try {

    const gem = await Gem.findById(req.params.id);

    const userId = req.user.id;

    const alreadyLiked = gem.likes.includes(userId);

    if (alreadyLiked) {
      gem.likes = gem.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
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

// Delete
const deleteGem = async (req, res) => {
  try {

    const gem = await Gem.findById(req.params.id);

    if (gem.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await gem.deleteOne();

    res.json({ message: "Gem deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
const updateGem = async (req, res) => {
  try {

    const gem = await Gem.findById(req.params.id);

    gem.title = req.body.title || gem.title;
    gem.location = req.body.location || gem.location;
    gem.category = req.body.category || gem.category;
    gem.description = req.body.description || gem.description;
    gem.mapLink = req.body.mapLink || gem.mapLink;

    const updatedGem = await gem.save();

    res.json(updatedGem);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search
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

// Trending (sorted by number of likes)
const getTrendingGems = async (req, res) => {
  try {

    const gems = await Gem.aggregate([
      {
        $addFields: {
          likesCount: { $size: "$likes" }
        }
      },
      {
        $sort: { likesCount: -1, createdAt: -1 }
      },
      {
        $limit: 5
      }
    ]);

    const populated = await Gem.populate(gems, {
      path: "user",
      select: "username"
    });

    res.json(populated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Gems
const getUserGems = async (req, res) => {
  try {

    const gems = await Gem.find({ user: req.params.id })
      .sort({ createdAt: -1 });

    res.json(gems);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createGem,
  getGems,
  likeGem,
  deleteGem,
  updateGem,
  getSingleGem,
  searchGems,
  getTrendingGems,
  getUserGems
};