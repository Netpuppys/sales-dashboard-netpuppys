import React, { useEffect, useState } from "react";
import {
  PieChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import dashboardBanner from "../../Assets/dashboardBanner.png";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Dashboard({
  notifications,
  leads,
  latestAction,
  allLeads,
  missedLeads,
}) {
  const freshLeads = leads.filter(
    (lead) => Array.isArray(lead.action) && lead.action.length === 0
  ).length;

  const notificationsLead = notifications.length;
  const missedLead = missedLeads.length;
  const totalLeads = freshLeads + notificationsLead + missedLead;
  const navigate = useNavigate();
  const handlePieClick = (data) => {
    if (data && data.name) {
      navigate(`/filter-page?clientStage=${encodeURIComponent(data.name)}`);
    }
  };

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!latestAction || latestAction.length === 0) return;

    const currentMonth = new Date().getMonth(); // Current month (0-based)
    const currentYear = new Date().getFullYear();

    // Step 1: Extract only the latest action per lead
    const latestActionsThisMonth = latestAction
      .map((lead) =>
        lead.action && lead.action.length > 0 ? lead.action[0] : null
      ) // Get only latest action safely
      .filter(
        (action) =>
          action && // Ensure action is not null
          new Date(action.createdAt).getMonth() === currentMonth &&
          new Date(action.createdAt).getFullYear() === currentYear
      );

    // Step 2: Count occurrences of clientStage
    const clientStageCount = {};
    latestActionsThisMonth.forEach(({ clientStage }) => {
      clientStageCount[clientStage] = (clientStageCount[clientStage] || 0) + 1;
    });

    // Step 3: Convert to Chart Data Format
    const formattedData = Object.keys(clientStageCount).map((stage) => ({
      name: stage,
      value: clientStageCount[stage],
    }));

    setChartData(formattedData);
  }, [latestAction]);

  // Colors for Pie Chart
  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#FFBB28",
    "#FF8042",
    "#0088FE",
    "#00C49F",
    "#FF69B4",
    "#A52A2A",
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) / 2; // Center position within the slice
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        fontSize={14}
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${value}`}
      </text>
    );
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Create an array for last 5 months + current month
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(currentYear, currentMonth - i, 1);
    return {
      month: moment(date).format("MMM YYYY"), // Format month name
      count: 0,
    };
  }).reverse(); // Reverse to start from the oldest month

  // Count onboarded leads per month
  latestAction.forEach((lead) => {
    if (lead.action?.[0]?.nextFollowUp === "onboard") {
      const actionDate = new Date(lead.action[0].createdAt);
      const actionMonth = moment(actionDate).format("MMM YYYY");

      // Find and increment the count for the respective month
      const monthData = months.find((m) => m.month === actionMonth);
      if (monthData) {
        monthData.count += 1;
      }
    }
  });

  const Leadmonth = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - i, 1);
    const monthName = date.toLocaleString("default", { month: "short" }); // "Jan", "Feb", etc.
    const year = date.getFullYear();
    Leadmonth.push({ month: monthName, year });
  }

  // Prepare data for graph
  const data = Leadmonth.map(({ month, year }) => {
    const leadsCount = allLeads.filter((lead) => {
      const leadDate = new Date(lead.createdAt);
      return (
        leadDate.getMonth() === new Date(`${month} 1, ${year}`).getMonth() &&
        leadDate.getFullYear() === year
      );
    }).length;

    return { month, leads: leadsCount };
  });

  return (
    <div className="w-full">
      <div className="w-full h-[7.6875rem] bg-[#a1a1a1] flex justify-between">
        <div className="h-full flex flex-col justify-between pl-8 py-3">
          <h1 className="text-[#000000] text-[1.5rem] font-semibold">
            Welcome {localStorage.getItem("name")}!
          </h1>
          <h2 className="text-[#1a2841] text-[1.1rem] font-medium">
            Here is a quick glance of your business
          </h2>
        </div>
        <img src={dashboardBanner} className="" alt="" />
      </div>
      <div className="w-full px-8 py-3">
        <div className="text-[#000000] text-xl">
          <span className="font-semibold">Leads Summary:</span>
          <br />
          You have{" "}
          <span className="font-semibold">{totalLeads} total leads</span> to
          take action on:
          <ul className="list-disc ml-5">
            <li>
              <span className="font-semibold">{freshLeads}</span> Fresh Leads
            </li>
            <li>
              <span className="font-semibold">{notificationsLead}</span>{" "}
              Follow-Up Leads
            </li>
            <li>
              <span className="font-semibold">{missedLead}</span> Missed Leads
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full flex flex-wrap items-start justify-center gap-4">
        <div className="w-fit h-full mx-auto">
          <div className="w-full px-8 py-3">
            <p className="text-[#000000] text-xl">
              This Month Client Stage Summary:
            </p>
          </div>
          <PieChart width={500} height={300}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              fill="#8884d8"
              label={renderCustomizedLabel}
              onClick={(_, index) => handlePieClick(chartData[index])} // Handle Click
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ fontSize: "14px" }}
            />
          </PieChart>
        </div>
        <div className="w-fit h-full mx-auto">
          <div className="w-full px-8 py-3">
            <p className="text-[#000000] text-xl">Client On-Boarded Summary:</p>
          </div>
          <ResponsiveContainer width={600} height={300}>
            <LineChart
              data={months}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                label={{ value: "Month", position: "bottom", offset: 5 }}
              />
              <YAxis
                label={{
                  value: "Leads Onboarded",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle" }, // Center text
                }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="w-fit h-full mx-auto">
          <div className="w-full px-8 py-3">
            <p className="text-[#000000] text-xl">Total Lead Summary:</p>
          </div>
          <ResponsiveContainer width={600} height={300}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                label={{ value: "Month", position: "bottom", offset: 5 }}
              />
              <YAxis
                label={{
                  value: "Total Leads",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle" }, // Center text
                }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="leads"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
