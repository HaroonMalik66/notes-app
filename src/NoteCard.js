import React, { useState } from 'react';
import useFormState from './hooks/useFormState';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Divider, IconButton, TextField } from '@mui/material';
import { Delete, Edit, Save } from '@mui/icons-material';



function NoteCard(props) {
    const colors = [
        "#6FEDD6", "#88BEF5", "#FF9551",
        "#FF4A4A", "#FFF38C", "#F0E161",
        "#CFE8A9", "#FF87B2", "#FFE898",
        "#E2DCC8", "#FFC090", "#00A388",
        "#3CCF4E", "#809A6F", "#FFE59D"
    ]
    const [isEditing, setIsEditing] = useState(props.note.title === "" ? true : false);
    const [title, updateTitle] = useFormState(props.note.title);
    const [text, updateText] = useFormState(props.note.text);
    if (props.note.color === null) {
        let rand = Math.floor(Math.random() * colors.length);
        let randomColor = colors[rand];
        props.giveColor(props.note.id, randomColor);
    }




    return (
        <Box component="span"
            sx={{ display: 'inline-block', }}>
            <Card
                sx={{
                    width: 275,
                    height: 300,
                    overflowY: "scroll",
                    scrollbarWidth: "0px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: props.note.color,
                    button: {
                        opacity: 0,
                    },
                    "&:hover button": {
                        opacity: 1,
                    },
                    "::-webkit-scrollbar": {
                        width: "0",
                    },
                    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
                }}

                variant="outlined"
            >
                {isEditing
                    ? <>
                        <CardContent>
                            <TextField
                                variant='filled'
                                sx={{ width: "100%", }}
                                value={title}
                                onChange={updateTitle}
                                label="Title"
                            />
                            <Divider style={{ marginTop: "0.6rem", marginBottom: "0.3rem" }} />
                            <TextField
                                multiline
                                sx={{ width: "100%" }}
                                rows={5}
                                value={text}
                                onChange={updateText}
                                label="Note"
                            />
                        </CardContent>
                        <CardActions >
                            <IconButton onClick={() => {
                                props.updateNote(props.note.id, title, text)

                                setIsEditing(!isEditing);
                            }}>
                                <Save />
                            </IconButton>
                            <IconButton onClick={() => { props.removeNote(props.note.id) }} >
                                <Delete />
                            </IconButton>
                        </CardActions>
                    </>
                    : <>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {props.note.title}
                            </Typography>
                            <Divider style={{ marginTop: "0.6rem", marginBottom: "0.5rem" }} />
                            <Typography variant="body3" >
                                {props.note.text}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ position: "sticky" }}>
                            <IconButton onClick={() => { setIsEditing(!isEditing) }}>
                                <Edit />
                            </IconButton>
                            <IconButton onClick={() => { props.removeNote(props.note.id) }} >
                                <Delete />
                            </IconButton>
                        </CardActions>
                    </>
                }

            </Card>
        </Box>
    );
}
export default NoteCard;