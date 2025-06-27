import { useState } from "react";
import { CommentProps } from "../contact-info-form.types";
import ButtonPrimary from "../../buttons/button-primary/button-primary";
import classes from "../contact-info-form.module.css";
const AddComment = ({ commentText, setCommentText }: CommentProps) => {
  const [localCommentText, setLocalCommentText] = useState(commentText);
  const handleCancelComment = () => {
    setShowComment(false);
    setLocalCommentText("");
    setCommentText("");
  };
  const [showComment, setShowComment] = useState(false);

  return (
    <div>
      {!showComment ? (
        <ButtonPrimary
          imgSrc="/images/add.png"
          btnText="Add comments"
          className={classes.addComment}
          onClick={() => setShowComment(true)}
        />
      ) : (
        <div className={classes.commentBoxContainer}>
          <textarea
            className={classes.commentBox}
            placeholder="Enter comment"
            rows={10}
            cols={5}
            value={localCommentText}
            onChange={(e) => setLocalCommentText(e.target.value)}
          />
          <ButtonPrimary
            className={classes.cancelCommentBtn}
            btnText="Cancel"
            onClick={handleCancelComment}
          />
        </div>
      )}
    </div>
  );
};
export default AddComment;
