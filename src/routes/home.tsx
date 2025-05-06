import { NavLink } from "react-router";

export default function Home() {
  return (
    <NavLink viewTransition to="/profile">
      Leagues
    </NavLink>
  );
}
