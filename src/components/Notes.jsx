import React from "react";

export default function Notes({ data, status }) {
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const now = new Date();

    const isToday =
      dateObj.getDate() === now.getDate() &&
      dateObj.getMonth() === now.getMonth() &&
      dateObj.getFullYear() === now.getFullYear();

    if (isToday) {
      return `Today at ${dateObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`;
    } else {
      return dateObj.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  };
  return (
    <div
      className={`${
        status ? "bg-red-500 text-white" : "bg-gray-200 text-black"
      } w-full flex flex-col p-3 rounded-md my-2 select-auto pointer-events-none transition-all duration-300 ease-in-out`}
    >
      <h1 className="text-2xl font-bold h-[30px]">
        {data.title ? data.title : "No Title"}
      </h1>
      <span className="text-xl h-[30px] inline-block w-full text-ellipsis whitespace-nowrap overflow-hidden">
        {data.content ? data.content : "No Content"}
      </span>
      <span className="text-sm">{formatDate(data.date)}</span>
    </div>
  );
}
