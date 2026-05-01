import { useState } from 'react';
import { Heart, MessageCircle, Share2, Plus } from 'lucide-react';
import './CommunityPage.css';

const posts = [
  {
    id: 1,
    user: 'Priya S.',
    avatar: '👩',
    time: '2 hours ago',
    content: 'Bruno had his first grooming session today! He looks absolutely adorable 🐕✨',
    emoji: '🐕',
    likes: 48,
    comments: 12,
    liked: false,
    tag: 'Grooming',
    tagColor: '#E3F2FD',
  },
  {
    id: 2,
    user: 'Rahul M.',
    avatar: '👨',
    time: '5 hours ago',
    content: 'Tips for introducing a new cat to your home 🐈 — Go slow, give them their own space, and let them explore at their own pace!',
    emoji: '🐈',
    likes: 92,
    comments: 24,
    liked: true,
    tag: 'Tips',
    tagColor: '#E8F5EE',
  },
  {
    id: 3,
    user: 'Anika T.',
    avatar: '👩',
    time: '1 day ago',
    content: 'Luna just got her vaccination done! Proud pet mom moment 💉🐾 Always keep up with your pet\'s health schedule.',
    emoji: '💉',
    likes: 31,
    comments: 8,
    liked: false,
    tag: 'Health',
    tagColor: '#FCE4EC',
  },
];

const trending = ['#PetCare', '#DogMom', '#CatLife', '#VetVisit', '#PawsomeDay', '#PetFood'];

export default function CommunityPage() {
  const [localPosts, setLocalPosts] = useState(posts);
  const [newPost, setNewPost] = useState('');

  const toggleLike = (id) => {
    setLocalPosts(p => p.map(post =>
      post.id === id
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    setLocalPosts([{
      id: Date.now(),
      user: 'Rohan S.',
      avatar: 'R',
      time: 'Just now',
      content: newPost,
      emoji: '🐾',
      likes: 0,
      comments: 0,
      liked: false,
      tag: 'Share',
      tagColor: '#E8F5EE',
    }, ...localPosts]);
    setNewPost('');
  };

  return (
    <div className="community-page fade-in">
      <div className="page-title-row">
        <div>
          <h1 className="page-title">Community</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Connect with fellow pet lovers</p>
        </div>
      </div>

      <div className="community-layout">
        {/* Main feed */}
        <div className="community-feed">
          {/* Compose */}
          <div className="compose-card card">
            <div className="compose-top">
              <div className="avatar avatar-md compose-avatar">R</div>
              <textarea
                className="compose-input"
                placeholder="Share something about your pet... 🐾"
                value={newPost}
                onChange={e => setNewPost(e.target.value)}
                rows={3}
              />
            </div>
            <div className="compose-footer">
              <div className="compose-actions">
                <button className="btn btn-ghost btn-sm">📷 Photo</button>
                <button className="btn btn-ghost btn-sm">🎥 Video</button>
                <button className="btn btn-ghost btn-sm">📍 Location</button>
              </div>
              <button className="btn btn-primary btn-sm" onClick={handlePost}>
                <Plus size={13} /> Post
              </button>
            </div>
          </div>

          {localPosts.map(post => (
            <div key={post.id} className="community-post card">
              <div className="post-header">
                <div className="avatar avatar-md" style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontSize: 16 }}>
                  {post.avatar}
                </div>
                <div className="post-user-info">
                  <div className="post-user">{post.user}</div>
                  <div className="post-time">{post.time}</div>
                </div>
                <span className="badge badge-green" style={{ marginLeft: 'auto', background: post.tagColor, color: 'var(--primary)' }}>
                  {post.tag}
                </span>
              </div>
              <p className="post-content">{post.content}</p>
              <div className="post-emoji-area">{post.emoji}</div>
              <div className="post-actions">
                <button
                  className={`post-action-btn ${post.liked ? 'liked' : ''}`}
                  onClick={() => toggleLike(post.id)}
                >
                  <Heart size={15} fill={post.liked ? '#EF5350' : 'none'} color={post.liked ? '#EF5350' : 'currentColor'} />
                  {post.likes}
                </button>
                <button className="post-action-btn">
                  <MessageCircle size={15} />
                  {post.comments}
                </button>
                <button className="post-action-btn">
                  <Share2 size={15} />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="community-sidebar">
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: 12, fontSize: 15 }}>Trending Tags</h3>
            <div className="trending-tags">
              {trending.map(t => (
                <span key={t} className="tag active">{t}</span>
              ))}
            </div>
          </div>
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: 12, fontSize: 15 }}>Community Stats</h3>
            <div className="community-stats">
              <div className="comm-stat"><span className="comm-stat-val">50K+</span><span className="comm-stat-label">Members</span></div>
              <div className="comm-stat"><span className="comm-stat-val">12K+</span><span className="comm-stat-label">Posts</span></div>
              <div className="comm-stat"><span className="comm-stat-val">4.9★</span><span className="comm-stat-label">Rating</span></div>
            </div>
          </div>
          <div className="card" style={{ background: 'var(--primary-light)', border: 'none' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🐾</div>
            <h4 style={{ fontWeight: 700, marginBottom: 6, color: 'var(--primary)' }}>Join the Pet Club!</h4>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>
              Connect with 50K+ pet parents, share stories, and get expert advice.
            </p>
            <button className="btn btn-primary btn-sm w-full" style={{ justifyContent: 'center' }}>Join Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
