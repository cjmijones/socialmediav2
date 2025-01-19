import React, { useState } from "react";
import api from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.user.isLoading);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    dispatch(loginStart());
    try {
      const res = await api.post("/auth/signin", { username, password });
      const { token, tokenExpiry, ...userData } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiry", tokenExpiry);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      dispatch(loginSuccess(userData));
      navigate("/");
    } catch (err) {
      dispatch(loginFailed());
      setErrorMessage(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    dispatch(loginStart());
    try {
      const res = await api.post("/auth/signup", { username, email, password });
      const { token, tokenExpiry, ...userData } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiry", tokenExpiry);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      dispatch(loginSuccess(userData));
      navigate("/");
    } catch (err) {
      dispatch(loginFailed());
      setErrorMessage(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <>
      <p
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "20px",
          color: "red",
        }}
      >
        WARNING: SERVER MAY BE INACTIVE. PLEASE ALLOW 80 - 100 SECONDS FOR
        SERVER ACTIVATION
      </p>
      <div className="h-screen w-screen flex items-center justify-center">
        <form
          className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10 overflow-y-auto"
          style={{ maxHeight: "80vh" }}
        >
          <h2 className="text-3xl font-bold text-center">Sign in to Twitter</h2>
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
          {loading && <p className="text-center">Loading...</p>}
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            className="text-xl py-2 rounded-full px-4"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="text-xl py-2 rounded-full px-4"
          />
          <button
            className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
            onClick={handleLogin}
            disabled={loading}
          >
            Sign in
          </button>
          <p className="text-center text-xl">Don't have an account?</p>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            className="text-xl py-2 rounded-full px-4"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
            required
            className="text-xl py-2 rounded-full px-4"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="text-xl py-2 rounded-full px-4"
          />
          <button
            onClick={handleSignup}
            className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
            type="submit"
            disabled={loading}
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signin;
