import React from "react";

export default function Notes({ data }) {
  return (
    <div className="bg-gray-200 w-full flex flex-col p-3 rounded-md h-[103px] my-2 select-auto pointer-events-none">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <span className="text-xl inline-block w-full text-ellipsis whitespace-nowrap overflow-hidden">
        {data.content}
      </span>
      <span className="text-sm">{data.date}</span>
    </div>
  );
}
