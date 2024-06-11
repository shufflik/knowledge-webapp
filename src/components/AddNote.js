import React, { useState } from 'react';
import axios from 'axios';
import { sendDataToBot } from '../telegram';

const AddNote = () => {
  const [note, setNote] = useState('Enter your note here...');

  const handleAddNote = async () => {
    try {
      const response = await axios.post('https://your-backend-url.com/notes', { note });
      sendDataToBot(`New note added: ${response.data.id}`);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };


  const listOfNames = [
    "San Francisco",
    "New York",
    "Seattle",
    "Los Angeles",
    "Chicago"
  ];

  const handleSuggestionClick = (suggestion) => {
    setNote(suggestion);
  };

    return (
        // <div>
        //     <h1>Add Note</h1>
        //     <textarea value={note} onChange={(e) => setNote(e.target.value)}/>
        //     <button onClick={handleAddNote}>Add Note</button>
        // </div>
        // <div className="container mt-5">
        //     <h1>Add Note</h1>
        //     <div className="mb-3">
        //         <input type="text" className="form-control" value={note}
        //                onChange={(e) => setNote(e.target.value)}
        //         />
        //     </div>
        //     <div className="mb-3">
        //         {suggestions.map((suggestion, index) => (
        //             <button key={index} className="btn btn-secondary mr-2"
        //                     onClick={() => handleSuggestionClick(suggestion)}>
        //                 {suggestion}
        //             </button>
        //         ))}
        //     </div>
        <div className="d-flex justify-content-center">
            <div className="mb-3" style={{maxWidth: '400px', width: '100%'}}>
                <label htmlFor="exampleDataList" className="form-label">Datalist example</label>
                <input className="form-control" list="datalistOptions" id="exampleDataList"
                       placeholder="Type to search..."/>
                <datalist id="datalistOptions">
                    {listOfNames.map((option, index) => (
                        <option key={index} value={option}/>
                    ))}
                </datalist>
            </div>
        </div>
    );
};

export default AddNote;