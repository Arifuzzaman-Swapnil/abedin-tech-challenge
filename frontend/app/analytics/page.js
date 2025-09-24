"use client";

import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Link from "next/link";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AnalyticsPage() {
  const [summary, setSummary] = useState({ published: 0, scheduled: 0, failed: 0 });
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryRes = await fetch("http://localhost:8000/analytics/summary");
        const summaryData = await summaryRes.json();
        setSummary(summaryData);

        const insightRes = await fetch("http://localhost:8000/analytics/insight");
        const insightData = await insightRes.json();
        setInsight(insightData.insight);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ["Published", "Scheduled", "Failed"],
    datasets: [
      {
        data: [summary.published, summary.scheduled, summary.failed],
        backgroundColor: ["#10b981", "#3b82f6", "#ef4444"],
        borderColor: ["#059669", "#2563eb", "#dc2626"],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#374151",
        borderWidth: 1,
      },
    },
  };

  const totalPosts = summary.published + summary.scheduled + summary.failed;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4"></div>
          <p className="text-lg text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              Abedin Tech
            </Link>
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link href="/designs" className="text-gray-600 hover:text-blue-600 font-medium">
                Design
              </Link>
              <Link href="/posts" className="text-gray-600 hover:text-blue-600 font-medium">
              Posts
              </Link>
              <Link href="/analytics" className="text-blue-600 font-medium">
              Analytics
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📊 Analytics Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Insights and performance metrics for your social media posts
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chart Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Post Status Distribution</h2>
              <p className="text-gray-600">Total Posts: {totalPosts}</p>
            </div>

            {totalPosts === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4"></div>
                <p className="text-lg text-gray-500">No data to display</p>
                <p className="text-gray-400 mt-2">Create some posts to see analytics!</p>
              </div>
            ) : (
              <div className="h-96 flex items-center justify-center">
                <div className="w-full max-w-lg">
                  <Pie data={chartData} options={chartOptions} />
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{summary.published}</div>
                <div className="text-sm text-gray-600">Published</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{summary.scheduled}</div>
                <div className="text-sm text-gray-600">Scheduled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{summary.failed}</div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
            </div>
          </div>

          {/* AI Insights Section */}
          <div className="space-y-6">
            {/* AI Insight Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl"></span>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-800">AI Insights</h2>
                  <p className="text-gray-600">Powered by artificial intelligence</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <p className="text-gray-700 leading-relaxed">
                  {insight || "Generating insights based on your post performance..."}
                </p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Performance Metrics</h3>
              
              <div className="space-y-4">
                {/* Success Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">Success Rate</span>
                    <span className="text-gray-600">
                      {totalPosts > 0 ? Math.round((summary.published / totalPosts) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: totalPosts > 0 ? `${(summary.published / totalPosts) * 100}%` : '0%' 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Pending Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">Pending Rate</span>
                    <span className="text-gray-600">
                      {totalPosts > 0 ? Math.round((summary.scheduled / totalPosts) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: totalPosts > 0 ? `${(summary.scheduled / totalPosts) * 100}%` : '0%' 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Failure Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">Failure Rate</span>
                    <span className="text-gray-600">
                      {totalPosts > 0 ? Math.round((summary.failed / totalPosts) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-red-500 h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: totalPosts > 0 ? `${(summary.failed / totalPosts) * 100}%` : '0%' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>    
  );
}