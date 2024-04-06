import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import formStyles from "../../styles/FormStyles.module.css"
import btnStyles from "../../styles/Button.module.css";
import feedbackStyles from "../../styles/CustomFeedback.module.css"

import { axiosRes } from "../../API/axiosDefaults";
import { SuccessMessage, ErrorMessage } from "../../components/CustomFeedback";

function CommentEditForm(props) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const { id, content, setShowEditForm, setComments } = props;
  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) =>
          comment.id === id ? { ...comment, content: formContent.trim(), updated_at: "now" } : comment
        ),
      }));
      setSuccessMessage("Comment edited successfully.");
      setTimeout(() => {
        setShowEditForm(false);
      }, 2000);
    } catch (err) {
      /* console.log(err); */
      if (err.response?.status !== 401) {
        const errorMessage = err.response?.data?.message || "An error occurred.";
        setErrors({ ...errors, ...err.response?.data });
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
          rows={2}
        />
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
      <div className="text-right">
        <button
          className={btnStyles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          save
        </button>
        <button
          className={btnStyles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;