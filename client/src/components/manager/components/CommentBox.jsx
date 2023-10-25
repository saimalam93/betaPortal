import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Grid } from '@material-ui/core';


function CommentBox() {

    const storedComments = localStorage.getItem('localComments');
    const initialComments = storedComments ? JSON.parse(storedComments) : [];

    const [comments, setComments] = useState([initialComments]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (storedComments) {
            setComments(JSON.parse(storedComments));
        }
    }, []
    );

    // Store comments to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('localComments', JSON.stringify(comments));
    }, [comments]);


    // Function to handle the submission of a new comment
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() !== '') {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    return (
        <div>
            <Typography >Comment</Typography>
            <form onSubmit={handleSubmit}>
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}><p>{comment}</p></li>
                    ))}
                </ul>
                <TextField type="text" value={newComment} onChange={e => setNewComment(e.target.value)}
                    id="outlined-basic" placeholder="Add a comment..."
                    label="Outlined" variant="outlined" />
                <button type="submit">Post</button>
            </form>

            {/* List of comments */}

        </div>
    );
}

export default CommentBox;
