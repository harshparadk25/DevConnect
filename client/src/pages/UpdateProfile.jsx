import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { useEffect } from "react";

const UpdateProfile = () => {
  const { user, token,loading,setUser} = useAuth();
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!loading && !user) {
      toast.error("User not loaded. Please login again.");
      navigate("/login");
    }
  }, [loading, user]);
 
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },reset,
  } = useForm({
    defaultValues: {
      bio: user?.bio || "",
     
      avatar: user?.avatar || "",
    },
  });

  useEffect(() => {
  if (user) {
    reset({
      bio: user.bio || "",
      
      avatar: user.avatar || "",
    });
  }
}, [user, reset]);

  console.log("User:", user);


  const onSubmit = async (updatedData) => {
    const userId = user?.id || user?._id;

    if (!userId) {
  toast.error("User ID not found.");
  return;
}
    try {
      const res = await axios.put(
  `https://devconnectback.onrender.com/api/users/${userId}`,
  updatedData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setUser(res.data);
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Input id="bio" {...register("bio")} />
        </div>

        

        <div>
          <Label htmlFor="avatar">Avatar URL</Label>
          <Input id="avatar" {...register("avatar")} />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
