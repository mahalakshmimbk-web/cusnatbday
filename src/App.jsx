import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import DomeGallery from './DomeGallery';

/*
  ╔══════════════════════════════════════════╗
  ║  💗 PHOTO DOME INSTRUCTIONS              ║
  ║  Replace each "PHOTO_X_BASE64_OR_URL"    ║
  ║  with either:                            ║
  ║  a) A direct image URL (recommended), or ║
  ║  b) A base64 data URI                    ║
  ║                                          ║
  ║  To convert a photo to base64:           ║
  ║  → Use: base64-image.de                  ║
  ║  → Paste the result as the src value     ║
  ║                                          ║
  ║  You can add MORE photos by adding       ║
  ║  more objects to the PHOTOS array.       ║
  ║  The dome auto-adjusts for any count.    ║
  ╚══════════════════════════════════════════╝
*/

// ----------------------------------------------------------------------
// FINAL STAGE DATA CONFIGURATION (With Poetic Riddles & Custom Flags)
// ----------------------------------------------------------------------
const STAGE_DATA = [
  {
    id: 1,
    fandom: "Game of Thrones",
    theme: "got",
    answers: ["dracarys", "fire and blood", "dragonfire"],
    hint1: "A dragon queen's most iconic command...",
    hint2: "Three dragons, three syllables. What Daenerys whispers to melt iron 🐉",
    loveNote: "Just like Daenerys, you carry fire in your soul — and I am completely burned by you. 💗",
    transitionMsg: "The dragon bows to you, my queen 🐉👑 On to the next mystery...",
    bgGradient: "linear-gradient(135deg, #1A4731 0%, #0D2B1A 100%)",
    accentColor: "#C9A84C",
    emoji: "🐉🗡️👑🔥⚔️",
    bannerText: "⚔️ STAGE 1 — THE REALM OF WESTEROS 🐉",
    subtitle: "The Iron Throne holds no mystery for one like you...",
    riddleText: "She was born in fire and could not be burned,\n She walked into flames and a queen was earned.\n Her children were scales, her words were a blade,\n One word she spoke — and kingdoms were afraid.\n\n Three dragons obeyed it. Cities fell to its sound.\n What single command brought the world to the ground?"
  },
  {
    id: 2,
    fandom: "Brooklyn 99",
    theme: "b99",
    answers: ["nine nine", "99", "noice", "title of your sex tape"],
    hint1: "What the whole precinct shouts as a celebration...",
    hint2: "Jake Peralta's favourite exclamation when something is cool 🚔",
    loveNote: "You are my own personal Detective Peralta — solving the mystery of how to make me smile every day. 💕",
    transitionMsg: "NINE NINE!! 🚔🎉 Jake and Amy would be proud! Next clue incoming...",
    bgGradient: "linear-gradient(135deg, #1B3A6B 0%, #0D1F3C 100%)",
    accentColor: "#4A90D9",
    emoji: "🚔👮🏻🍩☕🎉",
    bannerText: "🚔 STAGE 2 — THE NINE-NINE PRECINCT 🍩",
    subtitle: "Cool cool cool cool cool... no doubt no doubt 😎",
    riddleText: "He's not the captain, but he acts like a king,\n He solves every case with a joke and a fling.\n He married his partner — the best love on TV,\n His squad yells together in pure harmony.\n\n When something is cool and the victory is sweet,\n What two words (or a number) make the precinct complete?"
  },
  {
    id: 3,
    fandom: "Stranger Things",
    theme: "st",
    answers: ["eleven", "011", "el", "eggo", "the upside down"],
    hint1: "She has a number instead of a name...",
    hint2: "She loves Eggos and has telekinetic powers 🧇",
    loveNote: "In a world full of upside-down chaos, you are my safe place — my right side up. 💗",
    transitionMsg: "Friends don't lie 💫 You cracked it! The lights are flickering you forward...",
    bgGradient: "linear-gradient(135deg, #1a0a0a 0%, #3D0000 100%)",
    accentColor: "#FF4444",
    emoji: "🔦💡🧇🌲👁️",
    bannerText: "🔦 STAGE 3 — HAWKINS, INDIANA 👁️",
    subtitle: "The Upside Down is closer than you think... 🌲",
    riddleText: "In a town where the lights speak in code,\n A girl with no name carried a heavy load.\n She bled from her nose and moved things with her mind,\n The number they gave her — one of a kind.\n\n She escaped the lab and found love and found truth,\n What is the name — or number — of this girl of proof?"
  },
  {
    id: 4,
    fandom: "Attack on Titan",
    theme: "aot",
    answers: ["eren", "eren yeager", "rumbling", "tatakae", "the rumbling"],
    hint1: "He started as a hero but became something more complicated...",
    hint2: "His battle cry became iconic. What does Eren scream to keep going? ⚔️",
    loveNote: "You fight for what you love with everything you have. That's the most beautiful thing about you. 💕",
    transitionMsg: "Tatakae!! ⚔️🌟 The walls cannot hold your spirit! Keep going...",
    bgGradient: "linear-gradient(135deg, #2C2C2C 0%, #1a1a1a 100%)",
    accentColor: "#8B7355",
    emoji: "⚔️🗺️🏰💨🌊",
    bannerText: "⚔️ STAGE 4 — BEYOND THE WALLS 🌊",
    subtitle: "On that day, mankind received a reminder... 🏰",
    riddleText: "Beyond the walls, the truth was buried in lies,\n A boy with green eyes looked up at the skies.\n He swore to destroy them — each and every one,\n Until FREEDOM and vengeance became the same sun.\n\n He screamed one word to rise every time he fell,\n A soldier's war cry — do you know it well?"
  },
  {
    id: 5,
    fandom: "Her Books",
    theme: "books",
    answers: ["kaz brekker", "kaz", "the bastard of the barrel", "no mourners", "no funerals"],
    hint1: "Six of Crows — the cunning leader of the Dregs...",
    hint2: "He has a cane and a reputation colder than ice. What is his full name? 📖",
    loveNote: "You read worlds into existence. Every book you love lives in your eyes when you talk about it. I could listen forever. 💗",
    transitionMsg: "No mourners, no funerals 📖✨ A true reader of hearts! One more chapter...",
    bgGradient: "linear-gradient(135deg, #2D1B4E 0%, #1a0f2e 100%)",
    accentColor: "#9B59B6",
    emoji: "📖✨🌙🖤💜",
    bannerText: "📖 STAGE 5 — THE WORLD OF WORDS 🌙",
    subtitle: "No mourners. No funerals. Only you and the story. 📖",
    riddleText: "In the Barrel's dark alleys where broken things dwell,\n A boy with a cane had a story to tell.\n No mourners to grieve him, no funerals to mourn,\n His heart was a fortress — his legend was born.\n\n He led six misfits through impossible odds,\n A criminal genius who bargained with gods.\n His name is a warning, his name is a blade —\n What is the name of the plan that he made?\n\n (Or simply: who leads the Dregs of Ketterdam?)"
  },
  {
    id: 6,
    fandom: "Her Music",
    theme: "music",
    answers: ["taylor swift", "swift", "fearless", "speak now", "eras", "the eras tour"],
    hint1: "She has more eras than most artists have albums...",
    hint2: "She's been going through her Eras Tour 🎸 — who is this queen of reinvention?",
    loveNote: "Every Taylor era reminds me of a different memory with you. You are my favourite album on repeat. 🎵💕",
    transitionMsg: "Shake it off, you LEGEND 🎵🎉 The final door is glowing just for you...",
    bgGradient: "linear-gradient(135deg, #4A0E5C 0%, #1a0530 100%)",
    accentColor: "#E91E8C",
    emoji: "🎵🎶🎸🎤✨",
    bannerText: "🎵 STAGE 6 — THE MUSIC IN HER SOUL 🎤",
    subtitle: "Long story short: she survived. And so will you. 🎸",
    riddleText: "She started with teardrops on a guitar one day,\n Then fearless, then red, then she shook it away.\n She spoke, then was folklore, then evermore came,\n Then midnights arrived and she rewrote her name.\n\n The Weeknd calls at blinding lights and dawn,\n Doja paints planets then moves right along,\n One Direction asked: what makes you beautiful, true —\n But only ONE artist has all of these clues.\n\n Who is the queen of reinvention and song,\n Whose Eras Tour proved she belonged all along?"
  },
  {
    id: 7,
    fandom: "The Final Key",
    theme: "final",
    answers: ["cusnatsova", "happy birthday", "i love you", "birthday", "love"],
    hint1: "The answer is closer than you think... it's about YOU 💕",
    hint2: "Type the name of the most special person in this story 🎂",
    loveNote: "This last door was never locked. It was always open — because everything here was always, already, yours. 💗",
    transitionMsg: "You found it. You found everything. Now open the final gift... 🎁💕",
    bgGradient: "linear-gradient(135deg, #8B0000 0%, #4a0000 100%)",
    accentColor: "#FFD700",
    emoji: "💗🎂🎁✨👑",
    bannerText: "💗 STAGE 7 — THE FINAL MYSTERY 🎂",
    subtitle: "This one was always yours. 💕",
    riddleText: "Six doors you've opened, six worlds you have crossed,\n Through dragons and precincts and all that was lost,\n Through Titans and Upside Downs, music and books —\n You solved every riddle with heart and with looks.\n\n Now one final door stands — and it has no lock.\n No riddle inside it, no key, no deadbolt.\n \n Just type the name of the one who was made\n To solve every mystery, be never afraid.\n \n The name of the girl this was all built for —\n Your name is the answer. Walk through the door. 💗"
  }
];

