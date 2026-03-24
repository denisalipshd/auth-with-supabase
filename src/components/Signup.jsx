import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }

    try {
      const data = await signUp(email, password);
      console.log(data);

      if (data?.session) {
        navigate("/dashboard");
      } else {
        setError("Login gagal, kemungkinan email belum diverifikasi");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign Up</h1>

        <form onSubmit={handleSignUp}>
          {error && <p className="text-red-500 text-center text-sm mb-3">{error}</p>}

          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
              className="border border-gray-300 w-full p-2 mt-1"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label>Password</label>
            <input
              type="password"
              className="border border-gray-300 w-full p-2 mt-1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 disabled:opacity-50">
            {loading ? "Loading..." : "Sign Up"}
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600">
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
