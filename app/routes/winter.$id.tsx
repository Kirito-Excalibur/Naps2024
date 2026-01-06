// routes/winter.$id.tsx
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useRouteError, isRouteErrorResponse, Link } from "@remix-run/react";
import invariant from "tiny-invariant";
import fs from "fs";
import path from "path";
import { requireUserId } from "~/session.server";
import { getWinterPost, updateWinterPost, deleteWinterPost } from "~/models/winter.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.id, "Post ID not found");
  const userId = await requireUserId(request);

  const post = await getWinterPost({ id: params.id, userId });
  if (!post) throw new Response("Not Found", { status: 404 });

  return json({ post });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.id, "Post ID not found");
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const intent = formData.get("intent");

  // DELETE POST
  if (intent === "delete") {
    await deleteWinterPost({ id: params.id, userId });
    return redirect("/winter");
  }

  // UPDATE POST
  const title = formData.get("title") as string;
  const link = formData.get("link") as string;
  const file = formData.get("image") as any;

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  let imageUrl: string | undefined;
  const year = Number(formData.get("year"));
const week = Number(formData.get("week"));

if (!year || !week) {
  return json({ error: "Year and Week are required" }, { status: 400 });
}


  if (file && typeof file.arrayBuffer === "function") {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer)

  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);
  fs.writeFileSync(filePath, buffer); 
  imageUrl = `/uploads/${fileName}`;
}


  // const updateData: Parameters<typeof updateWinterPost>[0] = { id: params.id, title, link, userId };
  // if (imageUrl) updateData.imageUrl = imageUrl;

 await updateWinterPost({
  id: params.id,
  title,
  link,
  year,
  week,
  userId,
  ...(imageUrl ? { imageUrl } : {}), 
});

  return redirect(`/winter/${params.id}`);
};

export default function WinterPostPage() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto p-10 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Edit Winter Post</h1>

      {/* Update Form */}
      <Form method="post" encType="multipart/form-data" className="space-y-4">
        <input type="hidden" name="intent" value="update" />
        <input
          type="text"
          name="title"
          defaultValue={post.title}
          className="border p-2 w-full"
          required
        />
        <input
          type="url"
          name="link"
          defaultValue={post.link}
          className="border p-2 w-full"
          required
        />
        <input
  type="number"
  name="year"
  defaultValue={post.year}
  className="border p-2 w-full"
  required
/>

<input
  type="number"
  name="week"
  defaultValue={post.week}
  min={1}
  max={52}
  className="border p-2 w-full"
  required
/>

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-48 object-cover rounded mb-2"
          />
        )}
        <input type="file" name="image" accept="image/*" />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Update Post
        </button>
      </Form>

      {/* Delete Form */}
      <Form method="post" className="mt-4">
        <input type="hidden" name="intent" value="delete" />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
        >
          Delete Post
        </button>
      </Form>

      <Link to="/winter" className="text-blue-500 hover:underline block mt-4">
        ← Back to Winter Section
      </Link>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return <div>Post not found</div>;
  }

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  return <div>Unknown Error</div>;
}
