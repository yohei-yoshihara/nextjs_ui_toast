"use client";
import { useToast } from "./toast";

export default function ToastTest() {
  const toast = useToast();

  const handleShowToast = () => {
    toast.open({
      component: (
        <div className="bg-green-300 text-green-800 px-2 py-1 rounded-lg shadow-lg">
          <div>
            <h3 className="font-bold">Title</h3>
            <p className="text-sm">This is a toast.</p>
          </div>
        </div>
      ),
      duration: 5000,
    });
  };

  return (
    <div className="m-5">
      <button
        className="bg-blue-500 p-2 font-bold rounded-lg"
        onClick={handleShowToast}>
        Show Toast
      </button>
    </div>
  );
}