// ----------------------------------------------------------------------
// CSS ANIMATIONS & STYLE INJECTION
// ----------------------------------------------------------------------
const styleTagContent = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Satisfy&family=Inter:wght@300;400;500;600&display=swap');

  :root {
    /* Core Love & Birthday Palette */
    --love-red: #8B0000;
    --love-red-light: #C41E3A;
    --rose-pink: #FFB6C1;
    --rose-deep: #E8637A;
    --gold-birthday: #FFD700;
    --gold-warm: #F4A636;
    --gold-deep: #C9A84C;
    --cream: #FFF8F0;
    --cream-dark: #F5E6D3;
    --lavender: #E6DEFF;
    --lavender-deep: #9B59B6;

    /* Stage-Specific */
    --got-green: #1A4731;
    --got-gold: #C9A84C;
    --got-dark: #0D2B1A;
    --b99-blue: #1B3A6B;
    --b99-light: #4A90D9;
    --b99-dark: #0D1F3C;
    --st-red: #8B0000;
    --st-dark: #1a0a0a;
    --st-glow: #FF4444;
    --aot-grey: #2C2C2C;
    --aot-amber: #8B7355;
    --aot-dark: #1a1a1a;
    --books-purple: #2D1B4E;
    --books-lavender: #9B59B6;
    --books-dark: #1a0f2e;
    --music-pink: #E91E8C;
    --music-purple: #4A0E5C;
    --music-dark: #1a0530;
    --final-gold: #FFD700;
    --final-red: #8B0000;

    /* Typography */
    --font-title: 'Cinzel', serif;
    --font-body: 'Playfair Display', serif;
    --font-love: 'Satisfy', cursive;
    --font-ui: 'Inter', sans-serif;

    /* Spacing */
    --card-radius: 24px;
    --button-radius: 50px;
    --card-padding: 32px;
    --card-padding-mobile: 20px;

    /* Glassmorphism */
    --glass-bg: rgba(255, 255, 255, 0.08);
    --glass-bg-hover: rgba(255, 255, 255, 0.12);
    --glass-border: rgba(255, 255, 255, 0.18);
    --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    --glass-blur: blur(16px);

    /* Animations */
    --transition-fast: 0.2s ease;
    --transition-med: 0.4s ease;
    --transition-slow: 0.8s ease;
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  .font-cinzel { font-family: var(--font-title); }
  .font-playfair { font-family: var(--font-body); }
  .font-satisfy { font-family: var(--font-love); }
  .font-inter { font-family: var(--font-ui); }

  /* 1. Floating upward — for hearts, balloons, notes */
  @keyframes floatUp {
    0%   { transform: translateY(100vh) rotate(0deg); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(-100px) rotate(15deg); opacity: 0; }
  }

  /* 2. Gentle hover float — for cards and elements */
  @keyframes hoverFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }

  /* 3. Heartbeat pulse — for the Begin button and hearts */
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    14%       { transform: scale(1.15); }
    28%       { transform: scale(1); }
    42%       { transform: scale(1.1); }
    70%       { transform: scale(1); }
  }

  /* 4. Glow pulse — for borders and highlights */
  @keyframes glowPulse {
    0%, 100% { 
      box-shadow: 0 0 10px var(--gold-birthday), 
                  0 0 20px var(--gold-birthday); 
    }
    50% { 
      box-shadow: 0 0 20px var(--gold-birthday), 
                  0 0 40px var(--gold-birthday),
                  0 0 60px var(--gold-warm); 
    }
  }

  /* 5. Dragon fire border — Stage 1 only */
  @keyframes dragonFire {
    0%, 100% { 
      box-shadow: 0 0 15px #C9A84C, 
                  inset 0 0 15px rgba(201,168,76,0.1); 
    }
    50% { 
      box-shadow: 0 0 25px #FF6B00, 
                  0 0 50px #FF4500,
                  inset 0 0 25px rgba(255,107,0,0.2); 
    }
  }

  /* 6. Screen flicker — Stage 3 (Stranger Things) */
  @keyframes stFlicker {
    0%, 100% { opacity: 1; }
    92%       { opacity: 1; }
    93%       { opacity: 0.85; }
    94%       { opacity: 1; }
    96%       { opacity: 0.9; }
    97%       { opacity: 1; }
  }

  /* 7. Christmas lights blink — Stage 3 */
  @keyframes lightBlink {
    0%, 100% { opacity: 1; filter: brightness(1); }
    50%       { opacity: 0.3; filter: brightness(0.5); }
  }

  /* 8. Titan rise — Stage 4 */
  @keyframes titanRise {
    0%   { transform: translateY(100%); opacity: 0; }
    20%  { transform: translateY(70%); opacity: 0.4; }
    50%  { transform: translateY(60%); opacity: 0.5; }
    80%  { transform: translateY(70%); opacity: 0.4; }
    100% { transform: translateY(100%); opacity: 0; }
  }

  /* 9. Music note fall — Stage 6 */
  @keyframes noteFall {
    0%   { transform: translateY(-50px) rotate(0deg); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
  }

  /* 10. Page flutter — Stage 5 completion */
  @keyframes pageFlutter {
    0%   { transform: translate(0,0) rotate(0deg); opacity: 1; }
    100% { 
      transform: translate(
        calc(var(--fly-x, 200px)), 
        calc(var(--fly-y, -300px))
      ) rotate(var(--fly-rot, 45deg)); 
      opacity: 0; 
    }
  }

  /* 11. Shake — wrong answer input */
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 50%, 90% { transform: translateX(-8px); }
    30%, 70%      { transform: translateX(8px); }
  }

  /* 12. Stage fade in */
  @keyframes stageFadeIn {
    from { opacity: 0; transform: scale(0.95) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  /* 13. Confetti spin */
  @keyframes confettiSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  /* 14. Birthday text pulse */
  @keyframes bdayPulse {
    0%, 100% { 
      transform: scale(1); 
      text-shadow: 0 0 10px var(--gold-birthday); 
    }
    50% { 
      transform: scale(1.05); 
      text-shadow: 0 0 30px var(--gold-birthday),
                   0 0 60px var(--gold-warm); 
    }
  }

  /* 15. Rainbow border rotate — Stage 6 submit button */
  @keyframes rainbowRotate {
    from { --angle: 0deg; }
    to   { --angle: 360deg; }
  }

  /* 16. Tatakae flash — Stage 4 completion */
  @keyframes tatakaeFlash {
    0%   { opacity: 0; }
    20%  { opacity: 1; }
    80%  { opacity: 1; }
    100% { opacity: 0; }
  }

  /* 17. Balloon sway */
  @keyframes balloonSway {
    0%, 100% { transform: rotate(-5deg) translateY(0); }
    50%       { transform: rotate(5deg) translateY(-15px); }
  }

  /* 18. Wax seal spin-in — Stage 5 love note */
  @keyframes sealSpinIn {
    from { transform: scale(0) rotate(-180deg); opacity: 0; }
    to   { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  /* 19. domeRotate keyframe */
  @keyframes domeRotate {
    from { transform: rotateY(0deg); }
    to   { transform: rotateY(360deg); }
  }

  /* Glassmorphism Stage Card */
  .stage-card {
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1px solid var(--glass-border);
    border-radius: var(--card-radius);
    box-shadow: var(--glass-shadow);
    padding: var(--card-padding);
    max-width: 560px;
    width: calc(100% - 32px);
    margin: 0 auto;
    animation: stageFadeIn 0.6s ease forwards;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    z-index: 5;
  }

  @media (max-width: 480px) {
    .stage-card {
      padding: var(--card-padding-mobile) !important;
      border-radius: 16px !important;
      margin: 16px auto !important;
      width: calc(100% - 32px) !important;
    }
  }

  /* General Utility styles */
  .btn-heartbeat {
    animation: heartbeat 2s infinite ease-in-out;
  }

  .shake {
    animation: shake 0.5s ease;
  }

  .glow-gold {
    animation: glowPulse 2s infinite ease-in-out;
  }

  /* Stage specific cards styling */
  .stage-got-card {
    animation: dragonFire 2s infinite !important;
    border-width: 2px !important;
  }

  @keyframes donutBounce {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(10deg); }
  }
  .b99-donut {
    position: absolute;
    top: -20px;
    right: 20px;
    font-size: 24px;
    animation: donutBounce 0.8s infinite ease-in-out;
    user-select: none;
    z-index: 10;
  }

  @keyframes badgeShimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .b99-shimmer {
    background: linear-gradient(90deg, #4A90D9 25%, #FFF 50%, #4A90D9 75%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: badgeShimmer 3s infinite linear;
  }

  .st-bg-flicker {
    animation: stFlicker 0.4s infinite;
  }

  .st-glitch-riddle {
    text-shadow: 2px 0 #FF0000, -2px 0 #00FFFF !important;
  }

  .christmas-light-bulb {
    animation: lightBlink 1.2s infinite ease-in-out;
  }

  /* Stage 5 book float */
  @keyframes bookCoverFly {
    0% { transform: translateX(0) rotate(-10deg); opacity: 0; }
    5% { opacity: 0.9; }
    90% { opacity: 0.9; }
    100% { transform: translateX(calc(100vw + 200px)) rotate(10deg); opacity: 0; }
  }
  .book-cover-float-1 { animation: bookCoverFly 12s infinite linear; animation-delay: 0s; }
  .book-cover-float-2 { animation: bookCoverFly 12s infinite linear; animation-delay: 3s; }
  .book-cover-float-3 { animation: bookCoverFly 12s infinite linear; animation-delay: 6s; }
  .book-cover-float-4 { animation: bookCoverFly 12s infinite linear; animation-delay: 9s; }

  /* Music Note Rain */
  @keyframes noteRain {
    0% { transform: translateY(-50px) rotate(0deg); opacity: 0; }
    10% { opacity: 0.8; }
    90% { opacity: 0.8; }
    100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
  }

  /* Conic-gradient rainbow border support */
  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  .music-btn {
    position: relative;
    border: 3px solid transparent !important;
    background-image: linear-gradient(rgba(26, 5, 48, 0.9), rgba(26, 5, 48, 0.9)), 
                      conic-gradient(from var(--angle), #FF007F, #7F00FF, #00F0FF, #FF007F) !important;
    background-origin: border-box !important;
    background-clip: padding-box, border-box !important;
    animation: rainbowRotate 2s linear infinite;
  }

  /* Screen Transition Fades */
  .stage-fade-out {
    animation: fadeOut 0.3s forwards ease-in;
  }
  .stage-fade-in {
    animation: stageFadeIn 0.6s forwards ease-out;
  }
  @keyframes fadeOut {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.95); }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-delay: 0s !important;
      animation-duration: 0s !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0s !important;
      scroll-behavior: auto !important;
      transform: none !important;
    }
  }

  /* PER-STAGE THEME RULES OVERRIDES */
  
  /* GOT Theme Stage 1 */
  .stage-theme-1 {
    background: linear-gradient(135deg, #1A4731 0%, #0D2B1A 60%, #050f07 100%) !important;
  }
  .stage-theme-1 .stage-card {
    animation: dragonFire 2s infinite;
    border: 2px solid var(--got-gold);
  }
  .stage-theme-1 h2, .stage-theme-1 .stage-accent {
    color: var(--got-gold) !important;
  }
  .stage-theme-1 .riddle-text {
    color: var(--cream) !important;
  }
  .stage-theme-1 input {
    border: 2px solid var(--got-gold) !important;
  }
  .stage-theme-1 button[type="submit"] {
    background: linear-gradient(135deg, #8B6914, #C9A84C) !important;
  }

  /* B99 Theme Stage 2 */
  .stage-theme-2 {
    background: linear-gradient(135deg, #1B3A6B 0%, #0D1F3C 60%, #030d1e 100%) !important;
  }
  .stage-theme-2 .stage-card {
    border: 2px solid var(--b99-light) !important;
    box-shadow: 0 0 15px var(--b99-light), var(--glass-shadow);
  }
  .stage-theme-2 h2, .stage-theme-2 .stage-accent {
    color: #87CEEB !important;
  }
  .stage-theme-2 .riddle-text {
    color: #E8F4FD !important;
  }
  .stage-theme-2 button[type="submit"] {
    background: linear-gradient(135deg, #1B3A6B, #4A90D9) !important;
  }

  /* ST Theme Stage 3 */
  .stage-theme-3 {
    background: linear-gradient(135deg, #1a0a0a 0%, #3D0000 50%, #0a0000 100%) !important;
  }
  .stage-theme-3 .stage-card {
    border: 2px solid #FF4444 !important;
    box-shadow: 0 0 10px #FF4444, 0 0 20px #FF4444, var(--glass-shadow);
  }
  .stage-theme-3 h2, .stage-theme-3 .stage-accent {
    text-shadow: 2px 0 #FF0000, -2px 0 #00FFFF !important;
    color: var(--st-glow) !important;
  }
  .stage-theme-3 .riddle-text {
    text-shadow: 1px 0 #FF0000, -1px 0 #00FFFF !important;
    color: #FFAAAA !important;
  }
  .stage-theme-3 button[type="submit"] {
    background: #8B0000 !important;
    box-shadow: 0 0 10px #FF0000 !important;
  }

  /* AOT Theme Stage 4 */
  .stage-theme-4 {
    background: linear-gradient(135deg, #2C2C2C 0%, #1a1a1a 60%, #0a0a0a 100%) !important;
  }
  .stage-theme-4 .stage-card {
    border: 2px solid var(--aot-amber) !important;
  }
  .stage-theme-4 h2, .stage-theme-4 .stage-accent {
    color: var(--aot-amber) !important;
  }
  .stage-theme-4 .riddle-text {
    color: #D4A757 !important;
  }
  .stage-theme-4 button[type="submit"] {
    background: linear-gradient(135deg, #2C2C2C, #5C4A2A) !important;
  }

  /* Books Theme Stage 5 */
  .stage-theme-5 {
    background: linear-gradient(135deg, #2D1B4E 0%, #1a0f2e 60%, #0a0518 100%) !important;
  }
  .stage-theme-5 .stage-card {
    border: 2px solid var(--books-lavender) !important;
    box-shadow: 0 0 15px var(--books-lavender), var(--glass-shadow);
  }
  .stage-theme-5 h2, .stage-theme-5 .stage-accent {
    color: var(--lavender) !important;
  }
  .stage-theme-5 .riddle-text {
    color: #D5C8FF !important;
  }
  .stage-theme-5 button[type="submit"] {
    background: linear-gradient(135deg, #2D1B4E, #9B59B6) !important;
  }

  /* Music Theme Stage 6 */
  .stage-theme-6 {
    background: linear-gradient(135deg, #4A0E5C 0%, #1a0530 60%, #0a0015 100%) !important;
  }
  .stage-theme-6 .stage-card {
    border: 3px solid transparent !important;
    border-image: conic-gradient(from var(--angle), #FF007F, #7F00FF, #00F0FF, #FF007F) 1;
    animation: rainbowRotate 2s linear infinite;
  }
  .stage-theme-6 h2, .stage-theme-6 .stage-accent {
    color: var(--music-pink) !important;
    text-shadow: 0 0 10px var(--music-pink) !important;
  }
  .stage-theme-6 .riddle-text {
    color: #FFD6EE !important;
  }
  .stage-theme-6 button[type="submit"] {
    border: 3px solid transparent !important;
    background-image: linear-gradient(rgba(26, 5, 48, 0.9), rgba(26, 5, 48, 0.9)), 
                      conic-gradient(from var(--angle), #FF007F, #7F00FF, #00F0FF, #FF007F) !important;
    background-origin: border-box !important;
    background-clip: padding-box, border-box !important;
    animation: rainbowRotate 2s linear infinite;
  }

  /* Final Key Theme Stage 7 */
  .stage-theme-7 {
    background: radial-gradient(ellipse at center, #3D0000 0%, #8B0000 30%, #1a0000 100%) !important;
  }
  .stage-theme-7 .stage-card {
    border: 2px solid var(--gold-birthday) !important;
    animation: glowPulse 1.5s infinite;
  }
  .stage-theme-7 h2, .stage-theme-7 .stage-accent {
    color: var(--gold-birthday) !important;
    font-family: var(--font-title) !important;
  }
  .stage-theme-7 .riddle-text {
    color: #FFD700 !important;
    font-family: var(--font-title) !important;
  }
  .stage-theme-7 button[type="submit"] {
    background: linear-gradient(135deg, var(--gold-birthday), var(--gold-warm)) !important;
    animation: glowPulse 1.5s infinite;
  }

  /* Transition Overlay Fades */
  @keyframes overlayFadeIn {
    from { opacity: 0; backdrop-filter: blur(0px); -webkit-backdrop-filter: blur(0px); }
    to { opacity: 1; backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); }
  }
  @keyframes overlayFadeOut {
    from { opacity: 1; backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); }
    to { opacity: 0; backdrop-filter: blur(0px); -webkit-backdrop-filter: blur(0px); }
  }
  @keyframes dotLoader {
    0% { content: ''; }
    33% { content: '.'; }
    66% { content: '..'; }
    100% { content: '...'; }
  }
  .dot-loader::after {
    content: '';
    display: inline-block;
    width: 24px;
    text-align: left;
    animation: dotLoader 1.5s infinite steps(4);
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes scaleUp {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .love-letter-container {
    background: #FFF8F0;
    color: #3D2B1F;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    border-radius: 8px;
    max-width: 600px;
    margin: 0 auto;
    padding: 40px 48px;
    transform: rotate(-0.5deg);
    position: relative;
    box-sizing: border-box;
  }

  @media (max-width: 480px) {
    .love-letter-container {
      padding: 24px 20px !important;
      margin: 0 16px !important;
      width: calc(100% - 32px) !important;
    }
  }
`;

// ----------------------------------------------------------------------
// HELPER ANIMATION COMPONENTS
// ----------------------------------------------------------------------

function FloatingHearts({ triple }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const count = triple ? 18 : 6;
    const list = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${(i * (100 / count)) + Math.random() * 3 + 2}%`,
      delay: `${Math.random() * 4}s`,
      duration: `${Math.random() * 3 + (triple ? 2 : 4)}s`,
      size: `${Math.random() * 1.5 + 1.2}rem`
    }));
    setHearts(list);
  }, [triple]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {hearts.map(heart => (
        <span
          key={heart.id}
          style={{
            position: 'absolute',
            left: heart.left,
            bottom: '-50px',
            fontSize: heart.size,
            animation: `floatUp ${heart.duration} linear infinite`,
            animationDelay: heart.delay,
            opacity: 0,
            userSelect: 'none',
          }}
        >
          💗
        </span>
      ))}
    </div>
  );
}

function FloatingBalloons({ wild }) {
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    const list = [
      { id: 1, left: '4%', delay: '0s', duration: wild ? '3s' : '12s', emoji: '🎈' },
      { id: 2, left: '12%', delay: wild ? '0.5s' : '4s', duration: wild ? '4s' : '16s', emoji: '🎈' },
      { id: 3, right: '4%', delay: wild ? '1s' : '2s', duration: wild ? '3.5s' : '14s', emoji: '🎈' },
      { id: 4, right: '12%', delay: wild ? '1.5s' : '6s', duration: wild ? '4.5s' : '18s', emoji: '🎈' },
    ];
    if (wild) {
      for (let i = 5; i <= 10; i++) {
        list.push({
          id: i,
          left: i % 2 === 0 ? `${Math.random() * 30 + 5}%` : undefined,
          right: i % 2 !== 0 ? `${Math.random() * 30 + 5}%` : undefined,
          delay: `${Math.random() * 2}s`,
          duration: `${Math.random() * 2 + 2}s`,
          emoji: '🎈'
        });
      }
    }
    setBalloons(list);
  }, [wild]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {balloons.map(b => (
        <span
          key={b.id}
          style={{
            position: 'absolute',
            left: b.left,
            right: b.right,
            bottom: '-100px',
            fontSize: '3.2rem',
            animation: `swayAndFloat ${b.duration} ease-in-out infinite`,
            animationDelay: b.delay,
            opacity: 0,
            userSelect: 'none',
          }}
        >
          {b.emoji}
        </span>
      ))}
    </div>
  );
}

const HeartSVG = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block' }}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

function LandingDecorations() {
  const hearts = [
    { left: '10%', delay: '0s', duration: '6s', size: '20px', color: 'var(--rose-pink)' },
    { left: '22%', delay: '1.5s', duration: '8s', size: '30px', color: 'var(--gold-birthday)' },
    { left: '38%', delay: '0.8s', duration: '7s', size: '16px', color: 'var(--rose-pink)' },
    { left: '50%', delay: '2.2s', duration: '9s', size: '32px', color: 'var(--gold-birthday)' },
    { left: '62%', delay: '0.3s', duration: '6.5s', size: '24px', color: 'var(--rose-pink)' },
    { left: '78%', delay: '1.9s', duration: '8.5s', size: '18px', color: 'var(--gold-birthday)' },
    { left: '88%', delay: '2.7s', duration: '7.5s', size: '28px', color: 'var(--rose-pink)' },
    { left: '94%', delay: '1.1s', duration: '9.5s', size: '22px', color: 'var(--gold-birthday)' },
  ];

  const balloons = [
    { left: '4%', bottom: '20%', delay: '0s', size: 'clamp(30px, 6vw, 48px)' },
    { left: '12%', bottom: '50%', delay: '1.5s', size: 'clamp(24px, 5vw, 38px)' },
    { right: '4%', bottom: '25%', delay: '0.8s', size: 'clamp(30px, 6vw, 48px)' },
    { right: '12%', bottom: '55%', delay: '2.3s', size: 'clamp(24px, 5vw, 38px)' },
  ];

  const stars = [
    { left: '8%', top: '15%', delay: '0s', size: '14px', opacity: 0.4, emoji: '⭐' },
    { left: '18%', top: '35%', delay: '0.5s', size: '16px', opacity: 0.5, emoji: '✨' },
    { left: '28%', top: '10%', delay: '1.2s', size: '12px', opacity: 0.3, emoji: '⭐' },
    { left: '38%', top: '30%', delay: '0.3s', size: '18px', opacity: 0.6, emoji: '✨' },
    { left: '48%', top: '15%', delay: '1.8s', size: '15px', opacity: 0.4, emoji: '⭐' },
    { left: '58%', top: '35%', delay: '0.9s', size: '13px', opacity: 0.5, emoji: '✨' },
    { left: '68%', top: '8%', delay: '2.2s', size: '17px', opacity: 0.3, emoji: '⭐' },
    { left: '78%', top: '28%', delay: '1.4s', size: '12px', opacity: 0.6, emoji: '✨' },
    { left: '88%', top: '12%', delay: '0.7s', size: '16px', opacity: 0.4, emoji: '⭐' },
    { left: '94%', top: '38%', delay: '2.0s', size: '14px', opacity: 0.5, emoji: '✨' },
    { left: '15%', top: '60%', delay: '0.4s', size: '15px', opacity: 0.4, emoji: '⭐' },
    { right: '15%', top: '65%', delay: '1.1s', size: '18px', opacity: 0.5, emoji: '✨' },
  ];

  const notes = [
    { left: '15%', delay: '0.5s', duration: '7s', size: '20px', emoji: '🎵' },
    { left: '30%', delay: '2.1s', duration: '9s', size: '26px', emoji: '🎶' },
    { left: '45%', delay: '1.0s', duration: '8s', size: '22px', emoji: '🎵' },
    { left: '60%', delay: '3.5s', duration: '10s', size: '24px', emoji: '🎶' },
    { left: '75%', delay: '0.2s', duration: '7.5s', size: '18px', emoji: '🎵' },
    { left: '90%', delay: '1.7s', duration: '8.5s', size: '28px', emoji: '🎶' },
  ];

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
      {/* Floating Hearts */}
      {hearts.map((h, i) => (
        <span
          key={`heart-${i}`}
          style={{
            position: 'absolute',
            left: h.left,
            bottom: '-50px',
            animation: `floatUp ${h.duration} linear infinite`,
            animationDelay: h.delay,
            opacity: 0,
          }}
        >
          <HeartSVG color={h.color} size={h.size} />
        </span>
      ))}

      {/* Balloons on edges */}
      {balloons.map((b, i) => (
        <span
          key={`balloon-${i}`}
          style={{
            position: 'absolute',
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            fontSize: b.size,
            animation: `balloonSway 5s ease-in-out infinite`,
            animationDelay: b.delay,
            transformOrigin: 'bottom center',
            userSelect: 'none',
          }}
        >
          🎈
        </span>
      ))}

      {/* Small stars */}
      {stars.map((s, i) => (
        <span
          key={`star-${i}`}
          style={{
            position: 'absolute',
            left: s.left,
            right: s.right,
            top: s.top,
            fontSize: s.size,
            opacity: s.opacity,
            animation: `hoverFloat 4s infinite ease-in-out`,
            animationDelay: s.delay,
            userSelect: 'none',
          }}
        >
          {s.emoji}
        </span>
      ))}

      {/* Musical notes */}
      {notes.map((n, i) => (
        <span
          key={`note-${i}`}
          style={{
            position: 'absolute',
            left: n.left,
            bottom: '-50px',
            fontSize: n.size,
            animation: `floatUp ${n.duration} linear infinite`,
            animationDelay: n.delay,
            opacity: 0,
            userSelect: 'none',
          }}
        >
          {n.emoji}
        </span>
      ))}
    </div>
  );
}

function MusicRain() {
  const notes = ['🎵', '🎶', '🎵', '🎶', '🎵', '🎶', '🎵', '🎶', '🎵', '🎶', '🎵', '🎶'];
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
      {notes.map((n, i) => {
        const left = `${(i * 9) + Math.random() * 4}%`;
        const delay = `${Math.random() * 4}s`;
        const duration = `${Math.random() * 4 + 3}s`;
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: left,
              top: '-50px',
              fontSize: `${Math.random() * 12 + 16}px`,
              animation: `noteFall ${duration} linear infinite`,
              animationDelay: delay,
              opacity: Math.random() * 0.5 + 0.4,
              userSelect: 'none'
            }}
          >
            {n}
          </span>
        );
      })}
    </div>
  );
}

function FloatingBookCovers() {
  const books = [
    { title: "Six of Crows", bg: "#1B3A6B", delay: "0s" },
    { title: "The Song of Achilles", bg: "linear-gradient(45deg, #C9A84C, #AA7C11)", delay: "3s" },
    { title: "All the Bright Places", bg: "#FF6F59", delay: "6s" },
    { title: "Wattpad 💜", bg: "linear-gradient(45deg, #8A2BE2, #FF00FF)", delay: "9s" }
  ];
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
      {books.map((b, idx) => (
        <div
          key={idx}
          className={`book-cover-float-${idx + 1}`}
          style={{
            position: 'absolute',
            left: '-150px',
            top: `${20 + idx * 18}%`,
            width: '100px',
            height: '140px',
            background: b.bg,
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            boxSizing: 'border-box',
            textAlign: 'center',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            color: '#FFF8F0',
            fontFamily: "'Playfair Display', serif",
            opacity: 0,
            userSelect: 'none'
          }}
        >
          <div>{b.title}</div>
          <div style={{ fontSize: '0.5rem', opacity: 0.6, marginTop: '10px' }}>📖 BOOK {idx + 1}</div>
        </div>
      ))}
    </div>
  );
}

// ----------------------------------------------------------------------
// SHELL VISUAL COMPONENTS
// ----------------------------------------------------------------------

function ProgressBar({ stage, nineNineUnlocked }) {
  if (stage < 1 || stage > 7) return null;
  const progressPercent = ((stage - 1) / 6) * 100;

  return (
    <div style={{
      width: '90%',
      maxWidth: '500px',
      margin: '0 auto 25px auto',
      textAlign: 'center',
      zIndex: 10,
      position: 'relative'
    }}>
      <div className="font-playfair" style={{
        fontSize: '1.2rem',
        color: '#FFB6C1',
        marginBottom: '12px',
        textShadow: '0 0 10px rgba(255, 182, 193, 0.5)',
        fontWeight: '600'
      }}>
        Stage {stage} of 7 💕
      </div>
      <div style={{
        position: 'relative',
        height: '8px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Fill */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: `${progressPercent}%`,
          background: 'linear-gradient(90deg, #FFB6C1, #8B0000)',
          borderRadius: '10px',
          transition: 'width 0.5s ease-in-out',
          boxShadow: '0 0 10px rgba(255, 182, 193, 0.8)'
        }} />

        {/* Heart markers */}
        <div style={{
          position: 'absolute',
          top: '-6px',
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          pointerEvents: 'none'
        }}>
          {Array.from({ length: 7 }).map((_, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum <= stage;
            const isCompleted = stepNum < stage;

            // Render 🚔 icon if Stage 2 is unlocked
            let stepLabel = isCompleted ? '💖' : isActive ? '💗' : '🤍';
            if (stepNum === 2 && nineNineUnlocked) {
              stepLabel = '🚔';
            }

            return (
              <span
                key={idx}
                style={{
                  fontSize: '1rem',
                  transform: isActive ? 'scale(1.2)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  textShadow: isActive ? '0 0 8px #FFB6C1' : 'none',
                  position: 'relative',
                  left: idx === 0 ? '-3px' : idx === 6 ? '3px' : '0'
                }}
              >
                {stepLabel}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ConfettiBlast({ active }) {
  useEffect(() => {
    if (active) {
      const end = Date.now() + 4000;
      const colors = ['#FFD700', '#FFB6C1', '#8B0000', '#FFF8F0'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.85 },
          colors: colors
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.85 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [active]);

  return null;
}

function StageCard({ children, className = "", style = {} }) {
  return (
    <div className={className} style={{
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '24px',
      padding: '30px 16px',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      maxWidth: '480px',
      width: '100%',
      margin: '20px auto',
      boxSizing: 'border-box',
      textAlign: 'center',
      zIndex: 5,
      position: 'relative',
      ...style
    }}>
      {children}
    </div>
  );
}

function LoveNoteSnippet({ text }) {
  if (!text) return null;
  return (
    <div className="font-satisfy" style={{
      color: '#FFB6C1',
      fontSize: '1.35rem',
      marginTop: '25px',
      marginBottom: '15px',
      lineHeight: '1.5',
      textShadow: '0 0 8px rgba(255, 182, 193, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    }}>
      <span>💕</span>
      <span style={{ fontStyle: 'italic' }}>"{text}"</span>
      <span>💕</span>
    </div>
  );
}

function HintButton({ hint, deeperHint, attempts, visible, onToggle }) {
  const showBasicHint = visible || attempts >= 3;
  const showDeeperHint = attempts >= 6;

  return (
    <div style={{ marginTop: '20px', zIndex: 10, position: 'relative' }}>
      {!showBasicHint && (
        <button
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFD700',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            cursor: 'pointer',
            textDecoration: 'underline',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            opacity: 0.8,
            minWidth: '44px',
            minHeight: '44px',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.opacity = 1}
          onMouseLeave={(e) => e.target.style.opacity = 0.8}
        >
          Need a hint? 💡
        </button>
      )}

      {(showBasicHint || showDeeperHint) && (
        <div style={{
          transition: 'all 0.5s ease-in-out',
          marginTop: '10px'
        }}>
          <div style={{
            background: 'rgba(255, 215, 0, 0.08)',
            border: '1px dashed rgba(255, 215, 0, 0.3)',
            borderRadius: '12px',
            padding: '15px',
            color: '#FFF8F0',
            fontSize: '0.95rem',
            lineHeight: '1.4',
            fontFamily: "'Playfair Display', serif",
            textAlign: 'left'
          }}>
            <div style={{ fontWeight: 'bold', color: '#FFD700', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>💡</span> Hint:
            </div>
            <p style={{ margin: 0, fontStyle: 'italic' }}>{hint}</p>

            {showDeeperHint && deeperHint && (
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed rgba(255, 215, 0, 0.2)' }}>
                <div style={{ fontWeight: 'bold', color: '#FFB6C1', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span>🗝️</span> Deeper Hint (You got this!):
                </div>
                <p style={{ margin: 0, fontStyle: 'italic' }}>{deeperHint}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const getTransitionBg = (stageId) => {
  switch (stageId) {
    case 1: // GoT
      return "radial-gradient(circle, rgba(201, 168, 76, 0.25) 0%, rgba(13, 43, 26, 0.95) 70%, rgba(5, 15, 7, 0.98) 100%)";
    case 2: // B99
      return "radial-gradient(circle, rgba(74, 144, 217, 0.25) 0%, rgba(13, 31, 60, 0.95) 70%, rgba(3, 13, 30, 0.98) 100%)";
    case 3: // ST
      return "radial-gradient(circle, rgba(255, 68, 68, 0.25) 0%, rgba(26, 10, 10, 0.95) 70%, rgba(10, 0, 0, 0.98) 100%)";
    case 4: // AOT
      return "radial-gradient(circle, rgba(139, 115, 85, 0.25) 0%, rgba(44, 44, 44, 0.95) 70%, rgba(26, 26, 26, 0.98) 100%)";
    case 5: // Books
      return "radial-gradient(circle, rgba(155, 89, 182, 0.25) 0%, rgba(45, 27, 78, 0.95) 70%, rgba(26, 15, 46, 0.98) 100%)";
    case 6: // Music
      return "radial-gradient(circle, rgba(233, 30, 140, 0.25) 0%, rgba(74, 14, 92, 0.95) 70%, rgba(26, 5, 48, 0.98) 100%)";
    case 7: // Final
      return "radial-gradient(circle, rgba(255, 215, 0, 0.25) 0%, rgba(139, 0, 0, 0.95) 70%, rgba(26, 0, 0, 0.98) 100%)";
    default:
      return "radial-gradient(circle, rgba(255, 182, 193, 0.25) 0%, rgba(13, 27, 42, 0.95) 70%, rgba(0, 5, 16, 0.98) 100%)";
  }
};

function TransitionMessage({ stageData, message, onComplete }) {
  const [fadeStatus, setFadeStatus] = useState("in");

  useEffect(() => {
    // Stage 1 unmounts at 2s, so we start fading out at 1.7s; others wait until 2.3s
    const fadeOutDelay = stageData?.id === 1 ? 1700 : 2300;
    const fadeOutTimer = setTimeout(() => {
      setFadeStatus("out");
    }, fadeOutDelay);

    return () => {
      clearTimeout(fadeOutTimer);
    };
  }, [stageData?.id]);

  const bg = getTransitionBg(stageData?.id);
  const emoji = stageData?.emoji || "🎉";
  const stageNum = stageData?.id || 1;

  const animationStyle = fadeStatus === "in"
    ? "overlayFadeIn 0.3s ease-out forwards"
    : fadeStatus === "out"
      ? "overlayFadeOut 0.3s ease-in forwards"
      : "none";

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: bg,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      textAlign: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      animation: animationStyle
    }}>
      <div style={{
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Large emoji cluster with float animation */}
        <div style={{
          fontSize: '48px',
          marginBottom: '20px',
          animation: 'hoverFloat 4s infinite ease-in-out',
          userSelect: 'none'
        }}>
          {emoji}
        </div>

        {/* Congratulatory message */}
        <h2 className="font-cinzel" style={{
          color: 'var(--gold-birthday)',
          fontSize: 'clamp(20px, 4vw, 32px)',
          marginBottom: '15px',
          textShadow: '0 0 15px rgba(255, 215, 0, 0.5)',
          lineHeight: '1.3'
        }}>
          "{message}"
        </h2>

        {/* Loading next mystery... */}
        <div className="font-inter" style={{
          fontSize: '14px',
          color: '#FFF8F0',
          opacity: 0.6,
          marginBottom: '25px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          Loading next mystery
          <span className="dot-loader" />
        </div>

        {/* Progress indicator */}
        <div className="font-satisfy" style={{
          fontSize: '1.8rem',
          color: 'var(--rose-pink)',
          textShadow: '0 0 8px rgba(255, 182, 193, 0.3)'
        }}>
          Stage {stageNum} complete! ✓
        </div>
      </div>
    </div>
  );
}

function BirthdayHeader({ name, stage }) {
  return (
    <header style={{
      width: '100%',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'rgba(13, 27, 42, 0.5)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxSizing: 'border-box'
    }}>
      <div className="font-cinzel" style={{
        fontWeight: 'bold',
        fontSize: '1.2rem',
        color: '#FFD700',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        letterSpacing: '1px'
      }}>
        <span>🎂</span> {name} <span>💕</span>
      </div>

      {stage >= 1 && stage <= 7 && (
        <div className="font-inter" style={{
          fontSize: '0.9rem',
          color: '#FFB6C1',
          background: 'rgba(255, 182, 193, 0.1)',
          padding: '6px 14px',
          borderRadius: '20px',
          fontWeight: '600',
          border: '1px solid rgba(255, 182, 193, 0.2)'
        }}>
          Stage {stage} / 7
        </div>
      )}
    </header>
  );
}

// ----------------------------------------------------------------------
// PICTURE DOME SHELL COMPONENT
// ----------------------------------------------------------------------
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



function playBirthdayChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523, 523, 587, 523, 698, 659]; // C C D C F E
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.4);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + i * 0.4 + 0.05);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + i * 0.4 + 0.35);
      osc.start(ctx.currentTime + i * 0.4);
      osc.stop(ctx.currentTime + i * 0.4 + 0.4);
    });
  } catch (e) {
    // Autoplay blocked — silent fail, no error shown
  }
}

function GrandReveal({ resetProgress, jumpToStage, playerName }) {
  const [introPhase, setIntroPhase] = useState("step1");
  const [confettiActive, setConfettiActive] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const domeRef = useRef(null);

  useEffect(() => {
    // Lock scrolling on mount during intro
    document.body.style.overflow = "hidden";

    // Step 2: "You made it. 💗" (800ms)
    const t2 = setTimeout(() => {
      setIntroPhase("step2");
    }, 800);

    // Step 3: "This was all for you." (2900ms)
    const t3 = setTimeout(() => {
      setIntroPhase("step3");
    }, 2900);

    // Step 4: "Happy Birthday, CUSNATSOVA. 🎂" (4500ms)
    const t4 = setTimeout(() => {
      setIntroPhase("step4");
    }, 4500);

    // Step 5: Black overlay fades out (6000ms)
    const t5 = setTimeout(() => {
      setIntroPhase("step5");
    }, 6000);

    // Step 6: Confetti fires + play chime (7000ms)
    const t6 = setTimeout(() => {
      setIntroPhase("revealed");
      setConfettiActive(true);
      document.body.style.overflow = "auto";
      playBirthdayChime();
      fireRevealConfetti();
    }, 7000);

    // Confetti stops after 8s
    const tConfettiStop = setTimeout(() => {
      setConfettiActive(false);
    }, 15000);

    // Step 7: Auto-scroll to dome and show scroll indicator (9200ms)
    const tScroll = setTimeout(() => {
      if (domeRef.current) {
        domeRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      setShowScrollIndicator(true);
    }, 9200);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(tConfettiStop);
      clearTimeout(tScroll);
      document.body.style.overflow = "auto";
    };
  }, []);

  // Auto-hide scroll indicator when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fireRevealConfetti = () => {
    const end = Date.now() + 8000;
    const colors = ['#FFD700', '#FFB6C1', '#FF69B4', '#FFFFFF', '#E6DEFF', '#C41E3A'];

    (function frame() {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const getStaggerStyle = (delayMs) => {
    const isRevealed = introPhase === "revealed";
    return {
      opacity: isRevealed ? 1 : 0,
      transform: isRevealed ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.8s ease-out ${delayMs}ms, transform 0.8s ease-out ${delayMs}ms`
    };
  };

  const getHintsUsedCount = () => {
    let count = 0;
    try {
      const hState = JSON.parse(localStorage.getItem("cusnatsova_hints_state") || "{}");
      Object.keys(hState).forEach(stageId => {
        if (hState[stageId].hint1Visible) count += 1;
        if (hState[stageId].hint2Visible) count += 1;
      });
    } catch (e) { }
    return count;
  };

  const getAttemptsCount = () => {
    try {
      const attemptsMap = JSON.parse(localStorage.getItem("cusnatsova_attempts") || "{}");
      return Object.values(attemptsMap).reduce((a, b) => a + b, 0);
    } catch (e) {
      return 0;
    }
  };

  const getElapsedTime = () => {
    const startTime = localStorage.getItem("cusnatsova_start_time");
    if (startTime) {
      const elapsedMs = Date.now() - parseInt(startTime, 10);
      const minutes = Math.floor(elapsedMs / 60000);
      const seconds = Math.floor((elapsedMs % 60000) / 1000);
      return `${minutes} min ${seconds} sec`;
    }
    return "unknown";
  };

  const overlayOpacity = introPhase === "step5" ? 0 : 1;
  const overlayTransition = "opacity 1s ease-in-out";

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #050102 0%, #110208 50%, #2b0000 100%)',
      color: '#FFF8F0',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Intro sequence overlay */}
      {introPhase !== "revealed" && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#000000',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          opacity: overlayOpacity,
          transition: overlayTransition,
          padding: '20px'
        }}>
          {introPhase === "step2" && (
            <h1 className="font-satisfy" style={{
              fontSize: 'clamp(28px, 6vw, 48px)',
              color: '#FFFFFF',
              animation: 'fadeIn 0.6s forwards'
            }}>
              You made it. 💗
            </h1>
          )}
          {introPhase === "step3" && (
            <h1 className="font-satisfy" style={{
              fontSize: 'clamp(28px, 6vw, 48px)',
              color: '#FFFFFF',
              animation: 'fadeIn 0.4s forwards'
            }}>
              This was all for you.
            </h1>
          )}
          {introPhase === "step4" && (
            <h1 className="font-cinzel" style={{
              fontSize: 'clamp(24px, 5vw, 42px)',
              color: 'var(--gold-birthday)',
              animation: 'fadeIn 0.6s forwards',
              textShadow: '0 0 20px var(--gold-birthday)'
            }}>
              Happy Birthday, CUSNATSOVA. 🎂
            </h1>
          )}
        </div>
      )}

      {/* Main content elements */}
      {introPhase === "revealed" && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          boxSizing: 'border-box',
          paddingBottom: '120px'
        }}>
          {/* Header section (stagger delay 0ms) */}
          <div style={getStaggerStyle(0)}>
            <BirthdayHeader name={playerName} stage={8} />
          </div>

          {/* Picture Dome section (stagger delay 300ms) - Huge/Cover screen */}
          <div ref={domeRef} style={{ ...getStaggerStyle(300), padding: '20px 0', width: '100%', overflow: 'hidden' }}>
            <h2 className="font-cinzel" style={{
              textAlign: 'center',
              fontSize: 'clamp(24px, 5vw, 38px)',
              color: 'var(--gold-birthday)',
              textShadow: '0 0 15px rgba(255, 215, 0, 0.6)',
              margin: '0 0 10px 0'
            }}>
              Our Memory Dome ✨
            </h2>
            <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
              <DomeGallery images={PHOTOS} fit={0.5} minRadius={600} maxRadius={1000} openedImageWidth="360px" openedImageHeight="360px" />
            </div>
          </div>

          {/* Love Letter Section (stagger delay 600ms) */}
          <div style={{ ...getStaggerStyle(600), padding: '40px 20px' }}>
            <div className="love-letter-container">
              <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: '24px', letterSpacing: '2px' }}>
                🌹💗🌹💗🌹
              </div>
              <h3 className="font-satisfy" style={{
                color: 'var(--rose-deep)',
                fontSize: '1.4rem',
                margin: '0 0 20px 0',
                fontWeight: 'bold'
              }}>
                My dearest CUSNATSOVA,
              </h3>
              <p className="font-playfair" style={{
                fontSize: '16px',
                fontStyle: 'italic',
                color: '#3D2B1F',
                lineHeight: '1.9',
                margin: '0 0 20px 0',
                whiteSpace: 'pre-line'
              }}>
                {`Today you are one year more of everything that makes this world worth being in.

I made this mystery because you deserve more than a simple 'happy birthday.' You deserve a whole adventure — one built just for you, from the worlds you love and the things that make you, you.

You who recites Daenerys like scripture. You who laughs at Jake Peralta like he is a personal friend. You who felt the Upside Down in your bones and cried for Eren like he was real.

You who reads Six of Crows at midnight and looks up with stars still in your eyes. You who knows every Taylor era by heart and sings The Weeknd like the songs were written for you — because they were, in every way that matters.

I love the way you carry your faith like a quiet fire. I love that God made you exactly this curious, exactly this brave, exactly this beautiful.

CUSNATSOVA — you are not just someone I love. You are someone I am in awe of. Every single day.

Happy Birthday, my love. May this year bring you more of everything that makes your eyes light up.

All of me, always —
[factorial time complexity] 💗`}
              </p>

              {/* Wax seal bottom right */}
              <div style={{
                position: 'absolute',
                bottom: '15px',
                right: '25px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#8B0000',
                border: '2px solid var(--gold-deep)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 3px 6px rgba(0,0,0,0.3)',
                color: '#FFD700',
                fontSize: '14px',
                fontWeight: 'bold',
                animation: 'sealSpinIn 0.8s ease 1.2s forwards',
                opacity: 0
              }}>
                ✝️
              </div>

              {/* Postscript */}
              <p className="font-satisfy" style={{
                fontSize: '13px',
                opacity: 0.7,
                fontStyle: 'italic',
                margin: '25px 0 0 0',
                borderTop: '1px dashed rgba(0,0,0,0.1)',
                paddingTop: '15px'
              }}>
                P.S. — The real gift was never the mystery. It was always you. 💗
              </p>
            </div>
          </div>

          {/* Birthday Message Section (stagger delay 900ms) */}
          <div style={{
            ...getStaggerStyle(900),
            background: 'linear-gradient(135deg, #0a0010, #050b14)',
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 0)',
            backgroundSize: '24px 24px',
            padding: '60px 20px',
            textAlign: 'center',
            margin: '40px 0',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.08)'
          }}>
            {/* Giant cake emoji */}
            <div style={{
              fontSize: 'clamp(64px, 15vw, 120px)',
              display: 'inline-block',
              animation: 'heartbeat 1.5s infinite, hoverFloat 3s infinite ease-in-out',
              marginBottom: '20px'
            }}>
              🎂
            </div>
            {/* Happy Birthday */}
            <h1 className="font-cinzel" style={{
              fontSize: 'clamp(32px, 7vw, 72px)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #FFD700, #FFB6C1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              animation: 'bdayPulse 2s infinite',
              margin: '0 auto 10px auto'
            }}>
              Happy Birthday
            </h1>
            {/* Name */}
            <h2 className="font-cinzel" style={{
              fontSize: 'clamp(24px, 5vw, 52px)',
              color: 'var(--rose-pink)',
              letterSpacing: '8px',
              animation: 'glowPulse 2s infinite ease-in-out',
              margin: '0 auto 30px auto'
            }}>
              CUSNATSOVA
            </h2>
            {/* Birthday verse */}
            <p className="font-satisfy" style={{
              fontSize: '18px',
              color: '#FFF8F0',
              lineHeight: '1.8',
              maxWidth: '500px',
              margin: '0 auto',
              whiteSpace: 'pre-line',
              textShadow: '0 2px 5px rgba(0,0,0,0.5)'
            }}>
              {`May the Lord bless you and keep you,
May His face shine upon you today,
May your year be filled with His grace,
And His joy light every single day. 🙏💗`}
            </p>
          </div>

          {/* Faith Blessing Section (stagger delay 1200ms) */}
          <div style={{
            ...getStaggerStyle(1200),
            background: 'radial-gradient(circle at center, rgba(255,215,0,0.05) 0%, #0a0510 70%)',
            padding: '50px 20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* CSS glowing cross */}
            <div className="btn-heartbeat" style={{
              position: 'relative',
              width: '40px',
              height: '60px',
              margin: '0 auto 20px auto',
              animation: 'glowPulse 2s infinite ease-in-out'
            }}>
              <div style={{
                position: 'absolute',
                left: '15px',
                top: 0,
                width: '10px',
                height: '60px',
                background: 'rgba(255,215,0,0.85)',
                borderRadius: '4px',
                boxShadow: '0 0 20px rgba(255,215,0,0.5)'
              }} />
              <div style={{
                position: 'absolute',
                left: 0,
                top: '15px',
                width: '40px',
                height: '10px',
                background: 'rgba(255,215,0,0.85)',
                borderRadius: '4px',
                boxShadow: '0 0 20px rgba(255,215,0,0.5)'
              }} />
            </div>

            {/* Scripture reference */}
            <p className="font-playfair" style={{
              fontSize: '16px',
              fontStyle: 'italic',
              color: '#FFF8F0',
              maxWidth: '500px',
              lineHeight: '1.6',
              margin: '0 auto 8px auto'
            }}>
              "For I know the plans I have for you, plans to prosper you and not to harm you, plans to give you hope and a future."
            </p>
            <div className="font-inter" style={{
              fontSize: '12px',
              color: '#FFF8F0',
              opacity: 0.6,
              marginBottom: '20px'
            }}>
              — Jeremiah 29:11
            </div>

            {/* Faith personal note */}
            <p className="font-satisfy" style={{
              fontSize: '15px',
              color: 'var(--rose-pink)'
            }}>
              He made you on purpose, with purpose. And I thank Him for that every day. 💗
            </p>
          </div>

          {/* Stats & Fun Facts Footer (stagger delay 1500ms) */}
          <div style={{ ...getStaggerStyle(1500), padding: '40px 20px' }}>
            <div className="stage-card" style={{
              maxWidth: '500px',
              margin: '0 auto',
              background: 'var(--glass-bg)',
              backdropFilter: 'var(--glass-blur)',
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--glass-shadow)',
              padding: '24px 32px'
            }}>
              <h2 className="font-cinzel" style={{
                fontSize: '22px',
                color: 'var(--gold-birthday)',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                Your Mystery Stats 🎮
              </h2>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '15px',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span>⏱️ Time to complete</span>
                  <span style={{ color: 'var(--gold-birthday)', fontWeight: 'bold' }}>{getElapsedTime()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span>🧩 Stages solved</span>
                  <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>7 / 7 ✓</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span>💡 Hints used</span>
                  <span style={{ color: 'var(--rose-pink)', fontWeight: 'bold' }}>{getHintsUsedCount()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span>🎯 Total attempts</span>
                  <span style={{ color: 'var(--gold-warm)', fontWeight: 'bold' }}>{getAttemptsCount()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span>💗 Love level</span>
                  <span style={{ color: 'var(--rose-pink)', fontWeight: 'bold', animation: 'heartbeat 1.5s infinite' }}>MAXIMUM 💗💗💗</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span>🎂 Birthday energy</span>
                  <span style={{ color: 'var(--gold-birthday)', fontFamily: 'monospace' }}>████████████ 100%</span>
                </div>
              </div>

              <div className="font-inter" style={{
                textAlign: 'center',
                fontSize: '12px',
                opacity: 0.5,
                color: '#FFF8F0',
                marginTop: '25px'
              }}>
                Mystery designed with 💗 • Built just for CUSNATSOVA - June 7 🎂
              </div>
            </div>
          </div>

          {/* Replay/Relive button (under stats footer) */}
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              onClick={resetProgress}
              className="font-inter"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 248, 240, 0.4)',
                borderRadius: 'var(--button-radius)',
                padding: '12px 36px',
                fontSize: '14px',
                color: '#FFF8F0',
                cursor: 'pointer',
                transition: 'background 0.3s, border-color 0.3s',
                outline: 'none',
                minHeight: '44px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Relive the Mystery 🔄
            </button>
          </div>
        </div>
      )}

      {/* Floating Scroll Down Indicator */}
      {showScrollIndicator && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          color: 'var(--rose-pink)',
          fontFamily: 'var(--font-ui)',
          fontSize: '14px',
          animation: 'hoverFloat 2s infinite ease-in-out',
          pointerEvents: 'none',
          opacity: 0.8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>scroll down</span>
          <span style={{ fontSize: '18px' }}>↓</span>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// STAGE ENGINE IMPLEMENTATION (Core Game Mechanics & Stage Animations)
// ----------------------------------------------------------------------

function StageEngine({ stageData, onComplete, onUpdateHints }) {
  const [answer, setAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState("idle"); // "idle" | "correct" | "wrong"
  const [hint1Visible, setHint1Visible] = useState(false);
  const [hint2Visible, setHint2Visible] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [shake, setShake] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  // Transition fade classes
  const [fadeClass, setFadeClass] = useState("stage-fade-in");
  const [errorMessage, setErrorMessage] = useState("");

  // Easter Eggs State variables
  const [riddleHovered, setRiddleHovered] = useState(false);
  const [showSexTape, setShowSexTape] = useState(false);
  const [showTvText, setShowTvText] = useState(false);
  const [showTitanShadow, setShowTitanShadow] = useState(false);
  const [showTatakae, setShowTatakae] = useState(false);
  const [subtitleHovered, setSubtitleHovered] = useState(false);
  const [showPageFlutter, setShowPageFlutter] = useState(false);
  const [isChaosMode, setIsChaosMode] = useState(false);
  const [inactive, setInactive] = useState(false);

  // Track hints shown to the parent App component
  useEffect(() => {
    if (onUpdateHints) {
      onUpdateHints(stageData.id, hint1Visible || attempts >= 3, hint2Visible || attempts >= 6);
    }
  }, [hint1Visible, hint2Visible, attempts, stageData.id, onUpdateHints]);

  // Set up stage levels and timers
  useEffect(() => {
    setAnswer("");
    setAttempts(0);
    setStatus("idle");
    setHint1Visible(false);
    setHint2Visible(false);
    setShowTransition(false);
    setShake(false);
    setConfettiActive(false);
    setErrorMessage("");
    setFadeClass("stage-fade-in");

    // Load saved attempts
    const savedAttemptsMap = JSON.parse(localStorage.getItem("cusnatsova_attempts") || "{}");
    if (savedAttemptsMap[stageData.id]) {
      const attemptsCount = savedAttemptsMap[stageData.id];
      setAttempts(attemptsCount);
      if (attemptsCount >= 3) setHint1Visible(true);
      if (attemptsCount >= 6) setHint2Visible(true);
    }

    // B99 sex tape triggers
    if (stageData.id === 2 && Math.random() < 0.20) {
      const timer = setTimeout(() => {
        setShowSexTape(true);
        setTimeout(() => setShowSexTape(false), 2000);
      }, 1500);
      return () => clearTimeout(timer);
    }

    // AOT shadow trigger at 5s
    if (stageData.id === 4) {
      const timer = setTimeout(() => {
        setShowTitanShadow(true);
      }, 5000);
      return () => clearTimeout(timer);
    }

    // Stage 7 countdown trigger
    if (stageData.id === 7) {
      setIsChaosMode(true);
      const timer = setTimeout(() => {
        setIsChaosMode(false);
      }, 3000);

      const reminderTimer = setTimeout(() => {
        setInactive(true);
      }, 30000);

      const resetReminder = () => {
        setInactive(false);
      };

      window.addEventListener("mousemove", resetReminder);
      window.addEventListener("keypress", resetReminder);
      window.addEventListener("touchstart", resetReminder);

      return () => {
        clearTimeout(timer);
        clearTimeout(reminderTimer);
        window.removeEventListener("mousemove", resetReminder);
        window.removeEventListener("keypress", resetReminder);
        window.removeEventListener("touchstart", resetReminder);
      };
    }
  }, [stageData.id]);

  // Rotates through custom wrong messages
  const getWrongMsg = () => {
    if (stageData.id === 7) {
      return "That's a beautiful name... but is it YOURS? 💕";
    }

    // Music specific redirects
    if (stageData.id === 6) {
      const cleaned = answer.trim().toLowerCase();
      if (["weeknd", "doja", "one direction", "1d"].some(x => cleaned.includes(x))) {
        return "So close — you're warm! Think about who CONNECTS all of them 💡🎵";
      }
    }

    let list = [];
    if (stageData.id === 1) {
      list = [
        "A Lannister always pays their debts... but this answer owes you nothing yet 😏",
        "Not quite, my love 💕 Try again!",
        "So close! You've got this 🎂",
        "Hmm, think deeper into the story 💗"
      ];
    } else if (stageData.id === 2) {
      list = [
        "Cool cool cool... but not the right answer 😎",
        "Jake Peralta would say: 'Noice try, but nope!' 🚔",
        "As Gina would say: 'The universe is telling you to try again' 🌌",
        "Even Scully and Hitchcock got this one... eventually 🍩"
      ];
    } else if (stageData.id === 3) {
      list = [
        "The Demogorgon has more answers than that 👁️",
        "Friends don't lie... and that answer wasn't right 💔",
        "Even Dustin's compass would point away from that answer 🧭",
        "The Mind Flayer is shaking his head right now 🌿"
      ];
    } else if (stageData.id === 4) {
      list = [
        "Even Reiner wouldn't accept that answer ⚔️",
        "Levi would raise an eyebrow at that one... 🧹",
        "The walls are still standing. Try harder. 🏰",
        "Sasha would trade a potato for the right answer 🥔"
      ];
    } else if (stageData.id === 5) {
      list = [
        "Even Inej couldn't pick that lock 🗡️",
        "Kaz would say: 'Try again. We don't lose.' 🦯",
        "The Darkling himself is confused by that answer 🌑",
        "Jesper would bet against that answer... and he'd win 🎲"
      ];
    } else if (stageData.id === 6) {
      list = [
        "Not the right era... try again 🌙",
        "Even Blinding Lights couldn't illuminate that answer 👀",
        "1D would say: 'That's what makes you... almost right' 🎤",
        "Doja Cat did NOT come here for that answer 🐱"
      ];
    } else {
      list = [
        "Not quite, my love 💕 Try again!",
        "So close! You've got this 🎂",
        "Hmm, think deeper into the story 💗"
      ];
    }
    return list[attempts % list.length];
  };

  const handleSubmit = () => {
    const cleaned = answer.trim().toLowerCase();
    const valid = stageData.answers.map(a => a.toLowerCase());

    if (valid.includes(cleaned)) {
      // CORRECT
      setStatus("correct");
      setConfettiActive(true);

      // Stage 5 Page Flutter
      if (stageData.id === 5) {
        setShowPageFlutter(true);
        setTimeout(() => setShowPageFlutter(false), 800);
      }

      // Stage Fades Out Sequence
      setTimeout(() => {
        setFadeClass("stage-fade-out");
      }, 300);

      // Transition Message Fades In at 800ms
      if (stageData.id === 4) {
        setTimeout(() => {
          setShowTatakae(true);
        }, 800);
        setTimeout(() => {
          setShowTatakae(false);
          setShowTransition(true);
        }, 2300);
        setTimeout(() => {
          setConfettiActive(false);
          setShowTransition(false);
          onComplete();
        }, 4900); // Wait exactly 2.6s after transition shows (2300ms + 2600ms)
      } else if (stageData.id === 7) {
        // Stage 7 triggers custom explosion and directly calls onComplete inside 3s
        setTimeout(() => {
          setConfettiActive(false);
          onComplete();
        }, 3000);
      } else if (stageData.id === 1) {
        // Stage 1 (GoT) preserves 2.0s transition from previous segment
        setTimeout(() => {
          setShowTransition(true);
        }, 800);
        setTimeout(() => {
          setConfettiActive(false);
          setShowTransition(false);
          onComplete();
        }, 2800);
      } else {
        // Stages 2, 3, 5, 6 wait exactly 2.6s (800ms + 2600ms = 3400ms)
        setTimeout(() => {
          setShowTransition(true);
        }, 800);
        setTimeout(() => {
          setConfettiActive(false);
          setShowTransition(false);
          onComplete();
        }, 3400);
      }

    } else {
      // WRONG
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setStatus("wrong");
      setShake(true);

      // Save attempts
      const savedAttemptsMap = JSON.parse(localStorage.getItem("cusnatsova_attempts") || "{}");
      savedAttemptsMap[stageData.id] = newAttempts;
      localStorage.setItem("cusnatsova_attempts", JSON.stringify(savedAttemptsMap));

      // Error message
      setErrorMessage(getWrongMsg());

      setTimeout(() => setShake(false), 600);
      setTimeout(() => setStatus("idle"), 2000);

      if (newAttempts >= 3) setHint1Visible(true);
      if (newAttempts >= 6) setHint2Visible(true);
    }
  };

  const bgClass = stageData.id === 3 ? "st-bg-flicker" : "";
  const cardClass = stageData.id === 1 ? "stage-got-card" : stageData.id === 5 ? "stage-books-card" : (stageData.id === 7 && !isChaosMode) ? "calm-gold-glow" : "";

  // Dynamic colors for the riddle text
  let riddleColor = "#FFF8F0"; // Cream
  if (stageData.id === 2) riddleColor = "#E6F2FF"; // Light blue
  if (stageData.id === 4) riddleColor = "#FFBF00"; // Amber
  if (stageData.id === 5) riddleColor = "#E6DEFF"; // Lavender
  if (stageData.id === 6) riddleColor = "#FF007F"; // Magenta
  if (stageData.id === 7) riddleColor = "#FFD700"; // Gold

  return (
    <div className={`stage-theme-${stageData.id} ${bgClass}`} style={{
      width: '100%',
      minHeight: '100vh',
      background: stageData.bgGradient,
      color: '#FFF8F0',
      transition: 'background 1s ease',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* CONFETTI SYSTEM */}
      <ConfettiBlast active={confettiActive} />

      {/* TATAKAE WHITE FLASH OVERLAY */}
      {showTatakae && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#FFF',
          color: '#000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1002,
          animation: 'fadeIn 0.1s forwards'
        }}>
          <h1 className="font-cinzel" style={{ fontSize: '5rem', fontWeight: 'bold', letterSpacing: '4px' }}>
            TATAKAE
          </h1>
        </div>
      )}

      {/* PAGE FLUTTER RECTANGLES */}
      {showPageFlutter && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000, pointerEvents: 'none' }}>
          <div className="page-flutter-1" style={{ position: 'absolute', width: '60px', height: '85px', background: '#FFF8F0', border: '1px solid #DDD', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} />
          <div className="page-flutter-2" style={{ position: 'absolute', width: '65px', height: '90px', background: '#FFF8F0', border: '1px solid #DDD', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} />
          <div className="page-flutter-3" style={{ position: 'absolute', width: '55px', height: '80px', background: '#FFF8F0', border: '1px solid #DDD', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} />
          <div className="page-flutter-4" style={{ position: 'absolute', width: '70px', height: '95px', background: '#FFF8F0', border: '1px solid #DDD', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} />
          <div className="page-flutter-5" style={{ position: 'absolute', width: '60px', height: '85px', background: '#FFF8F0', border: '1px solid #DDD', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} />
        </div>
      )}

      {/* TRANSITION OVERLAY */}
      {showTransition && (
        <TransitionMessage
          stageData={stageData}
          message={stageData.transitionMsg}
          onComplete={() => { }}
        />
      )}

      <BirthdayHeader name="CUSNATSOVA" stage={stageData.id} />

      <div className={fadeClass} style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        position: 'relative',
        transition: 'opacity 0.4s ease, transform 0.4s ease'
      }}>
        <ProgressBar stage={stageData.id} />

        {/* Stage-Specific Anim Background Overlays */}
        {stageData.id === 3 && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(255, 0, 0, 0.15)',
            zIndex: 1,
            pointerEvents: 'none',
            animation: 'stFlicker 0.15s infinite'
          }} />
        )}

        {stageData.id === 4 && showTitanShadow && (
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(400px, 80vw)',
            height: 'min(300px, 60vh)',
            background: 'radial-gradient(ellipse at bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.6) 70%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
            animation: 'titanRise 8s forwards ease-in-out'
          }} />
        )}

        {stageData.id === 5 && <FloatingBookCovers />}

        {stageData.id === 6 && <MusicRain />}

        {/* Stage 7 All previous stage animations playing at 20% opacity */}
        {stageData.id === 7 && (
          <div style={{ opacity: 0.2, position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
            <LandingDecorations />
            <MusicRain />
            <FloatingBookCovers />
            <div style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(255, 0, 0, 0.15)',
              animation: 'stFlicker 0.15s infinite'
            }} />
            <div style={{
              position: 'fixed',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(400px, 80vw)',
              height: 'min(300px, 60vh)',
              background: 'radial-gradient(ellipse at bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.6) 70%, transparent 100%)',
              animation: 'titanRise 8s forwards ease-in-out'
            }} />
          </div>
        )}

        {/* The Stage card container */}
        <StageCard className={cardClass} style={{
          borderColor: (stageData.id === 1 || stageData.id === 5 || stageData.id === 7) ? undefined : `${stageData.accentColor}4D`,
        }}>
          {/* Stage 1 Valar Morghulis side writing & Icon cluster */}
          {stageData.id === 1 && (
            <>
              <div style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '8px',
                opacity: 0.2,
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                fontFamily: 'monospace',
                userSelect: 'none'
              }}>
                VALAR MORGHULIS
              </div>
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                opacity: 0.4,
                fontSize: '28px',
                pointerEvents: 'none',
                userSelect: 'none'
              }}>
                ⚔️🐉👑🔥🗡️
              </div>
            </>
          )}

          {/* Stage 2 police tab & bouncing donut */}
          {stageData.id === 2 && (
            <div style={{
              position: 'absolute',
              top: '-18px',
              left: '20px',
              background: '#C4A484',
              color: '#0D1B2A',
              padding: '3px 10px',
              fontSize: '0.72rem',
              fontWeight: 'bold',
              borderTopLeftRadius: '6px',
              borderTopRightRadius: '6px',
              boxShadow: '0 -2px 5px rgba(0,0,0,0.2)',
              fontFamily: "'Inter', sans-serif"
            }}>
              📋 CASE FILE #2
            </div>
          )}
          {stageData.id === 2 && <span className="b99-donut">🍩</span>}

          {/* Stage 3 Christmas lights strip */}
          {stageData.id === 3 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px', overflow: 'hidden', padding: '5px' }}>
              {Array.from({ length: 12 }).map((_, idx) => {
                const bulbColors = ['#FF4444', '#FFD700', '#4CAF50', '#2196F3'];
                const bulbColor = bulbColors[idx % 4];
                return (
                  <div
                    key={idx}
                    className="christmas-light-bulb"
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: bulbColor,
                      boxShadow: `0 0 10px ${bulbColor}`,
                      animationDelay: `${idx * 0.15}s`
                    }}
                  />
                );
              })}
            </div>
          )}

          <h2 className="font-cinzel" style={{
            fontSize: '1.6rem',
            marginBottom: '10px',
            color: stageData.id === 2 ? undefined : stageData.accentColor,
            textShadow: stageData.id === 2 ? undefined : `0 0 10px ${stageData.accentColor}66`
          }}>
            {stageData.id === 2 ? (
              <span className="b99-shimmer">Stage 2: Precinct 99 Mystery 🔍</span>
            ) : (
              stageData.title || `Stage ${stageData.id}: ${stageData.fandom}`
            )}
          </h2>

          <div className="font-inter" style={{
            fontSize: '0.85rem',
            color: '#FFB6C1',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: '600',
            marginBottom: '10px',
            background: 'rgba(255, 182, 193, 0.1)',
            padding: '4px 12px',
            borderRadius: '20px',
            display: 'inline-block',
            border: `1px solid ${stageData.accentColor}33`
          }}>
            {stageData.emoji} {stageData.fandom} {stageData.emoji}
          </div>

          {/* Subtitle with hover Patroclus quote on Stage 5 */}
          <p
            className="font-inter"
            onMouseEnter={() => setSubtitleHovered(true)}
            onMouseLeave={() => setSubtitleHovered(false)}
            style={{
              fontSize: '0.9rem',
              color: stageData.accentColor,
              fontStyle: 'italic',
              opacity: 0.8,
              cursor: stageData.id === 5 ? 'help' : 'default',
              marginBottom: '20px',
              position: 'relative',
              display: 'inline-block'
            }}
          >
            {stageData.subtitle}
            {stageData.id === 5 && subtitleHovered && (
              <span className="font-satisfy" style={{
                position: 'absolute',
                bottom: '120%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(13, 27, 42, 0.98)',
                border: '1px solid #9B59B6',
                borderRadius: '8px',
                padding: '8px 12px',
                width: '240px',
                fontSize: '0.9rem',
                color: '#FFB6C1',
                boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
                animation: 'fadeIn 0.3s forwards',
                zIndex: 100,
                fontStyle: 'italic',
                pointerEvents: 'none'
              }}>
                "I could recognize you by touch alone, my love. I would know you blind..." 💗
              </span>
            )}
          </p>

          {/* Mirrored Survey Corps crest for AOT */}
          {stageData.id === 4 && (
            <div style={{
              fontSize: '2rem',
              color: '#8B7355',
              letterSpacing: '-12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 0 15px 0',
              userSelect: 'none',
              height: '35px'
            }}>
              <span style={{ display: 'inline-block', transform: 'scaleX(-1) rotate(-15deg)' }}>🦅</span>
              <span style={{ display: 'inline-block', transform: 'rotate(-15deg) translateX(4px)' }}>🦅</span>
            </div>
          )}

          {/* Riddle Text area */}
          <div
            onMouseEnter={() => setRiddleHovered(true)}
            onMouseLeave={() => setRiddleHovered(false)}
            style={{ margin: '15px 0' }}
          >
            {stageData.id === 4 ? (
              <p className="font-playfair" style={{
                fontSize: '1.15rem',
                lineHeight: '1.6',
                color: riddleColor,
                textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                fontStyle: 'italic',
                textAlign: 'center'
              }}>
                Beyond the walls, the truth was buried in lies,<br />
                A boy with green eyes looked up at the skies.<br />
                He swore to destroy them — each and every one,<br />
                Until <span style={{ color: '#FFE066', fontWeight: 'bold', filter: 'brightness(1.15)', textShadow: '0 0 8px rgba(255,224,102,0.8)' }}>FREEDOM</span> and vengeance became the same sun.<br /><br />
                He screamed one word to rise every time he fell,<br />
                A soldier's war cry — do you know it well?
              </p>
            ) : (
              <p className={`font-playfair ${stageData.id === 3 ? 'st-glitch-riddle' : ''}`} style={{
                fontSize: stageData.id === 7 ? '1.25rem' : '1.15rem',
                lineHeight: '1.6',
                color: riddleColor,
                margin: 0,
                fontStyle: 'italic',
                fontFamily: stageData.id === 7 ? "'Cinzel', serif" : undefined,
                fontWeight: stageData.id === 7 ? 'bold' : 'normal',
                textAlign: 'center',
                whiteSpace: 'pre-line'
              }}>
                {stageData.id === 1 && riddleHovered && <span style={{ marginRight: '8px' }}>🗡️</span>}
                {stageData.riddleText}
                {stageData.id === 1 && riddleHovered && <span style={{ marginLeft: '8px' }}>🗡️</span>}
              </p>
            )}
          </div>

          {/* Stage 3 absolute walls text */}
          {stageData.id === 3 && (
            <div style={{ position: 'absolute', bottom: '10px', left: '15px', fontSize: '8px', opacity: 0.15, fontFamily: 'monospace', zIndex: 1, userSelect: 'none' }}>
              WILL IS IN THE WALLS
            </div>
          )}

          {/* Stage 3 TV channel toggle box */}
          {stageData.id === 3 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
              <button
                onClick={() => {
                  setShowTvText(true);
                  setTimeout(() => setShowTvText(false), 2500);
                }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem', padding: '4px', minHeight: '44px', minWidth: '44px' }}
              >
                📺
              </button>
              {showTvText && (
                <span style={{ fontSize: '0.8rem', color: '#FF4444', fontStyle: 'italic', animation: 'fadeIn 0.3s forwards' }}>
                  Ch. 8: The Mind Flayer
                </span>
              )}
            </div>
          )}

          {/* Stage 6 badges */}
          {stageData.id === 6 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', margin: '15px 0', zIndex: 10, position: 'relative' }}>
              <div style={{ background: '#0D1B2A', border: '1px solid #4A90D9', padding: '6px 12px', borderRadius: '20px', fontSize: '0.82rem', color: '#FFB6C1', fontFamily: "'Inter', sans-serif" }}>🌙 The Weeknd</div>
              <div style={{ background: '#0D1B2A', border: '1px solid #E91E8C', padding: '6px 12px', borderRadius: '20px', fontSize: '0.82rem', color: '#FFB6C1', fontFamily: "'Inter', sans-serif" }}>🐱 Doja Cat</div>
              <div style={{ background: '#0D1B2A', border: '1px solid #FFD700', padding: '6px 12px', borderRadius: '20px', fontSize: '0.82rem', color: '#FFB6C1', fontFamily: "'Inter', sans-serif" }}>🎸 1D</div>
              <div style={{ background: '#0D1B2A', border: '1px solid #E6DEFF', padding: '6px 12px', borderRadius: '20px', fontSize: '0.82rem', color: '#FFB6C1', fontFamily: "'Inter', sans-serif" }}>⭐ Taylor</div>
            </div>
          )}

          {/* B99 floating sex tape tooltip */}
          {showSexTape && (
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#FFD700',
              color: '#0D1B2A',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
              animation: 'fadeIn 0.3s forwards',
              zIndex: 100,
              pointerEvents: 'none'
            }}>
              TITLE OF YOUR SEX TAPE 😂
            </div>
          )}


          {/* Answer Input */}
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} style={{ margin: '15px 0', zIndex: 10, position: 'relative' }}>
            <div className={shake ? 'shake' : ''} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'center'
            }}>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={stageData.id === 7 ? "Your name... 💗" : "Type your answer here..."}
                style={{
                  width: '100%',
                  maxWidth: '350px',
                  padding: '14px 20px',
                  borderRadius: '50px',
                  border: status === 'correct' ? '2px solid #4CAF50' : status === 'wrong' ? '2px solid #F44336' : '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#FFF8F0',
                  fontFamily: stageData.id === 7 ? "'Satisfy', cursive" : "'Inter', sans-serif",
                  fontStyle: stageData.id === 7 ? "italic" : "normal",
                  fontSize: '16px', // iOS zoom bypass
                  outline: 'none',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: status === 'correct' ? '0 0 15px rgba(76, 175, 80, 0.6)' : status === 'wrong' ? '0 0 15px rgba(244, 67, 54, 0.6)' : 'none',
                  backdropFilter: 'blur(5px)'
                }}
                disabled={status === 'correct'}
              />

              <button
                type="submit"
                disabled={status === 'correct'}
                style={{
                  padding: '14px 40px',
                  minHeight: '52px',
                  width: '100%',
                  maxWidth: '220px',
                  borderRadius: '50px',
                  border: 'none',
                  background: stageData.id === 6 ? undefined : `linear-gradient(45deg, ${stageData.accentColor || '#8B0000'}, #FFB6C1)`,
                  color: '#FFF8F0',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: '700',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                className={stageData.id === 6 ? "music-btn btn-heartbeat" : "btn-heartbeat"}
              >
                {status === 'correct' ? 'Unlocked! 🗝️' : 'Unlock Mystery →'}
              </button>
            </div>

            {attempts > 0 && (
              <div style={{
                marginTop: '10px',
                fontSize: '0.85rem',
                color: '#FFB6C1',
                fontFamily: "'Inter', sans-serif",
                opacity: 0.8
              }}>
                {attempts} {attempts === 1 ? 'attempt' : 'attempts'} so far. Keep going!
              </div>
            )}
          </form>

          {/* Lannister bottom note text for GOT */}
          {stageData.id === 1 && (
            <div style={{ marginTop: '8px', fontSize: '10px', opacity: 0.3, fontStyle: 'italic', fontFamily: "'Inter', sans-serif" }}>
              The night is dark and full of terrors... but you are full of light 💕
            </div>
          )}

          {/* Gentle encouraging warnings */}
          {status === 'wrong' && errorMessage && (
            <div className="font-playfair" style={{
              color: '#FFB6C1',
              marginTop: '10px',
              fontSize: '1.05rem',
              fontStyle: 'italic',
              animation: 'fadeIn 0.3s forwards'
            }}>
              {errorMessage}
            </div>
          )}

          {/* Hint button reveals */}
          <HintButton
            hint={stageData.hint1}
            deeperHint={stageData.hint2}
            attempts={attempts}
            visible={hint1Visible}
            onToggle={() => setHint1Visible(true)}
          />

          {/* Stage 5 Wax Note vs Standard LoveNote */}
          {stageData.id === 5 ? (
            <div style={{
              background: '#FFF8F0',
              color: '#0D1B2A',
              padding: '20px',
              borderRadius: '4px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
              transform: 'rotate(-2deg)',
              margin: '25px 5px 15px 5px',
              fontFamily: "'Satisfy', cursive",
              fontSize: '1.25rem',
              position: 'relative',
              textAlign: 'left',
              borderLeft: '4px solid #9B59B6'
            }}>
              <div style={{ fontStyle: 'italic', paddingRight: '25px', lineHeight: '1.4' }}>
                "{stageData.loveNote}"
              </div>
              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#8B0000',
                border: '2px solid #C9A84C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                animation: 'sealSpinIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                userSelect: 'none',
                color: '#FFD700',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                ❤
              </div>
            </div>
          ) : (
            <LoveNoteSnippet text={stageData.loveNote} />
          )}

          {/* Stage 7 Pentecostal faith element */}
          {stageData.id === 7 && (
            <div className="font-satisfy" style={{
              color: '#FFF8F0',
              fontSize: '0.95rem',
              marginTop: '15px',
              opacity: 0.9,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}>
              <span>✝️</span>
              <span>May God's grace surround you on this birthday and always 🙏💗</span>
            </div>
          )}

          {/* Stage 7 inactivity countdown reminder */}
          {inactive && stageData.id === 7 && (
            <div className="font-inter" style={{
              color: '#FFD700',
              fontSize: '0.95rem',
              fontWeight: 'bold',
              marginTop: '15px',
              animation: 'pulse 1.5s infinite',
              textShadow: '0 0 8px rgba(255, 215, 0, 0.5)'
            }}>
              The door is waiting for you, CUSNATSOVA 💗
            </div>
          )}
        </StageCard>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// MAIN APP COMPONENT
// ----------------------------------------------------------------------

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
      width: '100vw', height: '100vh', background: '#0a0a0a',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: '#FFD700', fontFamily: 'var(--font-body)'
    }}>
      <h2 className="font-cinzel" style={{ marginBottom: '30px', fontSize: '2rem', textAlign: 'center' }}>Authentication Required</h2>
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
            background: 'rgba(255, 255, 255, 0.05)',
            color: '#FFF',
            textAlign: 'center',
            fontSize: '1.2rem',
            outline: 'none',
            minWidth: '280px',
            transition: 'border 0.3s ease'
          }}
        />
        <button type="submit" className="font-cinzel" style={{
          padding: '12px 40px', borderRadius: '50px', background: 'linear-gradient(135deg, #FFD700, #C9A84C)', color: '#0a0a0a',
          fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1.1rem',
          boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
        }}>
          Unlock
        </button>
      </form>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [playerName] = useState("CUSNATSOVA");
  const [birthdayMode] = useState(true);
  const [loveMode] = useState(true);

  // Easter eggs routing triggers
  const [nineNineUnlocked, setNineNineUnlocked] = useState(false);
  const [showHalfway, setShowHalfway] = useState(false);
  const [explosionActive, setExplosionActive] = useState(false);
  const [konamiTriggered, setKonamiTriggered] = useState(false);

  // Hints tracking state
  const [hintsState, setHintsState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cusnatsova_hints_state") || "{}");
    } catch (e) {
      return {};
    }
  });

  const updateHintsState = (stageId, hint1Visible, hint2Visible) => {
    setHintsState(prev => {
      const updated = {
        ...prev,
        [stageId]: { hint1Visible, hint2Visible }
      };
      localStorage.setItem("cusnatsova_hints_state", JSON.stringify(updated));
      return updated;
    });
  };

  // Keyboard monitoring for Konami code
  useEffect(() => {
    const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let input = [];

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase() === 'b' ? 'b' : e.key.toLowerCase() === 'a' ? 'a' : e.key;
      input.push(key);
      input = input.slice(-10);
      if (JSON.stringify(input) === JSON.stringify(konami)) {
        setKonamiTriggered(true);
        setTimeout(() => {
          setKonamiTriggered(false);
        }, 4000);
        input = [];
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Restore progress on mount
  useEffect(() => {
    const progressStr = localStorage.getItem("cusnatsova_mystery_progress");
    if (progressStr) {
      try {
        const completed = JSON.parse(progressStr);
        if (Array.isArray(completed) && completed.length > 0) {
          // Restore NineNine Unlock flag if stage 2 is complete
          if (completed.includes(2)) {
            setNineNineUnlocked(true);
          }

          let nextStage = 1;
          for (let i = 1; i <= 7; i++) {
            if (!completed.includes(i)) {
              nextStage = i;
              break;
            }
            if (i === 7) {
              nextStage = 8;
            }
          }
          setCurrentStage(nextStage);
        }
      } catch (e) {
        console.error("Failed to parse progress from localStorage", e);
      }
    }
  }, []);

  // Save start time when beginning
  const startJourney = () => {
    if (!localStorage.getItem("cusnatsova_start_time")) {
      localStorage.setItem("cusnatsova_start_time", Date.now().toString());
    }
    setCurrentStage(1);
  };

  // Called when StageEngine completes a stage
  const handleTransitionComplete = () => {
    // Record completion in local storage
    const completedStr = localStorage.getItem("cusnatsova_mystery_progress");
    const completed = completedStr ? JSON.parse(completedStr) : [];

    if (!completed.includes(currentStage)) {
      completed.push(currentStage);
      localStorage.setItem("cusnatsova_mystery_progress", JSON.stringify(completed));
    }

    if (currentStage === 2) {
      setNineNineUnlocked(true);
    }

    if (currentStage === 7) {
      // Climax full birthday explosion sequences
      setExplosionActive(true);
      setTimeout(() => {
        setExplosionActive(false);
        setCurrentStage(8);
      }, 3000);
    } else if (currentStage === 4) {
      // Stage 4 halfway celebration check
      setShowHalfway(true);
      setTimeout(() => {
        setShowHalfway(false);
        setCurrentStage(5);
      }, 3000);
    } else {
      setCurrentStage(currentStage + 1);
    }
  };

  // Dev bar navigation
  const jumpToStage = (num) => {
    setCurrentStage(num);
    if (num >= 2) setNineNineUnlocked(true);
    else setNineNineUnlocked(false);
  };

  const resetProgress = () => {
    localStorage.removeItem("cusnatsova_mystery_progress");
    localStorage.removeItem("cusnatsova_start_time");
    localStorage.removeItem("cusnatsova_attempts");
    localStorage.removeItem("cusnatsova_hints_state");
    setHintsState({});
    setNineNineUnlocked(false);
    setCurrentStage(0);
  };

  // Calculate final statistics
  const getStats = () => {
    const startTime = localStorage.getItem("cusnatsova_start_time");
    let elapsedString = "unknown";
    if (startTime) {
      const elapsedMs = Date.now() - parseInt(startTime, 10);
      const minutes = Math.floor(elapsedMs / 60000);
      const seconds = Math.floor((elapsedMs % 60000) / 1000);
      elapsedString = `${minutes} minutes and ${seconds} seconds`;
    }

    const attemptsMap = JSON.parse(localStorage.getItem("cusnatsova_attempts") || "{}");
    const totalAttempts = Object.values(attemptsMap).reduce((a, b) => a + b, 0);

    return { elapsedString, totalAttempts, attemptsMap };
  };

  const stats = currentStage === 8 ? getStats() : null;

  // Determine stage background gradient
  let currentBg = "linear-gradient(135deg, #0D1B2A 0%, #2D0A23 50%, #8B0000 100%)";
  if (currentStage === 8) {
    currentBg = "linear-gradient(135deg, #1C0512 0%, #400d23 50%, #8B0000 100%)";
  }

  // Flash explosion background override for Stage 7 climax
  const layoutClass = explosionActive ? "bg-flash-explosion" : "";

  if (!isAuthenticated) {
    return <PasswordLock onUnlock={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className={layoutClass} style={{
      width: '100%',
      minHeight: '100vh',
      background: (currentStage >= 1 && currentStage <= 7 && !explosionActive) ? undefined : currentBg,
      color: '#FFF8F0',
      transition: 'background 1s ease',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      <style>{styleTagContent}</style>

      {/* GLOBAL BACKGROUND FLOATING ELEMENTS */}
      {loveMode && <FloatingHearts triple={explosionActive} />}
      {birthdayMode && <FloatingBalloons wild={explosionActive} />}

      {/* KONAMI SECRET OVERLAY */}
      {konamiTriggered && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(13, 27, 42, 0.95)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000,
          textAlign: 'center',
          padding: '20px',
          boxSizing: 'border-box',
          animation: 'fadeIn 0.3s forwards'
        }}>
          <StageCard style={{ borderColor: '#FFD700', maxWidth: '440px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎮🏆👾</div>
            <h2 className="font-cinzel glow-gold" style={{ fontSize: '1.8rem', marginBottom: '15px' }}>
              You found the secret! 🎮
            </h2>
            <p className="font-playfair" style={{ fontSize: '1.15rem', lineHeight: '1.6', fontStyle: 'italic', color: '#FFF8F0' }}>
              "He knew you'd be curious enough to find this.<br /><br />
              Extra hint: the answer to life, love, and everything is always YOU. 💗"
            </p>
          </StageCard>
        </div>
      )}

      {/* HALFWAY MID-JOURNEY OVERLAY */}
      {showHalfway && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(13, 27, 42, 0.96)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1001,
          textAlign: 'center',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <StageCard style={{ borderColor: '#FFB6C1', animation: 'scaleUp 0.8s ease' }}>
            <div style={{ fontSize: '4.5rem', marginBottom: '15px' }}>🎉💗🥳</div>
            <h2 className="font-cinzel" style={{ color: '#FFB6C1', fontSize: '2rem', marginBottom: '15px' }}>
              Halfway there, my love! 🎉
            </h2>
            <p className="font-playfair" style={{ fontSize: '1.25rem', lineHeight: '1.6', fontStyle: 'italic' }}>
              "You are halfway through this mystery<br />
              and 100% in my heart. 💗"
            </p>
          </StageCard>
        </div>
      )}

      {/* FULL BIRTHDAY EXPLOSION PULSING TEXT BOX OVERLAY */}
      {explosionActive && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 990,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          <h1 className="font-cinzel glow-gold" style={{
            fontSize: 'clamp(24px, 6vw, 48px)',
            fontWeight: '900',
            padding: '25px 40px',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '30px',
            border: '3px solid #FFD700',
            animation: 'pulse 0.5s infinite',
            color: '#FFD700',
            textShadow: '0 0 25px #FFD700',
            maxWidth: '90%',
            boxSizing: 'border-box'
          }}>
            🎂 HAPPY BIRTHDAY CUSNATSOVA! 🎂
          </h1>
        </div>
      )}

      {/* SCREEN 0: LANDING PAGE */}
      {currentStage === 0 && (
        <div className="page-fade-in" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '20px',
          position: 'relative',
          minHeight: '100vh',
          boxSizing: 'border-box',
          background: 'radial-gradient(ellipse at center, #1a0020 0%, #0D1B2A 50%, #000510 100%)',
          overflow: 'hidden'
        }}>
          {/* Subtle noise texture overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 0)',
            backgroundSize: '24px 24px',
            opacity: 0.15,
            pointerEvents: 'none',
            zIndex: 1
          }} />

          <LandingDecorations />

          <div style={{ zIndex: 10, maxWidth: '650px', position: 'relative' }}>
            <h1 className="font-cinzel" style={{
              fontSize: 'clamp(28px, 6vw, 64px)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #FFD700, #FFB6C1, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              animation: 'bdayPulse 3s infinite',
              textShadow: '0 0 40px rgba(255,215,0,0.5)',
              margin: '0 0 16px 0',
              lineHeight: '1.2',
              letterSpacing: '1px'
            }}>
              Happy Birthday,
              <br />
              CUSNATSOVA 🎂
            </h1>

            <p className="font-satisfy" style={{
              fontSize: '24px',
              color: 'var(--rose-pink)',
              animation: 'hoverFloat 4s infinite ease-in-out',
              opacity: 0.9,
              margin: '0 auto 40px auto',
              maxWidth: '500px',
              lineHeight: '1.5'
            }}>
              A mystery was made for you...
              <br />
              with love 💕
            </p>

            <button
              onClick={startJourney}
              className="font-cinzel"
              style={{
                background: 'linear-gradient(135deg, #8B0000, #C41E3A)',
                border: '2px solid var(--gold-birthday)',
                padding: '18px 48px',
                fontFamily: 'var(--font-title)',
                fontWeight: 600,
                fontSize: '18px',
                color: 'var(--gold-birthday)',
                borderRadius: 'var(--button-radius)',
                animation: 'glowPulse 2s infinite, heartbeat 2s infinite',
                letterSpacing: '3px',
                cursor: 'pointer',
                outline: 'none',
                minHeight: '52px',
                transition: 'transform var(--transition-fast), filter var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.filter = 'brightness(1.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.filter = '';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.97)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
            >
              Begin Your Journey ✨
            </button>

            {/* 3 candle emojis with pulse animation */}
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
              <span style={{ fontSize: '2.5rem', animation: 'heartbeat 2s infinite ease-in-out' }}>🕯️</span>
              <span style={{ fontSize: '2.5rem', animation: 'heartbeat 2s infinite ease-in-out', animationDelay: '0.4s' }}>🕯️</span>
              <span style={{ fontSize: '2.5rem', animation: 'heartbeat 2s infinite ease-in-out', animationDelay: '0.8s' }}>🕯️</span>
            </div>
          </div>

          <footer className="font-inter" style={{
            position: 'absolute',
            bottom: '20px',
            fontSize: '12px',
            opacity: 0.4,
            color: 'var(--rose-pink)',
            letterSpacing: '0.5px',
            zIndex: 10
          }}>
            Made with 💗 for CUSNATSOVA
          </footer>
        </div>
      )}

      {/* MYSTERY SCREENS 1 - 7 */}
      {currentStage >= 1 && currentStage <= 7 && !explosionActive && (
        <StageEngine
          stageData={STAGE_DATA[currentStage - 1]}
          onComplete={handleTransitionComplete}
          onUpdateHints={updateHintsState}
        />
      )}

      {/* STAGE SCREEN BIRTHDAY COUNTER FOOTER (Always rendered bottom-center) */}
      {currentStage >= 1 && currentStage <= 7 && !explosionActive && (
        <div style={{
          position: 'absolute',
          bottom: '55px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '9px',
          opacity: 0.25,
          color: '#FFB6C1',
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '1.2px',
          pointerEvents: 'none',
          zIndex: 10,
          userSelect: 'none'
        }}>
          June 7 💗
        </div>
      )}

      {/* SCREEN 8: THE GRAND REVEAL */}
      {currentStage === 8 && (
        <GrandReveal
          resetProgress={resetProgress}
          jumpToStage={jumpToStage}
          playerName={playerName}
        />
      )}


    </div>
  );
}
