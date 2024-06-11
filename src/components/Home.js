import React from 'react';
import tg, {openBackButton, openMainButton, openSettingsButton} from "../telegram.js";

const Home = () => {
  return (
      <div>
          <h1>Home</h1>
          <h1>Build: 1.2.1 </h1>
          <span>User: {tg.initDataUnsafe?.user?.username}</span>
          <p>Welcome to the note-taking app!</p>
          <button onClick={openMainButton}>Main button</button>
          <button onClick={openSettingsButton}>Settings button</button>
          <button onClick={openBackButton}>Back button</button>
      </div>
  );
};

export default Home;