import { useState } from "react";
import ButtonPrimary from "../../buttons/button-primary/button-primary";
import classes from "../contact-info-form.module.css";
import { useContactFormContext } from "../../../../contexts/contact-form-context/contact-form-context";
const AddComment = () => {
  const { commentText, setCommentText } = useContactFormContext();
  const handleCancelComment = () => {
    setShowComment(false);
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
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
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
