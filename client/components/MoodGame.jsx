import { useState, useEffect } from 'react';

const MoodGame = () => {
  const [initalMouseClick, setInitialMouseClick] = useState(false);
  const [fourSecondMouseChange, setFourSecondMouseChange] = useState(false);
  const [sevenSecondMouseChange, setSevenSecondMouseChange] = useState(false);
  const [eightSecondMouseChange, setEightSecondMouseChange] = useState(false);

  // const handleInitialMouseClick = (e) => {
  //   setInitialMouseClick(true);
  // };
  // const handleFourSecondMouseChange = (e) => {
  //   setFourSecondMouseChange(true);
  // };
  // const handleSevenSecondMouseChange = (e) => {
  //   setSevenSecondMouseChange(true);
  // };
  // const handleEightSecondMouseChange = (e) => {
  //   setEightSecondMouseChange(true);
  // };
  //   className={isEnterMouse ? 'MouseEnterClass' : ''}
  //   onClick={() => handleInitialMouseClick(true)}
  //   ondrag={() => handleFourSecondMouseChange(true)}
  //   onFocus={() => handleSevenSecondMouseChange(true)}
  //   onDrop={() => handleEightSecondMouseChange(true)}
  // >

  const GameInstructions = () => {
    return (
      <div>
        <div>A bubble will appear when you start the game.</div>
        <div> Breath in! Hold the bubble for 4 seconds while inhaling</div>
        <div> Hold your Breath! Tap the bubble and Hold for 7 seconds</div>
        <div> Exhale! Tap the Bubble and Hold for 8 seconds.</div>
        <div> Get the timing correct and the bubble will pop!</div>
      </div>
    );
  };

  return (
    <div className="wof-component container" style={{ alignContent: 'center' }}>
      <h1 className="text-primary">
        Angry? Calm down with 4-7-8 breathing bubbles!!
      </h1>
      <div
        className="mood-game-box"
        style={{
          height: '50vh',
          width: '50vh',
          alignContent: 'center',
          'background-color': '#DEC37a',
        }}
      >
        Gamebox
      </div>
      <GameInstructions />
      <button> Start the Game </button>
    </div>
  );
};
export default MoodGame;
