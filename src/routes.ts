import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  // * matches all URLs, the ? makes it optional so it will match / as well
  route("/", "./pages/HomePage.tsx"),
  route("profile", "./pages/ProfilePage.tsx"),

  route("matches", "./pages/MatchesPage.tsx"),
  route("matches/:id", "./pages/MatchPage.tsx"),

  route("players", "./pages/PlayersPage.tsx"),
  route("players/:id", "./pages/PlayerPage.tsx"),

  route("rankings", "./pages/RankingsPage.tsx"),
  route("rankings/:id", "./pages/RankingPage.tsx"),

  route("leagues", "./pages/LeaguesPage.tsx"),
  route("leagues/:id", "./pages/LeaguePage.tsx"),
] satisfies RouteConfig;
