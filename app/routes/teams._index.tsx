import React from "react";
import "../button.css";
import { Link } from "@remix-run/react";

function Teams() {
  const team = [
    { name: "Harshit Sagar", position: "President" },
    { name: "Kumari Richa", position: "Joint President" },
    { name: "Nikhil Simon Toppo", position: "Vice President" },
    { name: "Gauri Malviya", position: "Vice President" },
    { name: "Aadrita Goswami", position: "Editor-in-Chief" },
    // { name: "Priyanshu Kumar", position: "Editor-in-Chief" },
    { name: "Anish Kishore", position: "Epistle Head" },
    { name: "Vanshika Raj Singh", position: "Media Head" },
    { name: "Yogesh Kumar", position: "Interviews' Head" },
    { name: "Dishaan Dilip", position: "Events Head" },
    { name: "Erapani Meenal", position: "Senior Executive Member" },
    // { name: "Sumit Kumar", position: "General Secretary" },
    { name: "Nidhi Devi", position: "General Secretary" },
    { name: "Alisha Mariyam Hussain", position: "Joint Secretary" },
    { name: "Garima Sablok", position: "Treasurer" },
    { name: "Yash Shekhar", position: "Co-Treasurer" },
    { name: "Aditya Kumar", position: "Co-Treasurer" },
    { name: "Erina Firdos", position: "Deputy Editor" },
    { name: "Kumar Shubham", position: "Deputy Editor" },
    // { name: "Kartikey Singh", position: "Documentation Coordinator" },
    { name: "Adrija Thakur", position: "Media Coordinator" },
    { name: "Md. Iftekhar", position: "Epistle Coordinator" },
    { name: "Aditi Prabha", position: "Design Coordinator" },
    { name: "Shruti Kumari", position: "Design Coordinator" },
    { name: "Arman Hansda", position: "Video Lead" },
    { name: "Apoorva Prakash", position: "Interviews' Coordinator" },
    { name: "AryanRaj", position: "Interviews' Coordinator" },
    { name: "Arundhuti Mukherjee", position: "Events' Coordinator" },
    { name: "Ritiraj", position: "Social Media Coordinator" },
    { name: "Md. Affan", position: "Technical Coordinator" },
     { name: "Pranit Pranav", position: "Technical Coordinator" },
    { name: "Jatin Jagathkar", position: "Executive Member" },
    { name: "Rishi Bansal", position: "Executive Member" },
     { name: "GeetNatu", position: "Executive Member" },
    { name: "Arnav Kumar", position: "Executive Member" },
    { name: "Riya Kumari", position: "Executive Member" },
    { name: "Yash Jha", position: "Executive Member" },
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
            className="items-center border-black p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <img
              src={`/images/Team/${member.name}.jpg`}
              className="w-[300px] h-[400px] object-cover"
              alt={`${member.name}`}
            />
            <h2 className="font-bold text-lg my-2">{member.name}</h2>
            <p className="text-sm text-gray-500">{member.position}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Teams;
