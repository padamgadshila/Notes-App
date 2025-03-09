import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare as selected,
  faClose,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare as unselected } from "@fortawesome/free-regular-svg-icons";
import Notes from "../components/Notes";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useNotes } from "../store/store";

export default function HomeLayout() {
  let notes = useNotes((state) => state.notes);
  let deleteNote = useNotes((state) => state.deleteNote);
  const navigate = useNavigate();

  // State to track selected note IDs
  const [selectedNotes, setSelectedNotes] = useState([]);

  // State to show/hide checkboxes
  const [showSelection, setShowSelection] = useState(false);

  console.log(selectedNotes);

  // Check if all notes are selected
  const allSelected = notes.length > 0 && selectedNotes.length === notes.length;

  // Toggle select/unselect all notes
  const toggleAllNotes = () => {
    if (!showSelection) {
      setShowSelection(true); // Enable selection mode
    }
  };

  // Toggle individual note selection
  const toggleNoteSelection = (id) => {
    setSelectedNotes((prev) =>
      prev.includes(id) ? prev.filter((noteId) => noteId !== id) : [...prev, id]
    );
  };

  // Close selection mode (reset everything)
  const closeSelectionMode = () => {
    setShowSelection(false);
    setSelectedNotes([]);
  };

  const deleteSelectedNotes = () => {
    selectedNotes.forEach((id) => deleteNote(id)); // Delete selected notes
    setSelectedNotes([]); // Clear selection
    setShowSelection(false); // Immediately hide selection mode
    toast.success("Deleted");
  };

  return (
    <div className="w-full max-w-[450px] mx-auto min-h-screen bg-gray-100 relative">
      <Toaster />
      {/* Header */}
      <div className="w-full flex items-center justify-between sticky top-0 bg-gray-100 z-10">
        <h1 className="text-2xl font-bold p-4">Notes</h1>
      </div>

      {/* Action Bar */}
      <div className="relative h-[25px] flex items-center justify-between px-5">
        {/* Main Checkbox to enable selection */}
        <FontAwesomeIcon
          icon={showSelection ? selected : unselected}
          className={`${
            showSelection ? "text-yellow-500" : "text-black"
          } text-2xl cursor-pointer absolute right-5`}
          onClick={toggleAllNotes}
        />

        {/* Trash icon appears only when at least one note is selected */}
        {showSelection && selectedNotes.length > 0 && (
          <FontAwesomeIcon
            icon={faTrash}
            className="text-2xl cursor-pointer text-red-500 absolute right-15 "
            // Add a delete function here later
            onClick={deleteSelectedNotes}
          />
        )}

        {/* Close button to reset selection */}
        {showSelection && (
          <FontAwesomeIcon
            icon={faClose}
            className="text-2xl cursor-pointer absolute left-5"
            onClick={closeSelectionMode}
          />
        )}
      </div>

      {/* Notes List */}
      <div className="w-full px-4">
        {notes.length > 0 &&
          notes.map((data, i) => (
            <div key={i} className="flex items-center gap-2">
              {/* Show checkboxes only when showSelection is true */}
              {showSelection && (
                <FontAwesomeIcon
                  icon={selectedNotes.includes(data.id) ? selected : unselected}
                  className={`text-2xl mx-2 cursor-pointer transition-all duration-300 ease-in-out ${
                    selectedNotes.includes(data.id)
                      ? "text-red-500"
                      : "text-black"
                  }`}
                  onClick={() => toggleNoteSelection(data.id)}
                />
              )}
              <div
                onClick={() => navigate(`/view?id=${data.id}`)}
                className="w-full flex items-center gap-4"
              >
                <Notes
                  data={data}
                  status={selectedNotes.includes(data.id) ? true : false}
                />
              </div>
            </div>
          ))}
      </div>

      {/* Floating Add Button */}
      <Link to={"/add"}>
        <FontAwesomeIcon
          icon={faPlus}
          className="fixed bottom-10 right-5 text-3xl bg-green-500 text-white px-[16px] py-[14px] rounded-full"
        />
      </Link>
    </div>
  );
}
