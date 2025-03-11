import { React, useEffect, useState } from "react";
import TakeAction from "../../ui/TakeAction";
import ViewHistory from "../../ui/ViewHistory";
import { formatDate } from "../../utils/formatDate";
import { formatTime } from "../../utils/formatTime";

function FollowUpLeads({ leads, heading, action = true }) {
  const [actionId, setActionId] = useState(null);
  const [historyId, setHistoryId] = useState(null);

  const handleAction = (id) => {
    setActionId(id);
  };

  const handleHistory = (lead) => {
    setHistoryId(lead);
  };

  useEffect(() => {
    if (actionId || historyId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [actionId, historyId]);
  return (
    <div className="w-full py-10 px-6 h-full">
      <h3 className="text-3xl font-bold text-center mb-5">
        {
          leads.filter(
            (lead) => Array.isArray(lead.action) && lead.action.length !== 0
          ).length
        }{" "}
        {heading}
      </h3>
      <div className="w-full">
        <div className="overflow-x-auto w-full mt-3">
          <table className="table-auto relative border-collapse w-full text-left bg-white shadow-md rounded-md">
            <thead className="bg-[#ececec] border-b border-[#696969] text-sm">
              <tr>
                <th className="p-3 text-[#353535] font-medium">Name</th>
                <th className="p-3 text-[#353535] font-medium">Email</th>
                <th className="p-3 text-[#353535] font-medium">Phone Number</th>
                <th className="p-3 text-[#353535] font-medium">
                  Last Action Date
                </th>
                <th className="p-3 text-[#353535] font-medium">
                  Last Action Time
                </th>
                <th className="p-3 text-[#353535] font-medium">
                  Last Action Taken by
                </th>
                <th className="p-3 text-[#353535] font-medium">
                  View Follow Up History
                </th>
                {action && (
                  <th className="p-3 text-[#353535] font-medium">
                    Take Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {leads
                .filter(
                  (lead) =>
                    Array.isArray(lead.action) && lead.action.length !== 0
                )
                .map((lead, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-[#ececec] text-sm"
                  >
                    <td className="p-3">{lead.name}</td>
                    <td className="p-3 underline text-blue-500">
                      <a href={`mailto:${lead.email}`}>{lead.email}</a>
                    </td>
                    <td className="p-3 underline text-blue-500">
                      <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                    </td>
                    <td className="p-3">
                      {lead.action
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        )
                        .at(0)?.createdAt &&
                        formatDate(lead.action.at(0)?.createdAt)}
                    </td>
                    <td className="p-3">
                      {lead.action
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        )
                        .at(0)?.createdAt &&
                        formatTime(lead.action.at(0)?.createdAt)}
                    </td>
                    <td className="p-3">
                      {
                        lead.action
                          .sort(
                            (a, b) =>
                              new Date(b.createdAt) - new Date(a.createdAt)
                          )
                          .at(0)?.actionBy
                      }
                    </td>
                    <th
                      onClick={() => handleHistory(lead)}
                      className="p-3 text-blue-500 underline cursor-pointer"
                    >
                      View History
                    </th>
                    {action && (
                      <td className="p-3">
                        <button
                          onClick={() => handleAction(lead._id)}
                          className="px-4 py-2 disabled:bg-[#E1E3EA] disabled:border-[#E1E3EA] disabled:text-white hover:bg-transparent hover:text-accent-blue border border-accent-blue text-white text-nowrap bg-accent-blue rounded-lg font-medium leading-[1.25rem] text-sm"
                        >
                          Take Action
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {historyId && (
          <ViewHistory historyId={historyId} setHistoryId={setHistoryId} />
        )}
        {actionId && (
          <TakeAction actionId={actionId} setActionId={setActionId} />
        )}
      </div>
    </div>
  );
}

export default FollowUpLeads;
