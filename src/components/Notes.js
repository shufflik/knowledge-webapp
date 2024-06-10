import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { initTelegram } from '../telegram';

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    initTelegram();
    const fetchNotes = async () => {
      try {
        const response = await axios.get('https://your-backend-url.com/notes');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;