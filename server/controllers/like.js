const Project = require("../models/Project");

const like = async(req,res)=>{
    const {id} = req.params;

    try {
        const project = await Project.findById(id);
        if(!project){
            return res.status(404).json({ message: "Project not found" });
        }

        if(project.likes.includes(req.user.id)){
            return res.status(400).json({ message: "Already liked this project" });
        }

        project.likes.push(req.user.id);
        await project.save();

          res.status(200).json({ message: "Project liked" });
    } catch (error) {
         res.status(500).json({ message: "Failed to like project", error: error.message });
    }
};

const unlikeProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const index = project.likes.indexOf(req.user.id);
    if (index === -1)
      return res.status(400).json({ message: "You haven't liked this project yet" });

    project.likes.splice(index, 1);
    await project.save();

    res.status(200).json({ message: "Project unliked" });
  } catch (err) {
    res.status(500).json({ message: "Failed to unlike project", error: err.message });
  }
};

module.exports = {
  like,
  unlikeProject
};