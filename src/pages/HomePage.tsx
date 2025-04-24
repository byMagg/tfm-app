import { NavLink } from "react-router";

export const HomePage = () => {
  return (
    <NavLink viewTransition to="/profile">
      Leagues
    </NavLink>
  );
};
