import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import formStyles from "../../styles/FormStyles.module.css"
import btnStyles from "../../styles/Button.module.css";
import feedbackStyles from "../../styles/CustomFeedback.module.css"

import { axiosRes } from "../../API/axiosDefaults";
import { SuccessMessage, ErrorMessage } from "../../components/CustomFeedback";

function CommentEditForm(props) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const { id, content, setShowEditForm, setComments } = props;
  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) =>
          comment.id === id ? {
            ...comment, content: formContent.trim(),
            updated_at: "now"
          } : comment),
      }));
      setSuccessMessage("Comment saved.");
      setTimeout(() => {
        setShowEditForm(false);
        setSuccessMessage("");
      }, 2000);
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        setErrorMessage("Comment edit failed. Please check and try again.");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={formStyles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={3}
          aria-label="Edit your comment"
        />
        {errors?.content?.map((message, idx) => (
          <Alert key={idx} variant="warning">{message}</Alert>
        ))}
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
      <div className="text-right">
        <button
          className={btnStyles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          Save
        </button>
        <button
          className={btnStyles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;
