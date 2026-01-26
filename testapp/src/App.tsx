import { useState } from "react";
import StudentRegister from "./components/StudentRegister";
import Login from "./components/Login";

function App() {
  const [page, setPage] = useState("register");

  return (
    <div>
      <div className="text-center mt-3">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setPage("register")}
        >
          Register
        </button>

        <button
          className="btn btn-outline-success"
          onClick={() => setPage("login")}
        >
          Login
        </button>
      </div>

      {page === "register" && <StudentRegister />}
      {page === "login" && <Login />}
    </div>
  );
}

export default App;



