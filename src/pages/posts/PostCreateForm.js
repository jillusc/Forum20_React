import React, { useRef, useState } from "react";
import { useHistory, Link } from "react-router-dom";

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
import styles from "../../styles/PostCreateEditForm.module.css"
import feedbackStyles from "../../styles/CustomFeedback.module.css"

import Asset from "../../components/Asset";
import Upload from "../../assets/upload-icon.png";
import { axiosReq } from "../../API/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import { SuccessMessage, ErrorMessage } from "../../components/CustomFeedback";

function PostCreateForm() {
    useRedirect("loggedOut");
    const [successMessage, setSuccessMessage] = useState("");
    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: "",
    });

    const { title, content, image } = postData;
    const imageInput = useRef(null);
    const history = useHistory();

    const handleChange = (event) => {
        setPostData({ ...postData,
            [event.target.name]: event.target.value });
    };

    const handleChangeImage = (event) => {
        if (event.target.files[0]) {
            URL.revokeObjectURL(image);
            setPostData({ ...postData,
                image: URL.createObjectURL(event.target.files[0])
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!imageInput.current.files[0]) {
            setErrors({
                ...errors,
                image: ["Please upload an image."]
            });
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", imageInput.current.files[0]);

        try {
            const { data } = await axiosReq.post("/posts/", formData);
            setSuccessMessage("Post created.");
            setTimeout(() => {
                history.push(`/posts/${data.id}`);
            }, 2000);
        } catch (err) {
            /* console.log(err); */
            if (err.response?.status !== 401) {
                const errorMessage = err.response?.data?.message || "An error occurred.";
                setErrors({ ...errors, message: errorMessage });
            }
        }
    };

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={title} onChange={handleChange} />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={6} name="content" value={content} onChange={handleChange} />
            </Form.Group>
            {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Button className={`${btnStyles.Button}`} type="submit">
                Create
            </Button>
            <Button className={`${btnStyles.Button}`} onClick={() => history.goBack()}>
                Cancel
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container className={`${appStyles.Content} d-flex flex-column justify-content-center`}>
                        <Form.Group className="text-center">
                            {image ? (
                                <>
                                    <figure>
                                        <Image className={`${appStyles.Image} img-fluid`} src={image} rounded />
                                    </figure>
                                    <div>
                                        <Link className={styles.TextLink} htmlFor="image-upload">Change the image</Link>
                                    </div>
                                </>
                            ) : (
                                <Form.Label className={`d-flex justify-content-center ${formStyles.uploadIcon}`} htmlFor="image-upload">
                                    <Asset src={Upload} message="Upload an image" />
                                </Form.Label>
                            )}
                            <Form.File id="image-upload" accept="image/*" onChange={handleChangeImage} ref={imageInput} />
                            {errors?.image?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
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
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default PostCreateForm;