import Login from "./Component/Login";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import SidebarComp from "./ui/Sidebar";
import FreshLeads from "./Component/FreshLeads/freshLeads";
import React, { useEffect, useState } from "react";
import BASEURL from "./BaseURL";
import FollowUpLeads from "./Component/FollowUpLeads/followUpLeads";
import Dashboard from "./Component/Dashboard/dashboard";
import FilterPage from "./Component/filterLead";
import { ThreeDots } from "react-loader-spinner";
import ChangePassword from "./Component/ChangePassword/changePassword";
import ManageUser from "./Component/ManageUser/manageUser";
import AllLeads from "./Component/AllLeads/allLeads";
function App() {
  const location = useLocation();
  // const navigate = useNavigate();
  const currentPath = location.pathname;
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [notifications, setNotification] = useState([]);
  const [onboarded, setOnboarded] = useState([]);
  const [latestAction, setLatestAction] = useState([]);
  const [closed, setClosed] = useState([]);
  const [allLeads, setAllLeads] = useState([]);
  const [missedLeads, setMissedLeads] = useState([]);
  const [loading, setLoading] = useState("");
  // Fetch data when the component mounts
  useEffect(() => {
    // Fetch leads from the backend API
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASEURL}/api/forms/leads`);
        const data = await response.json();
        if (response.ok) {
          // Sort the leads by 'createdAt' in descending order (newest first)
          setLoading(false);
          const sortedLeads = data
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .filter(
              (lead) => Array.isArray(lead.action) && lead.action.length === 0
            );
          // Set the sorted leads data
          setLeads(sortedLeads);
        } else {
          setLoading(false);
          console.error("Error fetching leads", data);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  // Fetch data when the component mounts
  useEffect(() => {
    // Fetch leads from the backend API
    setLoading(true);
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${BASEURL}/api/forms/notification`);
        const data = await response.json();
        if (response.ok) {
          setLoading(false);
          setNotification(data);
        } else {
          setLoading(false);
          console.error("Error fetching leads", data);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);
  useEffect(() => {
    // Fetch leads from the backend API
    setLoading(true);
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${BASEURL}/api/forms/onboard`);
        const data = await response.json();
        if (response.ok) {
          setLoading(false);
          setOnboarded(data);
        } else {
          setLoading(false);
          console.error("Error fetching leads", data);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);
  useEffect(() => {
    // Fetch leads from the backend API
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASEURL}/api/forms/close`);
        const data = await response.json();
        if (response.ok) {
          setLoading(false);
          setClosed(data);
        } else {
          setLoading(false);
          console.error("Error fetching leads", data);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);
  useEffect(() => {
    // Fetch leads from the backend API
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASEURL}/api/forms/latest-action`);
        const data = await response.json();
        if (response.ok) {
          setLoading(false);
          setLatestAction(data);
        } else {
          setLoading(false);
          console.error("Error fetching leads", data);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);
  useEffect(() => {
    // Fetch leads from the backend API
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASEURL}/api/forms/`);
        const data = await response.json();
        if (response.ok) {
          setLoading(false);
          setAllLeads(
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          );
        } else {
          setLoading(false);
          console.error("Error fetching leads", data);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);
  useEffect(() => {
    // Fetch leads from the backend API
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASEURL}/api/auth/get-users`);
        const data = await response.json();
        if (response.ok) {
          setLoading(false);
          setUsers(data);
        } else {
          setLoading(false);
          console.error("Error fetching leads", data);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);
  useEffect(() => {
    // Fetch leads from the backend API
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASEURL}/api/forms/missed-leads`);
        const data = await response.json();
        if (response.ok) {
          setLoading(false);
          setMissedLeads(data);
        } else {
          setLoading(false);
          console.error("Error fetching leads", data);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  return (
    <>
      <div className="hidden w-full h-fit lg:block">
        {currentPath !== "/" && (
          <SidebarComp
            notifications={notifications}
            missedLeads={missedLeads}
            leads={leads}
          />
        )}
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
                    leads={allLeads}
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
                path="/all-leads"
                element={<AllLeads leads={allLeads} />}
              />
              <Route
                path="/follow-up-leads"
                element={
                  <FollowUpLeads leads={allLeads} heading={"Follow Up Leads"} />
                }
              />
              <Route
                path="/filter-page"
                element={<FilterPage leads={allLeads} />}
              />
              <Route
                path="/missed-leads"
                element={
                  <FollowUpLeads
                    leads={missedLeads}
                    date={false}
                    heading={"Missed Leads"}
                  />
                }
              />
              <Route
                path="/onboarded-clients"
                element={
                  <FollowUpLeads
                    leads={onboarded}
                    heading={"On-Boarded Clients"}
                  />
                }
              />
              <Route
                path="/closed-leads"
                element={
                  <FollowUpLeads leads={closed} heading={"Closed Leads"} />
                }
              />
              <Route
                path="/notifications"
                element={
                  <FollowUpLeads
                    leads={notifications}
                    date={false}
                    heading={"Today's Follow Up"}
                  />
                }
              />
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>
            <Route path="/" element={<ProtectedManageRoute />}>
              <Route
                path="/manage-user"
                element={<ManageUser users={users} />}
              />
            </Route>
          </Routes>
        </div>
      </div>
      <h3 className="text-xl text-black text-center font-bold w-full h-screen flex justify-center items-center lg:hidden">
        Please view in Desktop Mode
      </h3>
      {loading && (
        <div className="fixed w-screen h-screen bg-black bg-opacity-50 backdrop-blur-sm top-0 left-0 z-[9999999] flex justify-center items-center">
          <div className="">
            <ThreeDots color="#FFF" />
          </div>
        </div>
      )}

      {/* Logout button (visible only when logged in) */}
    </>
  );
}
// 🔹 ProtectedRoute Component
const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/" replace />;
};
const ProtectedManageRoute = () => {
  const role = localStorage.getItem("role");

  return role === "Admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default App;
