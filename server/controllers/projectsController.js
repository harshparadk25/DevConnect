const Project = require('../models/Project');

const createProject = async(req,res)=>{
    const {title,description,link} = req.body;
    try{
        const newProject = new Project({
            user:req.user.id,
            title,
            description,
            link,
        })
        await newProject.save();
        res.status(201).json(newProject);
    }catch(error){
         res.status(500).json({ message: "Error creating project", error: error.message });
    }
};

const updateProject = async(req,res)=>{
    const {id} = req.params;
    const {title,description,link} = req.body;

    try{
        const project = await Project.findById(id);
        if(!project) return res.status(403).json({ message: "Not authorized to edit this project" });

        if(project.user.toString()!== req.user.id){
            return res.status(403).json({ message: "Not authorized to edit this project" });
        }

         project.title = title || project.title;
    project.description = description || project.description;
    project.link = link || project.link;

    await project.save();
    res.status(200).json(project);
    }catch(error){
         res.status(500).json({ message: "Error updating project", error: error.message });
    }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized to delete this project" });

    await project.deleteOne();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting project", error: err.message });
  }
};

const getAllProjects = async(req,res)=>{
    try {
        
        const projects = await Project.find()
  .populate("user", "name avatar")
  .populate("comments.user", "name avatar");
        res.status(200).json(projects);
    } catch (error) {
         res.status(500).json({ message: "Error fetching projects", error: error.message });
    }
}


const getUserProjects = async(req,res)=>{
    try{
        const {userId} = req.params;
        const projects = await Project.find({user:userId});
        res.status(200).json(projects);
    }catch(error){
        res.status(500).json({ message: "Error fetching user projects", error: error.message });
    }
}

const searchProjects = async (req, res) => {
  const query = req.query.query;

  try {
    const projects = await Project.aggregate([
      {
        $lookup: {
          from: "users", // your User collection
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $match: {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { "user.name": { $regex: query, $options: "i" } },
            { "user.username": { $regex: query, $options: "i" } }
          ]
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          link: 1,
          createdAt: 1,
          updatedAt: 1,
          likes: 1,
          comments: 1,
          user: {
            _id: "$user._id",
            name: "$user.name",
            username: "$user.username",
            avatar: "$user.avatar"
          }
        }
      }
    ]);

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error searching projects", error: error.message });
  }
};


module.exports = { createProject, updateProject, deleteProject , getAllProjects,getUserProjects , searchProjects };