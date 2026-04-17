import React from 'react';
import { Search, Bell, MessageSquare, Plus, Home, Hash, TrendingUp, Users, LogOut, CheckCircle, ChevronUp, ChevronDown, Eye, MessageCircle, Sun, Moon, Rss, Calendar, Trophy } from 'lucide-react';
import logo from '../assets/logo.png';

export const Navbar = ({ onSearch, userProfile, theme, onToggleTheme }) => (
  <nav className="glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 'var(--navbar-height)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', zIndex: 1000, borderTop: '3px solid var(--primary)', backgroundColor: 'var(--bg-card)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <img src={logo} alt="CampusOverflow" style={{ height: '40px', width: 'auto' }} />
      <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700, display: 'flex', alignItems: 'center', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
        Campus<span style={{ fontWeight: 400, color: 'var(--primary)' }}>Overflow</span>
      </h2>
    </div>

    <div style={{ flex: 1, maxWidth: '700px', margin: '0 1.5rem', position: 'relative' }}>
      <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
      <input 
        type="text" 
        placeholder="Search for questions..." 
        style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: '3px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
        onChange={(e) => onSearch(e.target.value)}
        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
      />
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <button 
        onClick={onToggleTheme}
        style={{ padding: '0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', hover: {backgroundColor: 'var(--bg-hover)'} }}
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      
      <div style={{ width: '30px', height: '30px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border)', cursor: 'pointer' }}>
        <img src={userProfile || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} alt="Profile" style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  </nav>
);

export const Sidebar = ({ activeTag, onTagSelect }) => {
  const links = [
    { icon: <Home size={18} />, label: 'Home', active: !activeTag },
    { icon: <TrendingUp size={18} />, label: 'Questions', active: false },
    { icon: <Users size={18} />, label: 'Communities', active: false },
  ];

  const tags = ['React', 'Algorithms', 'DS', 'Finals', 'Internships', 'Java', 'Python'];

  return (
    <aside style={{ width: 'var(--sidebar-width)', height: 'calc(100vh - var(--navbar-height))', position: 'fixed', top: 'var(--navbar-height)', left: 0, padding: '1.5rem 0', borderRight: '1px solid var(--border)', backgroundColor: 'var(--bg-card)', overflowY: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '1.5rem' }}>
        {links.map(link => (
          <button key={link.label} className={`nav-link ${link.active ? 'active' : ''}`} style={{ paddingLeft: '2rem' }}>
            <span>{link.label}</span>
          </button>
        ))}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '0.75rem', paddingLeft: '2rem', fontWeight: 700 }}>Trending Tags</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {tags.map(tag => (
            <button 
              key={tag} 
              onClick={() => onTagSelect(tag)}
              className={`nav-link ${activeTag === tag ? 'active' : ''}`}
              style={{ fontSize: '0.85rem', paddingLeft: '2rem' }}
            >
              <span>#{tag}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export const PostCard = ({ post }) => {
  const [votes, setVotes] = React.useState(post.score || 0);
  const [voted, setVoted] = React.useState(0);

  const handleVote = (dir) => {
    if (voted === dir) {
      setVotes(votes - dir);
      setVoted(0);
    } else {
      setVotes(votes - voted + dir);
      setVoted(dir);
    }
  };

  const timeAgo = (date) => {
    const seconds = Math.floor(Date.now() / 1000 - date);
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className={`card fade-in ${post.is_campus ? 'glow-card' : ''}`} style={{ display: 'flex', gap: '1rem', padding: '1rem', borderTop: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', width: '60px', paddingTop: '0.25rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: votes !== 0 ? 'var(--primary)' : 'var(--text-primary)' }}>{votes}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>votes</div>
        </div>
        <div style={{ textAlign: 'center', border: post.is_answered ? '1px solid var(--success)' : 'none', color: post.is_answered ? 'var(--success)' : (post.answer_count > 0 ? 'var(--text-primary)' : 'var(--text-muted)'), padding: '2px 4px', borderRadius: '2px' }}>
          <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{post.answer_count}</div>
          <div style={{ fontSize: '0.75rem' }}>answers</div>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--primary)' }}>
          <a href="#" style={{ transition: 'color 0.2s', color: 'var(--primary)' }} onMouseOver={(e) => e.target.style.color = 'var(--primary-hover)'} onMouseOut={(e) => e.target.style.color = 'var(--primary)'}>
            {post.title}
          </a>
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
          {post.tags.map(tag => (
            <button key={tag} className="tag-btn">{tag}</button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem', fontSize: '0.8rem' }}>
          <img src={post.owner.profile_image} alt="User" style={{ width: '16px', height: '16px', borderRadius: '2px' }} />
          <span style={{ color: 'var(--primary)', fontWeight: 500 }}>{post.owner.display_name}</span>
          <span style={{ color: 'var(--text-muted)' }}>asked {timeAgo(post.creation_date)}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '0.5rem', justifyContent: 'center' }}>
        <button onClick={() => handleVote(1)} style={{ color: voted === 1 ? 'var(--primary)' : 'var(--text-muted)' }}><ChevronUp size={24} /></button>
        <button onClick={() => handleVote(-1)} style={{ color: voted === -1 ? 'var(--danger)' : 'var(--text-muted)' }}><ChevronDown size={24} /></button>
      </div>
    </div>
  );
};

export const NewsSidebar = () => {
  const news = [
    { tag: 'Hackathon', title: 'Smart India Hackathon 2026 registration starts today!', icon: <Trophy size={14} /> },
    { tag: 'Placement', title: 'Top 5 companies visiting campus this week.', icon: <Calendar size={14} /> },
    { tag: 'Events', title: 'Upcoming Tech-Talk: Scaling Distributed Systems.', icon: <Rss size={14} /> },
    { tag: 'Blog', title: 'How I built CampusOverflow in a weekend.', icon: <MessageCircle size={14} /> },
  ];

  return (
    <aside className="news-sidebar">
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Rss size={18} className="text-gradient" /> Campus News
        </h4>
        
        {news.map((item, idx) => (
          <div key={idx} className="news-card fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
            <span className="news-tag">{item.tag}</span>
            <p style={{ fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.4, cursor: 'pointer', transition: 'color 0.2s', hover: {color: 'var(--primary)'} }} 
               onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
               onMouseOut={(e) => e.target.style.color = 'inherit'}>
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '1.25rem', backgroundColor: 'var(--primary-glow)', border: '1px solid var(--primary)', borderRadius: '12px' }}>
        <h5 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: 700 }}>The Overflow Blog</h5>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Check out the latest engineering stories from our students.</p>
        <button style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>Read More →</button>
      </div>
    </aside>
  );
};
