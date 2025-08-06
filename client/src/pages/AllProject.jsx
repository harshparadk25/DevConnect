import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import API from "../lib/axios"; // ✅ use central API instance

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [commentText, setCommentText] = useState({});
  const [commentSubmitting, setCommentSubmitting] = useState({});

  const ensureHttp = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects"); // ✅ GET instead of POST
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (query) => {
    try {
      const res = await API.get(`/users/search?query=${query}`); // ✅ use API
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to search users", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [token]);

  const handleCommentChange = (projectId, value) => {
    setCommentText((prev) => ({ ...prev, [projectId]: value }));
  };

  const handleAddComment = async (projectId) => {
    const text = commentText[projectId]?.trim();
    if (!text) return;

    setCommentSubmitting((prev) => ({ ...prev, [projectId]: true }));

    try {
      const res = await API.post(`/projects/${projectId}/comment`, { text }); // ✅ use API

      setProjects((prev) =>
        prev.map((proj) =>
          proj._id === projectId
            ? { ...proj, comments: [...proj.comments, res.data] }
            : proj
        )
      );

      setCommentText((prev) => ({ ...prev, [projectId]: "" }));
    } catch (err) {
      console.error("Failed to add comment", err);
    } finally {
      setCommentSubmitting((prev) => ({ ...prev, [projectId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Projects</h1>
      <div className="grid gap-6 grid-cols-1">
        {projects.map((project) => (
          <Card key={project._id} className="p-4">
            <CardContent className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="text-sm text-gray-600 my-2">{project.description}</p>
                {project.link ? (
                  <a
                    href={ensureHttp(project.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Visit Project
                  </a>
                ) : (
                  <p className="text-sm text-gray-400 italic">No link provided</p>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  Uploaded by: {project.user?.name || "Unknown"}
                </p>
              </div>

              <div className="md:w-1/2">
                <h3 className="text-md font-semibold mb-2">Comments</h3>

                <div className="max-h-40 overflow-y-auto mb-4">
                  {project.comments.length > 0 ? (
                    project.comments.map((comment) => (
                      <div key={comment._id} className="flex items-start gap-3 mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.user?.avatar} />
                          <AvatarFallback>{comment.user?.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{comment.user?.name || "User"}</p>
                          <p className="text-sm text-gray-700">{comment.text}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No comments yet.</p>
                  )}
                </div>

                {token && (
                  <div className="flex gap-2 items-center">
                    <Input
                      placeholder="Add a comment..."
                      value={commentText[project._id] || ""}
                      onChange={(e) => handleCommentChange(project._id, e.target.value)}
                    />
                    <Button
                      disabled={commentSubmitting[project._id]}
                      onClick={() => handleAddComment(project._id)}
                    >
                      {commentSubmitting[project._id] ? "Posting..." : "Post"}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
