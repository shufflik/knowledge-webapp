import React, {useEffect, useState} from 'react';
import tg from "../telegram";
// import axios from 'axios';
// import { sendDataToBot } from '../telegram';

const AddNote = () => {
    // const [note, setNote] = useState('Enter your note here...');
    const [user, setUser] = useState(null);
    //
    // const handleAddNote = async () => {
    //   try {
    //     const response = await axios.post('https://your-backend-url.com/notes', { note });
    //     sendDataToBot(`New note added: ${response.data.id}`);
    //   } catch (error) {
    //     console.error('Error adding note:', error);
    //   }
    // };
    useEffect(() => {
        const userData = tg.initData
        setUser(userData);
    }, []);


    const listOfNames = [
        "San Francisco",
        "New York",
        "Seattle",
        "Los Angeles",
        "Chicago"
    ];

    return (
        <div className="d-flex justify-content-center">
            <p>User data: {user}</p>
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