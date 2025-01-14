export function SectionsStep1() {
  return (
    <div className="flex items-start justify-start bg-gray-50">
      <div className="m-12 space-y-4 p-2">
        <h1 className="font-notoSerif text-[44px] font-medium text-green-800">
          Booking Room
        </h1>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-500 text-2xl font-bold text-white">
              1
            </div>
            <div className="text-lg font-semibold text-orange-500">
              Basic Information
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-100 text-2xl font-bold text-orange-500">
              2
            </div>
            <div className="text-lg font-semibold text-gray-800">
              Special Request
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-100 text-2xl font-bold text-orange-500">
              3
            </div>
            <div className="text-lg font-semibold text-gray-800">
              Payment Method
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function SectionsStep2() {
  return (
    <div className="flex items-start justify-start bg-gray-50">
      <div className="m-12 space-y-4 p-2">
        <h1 className="font-notoSerif text-[44px] font-medium text-green-800">
          Booking Room
        </h1>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-100 text-2xl font-bold text-orange-500">
              1
            </div>
            <div className="text-lg font-semibold text-gray-800">
              Basic Information
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-500 text-2xl font-bold text-white">
              2
            </div>
            <div className="text-lg font-semibold text-orange-500">
              Special Request
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-100 text-2xl font-bold text-orange-500">
              3
            </div>
            <div className="text-lg font-semibold text-gray-800">
              Payment Method
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SectionsStep3() {
  return (
    <div className="flex items-start justify-start bg-gray-50">
      <div className="m-12 space-y-4 p-2">
        <h1 className="font-notoSerif text-[44px] font-medium text-green-800">
          Booking Room
        </h1>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-100 text-2xl font-bold text-orange-500">
              1
            </div>
            <div className="text-lg font-semibold text-gray-800">
              Basic Information
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-100 text-2xl font-bold text-orange-500">
              2
            </div>
            <div className="text-lg font-semibold text-gray-800">
              Special Request
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-500 text-2xl font-bold text-white">
              3
            </div>
            <div className="text-lg font-semibold text-orange-500">
              Payment Method
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ConditionRefund() {
  return (
    <div className="rounded bg-gray-300 p-4">
      <ul className="space-y-2 text-sm text-gray-600">
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>
            Cancel booking will get full refund if the cancelation occurs before
            24 hours of the check-in date.
          </span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>
            Able to change check-in or check-out date booking within 24 hours of
            the booking date.
          </span>
        </li>
      </ul>
    </div>
  );
}
