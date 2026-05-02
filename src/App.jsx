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
            <h2>Sorry bol raha hu, ab maan bhi jao 😌<br/>
              itna gussa ho ke kya he paogi? 😜<br/>
              maaf kar do mujhe warna dikkat ho jayegi…<br/>
              itna gussa karogi to thodi si or moti ho jaogi 😂❤️ </h2>

            <div className="btn-row">
              <button
                ref={yesRef}
                className="yes"
                style={{ transform: `scale(${yesSize})` }}
                onClick={() => setAccepted(true)}
              >
                Accepted💕
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
              Gussa hu 😜
            </button>

            {showWarning && (
              <p className="warning">
                ⚠️ Soch le... ⚠️ itna attitude theek nahi hai 😜<br/>
                maan jaogi to 
                paani patase bhi khilauga, jo bologi wo movie dikhaunga 🎬<br/>
                bas ek baar maff to kro agli barr se <strong>Moti</strong> nhi Bulauga 😂❤️
                
              </p>
            )}
          </div>
        ) : (
          <div className="card1">
       <h2>Finally!  😎</h2>
  <p>
    Itna gussa, itna nakhra… sab chalta hai 😜<br/>
    bas end me tu maan jaaye, wahi acha hai yarr ❤️<br/><br/>

  Thank you bolu ya khilau pizza ya burger? 🍕🍔<br/>
tu bole to aa jaun bina invite ke tere ghar <br/>
tu bas maff kr de...mujko iss bar<br/>
agli baar goli maar dena yaar 😂<br/>
   aur roz baat karunga… bas maan ja na yaar 🙏😜
    <br/><strong>ANUCHHKA ❤️</strong>
  </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;