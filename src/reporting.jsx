import React, { useState } from "react";
import axios from "axios";

const ReportingTab = ({ onResultUpdate }) => {
  const [formData, setFormData] = useState({
    role: "",
    report: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log("posting: ", formData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/info?role=admin&report=electricity bill is high",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("backend response: ", response.data);

        const result = await axios.get("http://127.0.0.1:8000/agent/process", { withCredentials: true });
        sessionStorage.setItem("result", JSON.stringify(result.data));
        if (onResultUpdate) {
          onResultUpdate(result.data); // Send result data to App.jsx
        }
        // axios
        //   .get("http://127.0.0.1:8000/result/get-result", { withCredentials: true })
        //
        //   .then((response) => {
        //     console.log("Data fetched successfully:");
        //     console.log("HTTP Status:", response.status);
        //     console.log("Data:", response.data);
        //   })
        //
        //   .catch((error) => {
        //     console.error("❌ Error fetching data:", error.message);
        //     if (error.response) {
        //       console.error("Response Status:", error.response.status);
        //     }
        //   });
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
     
        console.error("Server error:", error.response.data);
        console.error("Status:", error.response.status);
      } else if (error.request) {
    
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      throw error;
    }

    // alert('Report Submitted! The Volta engine will analyze this and may generate a new campaign task.')
  };

  return (
    <div className="p-4 sm:p-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-700">
        Submit an Observation
      </h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Your Role
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-green-500 focus:border-green-500 transition-colors text-base"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            
            <option value="admin">Admin</option>
            <option value="manager">Facility Manager</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Details of Observation / Issue (SDG 7 Related)
          </label>
          <textarea
            name="report"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors h-40 text-base"
            placeholder="E.g., The lights in the North Annex were left on all weekend. A loud humming noise is coming from Chiller Unit 3."
            value={formData.report}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          className="w-full py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-colors text-lg"
          onClick={handleSubmit}
        >
          Launch Campaign
        </button>
      </div>
    </div>
  );
};

export default ReportingTab;