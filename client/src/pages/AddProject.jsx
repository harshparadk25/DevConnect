import { useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://devconnectback.onrender.com/api/projects",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Project added successfully!");
      reset();
      navigate("/projects"); // Redirect to projects list
    } catch (err) {
      console.error(err);
      toast.error("Failed to add project");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Post a New Project</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="title">Project Title</Label>
          <Input id="title" {...register("title", { required: true })} />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description", { required: true })}
            rows={4}
          />
        </div>

        <div>
  <Label htmlFor="link">Project Link</Label>
  <Input
    id="link"
    {...register("link", { required: "Project link is required" })}
  />
</div>


        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Add Project"}
        </Button>
      </form>
    </div>
  );
};

export default AddProject;
