import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/FormStyles.module.css";
import feedbackStyles from "../../styles/CustomFeedback.module.css"

import { axiosReq } from "../../API/axiosDefaults";
import { SuccessMessage, ErrorMessage } from "../../components/CustomFeedback";

function PostEditForm() {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: "",
    });

    const { title, content, image } = postData;
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/${id}/`);
                setPostData({ title: data.title, content: data.content, image: data.image });
            } catch (err) {
                setErrorMessage("Failed to fetch post details. Please try again later.");
            }
        };

        handleMount();
    }, [id]);

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title.trim()) {
            setErrors(prevErrors => ({
                ...prevErrors,
                title: ["Please give your post a title."]
            }));
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        try {
            await axiosReq.put(`/posts/${id}/`, formData);
            setSuccessMessage("Post saved.");
            setTimeout(() => {
                history.push(`/posts/${id}`);
            }, 2000);
        } catch (err) {
            if (err.response?.data) {
                setErrors(err.response.data);
            } else {
                setErrorMessage("Post edit failed. Please check and try again.");
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="justify-content-center">
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container className={`${appStyles.Content} ${formStyles.Container} d-flex flex-column justify-content-center`}>
                    {image && (
                            <div className="text-center mb-3">
                                <Image src={image} alt="Post" className={`${appStyles.Image} img-fluid`} rounded />
                            </div>
                        )}
                        <Form.Group className="text-center">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={title} onChange={handleChange} />
                            {errors?.title?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>{message}</Alert>
                            ))}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={6} name="content" value={content} onChange={handleChange} />
                            {errors?.content?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>{message}</Alert>
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
                        <div className="d-flex justify-content-center">
                        <Button className={`${btnStyles.Button} mr-1`} type="submit">
                            Save
                        </Button>
                        <Button className={`${btnStyles.Button} ml-1`} onClick={() => history.goBack()}>
                            Cancel
                        </Button>
                        </div>
                    </Container>
                </Col>
            </Row>
        </Form >
    );
}

export default PostEditForm;