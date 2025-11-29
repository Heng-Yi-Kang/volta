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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden col-span-2">
        <header
          className="p-5 shadow-xl flex flex-col items-center justify-center"
          style={{ backgroundColor: "#B7E5CD" }} // Light background color as requested
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

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-white">
        <button
            onClick={() => setActiveTab("reporting")}
            className={`flex-1 py-4 text-center text-base sm:text-xl font-bold transition-all duration-300 ${
              activeTab === "reporting"
                ? "border-b-4 border-green-600 text-green-700 bg-green-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            Reporting
          </button>

          <button
            onClick={() => setActiveTab("campaigns")}
            className={`flex-1 py-4 text-center text-base sm:text-xl font-bold transition-all duration-300 ${
              activeTab === "campaigns"
                ? "border-b-4 border-green-600 text-green-700 bg-green-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="hidden sm:inline">View </span>Campaigns
          </button>

          <button
            onClick={() => setActiveTab("files")}
            className={`flex-1 py-4 text-center text-base sm:text-xl font-bold transition-all duration-300 ${
              activeTab === "files"
                ? "border-b-4 border-green-600 text-green-700 bg-green-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="hidden sm:inline">Supporting </span>Data
          </button>
          
        </div>

        {/* /* Tab Content  */}

        {activeTab === "campaigns" ? (
            <CampaignsTab
              campaigns={campaigns}
              totalPoints={totalPoints}
              onTaskToggle={handleTaskToggle}
            />
          ) : <> {activeTab === "reporting" ? (
            <ReportingTab/>
          ) : (
            <FilesTab />
          )}</>
          }
       
      </div>
    </div>
  );
};

export default App;
