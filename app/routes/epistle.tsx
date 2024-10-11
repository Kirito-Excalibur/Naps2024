import { url } from "inspector";
import React from "react";

function epistle() {
  const items = [
    { name: "Epistle K22", url: "/images/Epistle 22.jpg" },
    { name: "Epistle K23", url: "/images/Epistle 23.jpg" },
    { name: "Epistle K24", url: "/images/Epistle 24.jpg" },
  ];

  return (
    <>
      <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 p-14">
        {items.map((member) => (
          <div className=" items-center border-black p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
              src={member.url}
           
              alt="Thumnail Here"
            />
            <h2 className="font-bold text-lg mb-2 text-center">{member.name}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default epistle;
