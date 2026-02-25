import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage/ui/DashboardPage';
import { GeneratorPage } from '../pages/GeneratorPage/ui/GeneratorPage';
import { Header } from '../widgets/Header/ui/Header';
import { NotFoundPage } from '../pages/NotFoundPage/ui/NotFoundPage';
import { useOnlineStatus } from '../shared/lib/hooks/useOnlineStatus';
import { OfflineScreen } from '../widgets/NetworkStatus/OfflineScreen';

function App() {
  const isOnline = useOnlineStatus();

  return (
    <>
      {!isOnline && <OfflineScreen />}
      <BrowserRouter>
        <Header />
        <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/create" element={<GeneratorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
