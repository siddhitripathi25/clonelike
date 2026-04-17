import React, { useState, useEffect } from 'react';
import { Navbar, Sidebar, PostCard, NewsSidebar } from './components/Layout';
import { AskModal } from './components/AskModal';
import { fetchPosts } from './api';
import { Plus, Flame, Clock, Award } from 'lucide-react';

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTag, setActiveTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('hot');
  

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const data = await fetchPosts();
      setPosts(data);
      setFilteredPosts(data);
      setLoading(false);
    };
    loadPosts();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    let result = [...posts];

    if (activeTag) {
      result = result.filter(post => post.tags.includes(activeTag));
    }

    if (searchQuery) {
      result = result.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (sortBy === 'hot') {
      result.sort((a, b) => (b.score + b.view_count) - (a.score + a.view_count));
    } else if (sortBy === 'new') {
      result.sort((a, b) => b.creation_date - a.creation_date);
    } else if (sortBy === 'top') {
      result.sort((a, b) => b.score - a.score);
    }

    setFilteredPosts(result);
  }, [searchQuery, activeTag, posts, sortBy]);

  const handlePostSubmit = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="app-container">
      <Navbar 
        onSearch={setSearchQuery} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
      />
      <Sidebar activeTag={activeTag} onTagSelect={setActiveTag} />

      <main className="main-content">
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.25rem', fontFamily: 'var(--font-display)' }}>Campus <span className="text-gradient">Feed</span></h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>The heart of your student developer community.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.85rem 1.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600, boxShadow: 'var(--shadow-lg)', transition: 'all 0.2s' }}
          >
            <Plus size={20} /> Ask Question
          </button>
        </header>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
          {[
            { id: 'hot', icon: <Flame size={16} />, label: 'Hot' },
            { id: 'new', icon: <Clock size={16} />, label: 'New' },
            { id: 'top', icon: <Award size={16} />, label: 'Top' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setSortBy(tab.id)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                padding: '0.75rem 1.25rem', 
                backgroundColor: sortBy === tab.id ? 'var(--primary-glow)' : 'transparent',
                color: sortBy === tab.id ? 'var(--primary)' : 'var(--text-muted)', 
                fontWeight: sortBy === tab.id ? 700 : 500, 
                fontSize: '0.9rem', 
                borderRadius: '8px',
                transition: 'all 0.2s'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}

          {activeTag && (
            <button 
              onClick={() => setActiveTag(null)}
              style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              Filtered by: <span style={{ color: 'var(--primary)' }}>#{activeTag}</span>
            </button>
          )}
        </div>

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
            <div className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 800, animation: 'pulse 2s infinite' }}>Crunching data...</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <PostCard key={post.question_id} post={post} />
              ))
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--text-secondary)' }}>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Nothing here yet!</h3>
                <p>Be the first to share your knowledge with your peers.</p>
                <button onClick={() => setIsModalOpen(true)} style={{ marginTop: '2rem', backgroundColor: 'var(--primary)', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '6px' }}>Spark a Discussion</button>
              </div>
            )}
          </div>
        )}
      </main>

      <NewsSidebar />

      <AskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handlePostSubmit} 
      />

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

export default App;
