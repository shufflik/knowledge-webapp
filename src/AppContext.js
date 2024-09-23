import React, {createContext, useState} from "react";
// import {themeList} from "./testData";
import {fetchNotSavedNotes, fetchThemes} from "./fetches";

export const AppContext = createContext({
    currentTheme: '',
    isAvailableThemesFetched: Boolean,
    isFailedFetching: Boolean,
    availableThemes: [],
    notesForTheme: [],
    selectedNote: {},
    setIsFailedFetching: () => {},
    notSavedNotesFetched: () => {},
    notSavedNotes: () => {},
    setCurrentTheme: () => {},
    setAvailableThemes: () => {},
    fetchAvailableThemes: (is_force) => {},
    fetchNotSavedNotes: (is_force) => {},
    getThemeById: '',
    setNotesForTheme: () => {},
    setSelectedNote: () => {},
    setNotSavedNotesFetched: () => {},
    setNotSavedNotes: () => {}
});

export const AppProvider = ({children}) => {
    const [currentTheme, setCurrentTheme] = useState('');
    const [selectedNote, setSelectedNote] = useState({
        description: '',
        id: '',
        link: '',
        title: '',
        theme_id: '',
        is_favorite: false
    });
    const [isAvailableThemesFetched, setIsAvailableThemesFetched] = useState(false);
    const [availableThemes, setAvailableThemes] = useState([]);
    const [notesForTheme, setNotesForTheme] = useState([]);
    const [notSavedNotesFetched, setNotSavedNotesFetched] = useState(false);
    const [notSavedNotes, setNotSavedNotes] = useState([]);
    const [isFailedFetching, setIsFailedFetching] = useState(false);

    const handleFetchThemes = async (is_force = false) => {
        if (is_force) {
            setIsAvailableThemesFetched(false)
        }
        if (!isAvailableThemesFetched || is_force) {
            setIsFailedFetching(false)
            setCurrentTheme('')
            const response = await fetchThemes()
            if (response && response.status === 200) {
                // TODO testing
                // setAvailableThemes(themeList)
                setAvailableThemes(response.data.themes)
            } else {
                setIsFailedFetching(true)
            }
            setIsAvailableThemesFetched(true)
        }
    };

    const handleFetchNotSavedNotes = async (is_force = false) => {
        if (is_force) {
            setNotSavedNotesFetched(false)
        }
        if (!notSavedNotesFetched || is_force) {
            console.info('Fetching not saved notes..');
            setIsFailedFetching(false)
            const response = await fetchNotSavedNotes()
            if (response.status === 200) {
                // //TODO testing
                // setNotSavedNotes(notSavedNotesTest);
                setNotSavedNotes(response.data.notes)
            } else {
                setIsFailedFetching(true)
            }
            setNotSavedNotesFetched(true);
            return response.status
        }
    };

    return (
        <AppContext.Provider value={{
            currentTheme, setCurrentTheme, availableThemes, setAvailableThemes, isAvailableThemesFetched,
            isFailedFetching, setIsFailedFetching, notesForTheme, setNotesForTheme, selectedNote, setSelectedNote,
            fetchAvailableThemes: handleFetchThemes, fetchNotSavedNotes: handleFetchNotSavedNotes,
            notSavedNotesFetched, setNotSavedNotesFetched, notSavedNotes, setNotSavedNotes
        }}>
            {children}
        </AppContext.Provider>
    );
};