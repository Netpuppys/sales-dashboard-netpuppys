import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASEURL from "../BaseURL";
import axios from "axios";
import logo from "../Assets/logo.png";
function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleemail = (e) => {
    setemail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(`${BASEURL}/login`, {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("token", response.data.token);
        // Handle any success response if needed
        alert(`Welcome ${localStorage.getItem("name")}`, {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        alert("Incorrect email or Password. Try again.", {
          position: "top-center",
          autoClose: 3000,
        });
        console.error("Login failed", error); // Handle any error response if needed
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-full h-screen flex flex-col gap-4 items-center justify-center"
    >
      <img src={logo} alt="" className="w-fit h-fit" />
      <h3 className="text-xl font-bold">Login</h3>
      <input
        value={email}
        onChange={handleemail}
        type="email"
        placeholder="Email ID"
        className="px-4 py-2 w-full max-w-[400px] border-2 border-black rounded-sm"
      />
      <input
        value={password}
        onChange={handlePassword}
        type="password"
        placeholder="Password"
        className="px-4 py-2 w-full max-w-[400px] border-2 border-black rounded-sm"
      />
      {/* submit button */}
      <button
        type="submit"
        className="px-4 py-2 disabled:bg-[#E1E3EA] disabled:border-[#E1E3EA] disabled:text-white hover:bg-transparent hover:text-accent-blue border border-accent-blue text-white text-nowrap bg-accent-blue rounded-lg font-medium leading-[1.25rem] text-sm"
      >
        Log In
      </button>
    </form>
  );
}

export default Login;
