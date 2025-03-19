import React from "react";
import { useLocation } from "react-router-dom";
import FollowUpLeads from "./FollowUpLeads/followUpLeads";

const FilterPage = ({ leads }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const clientStage = queryParams.get("clientStage");

  // Filter leads based on the latest action's clientStage
  const filteredLeads = leads.filter((lead) => {
    const latestAction = lead.action[lead.action.length - 1]; // Get the latest action
    return latestAction?.clientStage === clientStage; // Compare only the latest action
  });

  return (
    <FollowUpLeads leads={filteredLeads} heading={`${clientStage} Leads`} />
  );
};

export default FilterPage;
