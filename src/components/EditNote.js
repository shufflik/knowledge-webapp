import React, { useState } from 'react';
import axios from 'axios';
import { sendDataToBot } from '../telegram';

const EditNote = () => {
  const [noteId, setNoteId] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const handleEditNote = async () => {
    try {
      const response = await axios.put(`https://your-backend-url.com/notes/${noteId}`, { content: noteContent });
      sendDataToBot(`Note updated: ${response.data.id}`);
    } catch (error) {
      console.error('Error editing note:', error);
    }
  };

  return (
    <div>
      <h1>Edit Note</h1>
      <input
        type="text"
        placeholder="Note ID"
        value={noteId}
        onChange={(e) => setNoteId(e.target.value)}
      />
      <textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      />
      <button onClick={handleEditNote}>Edit Note</button>
    </div>
  );
};

export default EditNote;