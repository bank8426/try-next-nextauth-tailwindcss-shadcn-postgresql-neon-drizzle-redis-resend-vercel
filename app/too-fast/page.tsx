import React from "react";

const page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-bebas-neue text-light-100 text-5xl font-bold">
        Too fast, BRO!!!
      </h1>
      <p className="text-light-400 mt-3 max-w-xl text-center">
        You've sent too many requests to a service or system in a short period,
        exceeding the limits we've set to prevent abuse or server overload.
      </p>
    </main>
  );
};

export default page;
