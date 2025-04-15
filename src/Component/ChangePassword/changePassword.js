import React, { useState } from "react";
import BASEURL from "../../BaseURL";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import show from "../../Assets/show.png";
import hide from "../../Assets/hide.png";
import { toast } from "react-toastify";
function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const email = localStorage.getItem("email");
  const handleShowNewPassword = () => {
    if (showNewPassword) {
      setShowNewPassword(false);
    } else {
      setShowNewPassword(true);
    }
  };

  const handleShowOldPassword = () => {
    if (showOldPassword) {
      setShowOldPassword(false);
    } else {
      setShowOldPassword(true);
    }
  };

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (!email || !oldPassword || !newPassword) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BASEURL}/api/auth/change-password`, {
        email,
        oldPassword,
        newPassword,
      });

      if (response.status === 200) {
        toast.success("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
      }
    } catch (error) {
      if (error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Network error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-full h-screen flex flex-col gap-4 items-center justify-center"
    >
      <h3 className="text-xl font-bold">Change Password</h3>
      <div className="px-2 w-full flex items-center max-w-[400px] border-2 border-black rounded-sm">
        <input
          type={showOldPassword ? "text" : "password"}
          value={oldPassword}
          onChange={handleOldPassword}
          className="w-full px-2 py-2 rounded-full focus:outline-none bg-transparent"
          placeholder="Old Password"
        />
        <img
          src={showOldPassword ? show : hide}
          alt="admin"
          onClick={handleShowOldPassword}
          title="icon"
          className="h-[30px] w-[30px]"
        />
      </div>
      <div className="px-2 w-full flex items-center max-w-[400px] border-2 border-black rounded-sm">
        <input
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={handleNewPassword}
          className="w-full px-2 py-2 rounded-full focus:outline-none bg-transparent"
          placeholder="New Password"
        />
        <img
          src={showNewPassword ? show : hide}
          alt="admin"
          onClick={handleShowNewPassword}
          title="icon"
          className="h-[30px] w-[30px]"
        />
      </div>
      {/* submit button */}
      <button
        type="submit"
        className="px-4 py-2 disabled:bg-[#E1E3EA] disabled:border-[#E1E3EA] disabled:text-white hover:bg-transparent hover:text-accent-blue border border-accent-blue text-white text-nowrap bg-accent-blue rounded-lg font-medium leading-[1.25rem] text-sm"
      >
        Change
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

export default ChangePassword;
