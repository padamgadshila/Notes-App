import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Notes from "../components/Notes";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useNotes } from "../store/store";

export default function HomeLayout() {
  let notes = useNotes((state) => state.notes);
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[450px] mx-auto min-h-screen bg-gray-100 relative">
      <Toaster />
      {/* Header */}
      <div className="w-full flex items-center justify-between sticky top-0 bg-gray-100">
        <h1 className="text-2xl font-bold p-4">Notes</h1>
        <div className="relative"></div>
      </div>

      {/* Notes List */}
      <div className="w-full px-4">
        {notes.length > 0 &&
          notes.map((data, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                onClick={() => navigate(`/view?id=${data.id}`)}
                className="w-full"
              >
                <Notes data={data} />
              </div>
            </div>
          ))}
      </div>

      {/* Floating Add Button */}
      <Link to={"/add"}>
        <FontAwesomeIcon
          icon={faPlus}
          className="fixed bottom-10 right-5 text-3xl bg-amber-400 px-[16px] py-[14px] rounded-full"
        />
      </Link>
    </div>
  );
}
