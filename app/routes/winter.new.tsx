// routes/winter.new.tsx
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createWinterPost } from "~/models/winter.server";
import { requireUserId } from "~/session.server"; 
import fs from "fs";
import path from "path";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const link = formData.get("link") as string;
  const file = formData.get("image") as any;

  if (!title || !link) {
    return json({ error: "Title and Link are required" }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  let imageUrl: string | undefined;

  if (file && typeof file.arrayBuffer === "function") {
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer); 

  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, uint8Array); 
  imageUrl = `/uploads/${fileName}`;
}

 await createWinterPost({
  title,
  link,
  userId,
  ...(imageUrl ? { imageUrl } : {}), 
});


  return redirect("/winter");
};




export default function NewWinterPost() {
    
  const actionData = useActionData<typeof action>();

  return (
    <div className="container mx-auto p-10 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Add New Winter Post</h1>

      {actionData?.error && (
        <p className="text-red-600 mb-4">{actionData.error}</p>
      )}

      <Form method="post" encType="multipart/form-data" className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border p-2 w-full"
          required
        />
        <input
          type="url"
          name="link"
          placeholder="Link"
          className="border p-2 w-full"
          required
        />
        <input type="file" name="image" accept="image/*" />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
          Create Post
        </button>
      </Form>
    </div>
  );
}
