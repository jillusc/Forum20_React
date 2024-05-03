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
        artist_name: "",
        year_of_artwork: "",
        is_private: false,
    });

    const { title, content, image, artist_name, year_of_artwork, is_private } = postData;
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/${id}/`);
                setPostData({
                    title: data.title,
                    content: data.content,
                    image: data.image,
                    year_of_artwork: data.year_of_artwork || "",
                    artist_name: data.artist_name || "",
                    is_private: data.is_private,
                });
            } catch (err) {
                setErrorMessage("Failed to fetch post details. Please try again later.");
            }
        };

        handleMount();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "year_of_artwork") {
            const regex = /^[0-9]{0,2}$/;
            if (regex.test(value)) {
                setPostData(prevData => ({
                    ...prevData,
                    [name]: value
                }));
            }
        } else {
            setPostData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
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
        if (year_of_artwork && year_of_artwork.length === 1) {
            setErrors(prevErrors => ({
                ...prevErrors,
                year_of_artwork: ["Year should consist of two digits."]
            }));
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("artist_name", artist_name);
        if (postData.year_of_artwork && postData.year_of_artwork.length === 2) {
            formData.append("year_of_artwork", `19${postData.year_of_artwork}`);
        }        formData.append("is_private", is_private ? "true" : "false");
        
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
                            <Form.Control as="textarea" rows={4} name="content" value={content} onChange={handleChange} />
                            {errors?.content?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>{message}</Alert>
                            ))}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Artist</Form.Label>
                            <Form.Control type="text" name="artist_name" value={artist_name} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Form.Label style={{ marginRight: '5px', marginBottom: '0' }}>Year 19</Form.Label>
                            <Form.Control
                                type="number"
                                name="year_of_artwork"
                                value={year_of_artwork}
                                onChange={handleChange}
                                maxLength="2"
                                style={{ width: '60px' }}
                            />
                        </Form.Group>
                        {errors?.year_of_artwork?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="d-flex justify-content-center">
                        <Button className={`${btnStyles.Button} mr-1`} type="submit">
                            Save
                        </Button>
                        <Button className={`${btnStyles.Button} ml-1`} onClick={() => history.goBack()}>
                            Cancel
                        </Button>
                        </div>
                        <Form.Group>
                            <Form.Check
                                type="checkbox"
                                className={`${formStyles.customCheckbox}`}
                                label="Make this post visible only to followers"
                                checked={is_private}
                                onChange={(e) => setPostData({ ...postData, is_private: e.target.checked })}
                                />
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
                    </Container>
                </Col>
            </Row>
        </Form >
    );
}

export default PostEditForm;