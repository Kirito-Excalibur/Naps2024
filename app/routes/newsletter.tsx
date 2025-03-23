import React, { useState } from "react";

const newsletters = [
  { title: "January 2025 Edition", date: "Jan 10, 2024", pdf: "/pdf/bit by bit_2025.pdf" },
  { title: "October 2024 Edition", date: "Dec 15, 2023", pdf: "/pdf/BIT by BIT_issue 2.pdf" },
  { title: "January 2024 Edition", date: "Nov 20, 2023", pdf: "/pdfs/nov2023.pdf" },
];

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Newsletter</h1>

      {/* Subscription Form */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Subscribe to our Newsletter</h2>
        <form onSubmit={handleSubscribe} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Subscribe
          </button>
        </form>
      </div>

      {/* Past Newsletters Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Past Newsletters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsletters.map((news, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900">{news.title}</h3>
              <p className="text-sm text-gray-600">{news.date}</p>
              <a href={news.pdf} download className="text-blue-600 hover:underline mt-2 block">
                Download PDF
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Share Options */}
      <div className="text-center mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Share this Newsletter</h2>
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-blue-500 text-xl hover:scale-110 transition"><i className="ri-facebook-circle-fill"></i></a>
          <a href="#" className="text-blue-400 text-xl hover:scale-110 transition"><i className="ri-twitter-fill"></i></a>
          <a href="#" className="text-red-600 text-xl hover:scale-110 transition"><i className="ri-instagram-line"></i></a>
          <a href="#" className="text-blue-700 text-xl hover:scale-110 transition"><i className="ri-linkedin-box-fill"></i></a>
        </div>
      </div>
    </div>
  );
}
