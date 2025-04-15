import React, { useState } from "react";
import BASEURL from "../BaseURL";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
const TakeAction = ({ actionId, setActionId }) => {
  const [remarksPlaceholder, setRemarksPlaceholder] = useState("Notes");
  const [nextFollowUpDate, setNextFollowUpDate] = useState("");
  const [mentionClientStage, setMentionClientStage] = useState("");
  const [loading, setLoading] = useState("");
  const [formData, setFormData] = useState({
    connectionStatus: "",
    connectedVia: "",
    clientStage: "",
    remarks: "",
    nextFollowUp: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConnectedViaChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, connectedVia: value }));

    // Update placeholder immediately based on the selected option
    switch (value) {
      case "Email":
        setRemarksPlaceholder("Email notes");
        break;
      case "Meeting":
        setRemarksPlaceholder("Meeting notes");
        break;
      case "Call":
        setRemarksPlaceholder("Call notes");
        break;
      case "Whatsapp Text":
        setRemarksPlaceholder("Whatsapp notes");
        break;
      default:
        setRemarksPlaceholder("Notes");
    }
  };

  const formatDateForInput = (date) => {
    if (!date || isNaN(date)) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Example usage
  const handleSubmit = async (e, id) => {
    e.preventDefault();
    if (formData.nextFollowUp === "calendar" && !nextFollowUpDate) {
      toast.error("Please select a follow-up date.");
      return;
    }
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      connectionStatus: formData.connectionStatus,
      connectedVia: formData.connectedVia,
      clientStage:
        formData.clientStage === "other"
          ? mentionClientStage
          : formData.clientStage,
      remarks: formData.remarks,
      nextFollowUp:
        formData.nextFollowUp === "calendar"
          ? nextFollowUpDate
          : formData.nextFollowUp,
      actionBy: localStorage.getItem("name"),
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${BASEURL}/api/forms/update-action/${id}`,
        requestOptions
      );
      const data = await response.json(); // Parse the response JSON

      if (data.message) {
        toast.success(data.message); // Show alert with the success message
      }

      setLoading(false);
      setFormData({
        connectionStatus: "",
        connectedVia: "",
        clientStage: "",
        remarks: "",
        nextFollowUp: "",
      });
      setActionId(null);
    } catch (error) {
      console.error("Error updating action:", error);
      setLoading(false);
    }
  };
  return (
    <>
      {actionId && (
        <div
          className={`fixed w-[calc(100%-15rem)] top-0 h-screen right-0 flex z-50`}
        >
          <div
            onClick={() => {
              setActionId(null);
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
              actionId ? "right-0 block" : "right-full hidden z-50"
            } `}
          >
            <div className="flex items-center justify-between shadow-lg  bg-white z-20 relative h-[4.75rem] px-8">
              <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
                Take Action for Lead ID: {actionId}
              </p>
              <button
                onClick={() => {
                  setActionId(null);
                  setFormData({
                    connectionStatus: "",
                    connectedVia: "",
                    clientStage: "",
                    remarks: "",
                    nextFollowUp: "",
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
              {actionId && (
                <div className="p-6 flex h-full flex-col justify-start items-end mx-auto bg-white rounded-lg">
                  {/* Name Input */}
                  <div className="flex flex-col w-full mb-4">
                    <label className="font-medium text-[#121C2D] flex items-center gap-2">
                      <div className="w-1 aspect-square rounded-full bg-red-500"></div>
                      Connection Status
                    </label>
                    <select
                      value={formData.connectionStatus}
                      onChange={handleOnChange}
                      name="connectionStatus"
                      className="mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Connected">Connected</option>
                      <option value="Non-Connected">Non-Connected</option>
                    </select>
                  </div>

                  <div className="flex flex-col w-full mb-4">
                    <label className="font-medium text-[#121C2D] flex items-center gap-2">
                      <div className="w-1 aspect-square rounded-full bg-red-500"></div>
                      Connected via{" "}
                      <span className="font-normal">
                        (If Not Connected, select How you tried to connect)
                      </span>
                    </label>
                    <select
                      className="mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
                      value={formData.connectedVia}
                      name="connectedVia"
                      onChange={handleConnectedViaChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Email">Email</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Call">Call</option>
                      <option value="Whatsapp Text">Whatsapp</option>
                    </select>
                  </div>

                  <div className="flex flex-col w-full mb-4">
                    <label className="font-medium text-[#121C2D] flex items-center gap-2">
                      <div className="w-1 aspect-square rounded-full bg-red-500"></div>
                      Client Stage
                    </label>
                    <select
                      value={formData.clientStage}
                      onChange={handleOnChange}
                      name="clientStage"
                      className="mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Cold">Cold</option>
                      <option value="Warm">Warm</option>
                      <option value="Hot">Hot</option>
                      <option value="Unqualified">Unqualified</option>
                      <option value="Future Prospect">Future Prospect</option>
                      <option value="Duplicate">Duplicate</option>
                      <option value="Budget Issue">Budget Issue</option>
                      <option value="No Response">No Response</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {formData.clientStage === "other" && (
                    <div className="flex flex-col w-full mb-4">
                      <label className="font-medium text-[#121C2D] flex items-center gap-2">
                        <div className="w-1 aspect-square rounded-full bg-red-500"></div>
                        Mention Client Stage
                      </label>
                      <input
                        value={mentionClientStage}
                        onChange={(e) => setMentionClientStage(e.target.value)}
                        name="mentionClientStage"
                        className="mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
                        required
                      />
                    </div>
                  )}

                  <div className="flex flex-col w-full mb-4">
                    <label className="font-medium text-[#121C2D] flex items-center gap-2">
                      <div className="w-1 aspect-square rounded-full bg-red-500"></div>
                      {remarksPlaceholder}
                    </label>
                    <div className="w-full h-fit">
                      <textarea
                        value={formData.remarks}
                        onChange={handleOnChange}
                        name="remarks"
                        placeholder={"Remarks"}
                        className="mt-1 p-2 border w-full border-gray-300 focus:outline-none rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col w-full mb-4">
                    <label className="font-medium text-[#121C2D] flex items-center gap-2">
                      <div className="w-1 aspect-square rounded-full bg-red-500"></div>
                      Next Follow-up
                    </label>
                    <select
                      value={formData.nextFollowUp}
                      onChange={handleOnChange}
                      name="nextFollowUp"
                      className="mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
                      required
                    >
                      <option value="">Select</option>
                      <option value="calendar">Select from Calendar</option>
                      <option value="close">Close follow-up</option>
                      <option value="onboard">Client Onboarded</option>
                    </select>
                  </div>

                  {formData.nextFollowUp === "calendar" && (
                    <div className="flex flex-col w-full mb-4">
                      <label className="font-medium text-[#121C2D] flex items-center gap-2">
                        <div className="w-1 aspect-square rounded-full bg-red-500"></div>
                        Select Date
                      </label>
                      <input
                        type="date"
                        value={formatDateForInput(nextFollowUpDate)}
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          setNextFollowUpDate(selectedDate);
                          console.log("Selected Date:", selectedDate);
                        }}
                        name="nextFollowUpDate"
                        className="mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
                        required
                      />

                      {/* <Calendar
                        onChange={(date) => {
                          setNextFollowUpDate(date);
                          console.log(nextFollowUpDate);
                        }}
                        value={nextFollowUpDate}
                        minDate={new Date()}
                        tileDisabled={({ date, view }) =>
                          view === "month" &&
                          (date.getDay() === 0 || date.getDay() === 6)
                        }
                        className="text-xl w-[60%] mx-auto my-auto"
                      /> */}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="h-full w-full items-end flex justify-end ">
                    <button
                      onClick={(e) => handleSubmit(e, actionId)}
                      className="px-4 py-2 disabled:bg-[#E1E3EA] disabled:border-[#E1E3EA] disabled:text-white hover:bg-transparent hover:text-accent-blue border border-accent-blue text-white text-nowrap bg-accent-blue rounded-lg font-medium leading-[1.25rem] text-sm mb-10"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
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

export default TakeAction;
