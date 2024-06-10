import React, { useState } from 'react';
import axios from 'axios';
import tg, { initTelegram, sendDataToBot } from '../telegram';

const AddNote = () => {
  const [note, setNote] = useState('');

  const handleAddNote = async () => {
    try {
      const response = await axios.post('https://your-backend-url.com/notes', { note });
      sendDataToBot(`New note added: ${response.data.id}`);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div>
      <h1>Add Note</h1>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} />
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
};

export default AddNote;