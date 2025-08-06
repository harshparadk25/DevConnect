const express = require('express');
const router = express.Router();

const verifyToken = require("../middleware/verify");
const {createProject, updateProject, deleteProject,getAllProjects,getUserProjects,searchProjects} = require("../controllers/projectsController")

const {addComment, deleteComment} = require('../controllers/comment');

const {like,unlikeProject} = require('../controllers/like');


router.post('/',verifyToken,createProject);
router.put("/:id",verifyToken,updateProject);
router.delete('/:id',verifyToken,deleteProject);
router.get("/",getAllProjects);
router.get("/search", searchProjects);
router.get("/user/:userId",getUserProjects);

router.post('/:id/comment', verifyToken, addComment);
router.delete('/:id/comment/:commentId', verifyToken, deleteComment);

router.put('/:id/like', verifyToken, like);
router.put('/:id/unlike', verifyToken, unlikeProject);

module.exports = router;