
const User = require("../models/User");

const updateProfile = async(req,res)=>{
    const {userId} = req.params;
     const { bio, github, linkedin, website, avatar } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {bio,github,linkedin,website,avatar},
            {new:true}
        );
        res.status(200).json(updatedUser);
    } catch (error) {
         res.status(500).json({ message: "Error updating profile", error: err.message });
    }
}

const searchUsers = async (req, res) => {
  const query = req.query.query;

  try {
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } }
      ]
    }).select("-password"); 

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error searching users", error });
  }
};

module.exports = {updateProfile , searchUsers};