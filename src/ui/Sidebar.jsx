import React from "react";
import sidebarItems from "../data/sidebarItems";
import logo from "../Assets/logo.png";
import axios from "axios";
import BASEURL from "../BaseURL";
import { useNavigate } from "react-router-dom";

const SidebarComp = () => {
  const navigate = useNavigate(); // ✅ Now inside a component
  const handleLogout = () => {
    axios
      .post(`${BASEURL}/logout`)
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("/"); // Redirect to login page
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  return (
    <div className={`fixed w-60 top-0 h-screen bg-[#1d1d1d]`}>
      <div className="w-full h-full relative">
        <div className="w-full h-fit border-b-2 border-[#fff] flex items-center justify-start gap-4 px-8">
          <img src={logo} alt="" className="w-fit mx-auto h-fit" />
        </div>
        <div className="w-full px-5 py-10 flex h-fit flex-col items-start justify-start gap-3">
          {sidebarItems.map((item, id) => (
            <div key={id} className="w-full h-fit">
              <button className="flex items-center py-2 gap-2">
                <a href={item.linkTo} className={`text-xl text-white`}>
                  {item.name}
                </a>
              </button>
            </div>
          ))}
          <button onClick={handleLogout} className="py-2 text-xl text-white">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarComp;
