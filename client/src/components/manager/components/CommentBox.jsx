import { TextField, Typography } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import "../../../assets/styles/popup.css";

function CommentBox() {
  const storedComments = localStorage.getItem("localComments");
  const initialComments = storedComments ? JSON.parse(storedComments) : [];

  const [comments, setComments] = useState([initialComments]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  // Store comments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("localComments", JSON.stringify(comments));
  }, [comments]);

  // Function to handle the submission of a new comment
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };
  const handleDelete = (indexToDelete) => {
    const updatedComments = comments.filter(
      (_, index) => index !== indexToDelete
    );
    setComments(updatedComments);
  };

  return (
    <div>
      <Typography>Comment</Typography>
      <form style={{ paddingBlock: "10px" }} onSubmit={handleSubmit}>
        {comments.map((comment, index) => (
          <div className="message-wrap">
            <div className="message-blue" key={index}>
              <p>{comment}</p>
              <DeleteIcon onClick={() => handleDelete(index)} />
            </div>
          </div>
        ))}
        <TextField
          autoComplete="false"
          style={{ width: " 100%" }}
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          id="outlined-basic"
          placeholder="Add a comment..."
          variant="outlined"
        />
      </form>
    </div>
  );
}

export default CommentBox;
