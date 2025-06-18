import { Link } from "@remix-run/react";
import React from "react";

function legends() {
  const legends = [
    { name: "Priyanka Sinha", position: "President" },
    { name: "Khushi", position: "Joint-President" },
    { name: "Aditya Dubey", position: "Vice-President" },
    { name: "Ambuj Mishra", position: "Vice-President" },
    { name: "Sumeet Kumar", position: "Editor-In-Chief" },
    { name: "Chetana Jain", position: "Editor-In-Chief" },
    { name: "Harsh Tejaswi", position: "Epistle Head" },
    { name: "Shreya Suman", position: "Media Head" },
    {
      name: "Shashwat Jha",
      position_1: "Interview's Head",
      position_2: "Event's Head",
    },
    { name: "Rahul Sharma", position: "Event's Head" },
    { name: "Anushka Singh", position: "Senior Executive Member" },
    { name: "Kashish Kumar Singh", position: "Senior Executive Member" },
  ];

  return (
    <>
      <h1 className="text-2xl text-center my-4 font-cinzel">Legends Of The Past</h1>

      <div className="text-end mx-6">
        <Link to="/teams">
          <button className="button">
            <div>
              <div>
                <div>Current Pioneers</div>
              </div>
            </div>
          </button>
        </Link>
      </div>

      <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-14">
        {legends.map((member, index) => (
          <div
            key={index}
            className="items-center border-black p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={`/images/Team/${member.name}.jpg`}
              className="w-[300px] h-[400px] object-cover"
              alt="Thumbnail Here"
            />
            <h2 className="font-bold text-lg mb-2">{member.name}</h2>
            {member.position_1 ? (
              <p className="text-sm text-gray-500">
                {member.position_1}, {member.position_2}
              </p>
            ) : (
              <p className="text-sm text-gray-500">{member.position}</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default legends;