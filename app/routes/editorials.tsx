import { useLoaderData } from "@remix-run/react";
import React from "react";
import { json } from "@remix-run/react";

import { getAllNotes } from "~/models/note.server";

export const loader = async () => {
  const noteListItems = await getAllNotes();
  return json({ noteListItems });
};

const Editorials = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="text-2xl text-center my-4">All Notes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data.noteListItems.map((note) => (
          <div
            className="border border-black p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            key={note.id}
          >
            <img src="thumb.jpeg" alt="Thumnail Here" />
            <h2 className="font-bold text-lg mb-2">{note.title}</h2>
            <p className="text-sm text-gray-500">{note.user.email}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Editorials;
