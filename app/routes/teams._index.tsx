import React from "react";
import "../button.css"

function teams() {
  const team = [
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
      <h1 className="text-2xl text-center my-4">Our Team</h1>
  
<div className="text-end mx-6">
  <button className="button">
    <div>
      <div>
        <div>Legends Of The Past</div>
      </div>
    </div>
  </button>
</div>

      <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-14">
        {team.slice(0,12).map((member,index) => (
          <div key={index} className=" items-center border-black p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
              src={`/images/Team/${member.name}.jpg`}
              className="w-[300px] h-[400px] object-cover "
              alt="Thumnail Here"
            />
            <h2 className="font-bold text-lg mb-2">{member.name}</h2>
            {/* </p> */}
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

      <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-14">
        {team.slice(12,15).map((member) => (
          <div className=" items-center border-black p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
              src={`/images/Team/${member.name}.jpg`}
              className="w-[300px] h-[400px] object-cover "
              alt="Thumnail Here"
            />
            <h2 className="font-bold text-lg mb-2">{member.name}</h2>
            {/* </p> */}
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

      <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-14">
        {team.slice(15,18).map((member) => (
          <div className=" items-center border-black p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
              src={`/images/Team/${member.name}.jpg`}
              className="w-[300px] h-[400px] object-cover "
              alt="Thumnail Here"
            />
            <h2 className="font-bold text-lg mb-2">{member.name}</h2>
            {/* </p> */}
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

      <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-14">
        {team.slice(18).map((member) => (
          <div className=" items-center border-black p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
              src={`/images/Team/${member.name}.jpg`}
              className="w-[300px] h-[400px] object-cover "
              alt="Thumnail Here"
            />
            <h2 className="font-bold text-lg mb-2">{member.name}</h2>
            {/* </p> */}
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

export default teams;
