import Login from "./Component/Login";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import SidebarComp from "./ui/Sidebar";
import FreshLeads from "./Component/FreshLeads/freshLeads";
import React, { useEffect, useState } from "react";
import BASEURL from "./BaseURL";
import FollowUpLeads from "./Component/FollowUpLeads/followUpLeads";
import Dashboard from "./Component/Dashboard/dashboard";

function App() {
  const location = useLocation();
  // const navigate = useNavigate();
  const currentPath = location.pathname;
  const [leads, setLeads] = useState([]);
  const [notifications, setNotification] = useState([]);
  const [onboarded, setOnboarded] = useState([]);
  const [latestAction, setLatestAction] = useState([]);
  const [closed, setClosed] = useState([]);
  const [allLeads, setAllLeads] = useState([]);
  const [missedLeads, setMissedLeads] = useState([]);
  // Fetch data when the component mounts
  useEffect(() => {
    // Fetch leads from the backend API
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${BASEURL}/leads`);
        const data = await response.json();
        if (response.ok) {
          // Sort the leads by 'createdAt' in descending order (newest first)
          const sortedLeads = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          // Set the sorted leads data
          setLeads(sortedLeads);
        } else {
          console.error("Error fetching leads", data);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  // Fetch data when the component mounts
  useEffect(() => {
    // Fetch leads from the backend API
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${BASEURL}/notification`);
        const data = await response.json();
        if (response.ok) {
          setNotification(data);
        } else {
          console.error("Error fetching leads", data);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);
  useEffect(() => {
    // Fetch leads from the backend API
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${BASEURL}/onboard`);
        const data = await response.json();
        if (response.ok) {
          setOnboarded(data);
        } else {
          console.error("Error fetching leads", data);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);
  useEffect(() => {
    // Fetch leads from the backend API
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${BASEURL}/close`);
        const data = await response.json();
        if (response.ok) {
          setClosed(data);
        } else {
          console.error("Error fetching leads", data);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);
  useEffect(() => {
    // Fetch leads from the backend API
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${BASEURL}/latest-action`);
        const data = await response.json();
        if (response.ok) {
          setLatestAction(data);
        } else {
          console.error("Error fetching leads", data);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);
  useEffect(() => {
    // Fetch leads from the backend API
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${BASEURL}/all-leads`);
        const data = await response.json();
        if (response.ok) {
          setAllLeads(data);
        } else {
          console.error("Error fetching leads", data);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);
  useEffect(() => {
    // Fetch leads from the backend API
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${BASEURL}/missed-leads`);
        const data = await response.json();
        if (response.ok) {
          setMissedLeads(data);
        } else {
          console.error("Error fetching leads", data);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);
  return (
    <>
      <div className="hidden w-full h-fit lg:block">
        {currentPath !== "/" && <SidebarComp />}
        <div className={`${currentPath === "/" ? "" : "pl-60"}`}>
          <Routes>
            {/* Public Route - Login */}
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    notifications={notifications}
                    leads={leads}
                    allLeads={allLeads}
                    latestAction={latestAction}
                    missedLeads={missedLeads}
                  />
                }
              />
              <Route
                path="/fresh-leads"
                element={<FreshLeads leads={leads} setLeads={setLeads} />}
              />
              <Route
                path="/follow-up-leads"
                element={
                  <FollowUpLeads leads={leads} heading={"Follow Up Leads"} />
                }
              />
              <Route
                path="/missed-leads"
                element={
                  <FollowUpLeads leads={missedLeads} heading={"Missed Leads"} />
                }
              />
              <Route
                path="/onboarded-clients"
                element={
                  <FollowUpLeads
                    leads={onboarded}
                    action={false}
                    heading={"On-Boarded Clients"}
                  />
                }
              />
              <Route
                path="/closed-leads"
                element={
                  <FollowUpLeads
                    action={false}
                    leads={closed}
                    heading={"Closed Leads"}
                  />
                }
              />
              <Route
                path="/notifications"
                element={
                  <FollowUpLeads
                    leads={notifications}
                    heading={"Today's Follow Up"}
                  />
                }
              />
            </Route>
          </Routes>
        </div>
      </div>
      <h3 className="text-xl text-black text-center font-bold w-full h-screen flex justify-center items-center lg:hidden">
        Please view in Desktop Mode
      </h3>

      {/* Logout button (visible only when logged in) */}
    </>
  );
}

// 🔹 ProtectedRoute Component
const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default App;
