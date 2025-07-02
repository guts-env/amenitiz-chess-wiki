import { BrowserRouter, Route, Routes } from "react-router-dom"
import GrandmastersTable from "@/components/app/GrandmastersTable"
import PlayerProfile from '@/components/app/PlayerProfile'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GrandmastersTable />} />
        <Route path="/player/:username" element={<PlayerProfile />} />
        <Route path="*" element={<GrandmastersTable />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes