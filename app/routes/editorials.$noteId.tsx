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

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.noteId, "noteId not found");

  // Fetch note by noteId without checking userId
  const note = await getNote({ id: params.noteId });
  if (!note) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ note });
};


export const action = async ({ params, request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId not found");

  // await deleteNote({ id: params.noteId, userId });

  return redirect("/notes");
};

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="p-4 max-w-4xl mx-auto ">
      <h3 className="text-2xl font-bold text-center md:text-left  font-tinos">
        {data.note.title}
      </h3>

      <h3 className="font-tinos">
        
        Author name:- {data.note.author}
      </h3>
      <p
        className="font-tinos py-6 flex justify-center break-word align-center items-center flex-col text-base md:text-lg"
        dangerouslySetInnerHTML={{ __html: data.note.body }}
        style={{ whiteSpace: 'pre-wrap' }}
      />
      <hr className="my-4" />
      {/* <Form method="post" className="flex justify-center md:justify-start">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form> */}
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
