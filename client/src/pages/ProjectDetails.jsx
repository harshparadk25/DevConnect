import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import API from "../lib/axios"; // ✅ use centralized instance

const ProjectDetails = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [project, setProject] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProject = async () => {
    try {
      const res = await API.get("/projects"); // ✅ centralized call
      const fullProject = res.data.find((proj) => proj._id === id);
      setProject(fullProject);
    } catch (err) {
      console.error("Error fetching project", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await API.post(`/projects/${id}/comment`, { text: commentText }); // ✅ use API

      setProject((prev) => ({
        ...prev,
        comments: [...prev.comments, res.data],
      }));

      setCommentText("");
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (loading) return <p className="p-6">Loading project...</p>;
  if (!project) return <p className="p-6">Project not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
      <p className="text-gray-700 mb-4">{project.description}</p>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        {project.link}
      </a>

      <div className="flex items-center mt-4">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src={project.user?.avatar} />
          <AvatarFallback>{project.user?.name?.[0]}</AvatarFallback>
        </Avatar>
        <p className="text-sm text-gray-500">Uploaded by: {project.user?.name}</p>
      </div>

      <hr className="my-6" />

      <h3 className="text-lg font-semibold mb-2">Comments</h3>

      <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
        {project.comments?.length > 0 ? (
          project.comments.map((comment) => (
            <div key={comment._id} className="flex items-start gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.user?.avatar} />
                <AvatarFallback>{comment.user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{comment.user?.name}</p>
                <p className="text-sm text-gray-700">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">No comments yet.</p>
        )}
      </div>

      {token && (
        <div className="flex gap-2">
          <Input
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button onClick={handleAddComment}>Post</Button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
