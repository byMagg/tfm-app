import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/protected.tsx", [
    index("./routes/home.tsx"),
    route("leagues", "./routes/leagues.tsx"),
    route("leagues/:id", "./routes/league.tsx"),

    route("league-matches/:id", "./routes/league-match.tsx"),

    route("matches", "./routes/matches.tsx"),
    route("matches/:id", "./routes/match.tsx"),

    route("players", "./routes/players.tsx"),
    route("players/:id", "./routes/player.tsx"),

    route("rankings", "./routes/rankings.tsx"),
    route("rankings/:id", "./routes/ranking.tsx"),
  ]),
  route("profile", "./routes/profile.tsx"),
] satisfies RouteConfig;
