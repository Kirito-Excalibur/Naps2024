import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteNote, getNote } from "~/models/note.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId not found");

  const note = await getNote({ id: params.noteId, userId });
  if (!note) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ note });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId not found");

  await deleteNote({ id: params.noteId, userId });

  return redirect("/notes");
};

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>();

  const displayImage = data.note.thumbnail || "";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <img
        width={"250px"}
        src={displayImage}
        alt=""
        style={{
          maxWidth: "100%",
          height: "auto",
          marginBottom: "1rem",
        }}
      />
      <h3
        className="text-2xl font-bold"
        style={{
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        {data.note.title}
      </h3>
      <p
        className="py-6"
        dangerouslySetInnerHTML={{ __html: data.note.body }}
        style={{
          whiteSpace: "pre-wrap",
          textAlign: "justify",
          marginBottom: "1rem",
        }}
      />
      <hr className="my-4" style={{ width: "100%", marginBottom: "1rem" }} />
      <Form method="post" style={{ width: "100%", textAlign: "center" }}>
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
          style={{
            width: "100%",
            maxWidth: "200px",
            margin: "0 auto",
          }}
        >
          Delete
        </button>
      </Form>

      <style>{`
        @media (max-width: 768px) {
          div {
            padding: 0.5rem;
          }

          img {
            width: 200px;
          }

          h3 {
            font-size: 1.5rem;
          }

          p {
            font-size: 1rem;
          }

          button {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          div {
            padding: 0.25rem;
          }

          img {
            width: 150px;
          }

          h3 {
            font-size: 1.25rem;
          }

          p {
            font-size: 0.875rem;
          }

          button {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>Note not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}
