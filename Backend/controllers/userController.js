const User = require("../models/user");
const Gem = require("../models/Gem");

// Get user profile + their gems
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const gems = await Gem.find({ user: req.params.id }).sort({
      createdAt: -1,
    });

    res.json({
      user,
      gems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//getSingleGem
const getSingleGem = async (req, res) => {
  try {
    const gem = await Gem.findById(req.params.id).populate(
      "user",
      "username name",
    );

    if (!gem) {
      return res.status(404).json({ message: "Gem not found" });
    }

    res.json(gem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserProfile, getSingleGem };
