import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import Editor from "~/Components/Editor";
import { createNote } from "~/models/note.server";
import { requireUserId } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      { errors: { body: null, title: "Title is required" } },
      { status: 400 }
    );
  }

  if (typeof body !== "string" || body.length === 0 || body === "<p><br></p>") {
    return json(
      { errors: { body: "Body is required", title: null } },
      { status: 400 }
    );
  }

  const note = await createNote({ body, title, userId });

  return redirect(`/notes/${note.id}`);
};

export default function NewNotePage() {
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const body = quillRef.current?.getEditorContent(); // Get content from Editor
    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);
    formData.set("body", body || ""); // Set body value to editor content

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
          gap: 8,
          width: "100%",
        }}
      >
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Title: </span>
            <input
              ref={titleRef}
              name="title"
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
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
            <span>Body: </span>
            <div className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6">
              <Editor ref={quillRef} />
            </div>
          </label>
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
            Save
          </button>
        </div>
      </form>
    </>
  );
}
