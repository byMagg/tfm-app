import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";

export const MainLayout = () => {
  return (
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
      <div className="absolute h-full w-full items-center justify-center">
        <NavigationBar isProfilePage={false} />
        {/* <Toaster client:load /> */}
        <Outlet />
      </div>
    </div>
  );
};
