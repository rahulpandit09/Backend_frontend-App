import { useState } from "react";
import axios from "axios";

const AdminCreateStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://127.0.0.1:8000/admin/create-student",
        { name, email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Student created successfully!");
      setName("");
      setEmail("");
      setPassword("");

    } catch (error: any) {
      alert(error.response?.data?.detail || "Error creating student");
    }
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-xl  shadow">
      <h2 className="text-2xl font-bold mb-4">Add Student</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />

      <input
        type="email"
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
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Create Student
      </button>
    </div>
  );
};

export default AdminCreateStudent;
