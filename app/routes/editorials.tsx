import { useLoaderData } from "@remix-run/react";
import React from "react";
import { json,Link } from "@remix-run/react";

import { getAllNotes } from "~/models/note.server";

export const loader = async () => {
  const noteListItems = await getAllNotes();
  return json({ noteListItems });
};

const editorials = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <div>

      <h1>All Notes</h1>
      <div className="flex gap-4 ">
        {data.noteListItems.map((note) => (
          <div className="border border-black" key={note.id}>
            <h2>{note.title}</h2>
            <h2>{note.user.email}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default editorials;
