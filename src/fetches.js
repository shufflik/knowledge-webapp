import axios from "axios";
import {getUserId} from "./telegram";
// import {apiUrl, telegramUsername} from "./testData";

const telegramUsername = getUserId()
const apiUrl = process.env.REACT_APP_API_URL;

const notesUrl = `${apiUrl}/notes`
const themesUrl = `${apiUrl}/themes`

export const deleteNotes = async (note) => {
    console.log(`Try to delete note: ${note.id}`)
    try {
        return await axios.delete(`${notesUrl}/${note.id}`, {
            params: {telegram_id: telegramUsername}
        })

        // TODO testing
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        // return {
        //     status: 200,
        //     data: {}
        // };
    } catch (error) {
        console.error('Error while deleting notes')
        return {
            status: 500
        }
    }
};

export const createNotes = async (newNote) => {
    console.log(`Try to create notes: ${JSON.stringify(newNote)} `)
    try {
        return await axios.post(`${notesUrl}`, {
            description: newNote.description,
            link: newNote.link,
            title: newNote.title,
            theme_id: newNote.theme_id,
            theme_name: newNote.theme_name,
            is_favorite: newNote.is_favorite
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {telegram_id: telegramUsername}
        })

        // TODO testing
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        // return {
        //     status: 200,
        //     data: {}
        // };
    } catch (error) {
        console.error('Error while creating notes')
        return {
            status: 500
        }
    }
};

export const updateNotes = async (note) => {
    console.log(`Try to update note: ${note.id}`)
    try {
        return await axios.patch(`${notesUrl}/${note.id}`, {
            description: note.description,
            link: note.link,
            title: note.title,
            theme_id: note.theme_id,
            theme_name: note.theme_name,
            is_favorite: note.is_favorite
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {telegram_id: telegramUsername}
        })

        // TODO testing
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        // return {
        //     status: 200,
        //     data: {}
        // };
    } catch (error) {
        console.error('Error while updating notes')
        return {
            status: 500
        }
    }
};


export const fetchNotesByTheme = async (theme_id) => {
    try {
        return await axios.get(`${notesUrl}`,
            {
                params: {telegram_id: telegramUsername, theme_id: theme_id}
            }
        );

        // TODO testing
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        // return {
        //     status: 200,
        //     data: {}
        // };
    } catch (error) {
        console.error('Error while updating notes')
        return {
            status: 500
        }
    }
};

export const fetchNotSavedNotes = async () => {
    try {
        return await axios.get(`${notesUrl}`,
            {
                params: {telegram_id: telegramUsername}
            }
        );

        // TODO testing
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        // return {
        //     status: 200,
        //     data: {}
        // };
    } catch (error) {
        console.error('Error while updating notes')
        return {
            status: 500
        }
    }
};

export const fetchThemes = async () => {
    try {
        return await axios.get(`${themesUrl}`,
            {
                params: {telegram_id: telegramUsername}
            }
        );

        // TODO testing
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        // return {
        //     status: 200,
        //     data: {}
        // };
    } catch (error) {
        console.error('Error fetching themes');
        return {
            status: 500
        }
    }
};

export const createTheme = async (theme_name) => {
    console.log(`Try to create theme: ${theme_name}`)
    try {
        return await axios.post(`${themesUrl}`, {
            theme_name: theme_name,
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {telegram_id: telegramUsername}
        })

        // TODO testing
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        // return {
        //     status: 200,
        //     data: {}
        // };
    } catch (error) {
        console.error('Error while creating themes');
        return {
            status: 500
        }
    }
};

export const updateTheme = async (theme) => {
    console.log(`Try to update theme: ${theme.id}`)
    try {
        return await axios.patch(`${themesUrl}/${theme.id}`, {
            name: theme.name
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {telegram_id: telegramUsername}
        })

        // // TODO testing
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        // return {
        //     status: 200,
        //     data: {}
        // };
    } catch (error) {
        console.error('Error while updating themes');
        return {
            status: 500
        }
    }
};

export const deleteTheme = async (theme) => {
    console.log(`Try to delete theme: ${theme.id}`)
    try {
        return await axios.delete(`${themesUrl}/${theme.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {telegram_id: telegramUsername}
        })

        // TODO testing
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        // return {
        //     status: 200,
        //     data: {}
        // };
    } catch (error) {
        console.error('Error while deleting themes');
        return {
            status: 500
        }
    }
};