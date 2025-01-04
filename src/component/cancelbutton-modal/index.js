import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const CancelButtonWithModal = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setShowModal(true)}
        className="border-[#E76B39] px-6 text-[#E76B39] hover:border-2 hover:border-[#E76B39] hover:text-[#E76B39]"
      >
        Cancel
      </Button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowModal(false)}
          />
          <div className="relative z-50 w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
            {/* Close Button */}
            <button
              className="absolute right-4 top-4 text-[#C8CCDB] hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h2 className="mb-5 font-inter text-xl font-semibold">
              Are you sure you want to cancel?
            </h2>
            <hr />

            <p className="mb-6 mt-6 font-inter text-base font-normal text-gray-600">
              Any unsaved changes will be lost. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="rounded border border-[#E76B39] px-4 py-2 font-openSans text-base font-medium text-[#E76B39] hover:border-2 hover:border-[#E76B39]"
                onClick={() => router.push("/agent/roomproperty/roomproperty")}
              >
                Yes, leave page
              </button>
              <button
                className="rounded bg-[#C14817] px-4 py-2 font-openSans text-base font-medium text-white hover:border-2 hover:border-[#C14817]"
                onClick={() => setShowModal(false)}
              >
                No, continue editing
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CancelButtonWithModal;
