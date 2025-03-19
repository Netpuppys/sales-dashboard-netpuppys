import React from "react";
import { formatDate } from "../utils/formatDate";
import { formatTime } from "../utils/formatTime";
const ViewHistory = ({ historyId, setHistoryId }) => {
  return (
    <>
      {historyId && (
        <div
          className={`fixed w-[calc(100%-15rem)] top-0 h-screen right-0 flex z-50`}
        >
          <div
            onClick={() => setHistoryId(null)}
            className="w-[calc(100%-45rem)] h-full"
          ></div>

          <div
            className={`fixed top-0 shadow-2xl h-screen bg-white w-[45rem] ${
              historyId ? "right-0 block" : "right-full hidden z-50"
            }`}
          >
            <div className="flex items-center justify-between shadow-lg bg-white z-20 relative h-[4.75rem] px-8">
              <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
                History for Lead ID: {historyId._id}
              </p>
              <button onClick={() => setHistoryId(null)}>
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

            <div className="w-full h-[calc(100%-4.75rem)] overflow-y-auto">
              <div className="pt-6 px-6">
                <p className="text-xl font-bold">Client Details:-</p>
                <p>
                  <span className="text-lg font-semibold">Name:-</span>{" "}
                  {historyId.name}
                </p>
                <p>
                  <span className="text-lg font-semibold">Email:-</span>{" "}
                  <a href={`mailto:${historyId.email}`}>{historyId.email}</a>
                </p>
                <p>
                  <span className="text-lg font-semibold">Phone Number:-</span>{" "}
                  <a href={`tel:${historyId.phone}`}>{historyId.phone}</a>
                </p>
                <p>
                  <span className="text-lg font-semibold">Website URL:-</span>{" "}
                  {historyId.website || "N/A"}
                </p>
                <p>
                  <span className="text-lg font-semibold">Budget:-</span>{" "}
                  {historyId.budget || "N/A"}
                </p>
                <p>
                  <span className="text-lg font-semibold">Service:-</span>{" "}
                  {historyId.service || "N/A"}
                </p>
                <p>
                  <span className="text-lg font-semibold">Start Time:-</span>{" "}
                  {historyId.startTime || "N/A"}
                </p>
                <p>
                  <span className="text-lg font-semibold">Designation:-</span>{" "}
                  {historyId.designation || "N/A"}
                </p>
                <p>
                  <span className="text-lg font-semibold">Lead Date:-</span>{" "}
                  {formatDate(historyId.createdAt) || "N/A"}
                </p>
                <p>
                  <span className="text-lg font-semibold">Lead Time:-</span>{" "}
                  {formatTime(historyId.createdAt) || "N/A"}
                </p>
              </div>
              {historyId.action && Array.isArray(historyId.action) ? (
                <div className="pb-6 px-6 flex h-fit flex-col justify-start mx-auto bg-white rounded-lg">
                  {historyId.action
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((history, index) => (
                      <div key={index} className="w-full my-2">
                        <p className="text-left text-[#121C2D] text-lg py-2">
                          Action taken on{" "}
                          <span className="font-semibold">
                            {formatDate(history.createdAt)}
                          </span>{" "}
                          at{" "}
                          <span className="font-semibold">
                            {formatTime(history.createdAt)}
                          </span>{" "}
                          by{" "}
                          <span className="font-semibold">
                            {history.actionBy}
                          </span>
                        </p>
                        <table className="w-full border-[#353535] border-2 table-auto border-collapse">
                          <tbody>
                            <tr>
                              <th className="text-left border-[#353535] border-2 w-1/2 text-[#121C2D] text-sm font-semibold p-2">
                                Connection Status
                              </th>
                              <td className="text-[#121C2D] border-[#353535] border-2 text-sm font-semibold p-2">
                                {history.connectionStatus}
                              </td>
                            </tr>
                            <tr>
                              <th className="text-left border-[#353535] border-2 w-1/2 text-[#121C2D] text-sm font-semibold p-2">
                                Connected Via
                              </th>
                              <td className="text-[#121C2D] border-[#353535] border-2 text-sm font-semibold p-2">
                                {history.connectedVia}
                              </td>
                            </tr>
                            <tr>
                              <th className="text-left border-[#353535] border-2 w-1/2 text-[#121C2D] text-sm font-semibold p-2">
                                Client Status
                              </th>
                              <td className="text-[#121C2D] border-[#353535] border-2 text-sm font-semibold p-2">
                                {history.clientStage}
                              </td>
                            </tr>
                            <tr>
                              <th className="text-left border-[#353535] border-2 w-1/2 text-[#121C2D] text-sm font-semibold p-2">
                                {history.connectedVia} Remarks:-
                              </th>
                              <td className="text-[#121C2D] border-[#353535] border-2 text-sm font-semibold p-2">
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: history.remarks,
                                  }}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th className="text-left border-[#353535] border-2 w-1/2 text-[#121C2D] text-sm font-semibold p-2">
                                Next Follow Up
                              </th>
                              <td className="text-[#121C2D] border-[#353535] border-2 text-sm font-semibold p-2">
                                {history.nextFollowUp === "close" ||
                                history.nextFollowUp === "onboard"
                                  ? history.nextFollowUp
                                  : history.nextFollowUp &&
                                    !isNaN(new Date(history.nextFollowUp))
                                  ? formatDate(history.nextFollowUp)
                                  : "Invalid Date"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="p-6 text-center text-gray-500">
                  No history available.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewHistory;
