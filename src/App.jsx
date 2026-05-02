import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [yesSize, setYesSize] = useState(1);
  const [showWarning, setShowWarning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const cardRef = useRef(null);
  const yesRef = useRef(null);
  const noRef = useRef(null);

  // ✅ Initial position (Yes ke niche)
  useEffect(() => {
    if (cardRef.current && yesRef.current && noRef.current) {
      const card = cardRef.current.getBoundingClientRect();
      const yes = yesRef.current.getBoundingClientRect();
      const no = noRef.current.getBoundingClientRect();

      setPosition({
        x: (card.width - no.width) / 2,           // center align
        y: yes.bottom - card.top + 10             // 👇 niche
      });
    }
  }, []);

  const handleNoClick = () => {
    const newCount = noCount + 1;
    setNoCount(newCount);

    setYesSize(prev => prev + 0.3);

    if (newCount === 2) {
      setShowWarning(true);
    }

    if (cardRef.current && noRef.current) {
      const card = cardRef.current.getBoundingClientRect();
      const btn = noRef.current.getBoundingClientRect();

      const maxX = card.width - btn.width;
      const maxY = card.height - btn.height;

      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;

      setPosition({ x: newX, y: newY });
    }
  };

  return (
    <div className="container">
      <div className="containerInner">
        {!accepted ? (
          <div className="card" ref={cardRef}>
            <h2>“Zyada sochna mana hai 😌
              kyunki options sirf do hi hain…
              Yes 💕 ya phir bhi Yes 😜
              Toh… Mujhse shaadi karogi?” ❤️</h2>

            <div className="btn-row">
              <button
                ref={yesRef}
                className="yes"
                style={{ transform: `scale(${yesSize})` }}
                onClick={() => setAccepted(true)}
              >
                Yes 💕
              </button>
            </div>

            {/* 👇 NO BUTTON (initial niche) */}
            <button
              ref={noRef}
              className="no floating"
              onClick={handleNoClick}
              style={{
                left: position.x,
                top: position.y
              }}
            >
              No 😜
            </button>

            {showWarning && (
              <p className="warning">
                ⚠️ Soch le... ⚠️ Itna attitude theek nahi hai 😜<br/>
                    YES hi safe option hai 😂
              </p>
            )}
          </div>
        ) : (
          <div className="card1">
       <h2>Relax karo 😄</h2>
                <p>
                          Itna serious mat ho…
                          proposal hai, <br/> Exam Nahi <br/>ANUCHHKA 😂
                      </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;