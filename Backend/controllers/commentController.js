const Comment = require("../models/Comment");

// Add Comment
const addComment = async (req, res) => {
  try {

    const { text } = req.body;

    const comment = await Comment.create({
      text,
      user: req.user.id,
      gem: req.params.gemId
    });

    res.status(201).json({
      message: "Comment added",
      comment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get Comments for a Gem
const getComments = async (req, res) => {
  try {

    const comments = await Comment.find({ gem: req.params.gemId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json(comments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addComment, getComments };