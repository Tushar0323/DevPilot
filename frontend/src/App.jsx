import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import DashboardPage from './pages/Dashboard'
import OverviewPage from './pages/Overview'
import SettingsPage from './pages/Settings'
import AuthCallbackPage from './pages/AuthCallback'
import { ChatView } from './components/chat/chat-view'
import { RequireAuth } from './components/providers/require-auth'
import QueryProvider from './components/providers/query-provider'
import { ThemeProvider } from './components/providers/theme-provider'

function ChatRoute() {
  const { repoId } = useParams()
  return (
    <RequireAuth>
      <ChatView repoId={repoId} />
    </RequireAuth>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/overview" element={<OverviewPage />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
            <Route path="/chat/:repoId" element={<ChatRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ThemeProvider>
      </QueryProvider>
    </BrowserRouter>
  )
}
