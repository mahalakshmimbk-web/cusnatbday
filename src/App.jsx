import React, { useState } from 'react';
import DomeGallery from './DomeGallery';
import Grainient from './Grainient';

const PHOTOS = [
  { id: 1, src: "/photos/20251115_153744.jpg.jpeg", caption: "Us 💗", emoji: "💗" },
  { id: 2, src: "/photos/20251115_171205.jpg.jpeg", caption: "My favourite memory ✨", emoji: "✨" },
  { id: 3, src: "/photos/20260104_114022.jpg.jpeg", caption: "Look at you 👑", emoji: "👑" },
  { id: 4, src: "/photos/20260104_151856.jpg.jpeg", caption: "This one 🌹", emoji: "🌹" },
  { id: 5, src: "/photos/20260104_163244.jpg.jpeg", caption: "Forever 💕", emoji: "💕" },
  { id: 6, src: "/photos/20260104_163720.jpg.jpeg", caption: "My world 🌍", emoji: "🌍" },
  { id: 7, src: "/photos/20260131_104640.jpg", caption: "You & me 🎵", emoji: "🎵" },
  { id: 8, src: "/photos/20260131_110630.jpg", caption: "Always 🎂", emoji: "🎂" },
  { id: 9, src: "/photos/20260207_102801.jpg", caption: "Beautiful 💖", emoji: "💖" },
  { id: 10, src: "/photos/20260207_120953.jpg", caption: "So perfect 🌟", emoji: "🌟" },
  { id: 11, src: "/photos/20260207_121549.jpg", caption: "That smile 😊", emoji: "😊" },
  { id: 12, src: "/photos/20260207_145749.jpg", caption: "Cutie 🥰", emoji: "🥰" },
  { id: 13, src: "/photos/20260207_171136.jpg", caption: "Love 💘", emoji: "💘" },
  { id: 14, src: "/photos/20260207_180624.jpg", caption: "Precious 🎀", emoji: "🎀" },
  { id: 15, src: "/photos/20260207_183231.jpg", caption: "Us again 🫶", emoji: "🫶" }
];

const styleTagContent = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Satisfy&family=Inter:wght@300;400;500;600&display=swap');

  :root {
    --love-red: #8B0000;
    --rose-pink: #FFB6C1;
    --gold-birthday: #FFD700;
    --font-title: 'Cinzel', serif;
    --font-love: 'Satisfy', cursive;
  }

  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: #000;
  }

  .font-cinzel { font-family: var(--font-title); }
  .font-satisfy { font-family: var(--font-love); }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
  }
  .shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
  }
`;

function PasswordLock({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "brooklynbaby67") {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      position: 'relative', zIndex: 10,
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        background: 'rgba(20,20,20,0.6)',
        backdropFilter: 'blur(10px)',
        padding: '50px',
        borderRadius: '20px',
        border: '1px solid rgba(255, 215, 0, 0.3)',
        boxShadow: '0 0 40px rgba(0,0,0,0.8)'
      }}>
        <h2 className="font-cinzel" style={{ marginBottom: '30px', fontSize: '2rem', textAlign: 'center', color: 'var(--gold-birthday)' }}>Authentication Required</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            className={error ? "shake" : ""}
            style={{
              padding: '15px 25px',
              borderRadius: '50px',
              border: error ? '2px solid #FF4444' : '2px solid rgba(255, 215, 0, 0.5)',
              background: 'rgba(0,0,0,0.5)',
              color: '#FFF',
              fontSize: '1.2rem',
              outline: 'none',
              textAlign: 'center',
              width: '100%',
              maxWidth: '300px',
              transition: 'all 0.3s ease'
            }}
          />
          <button type="submit" style={{
            padding: '12px 40px',
            borderRadius: '50px',
            background: 'linear-gradient(135deg, #2c2c2c, #111111)',
            border: '1px solid var(--gold-birthday)',
            color: 'var(--gold-birthday)',
            fontSize: '1.1rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-title)',
            transition: 'transform 0.2s',
            boxShadow: '0 5px 15px rgba(0,0,0,0.5)'
          }}>
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000000',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{styleTagContent}</style>

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Grainient
          color1="#2c2c2c"
          color2="#111111"
          color3="#000000"
          timeSpeed={0.15}
          grainAmount={0.08}
          grainScale={1.5}
          warpStrength={1.5}
          contrast={1.2}
          zoom={1.2}
        />
      </div>

      {!isAuthenticated ? (
        <PasswordLock onUnlock={() => setIsAuthenticated(true)} />
      ) : (
        <div style={{ padding: '20px 0', width: '100%', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 1 }}>
          <h2 className="font-cinzel" style={{
            textAlign: 'center',
            fontSize: 'clamp(24px, 5vw, 38px)',
            color: 'var(--gold-birthday)',
            textShadow: '0 0 15px rgba(255, 215, 0, 0.6)',
            margin: '10px 0 20px 0',
            zIndex: 10
          }}>
            Happy birthday Cusnat
          </h2>
          <div style={{ width: '100vw', flex: 1, position: 'relative' }}>
            <DomeGallery
              images={PHOTOS}
              fit={0.5}
              minRadius={600}
              maxRadius={1000}
              openedImageWidth="360px"
              openedImageHeight="360px"
              dragSensitivity={10}
            />
          </div>
        </div>
      )}
    </div>
  );
}
