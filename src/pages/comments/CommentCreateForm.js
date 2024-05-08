import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";

import feedbackStyles from "../../styles/CustomFeedback.module.css"

import Avatar from "../../components/Avatar";
import { axiosRes } from "../../API/axiosDefaults";

import formStyles from "../../styles/FormStyles.module.css";
import btnStyles from "../../styles/Button.module.css";

import { SuccessMessage, ErrorMessage } from "../../components/CustomFeedback";

function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setContent(event.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content, post,
      });
      setSuccessMessage("Comment added.");
      setContent("");
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setTimeout(() => {
        setSuccessMessage("");
        history.push(`/posts/${data.id}`);
      }, 2000);
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        setErrorMessage("Comment submission failed. Please check and try again.");
      }
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`} aria-label="View profile">
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={formStyles.Form}
            placeholder="Share your thoughts"
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={3}
            aria-label="Write your comment here"
          />
          {errors?.content?.map((message, idx) => (
            <Alert key={idx} variant="warning">{message}</Alert>
          ))}
        </InputGroup>
      </Form.Group>
      {successMessage && (
        <div className={feedbackStyles.fixedMessage}>
          <SuccessMessage message={successMessage} />
        </div>
      )}
      {errorMessage && (
        <div className={feedbackStyles.fixedMessage}>
          <ErrorMessage message={errorMessage} />
        </div>
      )}
      <button
        className={`${btnStyles.Button} d-block m-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        Post
      </button>
    </Form>
  );
}

export default CommentCreateForm;
