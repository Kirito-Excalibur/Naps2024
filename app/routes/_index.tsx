import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node"; // Use LoaderFunctionArgs
import { Link, Form } from "@remix-run/react";
import Editor from "~/Components/Editor";
import { useRef } from "react";
import { useOptionalUser } from "~/utils";
import { Outlet, useLoaderData, NavLink } from "@remix-run/react";
import { json } from "@remix-run/node";

import { getAllNotes } from "~/models/note.server";

export const loader = async ({ request }: LoaderFunctionArgs) => { // Use LoaderFunctionArgs here
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search") || ""; // Get the search query from the URL
  const noteListItems = await getAllNotes(searchQuery);
  return json({ noteListItems });
};

export const meta: MetaFunction = () => [{ title: "News And Publication Society" }];

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const user = useOptionalUser();
  const quillRef = useRef<any>();
  return (
    <>
      {/* Navbar with Search */}
      {/* <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">News And Publication Society</h1>
        <Form method="get" action="/" className="flex">
          <input
            type="text"
            name="search"
            placeholder="Search posts..."
            className="px-4 py-2 rounded-l-md border border-gray-300 text-black" // Added text-black
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
          >
            Search
          </button>
        </Form>
      </nav> */}

      {/* Posts */}
      <div className="p-6 grid gap-8">
        {/* First larger post on the left */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
  to={`editorials/${data.noteListItems[0].id}`}
  className="col-span-1 sm:col-span-2  p-5 rounded-lg shadow-lg flex flex-col items-center justify-center"
>
  <div >
  <img src={data.noteListItems[0].thumbnail || "/images/thumb.jpeg"} alt="Thumbnail Here" className="mb-4" />
  <h2 className="font-bold text-xl mb-2">
    {data.noteListItems[0].title}
  </h2>
  <p className="text-sm text-gray-500">
    {data.noteListItems[0].author}
  </p>
  </div>

</Link>



          {/* Two posts in columns */}
          <div className="grid grid-cols-1 gap-6">
            {data.noteListItems.slice(1, 3).map((note) => (
              <Link
                to={`editorials/${note.id}`}
                className="p-4 rounded-lg shadow-md"
                key={note.id}
              >
                <img src={note.thumbnail||"/images/thumb.jpeg"} alt="Thumbnail Here" />
                <h2 className="font-bold text-lg mb-2">{note.title}</h2>
                <p className="text-sm text-gray-500">{note.author}</p>
              </Link>
            ))}
          </div>
        </div>

        <hr className="my-8 border-t border-gray-300" />

        {/* Three posts row-wise below */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {data.noteListItems.slice(3, 6).map((note) => (
            <Link
              to={`editorials/${note.id}`}
              className="p-4 rounded-lg shadow-md"
              key={note.id}
            >
              <img src={note.thumbnail||"/images/thumb.jpeg"} alt="Thumbnail Here" />
              <h2 className="font-bold text-lg mb-2">{note.title}</h2>
              <p className="text-sm text-gray-500">{note.user.name}</p>
            </Link>
          ))}
        </div>

        {/* Rest of the posts smaller and row-wise */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          {data.noteListItems.slice(6).map((note) => (
            <Link
              to={`editorials/${note.id}`}
              className="border border-black p-4 rounded-lg shadow-md"
              key={note.id}
            >
              <img src={note.thumbnail||"/images/thumb.jpeg"} alt="Thumbnail Here" />
              <h2 className="font-bold text-lg mb-2">{note.title}</h2>
              <p className="text-sm text-gray-500 break-words">{note.user.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
