import React from "react";
import "../button.css";
import { Link } from "@remix-run/react";

function teams() {
  const team = [
    { name: "Harshit Sagar", position: "General Secretary" },
    { name: "Gauri Malviya", position: "Joint Secretary" },
    { name: "Kumari Richa", position: "Joint Secretary" },
    { name: "Priyanshu Kumar", position: "Treasurer" },
    { name: "Aadrita Goswami", position: "Co-Treasurer" },
    { name: "Vanshika Raj Singh", position: "Co-Treasurer" },
    { name: "Priyanshu Priyam", position: "Deputy Editor" },
    { name: "Akash Tiwari", position: "Deputy Editor" },
    { name: "Aaditya Sinha", position: "Documentation Coordinator" },
    { name: "Yogesh Kumar", position: "Media Coordinator" },
    { name: "Anish Kishore", position: "Epistle Coordinator" },
    { name: "Khushii Mathur", position: "Interview's Coordinator" },
    { name: "Erapani Meenal", position: "Event's Coordinator" },
    { name: "Anushka Maiti", position: "Event's Coordinator" },
    { name: "Piyush Meena", position: "Content and Social Media Coordinator" },
    { name: "Nikhil Simon Toppo", position: "Technical Coordinator" },
    { name: "Md. Raja Istekhar", position: "Executive Member" },
    { name: "Dishaan D", position: "Executive Member" },
  ];

  return (
    <>
      <h1 className="text-2xl text-center my-4 font-cinzel">Our Team</h1>

      <div className="text-end mx-6">
        <Link to="/teams/legends">
          <button className="button">
            <div>
              <div>
                <div>Legends Of The Past</div>
              </div>
            </div>
          </button>
        </Link>
      </div>

      <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-14">
        {team.map((member, index) => (
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
            {member.position ? (
              <p className="text-sm text-gray-500">
                {member.position}
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

export default teams;
