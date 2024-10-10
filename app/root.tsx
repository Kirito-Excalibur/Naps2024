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
import { useState } from "react";

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
  const [menuOpen, setMenuOpen] = useState(false); // State to control menu visibility

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); // Toggle the menu
  };
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
      <header className="bg-[rgb(177,4,14)] p-4 text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl sm:text-5xl">News And Publications</h1>
          <img
            src="/images/napslogo.webp"
            className="w-[100px] sm:w-[150px]"
            alt="Logo"
          />
          
          {/* Hamburger Icon - visible on small screens */}
          <button
            className="block sm:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Nav Links - shown on larger screens, toggle on mobile */}
    
      </header>
      <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } sm:flex flex flex-col sm:flex-row sm:justify-center gap-4 mt-4 sm:mt-0 sm:items-center`}
        >
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-black"
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-black"
            }
            to="/editorials"
          >
            Editorials
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-black"
            }
            to="/teams"
          >
            Our Team
          </NavLink>

          {user ? (
            <>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-red-500" : "text-black"
                }
                to="/notes"
              >
                My Notes
              </NavLink>
              <Form action="/logout" method="post">
                <button
                  type="submit"
                  className="mt-2 sm:mt-0 rounded bg-gray-800 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
                >
                  Logout
                </button>
              </Form>
            </>
          ) : (
            <>
              <Link className="mt-2 sm:mt-0 text-white" to="/join">
                Sign Up
              </Link>
              <Link className="mt-2 sm:mt-0 text-white" to="/login">
                Log In
              </Link>
            </>
          )}
        </nav>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
  );
}
