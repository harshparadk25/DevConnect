import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [form, setForm] = useState({ emailOrUsername: "", password: "" });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successAnim, setSuccessAnim] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await login(form);
    setLoading(false);

    if (res.success) {
      setSuccessAnim(true);
      setTimeout(() => {
        navigate("/");
      }, 1000); 
    } else {
      setError(res.message);
    }
  };

  return (
    <>
      {!successAnim ? (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
         <input
  type="text"
  name="emailOrUsername"
  value={form.emailOrUsername}
  onChange={handleChange}
  placeholder="Email or Username"
  className="w-full border p-2 mb-4 rounded"
  required
/>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border p-2 mb-4 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </motion.form>
      ) : (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-green-600 mb-2">Login Successful!</h2>
          <p className="text-gray-600">Redirecting to Dashboard...</p>
        </motion.div>
      )}
    </>
  );
};

export default Login;
