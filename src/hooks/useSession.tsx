import { useEffect, useState } from "react";

export const useSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(document.cookie.includes("__session"));
  }, []);

  return { isLoggedIn };
};
