import React, { useState } from "react";
import ReportingTab from "./reporting";
import CampaignsTab from "./campaign";
import FilesTab from "./files";


// Sample initial data for campaigns (unchanged)
const initialCampaigns = [
  {
    id: 1,
    title: "HVAC Optimization Sprint",
    tasks: [
      {
        id: "t1",
        text: "Verify thermostat schedules match work hours.",
        points: 10,
        completed: false,
      },
      {
        id: "t2",
        text: "Check air filters (last checked 3 months ago).",
        points: 15,
        completed: false,
      },
      {
        id: "t3",
        text: "Inspect and seal air leaks around unit.",
        points: 25,
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: "Phantom Load Hunt",
    tasks: [
      {
        id: "t4",
        text: "Conduct night-walk audit of office space.",
        points: 20,
        completed: false,
      },
      {
        id: "t5",
        text: "Ensure all monitors are set to sleep mode after 30 mins.",
        points: 10,
        completed: false,
      },
    ],
  },
];

const App = () => {
  const [activeTab, setActiveTab] = useState("reporting");
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [totalPoints, setTotalPoints] = useState(0);

  // Campaign Handlers (unchanged)
  const handleTaskToggle = (campaignId, taskId, taskPoints) => {
    const updatedCampaigns = campaigns.map((campaign) => {
      if (campaign.id === campaignId) {
        const updatedTasks = campaign.tasks.map((task) => {
          if (task.id === taskId) {
            const newCompletedState = !task.completed;

            setTotalPoints((prevPoints) =>
              newCompletedState
                ? prevPoints + taskPoints
                : prevPoints - taskPoints
            );

            return { ...task, completed: newCompletedState };
          }
          return task;
        });
        return { ...campaign, tasks: updatedTasks };
      }
      return campaign;
    });
    setCampaigns(updatedCampaigns);
  };

  return (
    // NOTE: This code assumes the parent component (e.g., App.jsx) defines 
// and passes the necessary props (campaigns, totalPoints, handleTaskToggle, and the Tabs).

<div className="w-full min-h-screen bg-gray-50"> 
  
  {/* Inner Content Wrapper (Full Width) */}
  <div className="w-full bg-white shadow-none overflow-hidden"> 
    
    {/* Header (Spans Full Width) */}
    <header
      className="p-5 shadow-xl flex flex-col items-center justify-center border-b border-green-600"
      // style={{ backgroundColor: "#B7E5CD" }} 
    >
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        <span className="font-serif text-green-700 transition-transform duration-300 inline-block hover:scale-105">
          Volta
        </span>
      </h1>
      <p className="text-base opacity-90 text-green-800 mt-1">
        SDG 7 Action Platform: Turn Data into Deeds
      </p>
    </header>

    {/* Grid Content Layout - Full Width, 2 Columns (lg breakpoint) */}
    <div className="grid grid-cols-1 lg:grid-cols-2">
      
      {/* 1. LEFT SECTION: Campaigns (With Vertical Divider) */}
      <div className="lg:col-span-1 lg:border-r border-gray-300 border-b border-gray-200">
        <CampaignsTab
          campaigns={campaigns} 
          totalPoints={totalPoints}
          onTaskToggle={handleTaskToggle}
        />
      </div>
      
      {/* 2. RIGHT SECTION CONTAINER: Stacked Reporting and Files */}
      <div className="lg:col-span-1 p-6 space-y-6"> 
        
        {/* TOP RIGHT: Reporting */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg">
           <ReportingTab/>
        </div>

        {/* BOTTOM RIGHT: Files */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg">
           <FilesTab />
        </div>

      </div>
    </div>
  </div>
</div>
  );
};

export default App;
