import CinematicHero from './components/CinematicHero';
import HomeSections from './components/HomeSections';
import SiteSections from './components/SiteSections';

function isPitchRoute() {
  if (typeof window === 'undefined') return false;
  return window.location.pathname.replace(/\/+$/, '').endsWith('/pitch');
}

export default function App() {
  const pitch = isPitchRoute();

  return (
    <main data-page={pitch ? 'pitch' : 'home'}>
      <CinematicHero />
      {pitch ? <SiteSections /> : <HomeSections />}
    </main>
  );
}
