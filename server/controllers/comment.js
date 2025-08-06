const Project = require('../models/Project');

const addComment = async(req,res)=>{
    const {id} = req.params;
    const {text} = req.body;

    try{
        const project = await Project.findById(id);
        if(!project) return res.status(404).json({message: "Project not found"});


        const comment = {
            user:req.user.id,
            text,
        };

        project.comments.push(comment);
        await project.save();

        await project.populate("comments.user", "name avatar");
const newComment = project.comments[project.comments.length - 1];
res.status(201).json(newComment);
    }catch(error){
         res.status(500).json({ message: "Failed to add comment", error: err.message });
    }
};

const deleteComment = async(req,res)=>{
    const {id,commentId} = req.params;
    try {
         const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const comment = project.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if(comment.user.toString()!==req.user.id){
         return res.status(403).json({ message: "Unauthorized to delete this comment" });
    }

    comment.remove();
    await project.save();

   const updatedProject = await Project.findById(id).populate("comments.user", "name avatar");
        res.status(200).json({
            message: "Comment deleted successfully",
            comments: updatedProject.comments
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete comment", error: error.message });
    }
}

module.exports ={
    addComment,deleteComment
}