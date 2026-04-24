import { useAppStore } from '../stores/appStore';
import { useNotifications } from '../hooks/useData';
import { useMarkNotificationRead } from '../hooks/useMutations';
import { Heart, MessageCircle, UserPlus, Bell } from 'lucide-react';
import styles from './Notifications.module.css';

export function Notifications() {
  const { currentUser } = useAppStore();
  const { data: notifications, isLoading } = useNotifications(currentUser?.id || null);
  const markRead = useMarkNotificationRead();
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart size={16} />;
      case 'comment': return <MessageCircle size={16} />;
      case 'follow': return <UserPlus size={16} />;
      default: return <Bell size={16} />;
    }
  };
  
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString();
  };
  
  const unreadCount = notifications?.filter(n => !n.is_read).length || 0;
  
  return (
    <div className={styles.notifications}>
      <div className={styles.header}>
        <h2>通知 {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}</h2>
      </div>
      
      {isLoading ? (
        <div className={styles.loading}>加载中...</div>
      ) : !notifications || notifications.length === 0 ? (
        <div className={styles.empty}>
          <Bell size={48} />
          <p>暂无通知</p>
        </div>
      ) : (
        <div className={styles.list}>
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`${styles.item} ${!notification.is_read ? styles.unread : ''}`}
              onClick={() => !notification.is_read && markRead.mutate(notification.id)}
            >
              <div className={styles.icon}>
                {getIcon(notification.type)}
              </div>
              <div className={styles.content}>
                <div className={styles.title}>{notification.title}</div>
                <div className={styles.text}>{notification.content}</div>
                <div className={styles.time}>{formatTime(notification.created_at)}</div>
              </div>
              {!notification.is_read && (
                <div className={styles.unreadDot} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
