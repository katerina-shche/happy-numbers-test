import React, { useState, useEffect, useRef } from 'react';
import './MultiplicationGame.css';

const MultiplicationGame = ({ N }) => {
  const [currentMultiplier, setCurrentMultiplier] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [examplesWithBlocks, setExamplesWithBlocks] = useState([]);
  const [animateCubes, setAnimateCubes] = useState(false);

  // Create a ref for the input to control focus
  const inputRef = useRef(null);

  // Auto focus on the input field when the component loads or a new example appears
  useEffect(() => {
    inputRef.current.focus();
  }, [currentMultiplier]);

  const currentExample = `${N} × ${currentMultiplier} =`;

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const checkAnswer = () => {
    const correctAnswer = N * currentMultiplier;
    if (parseInt(userInput) === correctAnswer) {
      setIsCorrect(true);
      setCurrentMultiplier(currentMultiplier + 1);
      setUserInput('');

      setExamplesWithBlocks((prev) => [
        ...prev,
        {
          example: `${N} × ${currentMultiplier} = ${correctAnswer}`,
          blocks: N,
          key: Date.now(),
        },
      ]);

      setAnimateCubes(true);

      setTimeout(() => {
        // 
        setIsCorrect(null);
       //
        setAnimateCubes(false);
      }, 500);
    } else {
      setIsCorrect(false);
      setTimeout(() => setIsCorrect(null), 500);
    }
  };

  // Handle Enter key press to submit answer
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer(); // Trigger the checkAnswer function when Enter is pressed
    }
  };

  return (
    <div className="game-container">
      <div className="examples-with-blocks">
        {/* Render all solved examples with their cubes */}
        {examplesWithBlocks.map((exampleWithBlock) => (
          <div key={exampleWithBlock.key} className="example-block-row">
            {/* Left Half */}
            <div className="left-half">
              <div className="solved-example">{exampleWithBlock.example}</div>
            </div>
            {/* Right Half */}
            <div className="right-half">
              <div className="block-container">
                {Array.from({ length: exampleWithBlock.blocks }).map((_, i) => (
                  <div key={i} className="block" />
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Render the current example with new blocks */}
        <div className="example-block-row fade-in">
          {/* Left Half */}
          <div className="left-half">
            <div className="multiplication-example">
              <span>{currentExample}</span>
              <input
                key={currentMultiplier} // Reset the input field with new example
                type="number"
                value={userInput}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress} // Listen for Enter key press
                ref={inputRef} // Focus on input
                className={isCorrect === false ? 'input-wrong' : ''}
              />
            </div>
          </div>
          {/* Right Half */}
          <div className="right-half">
            <div className={`block-container ${animateCubes ? 'fly-in' : ''}`}>
              {Array.from({ length: N }).map((_, i) => (
                <div key={i} className="block" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Button */}
      <button
        className={`submit-button ${
          userInput ? '' : 'disabled'
        } ${isCorrect === true ? 'right' : isCorrect === false ? 'wrong' : ''}`}
        onClick={checkAnswer}
        disabled={!userInput}
      >
        Done
      </button>
    </div>
  );
};

export default MultiplicationGame;
