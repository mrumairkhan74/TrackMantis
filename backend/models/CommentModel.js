// models/Comment.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    trim: true
  },
  bug: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bug',
    required: true
  },
  createdBy: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    userImage: {
      type: String
    }
  },
  uploadFile: [  // 🔁 changed from singular object to array of objects
    {
      url: {
        type: String,
        required: true
      },
      public_id: {
        type: String,
        required: true
      },
      fileName: String
    }
  ],
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment