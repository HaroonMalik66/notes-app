import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NoteCard from './NoteCard';
import { Card, Grid, IconButton, Paper } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Add } from '@mui/icons-material';
import useLocalStorageState from './hooks/useLocalStorageState';


function Notesapp() {
    var initialNotes = [
        { id: uuidv4(), title: "Complete workout", text: "10 pushups, 10 chinups, dumbells and 1 km running.", color: null, },
        { id: uuidv4(), title: "Home Work", text: "Complete home work for math, science and english.", color: null }
    ];
    const [notes, setNotes] = useLocalStorageState("notes", initialNotes);

    // functions
    const giveColor = (noteId, newColor) => {
        const updatedNotes = notes.map(note =>
            note.id === noteId ? { ...note, color: newColor } : note
        )
        setNotes(updatedNotes);
    }
    const removeNote = (noteId) => {
        const updatedNotes = notes.filter(note => note.id !== noteId);
        setNotes(updatedNotes);

    }
    const updateNote = (noteId, noteTitle, noteText) => {
        const updatedNotes = notes.map(note =>
            note.id === noteId ? { ...note, title: noteTitle, text: noteText } : note
        )
        setNotes(updatedNotes);
    }

    return (
        <div style={{ minWidth: "100vw", }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" >
                        My Notes
                    </Typography>
                </Toolbar>
            </AppBar>
            <Paper
                style={{
                    margin: "2.5rem",
                    paddingLeft: "2.7rem",
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                }}>

                <Grid container spacing={3} >
                    {notes.map((note) => {

                        return (
                            <Grid item >
                                <NoteCard
                                    note={note}
                                    key={note.id}
                                    giveColor={giveColor}
                                    removeNote={removeNote}
                                    updateNote={updateNote}
                                />
                            </Grid>
                        )
                    })}
                    <Grid item>

                        <IconButton onClick={() => {
                            setNotes([...notes, { id: uuidv4(), title: "", text: "", color: null }])
                        }}>
                            <Card
                                sx={{
                                    width: "275px",
                                    height: "298px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: "1px dashed",
                                    marginTop: "-6px"
                                }}
                            >
                                <Add />
                            </Card>
                        </IconButton>

                    </Grid>
                </Grid>
            </Paper>
        </div >
    )
}
export default Notesapp;