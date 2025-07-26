// controllers/CommentController.js
const Comment = require('../models/CommentModel');
const Bug = require('../models/BugModel');
const { Readable } = require('stream');
const cloudinary = require('../utils/Cloudinary');


const documentUpload = async (fileBuffer, originalName) => {
  return new Promise((resolve, reject) => {
    const bufferStream = new Readable()
    bufferStream.push(fileBuffer)
    bufferStream.push(null)

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        folder: `TrackMantisBug/Bug/CommentFiles/${originalName}`,
        public_id: originalName.split('.').slice(0, -1).join('')
      }, (error, result) => {
        if (error) return reject(error);
        resolve(result)
      }
    )
    bufferStream.pipe(stream);
  })
}

exports.createComment = async (req, res) => {
  try {
    const { bugId, comment } = req.body;
    const userId = req.user._id;
    const userName = req.user.name;
    const userImage = req.user.image.url;

    let uploadFile = null;

    if (req.file) {
      const uploadedFile = await documentUpload(req.file.buffer, req.file.originalname);
      uploadFile = {
        url: uploadedFile.secure_url,
        public_id: uploadedFile.public_id,
        fileName: req.file.originalname,
      };
    }

    // Create new comment
    const newComment = await Comment.create({
      comment,
      bug: bugId,
      uploadFile, // will be a single object now
      createdBy: { userId, userName, userImage },
    });

    await Bug.findByIdAndUpdate(bugId, {
      $push: { comments: newComment._id },
    });

    return res.status(201).json({
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.getCommentsByBugId = async (req, res) => {
  try {
    const { bugId } = req.params;


    const comments = await Comment.find({ bug: bugId })
      .sort({ createdAt: -1 })
      .populate('createdBy.userId', 'name image'); // Populate user details

    return res.status(200).json({ comments });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

exports.deleteCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id; // From authentication middleware

    // 1. Find the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // 2. Verify ownership (optional: skip if admins can delete any comment)
    if (comment.createdBy.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    // 3. Remove comment from Bug's comments array
    await Bug.findByIdAndUpdate(comment.bug, {
      $pull: { comments: commentId }
    });

    // 4. Delete the comment
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({
      message: 'Server error while deleting comment',
      error: error.message
    });
  }
};