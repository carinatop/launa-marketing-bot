import { useState } from 'react';
import './ContentOutput.css';

export function ContentOutput({ content }) {
  const [activeTab, setActiveTab] = useState('instagram');
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

  const renderContent = (text) => {
    return text.split('\n').map((line, idx) => (
      <p key={idx}>{line}</p>
    ));
  };

  const tabs = ['instagram', 'email', 'facebook', 'tiktok', 'ads', 'hashtags'];
  const tabNames = {
    instagram: '📱 Instagram',
    email: '📧 Email',
    facebook: '📘 Facebook',
    tiktok: '🎬 TikTok',
    ads: '📢 Ads',
    hashtags: '🏷️ Hashtags'
  };

  return (
    <div className="content-output">
      <h2>✅ Generated Content</h2>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tabNames[tab]}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'instagram' && (
          <div className="section-group">
            <ContentSection 
              title="📹 Reel Script"
              content={content.instagram?.reel}
              onCopy={() => copyToClipboard(content.instagram?.reel, 'reel')}
              copied={copied === 'reel'}
            />
            <ContentSection 
              title="📸 Carousel Post (5-10 slides)"
              content={content.instagram?.carousel}
              onCopy={() => copyToClipboard(content.instagram?.carousel, 'carousel')}
              copied={copied === 'carousel'}
            />
            <ContentSection 
              title="📝 Single Post Caption"
              content={content.instagram?.caption}
              onCopy={() => copyToClipboard(content.instagram?.caption, 'caption')}
              copied={copied === 'caption'}
            />
            <ContentSection 
              title="📲 Story Post"
              content={content.instagram?.story}
              onCopy={() => copyToClipboard(content.instagram?.story, 'story')}
              copied={copied === 'story'}
            />
          </div>
        )}

        {activeTab === 'email' && (
          <div className="section-group">
            <div className="content-section">
              <h3>✉️ Subject Lines (5 Variations)</h3>
              <div className="content-text">
                {content.email?.subjectLines?.map((subject, idx) => (
                  <div key={idx} className="subject-line">
                    <p><strong>{idx + 1}.</strong> {subject}</p>
                  </div>
                ))}
              </div>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(content.email?.subjectLines?.join('\n\n'), 'subjects')}
              >
                {copied === 'subjects' ? '✅ Copied!' : 'Copy All Subjects'}
              </button>
            </div>

            <ContentSection 
              title="📧 Email Body (Full Formatted)"
              content={content.email?.body}
              onCopy={() => copyToClipboard(content.email?.body, 'emailBody')}
              copied={copied === 'emailBody'}
            />
          </div>
        )}

        {activeTab === 'facebook' && (
          <ContentSection 
            title="📘 Facebook Post"
            content={content.facebook?.post}
            onCopy={() => copyToClipboard(content.facebook?.post, 'fbPost')}
            copied={copied === 'fbPost'}
          />
        )}

        {activeTab === 'tiktok' && (
          <ContentSection 
            title="🎬 TikTok Script"
            content={content.tiktok?.script}
            onCopy={() => copyToClipboard(content.tiktok?.script, 'tiktok')}
            copied={copied === 'tiktok'}
          />
        )}

        {activeTab === 'ads' && (
          <div className="section-group">
            <ContentSection 
              title="📢 Facebook/Instagram Ads"
              content={content.ads?.socialAds}
              onCopy={() => copyToClipboard(content.ads?.socialAds, 'socialAds')}
              copied={copied === 'socialAds'}
            />
            <ContentSection 
              title="🔍 Google Ads"
              content={content.ads?.googleAds}
              onCopy={() => copyToClipboard(content.ads?.googleAds, 'googleAds')}
              copied={copied === 'googleAds'}
            />
          </div>
        )}

        {activeTab === 'hashtags' && (
          <ContentSection 
            title="🏷️ Complete Hashtag Set"
            content={content.hashtags?.allHashtags}
            onCopy={() => copyToClipboard(content.hashtags?.allHashtags, 'hashtags')}
            copied={copied === 'hashtags'}
          />
        )}
      </div>
    </div>
  );
}

function ContentSection({ title, content, onCopy, copied }) {
  return (
    <div className="content-section">
      <h3>{title}</h3>
      <div className="content-text">
        {typeof content === 'string' ? (
          content.split('\n').map((line, idx) => (
            <p key={idx}>{line || <br />}</p>
          ))
        ) : (
          <p>{content}</p>
        )}
      </div>
      <button className="copy-button" onClick={onCopy}>
        {copied ? '✅ Copied!' : '📋 Copy'}
      </button>
    </div>
  );
}