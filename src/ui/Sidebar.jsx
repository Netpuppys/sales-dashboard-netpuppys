import React, { useState } from "react";
import sidebarItems from "../data/sidebarItems";
import logo from "../Assets/logo.png";
import axios from "axios";
import BASEURL from "../BaseURL";
import { useLocation, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const SidebarComp = ({ notifications, leads, missedLeads }) => {
  const navigate = useNavigate(); // ✅ Now inside a component
  const location = useLocation();
  const [loading, setLoading] = useState("");
  const handleLogout = () => {
    setLoading(true);
    axios
      .post(`${BASEURL}/logout`)
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setLoading(false);
        navigate("/"); // Redirect to login page
      })
      .catch((error) => {
        console.error("Logout failed", error);
        setLoading(false);
      });
  };
  const freshLeadsLength = leads.filter(
    (lead) => Array.isArray(lead.action) && lead.action.length === 0
  ).length;

  return (
    <div className={`fixed w-60 top-0 h-screen bg-[#1d1d1d]`}>
      <div className="w-full h-full relative">
        <div className="w-full h-fit border-b-2 border-[#fff] flex items-center justify-start gap-4 px-8">
          <img src={logo} alt="" className="w-fit mx-auto h-fit" />
        </div>
        <div className="w-full px-2 py-10 flex h-fit flex-col items-start justify-start gap-3">
          {sidebarItems.map((item, id) => (
            <div
              key={id}
              className={`w-full h-fit ${
                location.pathname === item.linkTo ? "bg-white" : ""
              }`}
            >
              <button className="w-full flex items-center justify-between px-2 py-2 gap-2">
                <a
                  href={item.linkTo}
                  className={`text-xl ${
                    location.pathname === item.linkTo
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  {item.name}
                </a>
                {item.linkTo === "/notifications" && (
                  <span
                    className={`text-xl ${
                      location.pathname === "/notifications"
                        ? "text-black"
                        : "text-white"
                    }`}
                  >
                    {notifications.length > 0 ? notifications.length : ""}
                  </span>
                )}
                {item.linkTo === "/missed-leads" && (
                  <span
                    className={`text-xl ${
                      location.pathname === "/missed-leads"
                        ? "text-black"
                        : "text-white"
                    }`}
                  >
                    {missedLeads.length > 0 ? missedLeads.length : ""}
                  </span>
                )}
                {item.linkTo === "/fresh-leads" && (
                  <span
                    className={`text-xl ${
                      location.pathname === "/fresh-leads"
                        ? "text-black"
                        : "text-white"
                    }`}
                  >
                    {freshLeadsLength > 0 ? freshLeadsLength : ""}
                  </span>
                )}
              </button>
            </div>
          ))}
          <button
            onClick={handleLogout}
            className="py-2 px-2 text-xl text-white"
          >
            Log Out
          </button>
        </div>
      </div>
      {loading && (
        <div className="fixed w-screen h-screen bg-black bg-opacity-50 backdrop-blur-sm top-0 left-0 z-[9999999] flex justify-center items-center">
          <div className="">
            <ThreeDots color="#FFF" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarComp;
