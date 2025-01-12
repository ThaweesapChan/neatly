import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const DeleteRoomWithModal = ({ roomId }) => {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      /* console.log("Attempting to delete room with ID:", roomId); */

      const response = await axios.delete(
        `/api/deleteRoomPropertyById/${roomId}`,
      );

      if (response.data) {
        setShowDeleteModal(false);
        setShowSuccessModal(true);
        // Redirect after 2 seconds of showing success message
        setTimeout(() => {
          router.push("/agent/roomproperty/roomproperty");
        }, 2000);
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      const message =
        error.response?.data?.details ||
        error.response?.data?.error ||
        "An error occurred while deleting the room. Please try again.";
      setErrorMessage(message);
      setShowDeleteModal(false);
      setShowErrorModal(true);
    } finally {
      setIsDeleting(false);
    }
  };

  // Modal Components
  const DeleteConfirmationModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => setShowDeleteModal(false)}
      />
      <div className="relative z-50 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <button
          className="absolute right-4 top-4 text-[#C8CCDB] hover:text-gray-800"
          onClick={() => setShowDeleteModal(false)}
        >
          ✕
        </button>
        <h2 className="mb-5 font-inter text-xl font-semibold">Delete Room</h2>
        <hr />
        <p className="mb-6 mt-6 font-inter text-base font-normal text-gray-600">
          Are you sure you want to delete this room?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="rounded border border-[#E76B39] px-4 py-2 font-openSans text-base font-medium text-[#E76B39] hover:border-2 hover:border-[#E76B39]"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Yes, I want to delete"}
          </button>
          <button
            className="rounded bg-[#C14817] px-4 py-2 font-openSans text-base font-medium text-white hover:border-2 hover:border-[#C14817]"
            onClick={() => setShowDeleteModal(false)}
            disabled={isDeleting}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );

  const SuccessModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative z-50 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 text-center">
          <div className="mb-4 flex justify-center">
            <svg
              className="h-16 w-16 text-green-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-semibold text-gray-900">
            Successfully Deleted
          </h2>
          <p className="text-gray-600">
            The room has been successfully deleted. Redirecting...
          </p>
        </div>
      </div>
    </div>
  );

  const ErrorModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => setShowErrorModal(false)}
      />
      <div className="relative z-50 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <button
          className="absolute right-4 top-4 text-gray-600 hover:text-gray-800"
          onClick={() => setShowErrorModal(false)}
        >
          ✕
        </button>
        <div className="mb-4 text-center">
          <div className="mb-4 flex justify-center">
            <svg
              className="h-16 w-16 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-semibold text-gray-900">Error</h2>
          <p className="text-gray-600">{errorMessage}</p>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            className="rounded bg-[#C14817] px-4 py-2 font-openSans text-base font-medium text-white hover:border-2 hover:border-[#C14817]"
            onClick={() => setShowErrorModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setShowDeleteModal(true)}
        className="px-2 py-4 font-openSans text-base font-semibold text-[#646D89]"
      >
        Delete Room
      </button>

      {showDeleteModal && <DeleteConfirmationModal />}
      {showSuccessModal && <SuccessModal />}
      {showErrorModal && <ErrorModal />}
    </>
  );
};

export default DeleteRoomWithModal;
