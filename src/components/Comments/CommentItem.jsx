import React from "react";
import styles from "./CommentItem.module.scss";

const CommentItem = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.comment__header}>
        <h4 className={styles.comment__title}>{comment.name}</h4>
        <span className={styles.comment__link}>К посту {comment.postId}-name</span>
      </div>
      <h5 className={styles.comment__subtitle}>комментирует:</h5>
      <p className={styles.comment__content}>{comment.body} </p>
      <p className={styles.comment__email}>{comment.email}</p>
    </div>
  );
};

export default CommentItem;
