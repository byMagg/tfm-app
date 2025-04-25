import "@/lib/firebase/client";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { Toaster } from "sonner";
import { NavigationBar } from "./components/NavigationBar";
import { AuthProvider } from "./context/AuthContext";
import { cn } from "./lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const isProfilePage = location.pathname === "/profile";
  return (
    <html className="dark" lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SlamStats</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="relative flex min-h-screen h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
          <div
            className={cn(
              "absolute inset-0",
              "[background-size:20px_20px]",
              "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
              "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
            )}
          />
          {/* Radial gradient for the container to give a faded look */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
          <div className="absolute h-full w-full items-center justify-center px-3 sm:px-5 md:px-20">
            <NavigationBar isProfilePage={isProfilePage} />
            <Toaster />
            {children}
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
