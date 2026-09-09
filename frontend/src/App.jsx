import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PortfolioList from "./features/portfolio/pages/PortfolioList";
import CreatePortfolio from "./features/portfolio/pages/CreatePortfolio";
import PortfolioDetails from "./features/portfolio/pages/PortfolioDetails";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/dashboard/portfolios" element={<PortfolioList />} />

        <Route
          path="/dashboard/portfolios/create"
          element={<CreatePortfolio />}
        />
        <Route
          path="/dashboard/portfolios/:id"
          element={<PortfolioDetails />}
        />
      </Route>
    </Routes>
  );
}

export default App;
