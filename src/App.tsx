import './App.css'
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';
import AppRoutes from './components/routes';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative">
        <div className="fixed bottom-8 right-8 sm:top-8">
          <ModeToggle />
        </div>
        <AppRoutes />
      </div>
    </ThemeProvider>
  )
}

export default App
