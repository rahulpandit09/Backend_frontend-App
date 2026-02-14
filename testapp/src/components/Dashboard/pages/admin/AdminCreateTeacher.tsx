import { useState } from "react";
import axios from "axios";

const AdminCreateTeacher = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");   // ✅ changed
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://127.0.0.1:8000/admin/create-teacher",
        { name, email, password },   // ✅ changed
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Teacher created successfully!");
      setName("");
      setEmail("");   // ✅ changed
      setPassword("");

    } catch (error: any) {
      alert(error.response?.data?.detail || "Error creating teacher");
    }
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Add Teacher</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />

      <input
        type="email"                // ✅ changed
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />

      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Create Teacher
      </button>
    </div>
  );
};

export default AdminCreateTeacher;
