import { useState } from "react";
import { registerStudent } from "../api/auth.api";

/** ✅ Type for form data */
type StudentForm = {
  full_name: string;
  email: string;
  password: string;
  role: string;
};

function StudentRegister() {
  const [form, setForm] = useState<StudentForm>({
    full_name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [message, setMessage] = useState<string>("");

  /** ✅ Typed change handler */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  /** ✅ Typed submit handler */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await registerStudent(form);
      setMessage("Student registered successfully ✅");

      setForm({
        full_name: "",
        email: "",
        password: "",
        role: "student",
      });
    } catch (err: any) {
      setMessage(
        err?.response?.data?.detail ||
          "Registration failed ❌"
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">
          Student Registration
        </h3>

        {message && (
          <div className="alert alert-info text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Full Name"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentRegister;
