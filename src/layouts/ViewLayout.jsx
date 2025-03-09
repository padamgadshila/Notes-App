import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useNotes } from "../store/store";
import toast from "react-hot-toast";

export default function ViewLayout() {
  const notes = useNotes((state) => state.notes);
  const updateNote = useNotes((state) => state.updateNote);
  const navigate = useNavigate();
  const id = parseInt(new URLSearchParams(window.location.search).get("id"));

  let [current, setCurrent] = useState(null);

  useEffect(() => {
    setCurrent(notes.find((note) => note.id === id));
  }, [notes, id]);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      date: "",
    },
    onSubmit: (values) => {
      if (current) {
        updateNote(id, values);
        toast.success("Updated Successfully");
      } else {
        toast.error("Note not found");
      }
      navigate("/");
    },
  });

  useEffect(() => {
    if (current) {
      formik.setValues({
        title: current.title,
        content: current.content,
        date: new Date().toISOString(),
      });
    }
  }, [current]);

  return (
    <div className="w-full max-w-[450px] mx-auto min-h-screen bg-gray-100 relative p-4">
      <div className="w-full flex items-center justify-between sticky top-0 bg-gray-100 py-2">
        <Link to={"/"}>
          <FontAwesomeIcon className="text-xl" icon={faChevronLeft} />
        </Link>

        <button type="submit" onClick={formik.handleSubmit}>
          <FontAwesomeIcon className="text-xl text-green-500" icon={faCheck} />
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        className="flex flex-col"
      >
        <input
          type="text"
          placeholder="Title"
          className="w-full outline-none text-3xl mt-3 font-bold bg-transparent"
          {...formik.getFieldProps("title")}
        />
        <textarea
          placeholder="Write your content..."
          className="text-xl w-full min-h-[300px] outline-none mt-5 bg-transparent"
          {...formik.getFieldProps("content")}
        />
        <button type="submit" className="hidden"></button>
      </form>
    </div>
  );
}
