import React from 'react';
import tg from "../telegram.js";

const Home = () => {
  return (
      <div>
          <h1>Home</h1>
          <h1>Build: 1.2.1 </h1>
          <span>User: {tg.initDataUnsafe?.user?.username}</span>
          <p>Welcome to the note-taking app!</p>
      </div>
  );
};

export default Home;