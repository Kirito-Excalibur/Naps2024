import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useRef } from "react";
import { useOptionalUser } from "~/utils";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import { getAllNotes } from "~/models/note.server";
import { getAllWinterPosts } from "~/models/winter.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search") || "";
  
  // Get both regular notes and winter posts
  const noteListItems = await getAllNotes(searchQuery);
  const winterPosts = await getAllWinterPosts(searchQuery);
  
  return json({ noteListItems, winterPosts, searchQuery });
};

export const meta: MetaFunction = () => [{ title: "News And Publication Society" }];

export default function Index() {
  const { noteListItems, winterPosts, searchQuery } = useLoaderData<typeof loader>();
  const user = useOptionalUser();
  const quillRef = useRef<any>();
  
  // If there's a search query, show search results
  if (searchQuery) {
    return (
      <div className="p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          <p className="text-gray-600 mb-4">
            Results for "{searchQuery}" ({noteListItems.length + winterPosts.length} total)
          </p>
          <Link 
            to="/" 
            className="text-blue-500 hover:text-blue-700 underline"
          >
            ← Back to all posts
          </Link>
        </div>

        {/* Regular Posts Results */}
        {noteListItems.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Editorial Posts ({noteListItems.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {noteListItems.map((note) => (
                <Link
                  to={`editorials/${note.id}`}
                  className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  key={note.id}
                >
                  <img src={note.thumbnail || "/images/thumb.jpeg"} alt="Thumbnail Here" />
                  <h3 className="font-bold text-lg mb-2">{note.title}</h3>
                  <p className="text-sm text-gray-500">{note.author || note.user?.name}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Winter Posts Results */}
        {winterPosts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Winter Posts ({winterPosts.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {winterPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <img
                    src={post.imageUrl || "/images/thumb.jpeg"}
                    alt="Thumbnail Here"
                  />
                  <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:text-blue-600 block"
                  >
                    View Details →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {noteListItems.length === 0 && winterPosts.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">No results found</h2>
            <p className="text-gray-500">No posts match your search for "{searchQuery}"</p>
          </div>
        )}
      </div>
    );
  }

  // Default home page layout (no search)
  return (
    <>
      {/* Posts */}
      <div className="p-6 grid gap-8">
        {noteListItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">No posts found</h2>
            <p className="text-gray-500">There are currently no posts to display.</p>
          </div>
        ) : (
          <>
            {/* First larger post on the left */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {noteListItems[0] && (
                <Link
                  to={`editorials/${noteListItems[0].id}`}
                  className="col-span-1 sm:col-span-2 p-5 rounded-lg shadow-lg flex flex-col items-center justify-center"
                >
                  <div>
                    <img 
                      src={noteListItems[0].thumbnail || "/images/thumb.jpeg"} 
                      alt="Thumbnail Here" 
                      className="mb-4" 
                    />
                    <h2 className="font-bold text-xl mb-2">
                      {noteListItems[0].title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {noteListItems[0].author}
                    </p>
                  </div>
                </Link>
              )}

              {/* Two posts in columns */}
              <div className="grid grid-cols-1 gap-6">
                {noteListItems.slice(1, 3).map((note) => (
                  <Link
                    to={`editorials/${note.id}`}
                    className="p-4 rounded-lg shadow-md"
                    key={note.id}
                  >
                    <img src={note.thumbnail || "/images/thumb.jpeg"} alt="Thumbnail Here" />
                    <h2 className="font-bold text-lg mb-2">{note.title}</h2>
                    <p className="text-sm text-gray-500">{note.author}</p>
                  </Link>
                ))}
              </div>
            </div>

            {noteListItems.length > 3 && (
              <>
                <hr className="my-8 border-t border-gray-300" />

                {/* Three posts row-wise below */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {noteListItems.slice(3, 6).map((note) => (
                    <Link
                      to={`editorials/${note.id}`}
                      className="p-4 rounded-lg shadow-md"
                      key={note.id}
                    >
                      <img src={note.thumbnail || "/images/thumb.jpeg"} alt="Thumbnail Here" />
                      <h2 className="font-bold text-lg mb-2">{note.title}</h2>
                      <p className="text-sm text-gray-500">{note.author}</p>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {noteListItems.length > 6 && (
              <>
                {/* Rest of the posts smaller and row-wise */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  {noteListItems.slice(6).map((note) => (
                    <Link
                      to={`editorials/${note.id}`}
                      className="border border-black p-4 rounded-lg shadow-md"
                      key={note.id}
                    >
                      <img src={note.thumbnail || "/images/thumb.jpeg"} alt="Thumbnail Here" />
                      <h2 className="font-bold text-lg mb-2">{note.title}</h2>
                      <p className="text-sm text-gray-500 break-words">{note.author}</p>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}