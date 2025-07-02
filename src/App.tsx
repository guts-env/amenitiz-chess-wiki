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
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold">ChessWiki</span> by <a href="https://github.com/guts-env" className="text-primary hover:underline">Guts</a>
          </p>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
