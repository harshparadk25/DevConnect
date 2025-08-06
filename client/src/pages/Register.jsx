import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "",username:"", email: "", password: "" });
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    if (res.success) {
      navigate("/login");
      navigate("/login", { state: { message: "Registered successfully. Please login." } });

    } else {
      setError(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full border border-gray-300 p-3 mb-4 rounded-lg"
        required
      />

      <input
  type="text"
  name="username"
  value={form.username}
  onChange={handleChange}
  placeholder="Username"
  className="w-full border border-gray-300 p-3 mb-4 rounded-lg"
  required
/>


      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border border-gray-300 p-3 mb-4 rounded-lg"
        required
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full border border-gray-300 p-3 mb-4 rounded-lg"
        required
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
