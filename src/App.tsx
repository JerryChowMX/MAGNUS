import { AppRouter } from './app/AppRouter';
import { ThemeProvider } from './context/ThemeContext';
import { ConsentBanner } from './components/Analytics/ConsentBanner';
import { LightboxProvider } from './context/LightboxContext';
import { LightboxOverlay } from './components/Media/LightboxOverlay';

function App() {
  return (
    <ThemeProvider>
      <LightboxProvider>
        <AppRouter />
        <ConsentBanner />
        <LightboxOverlay />
      </LightboxProvider>
    </ThemeProvider>
  );
}

export default App;
