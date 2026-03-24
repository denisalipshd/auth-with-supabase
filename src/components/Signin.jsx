import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await signIn(email, password);
      console.log("LOGIN:", data);

      // cek session
      if (data?.session) {
        navigate("/dashboard");
      } else {
        setError("Login gagal, kemungkinan email belum diverifikasi");
      }
    } catch (err) {
      console.error(err);

      // custom error user friendly
      if (err.message.includes("Invalid login credentials")) {
        setError("Email atau password salah");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Sign In
        </h1>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="border border-gray-300 w-full p-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="border border-gray-300 w-full p-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;