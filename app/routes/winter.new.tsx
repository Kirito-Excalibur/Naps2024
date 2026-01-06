import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { createWinterPost } from "~/models/winter.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserId(request);
  return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get("title");
  const link = formData.get("link");
  const imageUrl = formData.get("imageUrl");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      { errors: { title: "Title is required", link: null, imageUrl: null } },
      { status: 400 },
    );
  }
  const year = Number(formData.get("year"));
const week = Number(formData.get("week"));

if (!year || !week) {
  return json({ error: "Year and Week are required" }, { status: 400 });
}


  if (typeof link !== "string" || link.length === 0) {
    return json(
      { errors: { title: null, link: "Link is required", imageUrl: null } },
      { status: 400 },
    );
  }

  // Validate URL format
  try {
    new URL(link);
  } catch {
    return json(
      { errors: { title: null, link: "Please enter a valid URL", imageUrl: null } },
      { status: 400 },
    );
  }

 await createWinterPost({
  title,
  link,
  userId,
  ...(imageUrl ? { imageUrl } : {}), 
});

  return redirect(`/winter`);
};

export default function NewWinterPost() {
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.link) {
      linkRef.current?.focus();
    }
  }, [actionData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  // Function to handle image upload to IMGBB
  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=fdec295ccce9cfe02ffb42e4ee1b8bb4",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();
    if (data.success) {
      return data.data.url;
    }

    return null;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let uploadedImageUrl = null;
    if (imageFile) {
      uploadedImageUrl = await handleImageUpload();
      if (!uploadedImageUrl) {
        alert("Image upload failed!");
        return;
      }
    }

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    if (uploadedImageUrl) {
      formData.append("imageUrl", uploadedImageUrl);
    }

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
      });

      if (response.ok) {
        alert("Winter post created successfully!");
        // Redirect to winter page
        window.location.href = "/winter";
      } else {
        alert("Failed to create winter post. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while creating the post. Please try again.");
    }
  };

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
      </form>
    </div>
  );
}
