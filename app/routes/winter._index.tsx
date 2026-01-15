import { json } from "@remix-run/node";
import { useLoaderData, Link, Form } from "@remix-run/react";
import { getWinterPostListItems } from "~/models/winter.server";
import { getUserId } from "~/session.server";

export const loader = async ({ request }: any) => {
  const posts = await getWinterPostListItems({});
  const userId = await getUserId(request);
  return json({ posts, userId });
};

export default function WinterIndexPage() {
  const { posts, userId } = useLoaderData<typeof loader>();

  return (
    <>
      {userId && (
        <div className="flex justify-center mb-6 p-4">
          <Link
            to="/winter/new"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add New Winter Post
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {posts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">No winter posts yet</h2>
            <p className="text-gray-500">There are currently no winter posts to display.</p>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="w-fit p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={post.imageUrl || "/images/thumb.jpeg"}
                alt="Thumbnail Here"
              />
              <h2 className="font-bold text-lg mb-2">{post.title}</h2>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-blue-600 block mb-2"
              >
                View Details →
              </a>

              {userId === post.userId && (
                <div className="flex gap-2 mt-2">
                  <Link
                    to={`/winter/${post.id}`}
                    className="text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>

                  <Form method="post" action={`/winter/${post.id}`} className="inline">
                    <input type="hidden" name="intent" value="delete" />
                    <button
                      type="submit"
                      className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      onClick={(e) => {
                        if (!confirm("Are you sure you want to delete this post?")) {
                          e.preventDefault();
                        }
                      }}
                    >
                      Delete
                    </button>
                  </Form>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}