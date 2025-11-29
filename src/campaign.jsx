import React from 'react';


const CustomCheckbox = ({ id, checked, onChange, label, points }) => (
  <div className="flex items-start py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      // Green themed checkbox styles
      className="appearance-none w-5 h-5 mt-1 border-2 border-green-400 rounded-md checked:bg-green-600 checked:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-150 cursor-pointer flex-shrink-0"
    />
    <label 
      htmlFor={id} 
      className={`ml-3 flex-1 text-gray-800 text-base leading-snug ${checked ? 'line-through text-gray-400' : 'font-medium'}`}
    >
      {label}
      <span className="ml-2 text-sm font-normal text-green-500"> (+{points} Pts)</span>
    </label>
    {/* Visual indicator for checked state (white checkmark) */}
    {checked && (
      <svg className="w-5 h-5 text-white absolute mt-1 pointer-events-none ml-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    )}
  </div>
);


const CampaignsTab = ({ campaigns, totalPoints, onTaskToggle }) => {
  return (
    <div className="p-4 sm:p-8 space-y-8">
      
      {/* Points Display - Green Theme */}
      <div className="flex justify-between items-center bg-green-50 p-4 sm:p-6 rounded-xl shadow-lg border border-green-100">
        <h3 className="text-xl sm:text-2xl font-bold text-green-700">Your Impact Score</h3>
        <div className="flex items-baseline">
            <span className="text-4xl sm:text-5xl font-extrabold text-green-600 mr-2">{totalPoints}</span>
            <span className="text-xl sm:text-2xl font-semibold text-green-500">Pts</span>
        </div>
      </div>
      
      {/* Campaign List */}
      <div className="space-y-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
            <h4 className="text-xl font-bold mb-4 text-gray-800 border-b pb-3">{campaign.title}</h4>
            <div className="space-y-2">
              {campaign.tasks.map((task) => (
                <CustomCheckbox
                  key={task.id}
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onChange={() => onTaskToggle(campaign.id, task.id, task.points)}
                  label={task.text}
                  points={task.points}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignsTab;