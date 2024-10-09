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
import { Link, Form, NavLink, useNavigation } from "@remix-run/react";
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
  const navigation=useNavigation()
  const isLoading = navigation.state === "loading"; 
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta http-equiv="Cache-Control" content="no-store" />

        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
          {/* Loading Indicator at the Top */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-500">
          <div className="h-full bg-blue-700 animate-pulse"></div>
        </div>
      )}
        <header className="flex justify-between items-center min-h-[100px]  bg-[rgb(177,4,14)] p-4 gap-5 text-white">
          
          <h1 className="text-3xl sm:text-5xl">News And Publications</h1>
          <img
            src="/images/napslogo.webp"
            height={"250px"}
            width={"250px"}
            alt=""
          />
        </header>
        <div className="py-6 flex text-m flex-row gap-6 px-4 justify-center items-center border ">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-black"
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink  className={({ isActive }) =>
              isActive ? "text-red-500" : "text-black"
            } to="/editorials">Editorials</NavLink>
          <NavLink  className={({ isActive }) =>
              isActive ? "text-red-500 whitespace-nowrap" : "text-black whitespace-nowrap"
            } to="/teams">Our Team</NavLink>

          {user ? (
            <>
              <NavLink className={({ isActive }) =>
              isActive ? "text-red-500 whitespace-nowrap" : "text-black whitespace-nowrap"
            } to="/notes">My Notes</NavLink>

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
        </div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
