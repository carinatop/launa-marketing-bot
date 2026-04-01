import { useState } from 'react';
import './ContentForm.css';

export function ContentForm({ onGenerate, loading }) {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState('personal-story');
  const [goal, setGoal] = useState('engagement');
  const [angle, setAngle] = useState('');
  const [platformFocus, setPlatformFocus] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      alert('Please enter a topic');
      return;
    }
    onGenerate({
      topic: topic.trim(),
      contentType,
      goal,
      angle: angle.trim(),
      platformFocus
    });
  };

  return (
    <form className="content-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="topic">
          💡 What's your topic or angle?
        </label>
        <textarea
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., 'I want content about carbs and weight loss', 'Wedding planning chaos', 'Catalyst Code launch'"
          rows="3"
          disabled={loading}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contentType">Content Type</label>
          <select
            id="contentType"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            disabled={loading}
          >
            <option value="personal-story">Personal Story</option>
            <option value="educational">Educational/Teaching</option>
            <option value="transformation">Transformation/Result</option>
            <option value="urgency">Urgency/Offer</option>
            <option value="mindset">Mindset/Motivation</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="goal">What's Your Goal?</label>
          <select
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            disabled={loading}
          >
            <option value="engagement">Engagement/DMs</option>
            <option value="email-signups">Email Signups</option>
            <option value="sales">Program Sales</option>
            <option value="followers">Social Followers</option>
            <option value="all">All of the Above</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="angle">Any Specific Angle? (Optional)</label>
        <input
          id="angle"
          type="text"
          value={angle}
          onChange={(e) => setAngle(e.target.value)}
          placeholder="e.g., 'Make it funnier', 'More vulnerable', 'Controversial'"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="platformFocus">Platform Focus</label>
        <select
          id="platformFocus"
          value={platformFocus}
          onChange={(e) => setPlatformFocus(e.target.value)}
          disabled={loading}
        >
          <option value="all">All Platforms Equally</option>
          <option value="instagram-heavy">Heavy on Instagram</option>
          <option value="email-heavy">Heavy on Email</option>
          <option value="ads-heavy">Ad-Focused</option>
        </select>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="submit-button"
      >
        {loading ? '⏳ Generating...' : '✨ Generate Content'}
      </button>
    </form>
  );
}