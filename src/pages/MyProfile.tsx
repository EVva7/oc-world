import { useState } from 'react';
import { useAppStore } from '../stores/appStore';
import { useOCs, useFavorites, useFollows, useUserSettings } from '../hooks/useData';
import { useUpdateOC, useDeleteOC } from '../hooks/useMutations';
import { Edit, Trash2 } from 'lucide-react';
import styles from './MyProfile.module.css';

export function MyProfile() {
  const { currentUser, currentMode, setCurrentMode } = useAppStore();
  const [editingOC, setEditingOC] = useState<string | null>(null);
  
  const { data: myOCs } = useOCs({ author_id: currentUser?.id });
  const { data: favorites } = useFavorites(currentUser?.id || null);
  const { data: favoriteOCs } = useOCs();
  const { data: follows } = useFollows(currentUser?.id || null);
  useUserSettings(currentUser?.id || null);
  
  const favoriteOCList = favoriteOCs?.filter(oc => 
    favorites?.some(f => f.oc_id === oc.id)
  ) || [];
  
  const updateOC = useUpdateOC();
  const deleteOC = useDeleteOC();
  
  const handleUpdateOC = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!editingOC) return;
    
    await updateOC.mutateAsync({
      id: editingOC,
      data: {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        image: formData.get('image') as string,
        tags: (formData.get('tags') as string).split(',').map(t => t.trim()).filter(Boolean),
      },
    });
    setEditingOC(null);
  };
  
  const handleDeleteOC = async (id: string) => {
    if (confirm('确定要删除这个角色吗？')) {
      await deleteOC.mutateAsync(id);
    }
  };
  
  return (
    <div className={styles.profile}>
      <div className={styles.userCard}>
        <div className={styles.avatar}>
          {currentUser?.avatar ? (
            <img src={currentUser.avatar} alt={currentUser.nickname} />
          ) : (
            <span>👤</span>
          )}
        </div>
        <div className={styles.userInfo}>
          <h2>{currentUser?.nickname}</h2>
          <p>{currentUser?.email}</p>
          <p className={styles.bio}>{currentUser?.bio}</p>
        </div>
      </div>
      
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{myOCs?.length || 0}</span>
          <span className={styles.statLabel}>角色</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{favoriteOCList.length}</span>
          <span className={styles.statLabel}>收藏</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{follows?.following.length || 0}</span>
          <span className={styles.statLabel}>关注</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{follows?.followers.length || 0}</span>
          <span className={styles.statLabel}>粉丝</span>
        </div>
      </div>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${currentMode === 'my' ? styles.active : ''}`}
          onClick={() => setCurrentMode('my')}
        >
          我的角色
        </button>
        <button 
          className={`${styles.tab} ${currentMode === 'favorites' ? styles.active : ''}`}
          onClick={() => setCurrentMode('favorites')}
        >
          收藏
        </button>
      </div>
      
      <div className={styles.content}>
        {currentMode === 'my' && (
          <div className={styles.ocGrid}>
            {myOCs?.map(oc => (
              <div key={oc.id} className={styles.ocCard}>
                <div className={styles.ocImage}>
                  {oc.image ? <img src={oc.image} alt={oc.name} /> : <span>🎭</span>}
                </div>
                <div className={styles.ocInfo}>
                  <h4>{oc.name}</h4>
                  <p>{oc.description}</p>
                  <div className={styles.ocActions}>
                    <button onClick={() => setEditingOC(oc.id)}>
                      <Edit size={14} /> 编辑
                    </button>
                    <button onClick={() => handleDeleteOC(oc.id)} className={styles.deleteBtn}>
                      <Trash2 size={14} /> 删除
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {(!myOCs || myOCs.length === 0) && (
              <div className={styles.empty}>还没有创建角色</div>
            )}
          </div>
        )}
        
        {currentMode === 'favorites' && (
          <div className={styles.ocGrid}>
            {favoriteOCList.map(oc => (
              <div key={oc.id} className={styles.ocCard}>
                <div className={styles.ocImage}>
                  {oc.image ? <img src={oc.image} alt={oc.name} /> : <span>🎭</span>}
                </div>
                <div className={styles.ocInfo}>
                  <h4>{oc.name}</h4>
                  <p>by {oc.author_nickname}</p>
                </div>
              </div>
            ))}
            {favoriteOCList.length === 0 && (
              <div className={styles.empty}>还没有收藏</div>
            )}
          </div>
        )}
      </div>
      
      {editingOC && (
        <div className={styles.modal} onClick={() => setEditingOC(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h2>编辑角色</h2>
            <form onSubmit={handleUpdateOC}>
              <div className={styles.formGroup}>
                <label>名称</label>
                <input 
                  name="name" 
                  defaultValue={myOCs?.find(o => o.id === editingOC)?.name}
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label>图片 URL</label>
                <input 
                  name="image" 
                  defaultValue={myOCs?.find(o => o.id === editingOC)?.image}
                />
              </div>
              <div className={styles.formGroup}>
                <label>描述</label>
                <textarea 
                  name="description" 
                  rows={4}
                  defaultValue={myOCs?.find(o => o.id === editingOC)?.description}
                />
              </div>
              <div className={styles.formGroup}>
                <label>标签（逗号分隔）</label>
                <input 
                  name="tags" 
                  defaultValue={myOCs?.find(o => o.id === editingOC)?.tags?.join(', ')}
                />
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setEditingOC(null)}>取消</button>
                <button type="submit" disabled={updateOC.isPending}>
                  {updateOC.isPending ? '保存中...' : '保存'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
