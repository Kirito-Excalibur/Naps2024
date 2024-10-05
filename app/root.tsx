import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Link,Form } from "@remix-run/react";
import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";
import { useOptionalUser } from "./utils";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  const user = useOptionalUser();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <header className="flex items-center  bg-[rgb(177,4,14)] p-4 gap-5 text-white">
        <Link to="/">Home</Link>
          <Link to="/editorials">Editorials</Link>

          { user ? (
            <>
            <p>Logout</p>
            <Link to="/notes">My Notes</Link>
            
            <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>

            </>
          ) : (
            <>
              <Link to="/join">Sign Up</Link>
              <Link to="/login">Log In </Link>
            </>
          )}

          <img src="napslogo.webp" width={"250px"} alt="" />

        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
