import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {user.bio && (
          <div>
            <h4 className="font-semibold">Bio:</h4>
            <p>{user.bio}</p>
          </div>
        )}

        
      </div>

      <div className="mt-6">
        <Button onClick={() => navigate("/update-profile")}>
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default Profile;
