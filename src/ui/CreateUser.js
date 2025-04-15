import React, { useState } from "react";
import BASEURL from "../BaseURL";
import { ThreeDots } from "react-loader-spinner";
import show from "../Assets/show.png";
import hide from "../Assets/hide.png";
import axios from "axios";
import { toast } from "react-toastify";
const CreateUser = ({ createUser, setCreateUser }) => {
  const [loading, setLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  // Example usage
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASEURL}/api/auth/create-user`,
        formData
      );

      if (response.data.message) {
        toast.success(response.data.message); // Show alert with the success message
      }
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        role: "",
        password: "",
      });
      window.location.reload();
      setCreateUser(false);
    } catch (error) {
      console.error("Error creating user", error);
      setLoading(false);
    }
  };
  return (
    <>
      {createUser && (
        <div
          className={`fixed w-[calc(100%-15rem)] top-0 h-screen right-0 flex z-50`}
        >
          <div
            onClick={() => {
              setCreateUser(null);
              setFormData({
                connectionStatus: "",
                connectedVia: "",
                clientStage: "",
                remarks: "",
                nextFollowUp: "",
              });
            }}
            className="w-[calc(100%-45rem)] h-full"
          ></div>

          <div
            className={`fixed top-0 shadow-2xl h-screen bg-white w-[45rem] ${
              createUser ? "right-0 block" : "right-full hidden z-50"
            } `}
          >
            <div className="flex items-center justify-between shadow-lg  bg-white z-20 relative h-[4.75rem] px-8">
              <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
                Create User
              </p>
              <button
                onClick={() => {
                  setCreateUser(null);
                  setFormData({
                    name: "",
                    email: "",
                    role: "",
                    password: "",
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#121C2D]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form className="w-full h-[calc(100%-4.75rem)] overflow-y-auto">
              <div className="p-6 flex h-full flex-col justify-start items-end mx-auto bg-white rounded-lg">
                {/* Name Input */}
                <div className="flex flex-col w-full mb-4">
                  <label className="font-medium text-[#121C2D] flex items-center gap-2">
                    <div className="w-1 aspect-square rounded-full bg-red-500"></div>
                    Name
                  </label>
                  <input
                    value={formData.name}
                    onChange={handleOnChange}
                    name="name"
                    className="mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
                    required
                  />
                </div>

                <div className="flex flex-col w-full mb-4">
                  <label className="font-medium text-[#121C2D] flex items-center gap-2">
                    <div className="w-1 aspect-square rounded-full bg-red-500"></div>
                    Email{" "}
                  </label>
                  <input
                    className="mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
                    value={formData.email}
                    name="email"
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div className="flex flex-col w-full mb-4">
                  <label className="font-medium text-[#121C2D] flex items-center gap-2">
                    <div className="w-1 aspect-square rounded-full bg-red-500"></div>
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={handleOnChange}
                    name="role"
                    className="mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Sales">Sales</option>
                    <option value="Admin">Admin</option>
                    <option value="Performance">Performance</option>
                    <option value="Tech">Tech</option>
                  </select>
                </div>
                <div className="flex flex-col w-full mb-4">
                  <label className="font-medium text-[#121C2D] flex items-center gap-2">
                    <div className="w-1 aspect-square rounded-full bg-red-500"></div>
                    Set Password{" "}
                  </label>
                  <div className="mt-1 px-1 flex items-center border border-gray-300 focus:outline-none rounded-lg">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleOnChange}
                      name="password"
                      className="w-full px-1 py-2 rounded-full focus:outline-none bg-transparent"
                      placeholder="Password"
                      required
                    />
                    <img
                      src={showPassword ? show : hide}
                      alt="password"
                      onClick={handleShowPassword}
                      title="icon"
                      className="h-[30px] w-[30px]"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="h-full w-full items-end flex justify-end ">
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="px-4 py-2 disabled:bg-[#E1E3EA] disabled:border-[#E1E3EA] disabled:text-white hover:bg-transparent hover:text-accent-blue border border-accent-blue text-white text-nowrap bg-accent-blue rounded-lg font-medium leading-[1.25rem] text-sm mb-10"
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
          {loading && (
            <div className="fixed w-screen h-screen bg-black bg-opacity-50 backdrop-blur-sm top-0 left-0 z-[9999999] flex justify-center items-center">
              <div className="">
                <ThreeDots color="#FFF" />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CreateUser;
