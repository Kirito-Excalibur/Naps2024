import { json } from "@remix-run/node";
import { useLoaderData, Link, Outlet ,Form} from "@remix-run/react";
import { getWinterPostListItems } from "~/models/winter.server";
import { getUserId } from "~/session.server";

export const loader = async ({ request }: any) => {
  const posts = await getWinterPostListItems({});
  const userId = await getUserId(request);
  return json({ posts, userId });
};

export default function WinterPage() {
  const { posts, userId } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Winter Section
      </h1>

      
      <Outlet />

      {userId && (
        <div className="flex justify-center mb-6">
          <Link
            to="/winter/new"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add New Winter Post
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {posts.map((post) => (
    <div key={post.id} className="border rounded p-4 shadow">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover rounded mb-2"
        />
      )}

      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
      <p className="text-sm text-gray-600 mb-2">
  Year {post.year} • Week {post.week}
</p>

      {/* Public → External Link */}
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline block mb-3"
      >
        View Details →
      </a>

      {userId === post.userId && (
  <div className="flex gap-3">
    {/* Edit → same route */}
    <Link
      to={`/winter/${post.id}`}
      className="text-sm bg-yellow-500 text-white px-3 py-1 rounded"
    >
      Edit
    </Link>

    {/* Delete → same route with intent */}
    <Form method="post" action={`/winter/${post.id}`}>
      <input type="hidden" name="intent" value="delete" />
      <button
        type="submit"
        className="text-sm bg-red-600 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </Form>
  </div>
)}

    </div>
  ))}
</div>


    </div>
  );
}
