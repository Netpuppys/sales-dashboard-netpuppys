import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASEURL from "../BaseURL";
import axios from "axios";
import logo from "../Assets/logoBlack.png";
import { ThreeDots } from "react-loader-spinner";
import show from "../Assets/show.png";
import hide from "../Assets/hide.png";
function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

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
      .post(`${BASEURL}/api/auth/login`, {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        // Handle any success response if needed
        setLoading(false);
        alert(`Welcome ${localStorage.getItem("name")}`, {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        alert("Incorrect email or Password. Try again.", {
          position: "top-center",
          autoClose: 3000,
        });
        console.error("Login failed", error); // Handle any error response if needed
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
      <div className="px-2 w-full flex items-center max-w-[400px] border-2 border-black rounded-sm">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePassword}
          className="w-full px-2 py-2 rounded-full focus:outline-none bg-transparent"
          placeholder="Password"
        />
        <img
          src={showPassword ? show : hide}
          alt="admin"
          onClick={handleShowPassword}
          title="icon"
          className="h-[30px] w-[30px]"
        />
      </div>
      {/* submit button */}
      <button
        type="submit"
        className="px-4 py-2 disabled:bg-[#E1E3EA] disabled:border-[#E1E3EA] disabled:text-white hover:bg-transparent hover:text-accent-blue border border-accent-blue text-white text-nowrap bg-accent-blue rounded-lg font-medium leading-[1.25rem] text-sm"
      >
        Log In
      </button>
      {loading && (
        <div className="fixed w-screen h-screen bg-black bg-opacity-50 backdrop-blur-sm top-0 left-0 z-[9999999] flex justify-center items-center">
          <div className="">
            <ThreeDots color="#FFF" />
          </div>
        </div>
      )}
    </form>
  );
}

export default Login;
