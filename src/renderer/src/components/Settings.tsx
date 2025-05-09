import React from 'react';
import { Save, Bell, Lock, User, Globe, CreditCard } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <a href="#profile" className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 text-blue-700">
                    <User size={20} />
                    <span>Profile</span>
                  </a>
                </li>
                <li>
                  <a href="#notifications" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                    <Bell size={20} />
                    <span>Notifications</span>
                  </a>
                </li>
                <li>
                  <a href="#security" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                    <Lock size={20} />
                    <span>Security</span>
                  </a>
                </li>
                <li>
                  <a href="#billing" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                    <CreditCard size={20} />
                    <span>Billing</span>
                  </a>
                </li>
                <li>
                  <a href="#preferences" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                    <Globe size={20} />
                    <span>Preferences</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
              <p className="mt-1 text-sm text-gray-500">Update your profile information</p>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      defaultValue="Admin"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      defaultValue="User"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      defaultValue="admin@passit.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      defaultValue="+44 7700 900000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    defaultValue="Driving school administrator with 5 years of experience."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <Save size={20} className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}