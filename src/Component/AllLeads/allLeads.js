import { useEffect, useState } from "react";
import TakeAction from "../../ui/TakeAction";
import { formatDate } from "../../utils/formatDate";
import { formatTime } from "../../utils/formatTime";
import { cleanPhoneNumber } from "../../utils/formatPhone";
import { formatINRRange } from "../../utils/formatBudget";
import ViewHistory from "../../ui/ViewHistory";
function AllLeads({ leads }) {
  const [actionId, setActionId] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [historyId, setHistoryId] = useState(null);

  const handleAction = (id) => {
    setActionId(id);
  };

  const handleHistory = (lead) => {
    setHistoryId(lead);
  };

  useEffect(() => {
    setFilteredLeads(leads);
  }, [leads]);

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

  const handleFilter = () => {
    let filtered = leads;
    if (fromDate > toDate) {
      alert("From date cannot be greater than to date");
      return;
    }
    const from = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : null;
    const to = toDate ? new Date(toDate).setHours(0, 0, 0, 0) : null;

    filtered = filtered.filter((lead) => {
      const actionDate = new Date(lead.createdAt).setHours(0, 0, 0, 0);

      return (!from || actionDate >= from) && (!to || actionDate <= to);
    });

    setFilteredLeads(filtered);
  };
  return (
    <div className="w-full py-10 px-6 h-full">
      <div className="w-full h-full flex justify-between items-center">
        <h3 className="text-3xl font-bold text-center mb-5">
          {filteredLeads.length} Leads
        </h3>
        <div className="flex justify-center items-center gap-4">
          <label className="text-[#353535] font-medium">Date Range From</label>
          <input
            type="date"
            className="border border-black px-4 py-1 focus:outline-none"
            value={fromDate}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <label className="text-[#353535] font-medium">To</label>
          <input
            type="date"
            className="border border-black px-4 py-1 focus:outline-none"
            value={toDate}
            min={fromDate}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleFilter}
            className="px-4 py-2 disabled:bg-[#E1E3EA] disabled:border-[#E1E3EA] disabled:text-white hover:bg-transparent hover:text-accent-blue border border-accent-blue text-white text-nowrap bg-accent-blue rounded-lg font-medium leading-[1.25rem] text-sm"
          >
            Search
          </button>
        </div>
      </div>
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
                  Lead Date
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Lead Time
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Service
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Message
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Website
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Budget
                </th>
                <th className="p-3 min-w-40 text-[#353535] font-medium">
                  Take Action
                </th>
                <th className="p-3 min-w-40 text-[#353535] font-medium">
                  View History
                </th>
                <th className="p-3 min-w-44 text-[#353535] font-medium">
                  No. of Follow Ups Done
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Start Time
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Designation
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Form Name
                </th>
                <th className="p-3 min-w-60 text-[#353535] font-medium">
                  Source
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {filteredLeads.map((lead, index) => (
                <tr key={index} className="border-b hover:bg-[#ececec] text-sm">
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3 underline text-blue-500">
                    <a href={`mailto:${lead.email}`}>{lead.email}</a>
                  </td>
                  <td className="p-3 underline text-blue-500">
                    <a
                      href={`https://api.whatsapp.com/send?phone=91${cleanPhoneNumber(
                        lead.phone
                      )}`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {cleanPhoneNumber(lead.phone)}
                    </a>
                  </td>
                  <td className="p-3">{formatDate(lead.createdAt)}</td>
                  <td className="p-3">{formatTime(lead.createdAt)}</td>
                  <td className="p-3">{lead.service}</td>
                  <td
                    className="p-3 cursor-pointer text-sm"
                    onClick={() =>
                      setExpandedIndex(index === expandedIndex ? null : index)
                    }
                  >
                    <div
                      className={`${
                        expandedIndex === index ? "" : "line-clamp-2"
                      } `}
                    >
                      {lead.description}
                    </div>
                  </td>
                  <td className="p-3">{lead.website}</td>
                  <td className="p-3">{formatINRRange(lead.budget)}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleAction(lead._id)}
                      className="px-4 py-2 disabled:bg-[#E1E3EA] disabled:border-[#E1E3EA] disabled:text-white hover:bg-transparent hover:text-accent-blue border border-accent-blue text-white text-nowrap bg-accent-blue rounded-lg font-medium leading-[1.25rem] text-sm"
                    >
                      Take Action
                    </button>
                  </td>
                  <th
                    onClick={() => handleHistory(lead)}
                    className="p-3 text-blue-500 underline cursor-pointer"
                  >
                    View History
                  </th>
                  <th className="p-3">{lead.action.length}</th>
                  <td className="p-3">{lead.startTime}</td>
                  <td className="p-3">{lead.designation}</td>
                  <td className="p-3">{lead.formName}</td>
                  <td className="p-3">{lead.source}</td>
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

export default AllLeads;
