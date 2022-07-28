import axios from "axios";
import React, { useEffect, useState } from "react";
import FilterField from "../FilterField/FilterField";
import CommentItem from "./CommentItem";
import styles from "./Comments.module.scss";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(1);
  const [searchEmail, setSearchEmail] = useState("");

  const handleChange = (e) => {
    setSearchEmail(e.target.value);
  };

  useEffect(() => {
    setFetching(true);
    setTotalCount(1);
    setComments([]);
    setCurrentPage(1);
  }, [searchEmail]);

  const requestString = () => {
    if (searchEmail) {
      return `https://jsonplaceholder.typicode.com/comments?email_like=${searchEmail}&_limit=10&_page=${currentPage}`;
    }
    return `https://jsonplaceholder.typicode.com/comments?_limit=10&_page=${currentPage}`;
  };

  useEffect(() => {
    if (fetching) {
      axios
        .get(requestString())
        .then((res) => {
          setTotalCount(res.headers["x-total-count"]);
          setComments([...comments, ...res.data]);
          setCurrentPage((prevState) => prevState + 1);
          console.log(requestString());
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      comments.length < totalCount
    ) {
      setFetching(true);
    }
  };

  return (
    <div className={styles.comments}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Comments from JSON placeholder</h2>
        <FilterField handleChange={handleChange} value={searchEmail} />
        {comments.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
