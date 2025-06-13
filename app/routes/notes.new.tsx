import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import Editor from "~/Components/Editor";
import { createNote } from "~/models/note.server";
import { requireUserId } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get("title");
  const author=formData.get("author")
  const body = formData.get("body");
  const thumbnail = formData.get("thumbnail");
  

  if (typeof title !== "string" || title.length === 0) {
    return json(
      { errors: { body: null, title: "Title is required" } },
      { status: 400 },
    );
  }
  
  // if (typeof author !== "string" || author.length === 0) {
  //   return json(
  //     { errors: { body: null, author: "Author is required" } },
  //     { status: 400 },
  //   );
  // }


  if (typeof body !== "string" || body.length === 0 || body === "<p><br></p>") {
    return json(
      { errors: { body: "Body is required", title: null } },
      { status: 400 },
    );
  }

  if (
    typeof thumbnail !== "string" ||
    thumbnail.length === 0 ||
    thumbnail === "<p><br></p>"
  ) {
    return json(
      {
        errors: { thumbnail: "Thumbnail is required", title: null, body: null },
      },
      { status: 400 },
    );
  }

  if (
    typeof author !== "string" ||
    author.length === 0 ||
    author === "<p><br></p>"
  ) {
    return json(
      {
        errors: {
          author: "Author is required",
          title: null,
          body: null,
          thumbnail: null,
        },
      },
      { status: 400 },
    );
  }


  // // Handle image upload (assuming you're storing it in a folder)
  // let thumbnailUrl = null;
  // if (thumbnail && typeof thumbnail === "object") {
  //   const buffer = await thumbnail.arrayBuffer();
  //   const imagePath = `/path/to/store/images/${thumbnail.name}`;
  //   // Save the image file (implement saving logic based on your environment)
  //   // Example: using Node's `fs` module to save the file
  //   const fs = require("fs");
  //   fs.writeFileSync(imagePath, Buffer.from(buffer));
  //   thumbnailUrl = imagePath;
  // }

  const note = await createNote({
    body,
    title,
    author,
    userId,
    thumbnail, // Save the thumbnail URL or path in the database
  });

  return redirect(`/notes/${note.id}`);
};

export default function NewNotePage() {
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);

  const authorRef = useRef<HTMLInputElement>(null);
  
  const [imageURL, setImageURL] = useState(null); // St ate to hold the uploaded image URL
  const [imageFile, setImageFile] = useState<File | null>(null); // Allow null or File
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const quillRef = useRef<any>(); // Ref for Editor component

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.body) {
      // Focus on the editor when there's a body error
      if (quillRef.current) {
        quillRef.current?.focus(); // Programmatically focus the editor if possible
      }
    }
  }, [actionData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Guard against e.target.files being null
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]); // Set the selected file
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
      return data.data.url; // Return the image URL
    }

    return null;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const uploadedImageUrl = await handleImageUpload();

    if (!uploadedImageUrl) {
      alert("Image upload failed!");
      return;
    }

    const body = quillRef.current?.getEditorContent(); // Get content from Editor
    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);
    formData.set("body", body || ""); // Set body value to editor content
    formData.append("thumbnail", uploadedImageUrl); // Add the image URL to the form data

    fetch(form.action, {
      method: form.method,
      body: formData,
    }).then((response) => {
      if (response.ok) {
        window.location.reload();
      }
    });
  };

  return (
    <>
      <form
        method="post"
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Thumbnail: </span>
            <input
              type="file"
              onChange={handleFileChange}
              className="flex-1 rounded-md border-2 focus:border-blue-500 px-3 text-lg leading-loose"
              accept="image/*"
            />
          </label>
        </div>
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Title: </span>
            <input
              ref={titleRef}
              name="title"
              className="flex-1 rounded-md border-2 focus:border-blue-500 px-3 text-lg leading-loose"
              aria-invalid={actionData?.errors?.title ? true : undefined}
              aria-errormessage={
                actionData?.errors?.title ? "title-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.title ? (
            <div className="pt-1 text-red-700" id="title-error">
              {actionData.errors.title}
            </div>
          ) : null}
        </div>

        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Author: </span>
            <input
              ref={authorRef}
              name="author"
              className="flex-1 rounded-md border-2 focus:border-blue-500 px-3 text-lg leading-loose"
              aria-invalid={actionData?.errors?.body ? true : undefined}
              aria-errormessage={
                actionData?.errors?.body ? "title-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.title ? (
            <div className="pt-1 text-red-700" id="title-error">
              {actionData.errors.title}
            </div>
          ) : null}
        </div>

        <div className="h-[500px]">
          <div className="flex w-full flex-col gap-1">
            <span>Body: </span>
            <div className="w-full  flex-1 rounded-md  px-3 py-2 text-lg leading-6">
              <Editor ref={quillRef} />
            </div>
          </div>
          {actionData?.errors?.body ? (
            <div className="pt-1 text-red-700" id="body-error">
              {actionData.errors.body}
            </div>
          ) : null}
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
          {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
}
