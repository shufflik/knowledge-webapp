import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteCard from './NoteCard';
// import { initTelegram } from '../telegram';

const notesTest = [
  {
    title: 'Card title 1',
    content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    link: { href: '#', text: 'Card link' }
  },
  {
    title: 'Card title 2',
    content: 'Some more example text for the second card.',
    link: { href: '#', text: 'Card link' }
  },
  {
    title: 'Card title 3',
    content: 'Some more example text for the second card.',
    link: { href: '#', text: 'Card link' }
  },
      {
    title: 'Card title 4',
    content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    link: { href: '#', text: 'Card link' }
  },
  {
    title: 'Card title 5',
    content: 'Some more example text for the second card.',
    link: { href: '#', text: 'Card link' }
  },
  {
    title: 'Card title 6',
    content: 'Some more example text for the second card.',
    link: { href: '#', text: 'Card link' }
  }
];

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // const fetchNotes = async () => {
    //   try {
    //     const response = await axios.get('https://your-backend-url.com/notes');
    //     setNotes(response.data);
    //   } catch (error) {
    //     console.error('Error fetching notes:', error);
    //   }
    // };
    //
    // fetchNotes();
    setNotes(notesTest)
  }, []);

  return (
      <div className="container mt-5">
        <h1>Notes</h1>
        <div className="row">
          {notes.map((note, index) => (
              <div key={index} className="col-md-4 mb-3 d-flex align-items-stretch">
                <NoteCard note={note}/>
              </div>
          ))}
        </div>
      </div>
  );
};

export default Notes;