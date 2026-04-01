import { useState } from 'react';
import { ContentForm } from './components/ContentForm';
import { ContentOutput } from './components/ContentOutput';
import { generateContent } from './api/generateContent';
import './App.css';

export default function App() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (inputs) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateContent(inputs);
      setContent(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🚀 Launa Jae's Marketing Bot</h1>
        <p>Tell me your topic, and I'll generate all your marketing content in seconds</p>
      </header>

      <main className="app-main">
        <ContentForm onGenerate={handleGenerate} loading={loading} />
        {error && <div className="error-message">❌ Error: {error}</div>}
        {content && <ContentOutput content={content} />}
      </main>

      <footer className="app-footer">
        <p>Created with 🔥 for Launa Jae | Powered by Claude AI</p>
      </footer>
    </div>
  );
}