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
import PortfolioSettings from "./features/portfolio/pages/PortfolioSettings";
import PortfolioEditor from "./features/portfolio/pages/PortfolioEditor";
import AppLayout from "./components/layout/AppLayout";
import PublicPortfolio from "./features/portfolio/pages/PublicPortfolio";
import PortfolioReview from "./features/portfolio/pages/PortfolioReview";
import ResumeImport from "./features/portfolio/pages/ResumeImport";
import GithubImport from "./features/portfolio/pages/GithubImport";
import PortfolioAnalytics from "./features/portfolio/pages/PortfolioAnalytics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* Public portfolio — no authentication */}
      <Route path="/portfolio/:slug" element={<PublicPortfolio />} />
      {/* Only for logged-out users */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      {/* Only for logged-in users */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard/portfolios" element={<PortfolioList />} />
          <Route
            path="/dashboard/portfolios/create"
            element={<CreatePortfolio />}
          />
          <Route
            path="/dashboard/portfolios/:id/analytics"
            element={<PortfolioAnalytics />}
          />
          <Route
            path="/dashboard/portfolios/:id"
            element={<PortfolioDetails />}
          />
          <Route
            path="/dashboard/portfolios/:id/edit"
            element={<PortfolioEditor />}
          />
          <Route
            path="/dashboard/portfolios/:id/settings"
            element={<PortfolioSettings />}
          />
          <Route
            path="/dashboard/portfolios/:id/review"
            element={<PortfolioReview />}
          />

          <Route
            path="/dashboard/portfolios/:id/resume-import"
            element={<ResumeImport />}
          />
          <Route
            path="/dashboard/portfolios/:id/github-import"
            element={<GithubImport />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
