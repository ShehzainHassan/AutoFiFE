import { useState } from "react";
import { ButtonPrimary } from "@/app/components";
import classes from "../contact-info-form.module.css";
import { useContactFormContext } from "../../../../contexts/contact-form-context/contact-form-context";

const AddComment = () => {
  const { values, setValues } = useContactFormContext();
  const [showComment, setShowComment] = useState(!!values.commentText);

  const handleCancelComment = () => {
    setShowComment(false);
    setValues((prev) => ({ ...prev, commentText: "" }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, commentText: e.target.value }));
  };

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
            value={values.commentText}
            onChange={handleChange}
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
