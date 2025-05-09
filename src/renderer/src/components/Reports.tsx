import React from 'react';
import { BarChart, PieChart, Download, Calendar } from 'lucide-react';

export function Reports() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select className="border rounded-lg px-3 py-2">
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
              <option>Custom Range</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
              <Calendar size={20} className="mr-2" />
              Select Dates
            </button>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <Download size={20} className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Lesson Distribution</h3>
            <BarChart className="text-gray-400" size={20} />
          </div>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
            <span className="text-gray-500">Chart Placeholder</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Student Progress</h3>
            <PieChart className="text-gray-400" size={20} />
          </div>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
            <span className="text-gray-500">Chart Placeholder</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Financial Summary</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Total Revenue</div>
              <div className="mt-2 text-2xl font-bold text-gray-900">£24,500</div>
              <div className="mt-1 text-sm text-green-600">+12% from last month</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Average Lesson Price</div>
              <div className="mt-2 text-2xl font-bold text-gray-900">£35</div>
              <div className="mt-1 text-sm text-gray-600">Per hour</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Total Lessons</div>
              <div className="mt-2 text-2xl font-bold text-gray-900">700</div>
              <div className="mt-1 text-sm text-blue-600">85% completion rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}