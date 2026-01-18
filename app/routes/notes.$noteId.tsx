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
    <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <img
        src={displayImage}
        alt=""
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto mb-4 sm:mb-6 rounded-lg shadow-md"
      />
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6 px-2">
        {data.note.title}
      </h3>
      <div
        className="w-full text-justify mb-6 sm:mb-8 px-2 sm:px-4 text-sm sm:text-base lg:text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: data.note.body }}
      />
      <hr className="w-full border-gray-300 mb-6 sm:mb-8" />
      <Form method="post" className="w-full max-w-xs">
        <button
          type="submit"
          className="w-full rounded bg-blue-500 px-4 py-2 sm:py-3 text-white hover:bg-blue-600 focus:bg-blue-400 transition-colors duration-200 font-medium"
        >
          Delete
        </button>
      </Form>
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
