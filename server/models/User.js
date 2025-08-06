const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
    maxlength: 200,
  },
 github: {
  type: String,
  default: "",
  match: [/^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+$/, "Invalid GitHub URL"]
},

  linkedin: { type: String, default: "" },
  website: { type: String, default: "" },
  avatar: {
  type: String,
  default: function () {
    return `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${this.username}`;
  }
}
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
