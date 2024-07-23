import React from "react";

export default function LoadingSkeleton() {
  return (
    <>
      <div className="rounded-xl p-4 shadow-md flex mt-4 max-w-[500px] w-full animate-pulse h-[160px] bg-gray-200 duration-1000"></div>
      <div className="rounded-xl p-4 shadow-md flex mt-4 max-w-[500px] w-full animate-pulse h-[160px] bg-gray-200 duration-1000"></div>
      <div className="rounded-xl p-4 shadow-md flex mt-4 max-w-[500px] w-full animate-pulse h-[160px] bg-gray-200 duration-1000"></div>
      <div className="rounded-xl p-4 shadow-md flex mt-4 max-w-[500px] w-full animate-pulse h-[160px] bg-gray-200 duration-1000"></div>
      <div className="rounded-xl p-4 shadow-md flex mt-4 max-w-[500px] w-full animate-pulse h-[160px] bg-gray-200 duration-1000"></div>
    </>
  );
}
