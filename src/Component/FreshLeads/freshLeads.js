import { useEffect, useState } from "react";
import TakeAction from "../../ui/TakeAction";
import { formatDate } from "../../utils/formatDate";
import { formatTime } from "../../utils/formatTime";
function FreshLeads({ leads }) {
  const [actionId, setActionId] = useState(null);

  const handleAction = (id) => {
    setActionId(id);
  };

  useEffect(() => {
    if (actionId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [actionId]);
  return (
    <div className="w-full py-10 px-6 h-full">
      <h3 className="text-3xl font-bold text-center mb-5">
        {
          leads.filter(
            (lead) => Array.isArray(lead.action) && lead.action.length === 0
          ).length
        }{" "}
        Fresh Leads
      </h3>
      <div className="w-full">
        <div className="overflow-x-auto w-full mt-3">
          <table className="table-auto relative border-collapse w-full text-left bg-white shadow-md rounded-md">
            <thead className="bg-[#ececec] border-b border-[#696969] text-sm">
              <tr>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Name
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Email
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Phone Number
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Budget
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Service
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Website
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Start Time
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Designation
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Message
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Form Name
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Source
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Lead Date
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Lead Time
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Take Action
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {leads
                .filter(
                  (lead) =>
                    Array.isArray(lead.action) && lead.action.length === 0
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
                      <a
                        href={`https://api.whatsapp.com/send?phone=91${lead.phone}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {lead.phone}
                      </a>
                    </td>
                    <td className="p-3">{lead.budget || "N/A"}</td>
                    <td className="p-3">{lead.service || "N/A"}</td>
                    <td className="p-3">{lead.website || "N/A"}</td>
                    <td className="p-3">{lead.startTime || "N/A"}</td>
                    <td className="p-3">{lead.designation || "N/A"}</td>
                    <td className="p-3">{lead.description || "N/A"}</td>
                    <td className="p-3">{lead.formName || "N/A"}</td>
                    <td className="p-3">{lead.source || "N/A"}</td>
                    <td className="p-3">{formatDate(lead.createdAt)}</td>
                    <td className="p-3">{formatTime(lead.createdAt)}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleAction(lead._id)}
                        className="px-4 py-2 disabled:bg-[#E1E3EA] disabled:border-[#E1E3EA] disabled:text-white hover:bg-transparent hover:text-accent-blue border border-accent-blue text-white text-nowrap bg-accent-blue rounded-lg font-medium leading-[1.25rem] text-sm"
                      >
                        Take Action
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {actionId && (
          <TakeAction actionId={actionId} setActionId={setActionId} />
        )}
      </div>
    </div>
  );
}

export default FreshLeads;
