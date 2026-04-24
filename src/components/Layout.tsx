import { Outlet, Link, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAppStore } from '../stores/appStore';
import { Home, Globe, User, Bell, MessageCircle, LogOut, Sun, Moon } from 'lucide-react';
import styles from './Layout.module.css';

interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { currentUser, currentView, setCurrentView, theme, setTheme, setCurrentUser } = useAppStore();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('oc_auth_token');
    navigate('/');
  };
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light');
  };
  
  if (!currentUser) {
    return <Outlet />;
  }
  
  return (
    <div className={styles.layout} data-theme={theme}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">OC世界</Link>
        </div>
        <nav className={styles.nav}>
          <button 
            className={`${styles.navItem} ${currentView === 'hall' ? styles.active : ''}`}
            onClick={() => setCurrentView('hall')}
          >
            <Home size={18} />
            <span>大厅</span>
          </button>
          <button 
            className={`${styles.navItem} ${currentView === 'worlds' ? styles.active : ''}`}
            onClick={() => setCurrentView('worlds')}
          >
            <Globe size={18} />
            <span>世界观</span>
          </button>
          <button 
            className={`${styles.navItem} ${currentView === 'my' ? styles.active : ''}`}
            onClick={() => setCurrentView('my')}
          >
            <User size={18} />
            <span>我的</span>
          </button>
          <button 
            className={`${styles.navItem} ${currentView === 'notifications' ? styles.active : ''}`}
            onClick={() => setCurrentView('notifications')}
          >
            <Bell size={18} />
            <span>通知</span>
          </button>
          <button 
            className={`${styles.navItem} ${currentView === 'chat' ? styles.active : ''}`}
            onClick={() => setCurrentView('chat')}
          >
            <MessageCircle size={18} />
            <span>消息</span>
          </button>
        </nav>
        <div className={styles.actions}>
          <button className={styles.iconBtn} onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button className={styles.iconBtn} onClick={handleLogout}>
            <LogOut size={18} />
          </button>
        </div>
      </header>
      <main className={styles.main}>
        {children || <Outlet />}
      </main>
    </div>
  );
}
