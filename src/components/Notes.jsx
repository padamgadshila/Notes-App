import React from "react";

export default function Notes({ data, status }) {
  return (
    <div
      className={`${
        status ? "bg-red-500 text-white" : "bg-gray-200 text-black"
      } w-full flex flex-col p-3 rounded-md h-[103px] my-2 select-auto pointer-events-none transition-all duration-300 ease-in-out`}
    >
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <span className="text-xl inline-block w-full text-ellipsis whitespace-nowrap overflow-hidden">
        {data.content}
      </span>
      <span className="text-sm">{data.date}</span>
    </div>
  );
}
