import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

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
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      setSuccessMessage("Comment added.");
      setTimeout(() => {
        history.push(`/posts/${data.id}`);
      }, 2000);
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
      setContent("");
    } catch (err) {
      /* console.log(err); */
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={formStyles.Form}
            placeholder="Share your thoughts"
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      {successMessage && (
        <div className={feedbackStyles.fixedMessage}>
          <SuccessMessage message={successMessage} />
        </div>
      )}
      {Object.keys(errors).map((key) =>
        errors[key].map((message, idx) => (
          <div key={`${key}-${idx}`} className={feedbackStyles.fixedMessage}>
            <ErrorMessage message={message} />
          </div>
        ))
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
