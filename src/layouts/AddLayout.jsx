import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useCounter, useNotes } from "../store/store";
import toast from "react-hot-toast";

export default function AddLayout() {
  let addNote = useNotes((state) => state.addNote);
  let count = useCounter((state) => state.count);
  let increment = useCounter((state) => state.increment);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
    },
    onSubmit: (values) => {
      const newId = count + 1;
      addNote({ ...values, id: newId });
      increment();
      toast.success("Saved");
    },
  });

  return (
    <div className="w-full max-w-[450px] mx-auto min-h-screen bg-gray-100 relative p-4">
      <div className="w-full flex items-center justify-between sticky top-0 bg-gray-100 py-2">
        <Link to={"/"}>
          <FontAwesomeIcon className="text-xl" icon={faChevronLeft} />
        </Link>

        <button
          type="submit"
          onClick={() => {
            formik.handleSubmit();
            navigate("/");
          }}
        >
          <FontAwesomeIcon className="text-xl text-amber-500" icon={faCheck} />
        </button>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col">
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
