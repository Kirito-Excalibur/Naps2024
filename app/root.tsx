import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import "remixicon/fonts/remixicon.css"
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
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [menuOpen, setMenuOpen] = useState(false); // State to control menu visibility

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); // Toggle the menu
  };
  return (
    <html lang="en" className="h-full">
      <head>
        <meta property="og:title" content="News and Publication Society"/>
        <meta property="og:description" content="A dynamic administrative body dedicated to capturing and disseminating the vibrant news and media happenings across the campus of BIT Mesra"/>
        <meta property="og:image" content="https://d1fdloi71mui9q.cloudfront.net/l4wX5BDQsa9OdW34kU8R_C72vwWr7xAj2kFf9"/>
        <meta property="og:image:height" content="300" />
        <meta property="og:image:width" content="400" />
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
          <div className="flex justify-between  items-center">
            <h1 className="text-3xl sm:text-5xl hidden sm:block">
              News And Publication Society
            </h1>
            <img
              src="/images/napslogo.webp"
              className="w-[200px] sm:w-[250px]"
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
          } sm:flex flex box-border   px-4 shadow-lg py-4 sm:shadow-lg flex-col sm:flex-row sm:justify-center gap-4 mt-4 sm:mt-0 sm:items-center`}
        >
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-[rgb(177,4,14)] "
                : "relative border-b-2 border-white after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-[rgb(177,4,14)] after:transition-all after:duration-500 hover:after:w-full hover:after:translate-x-[-50%]"
            }
            to="/"
            onClick={toggleMenu}
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-[rgb(177,4,14)]"
                : "relative border-b-2 border-white after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-[rgb(177,4,14)] after:transition-all after:duration-500 hover:after:w-full hover:after:translate-x-[-50%]"
            }
            to="/editorials"
            onClick={toggleMenu}
          >
            Editorials
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-[rgb(177,4,14)]"
                : "relative border-b-2 border-white after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-[rgb(177,4,14)] after:transition-all after:duration-500 hover:after:w-full hover:after:translate-x-[-50%]"
            }
            to="/epistle"
            onClick={toggleMenu}
          >
            Epistle
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-[rgb(177,4,14)]"
                : "relative border-b-2 border-white after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-[rgb(177,4,14)] after:transition-all after:duration-500 hover:after:w-full hover:after:translate-x-[-50%]"
            }
            to="/teams"
            onClick={toggleMenu}
          >
            Our Team
          </NavLink>

          {user ? (
            <>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-[rgb(177,4,14)]" : "text-black"
                }
                to="/notes"
                onClick={toggleMenu}
              >
                My Notes
              </NavLink>
              <Form action="/logout" method="post">
                <button
                  type="submit"
                  className="mt-2 sm:mt-0 rounded bg-gray-800 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
                  onClick={toggleMenu}
                >
                  Logout
                </button>
              </Form>
            </>
          ) : (
            <>
              {/* <Link className="mt-2 sm:mt-0 text-black" to="/join">
                Sign Up
              </Link>
              <Link className="mt-2 sm:mt-0 text-black" to="/login">
                Log In
              </Link> */}
            </>
          )}
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        
      <footer className="bg-gray-900 text-gray-300">
        
                
        <div className="flex justify-center space-x-4 mt-6" >
            <a href="#" aria-label="Facebook" className="hover:scale-110 transition mt-6 ">
            <i className="ri-facebook-circle-fill ri-2x"></i>
            </a>
            <a href="#" aria-label="Instagram" className="hover:scale-110 transition mt-6">
            <i className="ri-instagram-line ri-2x"></i>
            </a>
            <a href="#" aria-label="Twitter" className="hover:scale-110 transition mt-6">
            <i className="ri-twitter-line ri-2x"></i>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:scale-110 transition mt-6">
            <i className="ri-linkedin-line ri-2x"></i>
            </a>
        </div>
  

    
    <div className="container mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        <div>
            <h3 className="text-white text-xl font-semibold mb-4 hover:text-red-400">About Us</h3>
            <p className="text-gray-400 text-sm mb-4">
                 Insightful editorials, and a platform for young voices.
            </p>
            <a href="#" className="text-teal-400 hover:underline text-sm">Learn More About Us</a>
        </div>

        
        <div>
            <h3 className="text-white text-xl font-semibold mb-4 hover:text-red-400">Quick Links</h3>
            <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-teal-400">Home</a></li>
                <li><a href="#" className="hover:text-teal-400">Editorial</a></li>
                <li><a href="#" className="hover:text-teal-400">Epistle</a></li>
                <li><a href="#" className="hover:text-teal-400">Our Team</a></li>
                
            </ul>
        </div>

        
        <div>
            <h3 className="text-white text-xl font-semibold mb-4 hover:text-red-400">Publications & Resources</h3>
            <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-teal-400">Newsletter</a></li>
                <li><a href="#" className="hover:text-teal-400">Media Reports</a></li>
                <li><a href="#" className="hover:text-teal-400">Site Reports</a></li>
                <li><a href="#" className="hover:text-teal-400">Interviews</a></li>
                <li><a href="#" className="hover:text-teal-400">Winter Section</a></li>
                <li><a href="#" className="hover:text-teal-400">Summer Section</a></li>
            </ul>
        </div>

        
        <div>
            <h3 className="text-white text-xl font-semibold mb-4 hover:text-red-400">Contact Information</h3>
            <p className="text-gray-400 text-sm">Email: <a href="mailto:contact@napsbitmesra.ac.in"
                    className="hover:underline">@napsbitmesra</a></p>
            
        </div>
    </div>

    
    <div className="bg-gray-800 text-center py-4 text-white-800">
        <p className="text-sm text-white-500">&copy;News and Publication Society, BIT Mesra Ranchi, Jharkhand, India - 835215. All Rights Reserved.</p>
        <p className="text-xs text-white-600">The views expressed in our publications are those of the authors and contributors.</p>
    </div>
</footer>
      </body>

    </html>
  );
}
