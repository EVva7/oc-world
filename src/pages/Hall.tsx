import { useState } from 'react';
import { useAppStore } from '../stores/appStore';
import { useOCs, useFavorites } from '../hooks/useData';
import { useCreateOC, useToggleFavorite } from '../hooks/useMutations';
import { Heart, MessageCircle, Plus, Search } from 'lucide-react';
import { TAGS } from '../lib/supabase';
import styles from './Hall.module.css';

export function Hall() {
  const { currentUser, currentMode, setCurrentMode } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const { data: ocs, isLoading } = useOCs(
    currentMode === 'my' ? { author_id: currentUser?.id } : undefined
  );
  const { data: favorites } = useFavorites(currentUser?.id || null);
  const createOC = useCreateOC();
  const toggleFavorite = useToggleFavorite();
  
  const filteredOCs = ocs?.filter(oc => {
    const matchesSearch = !searchQuery || 
      oc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      oc.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || oc.tags?.includes(selectedTag);
    return matchesSearch && matchesTag;
  }) || [];
  
  const isFavorited = (ocId: string) => favorites?.some(f => f.oc_id === ocId);
  
  const handleCreateOC = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createOC.mutateAsync({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
      tags: (formData.get('tags') as string).split(',').map(t => t.trim()).filter(Boolean),
    });
    setShowCreateModal(false);
  };
  
  return (
    <div className={styles.hall}>
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} />
          <input
            type="text"
            placeholder="搜索角色..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className={styles.filters}>
          <button
            className={`${styles.modeBtn} ${currentMode === 'all' ? styles.active : ''}`}
            onClick={() => setCurrentMode('all')}
          >
            全部
          </button>
          <button
            className={`${styles.modeBtn} ${currentMode === 'my' ? styles.active : ''}`}
            onClick={() => setCurrentMode('my')}
          >
            我的
          </button>
        </div>
        
        <button className={styles.createBtn} onClick={() => setShowCreateModal(true)}>
          <Plus size={18} />
          创建角色
        </button>
      </div>
      
      <div className={styles.tags}>
        <button
          className={`${styles.tag} ${!selectedTag ? styles.active : ''}`}
          onClick={() => setSelectedTag('')}
        >
          全部
        </button>
        {TAGS.map(tag => (
          <button
            key={tag}
            className={`${styles.tag} ${selectedTag === tag ? styles.active : ''}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      
      {isLoading ? (
        <div className={styles.loading}>加载中...</div>
      ) : filteredOCs.length === 0 ? (
        <div className={styles.empty}>
          <p>还没有角色，快来创建第一个吧！</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredOCs.map(oc => (
            <div key={oc.id} className={styles.card}>
              <div className={styles.cardImage}>
                {oc.image ? (
                  <img src={oc.image} alt={oc.name} />
                ) : (
                  <div className={styles.placeholder}>🎭</div>
                )}
              </div>
              <div className={styles.cardContent}>
                <h3>{oc.name}</h3>
                <p className={styles.author}>by {oc.author_nickname}</p>
                {oc.world_name && (
                  <span className={styles.world}>{oc.world_name}</span>
                )}
                <div className={styles.tags}>
                  {oc.tags?.slice(0, 3).map(tag => (
                    <span key={tag} className={styles.tagBadge}>{tag}</span>
                  ))}
                </div>
                <div className={styles.stats}>
                  <button 
                    className={`${styles.statBtn} ${isFavorited(oc.id) ? styles.favorited : ''}`}
                    onClick={() => toggleFavorite.mutate(oc.id)}
                  >
                    <Heart size={16} fill={isFavorited(oc.id) ? 'currentColor' : 'none'} />
                    {oc.favorites_count || 0}
                  </button>
                  <span className={styles.stat}>
                    <MessageCircle size={16} />
                    {oc.comments_count || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showCreateModal && (
        <div className={styles.modal} onClick={() => setShowCreateModal(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h2>创建新角色</h2>
            <form onSubmit={handleCreateOC}>
              <div className={styles.formGroup}>
                <label>名称</label>
                <input name="name" required placeholder="角色名称" />
              </div>
              <div className={styles.formGroup}>
                <label>图片 URL</label>
                <input name="image" placeholder="https://..." />
              </div>
              <div className={styles.formGroup}>
                <label>描述</label>
                <textarea name="description" rows={4} placeholder="角色背景设定..." />
              </div>
              <div className={styles.formGroup}>
                <label>标签（逗号分隔）</label>
                <input name="tags" placeholder="魔法,热血,治愈" />
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowCreateModal(false)}>取消</button>
                <button type="submit" disabled={createOC.isPending}>
                  {createOC.isPending ? '创建中...' : '创建'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
