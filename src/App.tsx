import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./pages/HomePage";
import { LeagueMatchPage } from "./pages/LeagueMatchPage";
import { LeaguesPage } from "./pages/LeaguesPage";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/leagues" element={<LeaguesPage />} />
        <Route path="/league-matches/:id" element={<LeagueMatchPage />} />
      </Route>
    </Routes>
  );
}

export default App;
