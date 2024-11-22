import React, { useState } from "react";

const CommentSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    onAddComment(newComment);
    setNewComment("");
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleAddComment}>Post Comment</button>
    </div>
  );
};

export default CommentSection;
