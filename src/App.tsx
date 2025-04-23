import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./pages/HomePage";
import { LeagueMatchPage } from "./pages/LeagueMatchPage";
import { LeaguePage } from "./pages/LeaguePage";
import { LeaguesPage } from "./pages/LeaguesPage";
import { MatchesPage } from "./pages/MatchesPage";
import { MatchPage } from "./pages/MatchPage";
import { PlayerPage } from "./pages/PlayerPage";
import { PlayersPage } from "./pages/PlayersPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RankingPage } from "./pages/RankingPage";
import { RankingsPage } from "./pages/RankingsPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/leagues" element={<LeaguesPage />} />
        <Route path="/leagues/:id" element={<LeaguePage />} />

        <Route path="/league-matches/:id" element={<LeagueMatchPage />} />

        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/matches/:id" element={<MatchPage />} />

        <Route path="/players" element={<PlayersPage />} />
        <Route path="/players/:id" element={<PlayerPage />} />

        <Route path="/rankings" element={<RankingsPage />} />
        <Route path="/rankings/:id" element={<RankingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
