import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Editor from "~/Components/Editor";
import { useRef } from "react";
import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const user = useOptionalUser();
  const quillRef = useRef<any>();
  return (
    <main className="relative  bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* <Editor ref={quillRef}/> */}
        </div>

 
      </div>
    </main>
  );
}
