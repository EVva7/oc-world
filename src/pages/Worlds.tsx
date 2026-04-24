import { useState } from 'react';
import { useWorlds, useOCs } from '../hooks/useData';
import { useCreateWorld } from '../hooks/useMutations';
import { Plus, Globe } from 'lucide-react';
import styles from './Worlds.module.css';

export function Worlds() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedWorld, setSelectedWorld] = useState<string | null>(null);
  
  const { data: worlds = [], isLoading } = useWorlds();
  const { data: worldOCs } = useOCs(selectedWorld ? { world_id: selectedWorld } : undefined);
  const createWorld = useCreateWorld();
  
  const handleCreateWorld = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createWorld.mutateAsync({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
      tags: (formData.get('tags') as string).split(',').map(t => t.trim()).filter(Boolean),
      is_public: true,
    });
    setShowCreateModal(false);
  };
  
  return (
    <div className={styles.worlds}>
      <div className={styles.header}>
        <h2>世界观</h2>
        <button className={styles.createBtn} onClick={() => setShowCreateModal(true)}>
          <Plus size={18} />
          创建世界观
        </button>
      </div>
      
      {isLoading ? (
        <div className={styles.loading}>加载中...</div>
      ) : worlds?.length === 0 ? (
        <div className={styles.empty}>
          <Globe size={48} />
          <p>还没有世界观，快来创建第一个吧！</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {worlds?.map(world => (
            <div 
              key={world.id} 
              className={`${styles.card} ${selectedWorld === world.id ? styles.selected : ''}`}
              onClick={() => setSelectedWorld(selectedWorld === world.id ? null : world.id)}
            >
              <div className={styles.cardImage}>
                {world.image ? (
                  <img src={world.image} alt={world.name} />
                ) : (
                  <div className={styles.placeholder}>🌍</div>
                )}
              </div>
              <div className={styles.cardContent}>
                <h3>{world.name}</h3>
                <p className={styles.description}>{world.description}</p>
                <div className={styles.meta}>
                  <span>by {world.author_nickname}</span>
                  <span>{world.oc_count || 0} 个角色</span>
                </div>
                <div className={styles.tags}>
                  {world.tags?.slice(0, 3).map(tag => (
                    <span key={tag} className={styles.tagBadge}>{tag}</span>
                  ))}
                </div>
              </div>
              
              {selectedWorld === world.id && worldOCs && (
                <div className={styles.worldOCs}>
                  <h4>世界观角色</h4>
                  {worldOCs.length === 0 ? (
                    <p>该世界观暂无角色</p>
                  ) : (
                    <div className={styles.ocList}>
                      {worldOCs.map(oc => (
                        <div key={oc.id} className={styles.ocItem}>
                          {oc.image ? (
                            <img src={oc.image} alt={oc.name} />
                          ) : (
                            <span>🎭</span>
                          )}
                          <span>{oc.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {showCreateModal && (
        <div className={styles.modal} onClick={() => setShowCreateModal(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h2>创建新世界观</h2>
            <form onSubmit={handleCreateWorld}>
              <div className={styles.formGroup}>
                <label>名称</label>
                <input name="name" required placeholder="世界观名称" />
              </div>
              <div className={styles.formGroup}>
                <label>封面图 URL</label>
                <input name="image" placeholder="https://..." />
              </div>
              <div className={styles.formGroup}>
                <label>描述</label>
                <textarea name="description" rows={4} placeholder="世界观背景设定..." />
              </div>
              <div className={styles.formGroup}>
                <label>标签（逗号分隔）</label>
                <input name="tags" placeholder="奇幻,魔法,中世纪" />
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowCreateModal(false)}>取消</button>
                <button type="submit" disabled={createWorld.isPending}>
                  {createWorld.isPending ? '创建中...' : '创建'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
