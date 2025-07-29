
import React from 'react';
import { Header } from '@/components/layout/Header';

const Dashboard = () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card border-l-4 border-l-primary-600 shadow-sm h-full">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-grow">
                <div className="text-xs font-bold text-primary-600 uppercase mb-1">
                  Earnings (Monthly)
                </div>
                <div className="text-xl font-bold text-gray-800">
                  $40,000
                </div>
              </div>
              <div className="flex-shrink-0">
                <i className="fas fa-calendar text-2xl text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
