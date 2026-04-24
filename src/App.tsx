import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAppStore } from './stores/appStore';
import { Auth } from './pages/Auth';
import { Hall } from './pages/Hall';
import { Worlds } from './pages/Worlds';
import { MyProfile } from './pages/MyProfile';
import { Notifications } from './pages/Notifications';
import { Layout } from './components/Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function AppContent() {
  const { currentView, currentUser } = useAppStore();
  
  if (!currentUser) {
    return <Auth />;
  }
  
  return (
    <Layout>
      {currentView === 'hall' && <Hall />}
      {currentView === 'worlds' && <Worlds />}
      {currentView === 'my' && <MyProfile />}
      {currentView === 'notifications' && <Notifications />}
      {currentView === 'chat' && <div>聊天功能开发中...</div>}
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
