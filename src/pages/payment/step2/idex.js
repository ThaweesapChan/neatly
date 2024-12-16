import React from "react";
export default function Standardrequest() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl space-y-6 rounded-lg bg-white p-6 shadow-sm">
        {/* Standard Request Section */}
        <div className="space-y-4">
          <div>
            <h2 className="font-inter text-lg font-semibold text-gray-700">
              Standard Request
            </h2>
            <p className="font-inter text-sm text-gray-500">
              These requests are not confirmed (Depend on the available room)
            </p>
          </div>

          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="font-inter text-gray-600">Early check-in</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="font-inter text-gray-600">Late check-out</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="font-inter text-gray-600">Non-smoking room</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="font-inter text-gray-600">
                A room on the high floor
              </span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="font-inter text-gray-600">A quiet room</span>
            </label>
          </div>
        </div>

        {/* Special Request Section */}
        <div className="space-y-4">
          <div>
            <h2 className="font-inter text-lg font-semibold text-gray-700">
              Special Request
            </h2>
            <p className="font-inter text-sm text-gray-500">
              Additional charge may apply
            </p>
          </div>

          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="font-inter text-gray-600">
                Baby cot (+THB 400)
              </span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
                defaultChecked
              />
              <span className="font-inter text-gray-600">
                Airport transfer (+THB 200)
              </span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="font-inter text-gray-600">
                Extra bed (+THB 500)
              </span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="font-inter text-gray-600">
                Extra pillows (+THB 100)
              </span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="font-inter text-gray-600">
                Phone chargers and adapters (+THB 100)
              </span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="font-inter text-gray-600">Breakfast (+150)</span>
            </label>
          </div>
        </div>

        {/* Additional Request Section */}
        <div className="space-y-4">
          <h2 className="font-inter text-lg font-semibold text-gray-700">
            Additional Request
          </h2>
          <textarea
            className="h-32 w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
            placeholder="Enter any additional requests here..."
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 font-inter text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Back
          </button>
          <button
            type="submit"
            className="rounded-md border border-transparent bg-orange-600 px-4 py-2 font-inter text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
