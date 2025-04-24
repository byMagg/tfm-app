import { NavLink } from "react-router";

export default function HomePage() {
  return (
    <NavLink viewTransition to="/profile">
      Leagues
    </NavLink>
  );
}
