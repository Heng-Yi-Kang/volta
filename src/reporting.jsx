import React from 'react';

const ReportingTab = () => {
  return (
    <div className="p-4 sm:p-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-700">Submit an Observation</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Your Role</label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-green-500 focus:border-green-500 transition-colors text-base"
            defaultValue=""
          >
            <option value="" disabled>Select your role</option>
            <option>Facility Manager</option>
            <option>Team Lead</option>
            <option>Employee Volunteer</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Details of Observation / Issue (SDG 7 Related)</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors h-40 text-base"
            placeholder="E.g., The lights in the North Annex were left on all weekend. A loud humming noise is coming from Chiller Unit 3."
          ></textarea>
        </div>
        <button 
          className="w-full py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-colors text-lg"
          onClick={() => alert('Report Submitted! The Volta engine will analyze this and may generate a new campaign task.')}
        >
          Submit Report
        </button>
      </div>
    </div>
  );
};

export default ReportingTab;