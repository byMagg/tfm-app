import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/MainLayout'
import { Home } from './pages/Home'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
