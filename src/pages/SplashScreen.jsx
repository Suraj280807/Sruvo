import { useEffect, useState } from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 400);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className="splash">
      <div className="splash-bg">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="paw-float" style={{ '--i': i }} />
        ))}
      </div>

      <div className="splash-content">
        <div className="splash-logo">
          <div className="splash-paw">🐾</div>
          <h1 className="splash-brand">Sruvo</h1>
          <p className="splash-tagline">Care. Love. Repeat.</p>
        </div>

        <div className="splash-hero">
          <img src="/pets-hero.png" alt="Pets" className="splash-pets" />
        </div>

        <div className="splash-footer">
          <div className="splash-loading">
            <div className="loading-spinner" />
            <p className="loading-text">Loading your pet world...</p>
          </div>
          <div className="splash-progress">
            <div className="splash-progress-bar">
              <div className="splash-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
