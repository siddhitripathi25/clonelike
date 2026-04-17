import React from 'react';
import { X, Plus, Hash } from 'lucide-react';

export const AskModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      tags: tags.split(',').map(t => t.trim()).filter(t => t !== ''),
      owner: {
        display_name: "You (Student)",
        profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=You"
      },
      creation_date: Math.floor(Date.now() / 1000),
      score: 0,
      answer_count: 0,
      view_count: 0,
      is_campus: true,
      question_id: Date.now().toString()
    });
    onClose();
    setTitle('');
    setTags('');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
      <div className="card fade-in" style={{ width: '100%', maxWidth: '550px', borderRadius: '4px', padding: '2rem', position: 'relative', border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}>
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-muted)' }}
        >
          <X size={24} />
        </button>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontWeight: 600 }}>Ask a public question</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Be specific and imagine you’re asking a question to another person.</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem', backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: '3px', border: '1px solid var(--border)' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '0.1rem', fontWeight: 700 }}>Title</label>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Be specific and imagine you’re asking a question to another person.</p>
            <input 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?" 
              style={{ width: '100%', padding: '0.6rem', borderRadius: '3px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: '3px', border: '1px solid var(--border)' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '0.1rem', fontWeight: 700 }}>Tags</label>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Add up to 5 tags to describe what your question is about.</p>
            <input 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. (javascript, react, css)" 
              style={{ width: '100%', padding: '0.6rem', borderRadius: '3px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <button 
            type="submit" 
            style={{ padding: '0.7rem 1rem', borderRadius: '3px', backgroundColor: 'var(--primary)', color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.9rem', boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.4)' }}
          >
            Post your question
          </button>
        </form>
      </div>
    </div>
  );
};
