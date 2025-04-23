import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { Home } from "./pages/Home";
import { Leagues } from "./pages/Leagues";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leagues" element={<Leagues />} />
      </Route>
    </Routes>
  );
}

export default App;
