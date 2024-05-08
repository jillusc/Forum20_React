import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
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
    const imageInput = useRef(null);
    const history = useHistory();

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

    const handleChangeImage = (event) => {
        if (event.target.files[0]) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0])
            });
            setErrors(prevErrors => ({
                ...prevErrors,
                image: []
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!imageInput.current.files[0]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                image: ["Please upload an image."]
            }));
            return;
        }
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
        formData.append("image", imageInput.current.files[0]);
        formData.append("artist_name", postData.artist_name || '');
        if (postData.year_of_artwork && postData.year_of_artwork.length === 2) {
            formData.append("year_of_artwork", `19${postData.year_of_artwork}`);
        }
        formData.append("is_private", is_private);

        try {
            const { data } = await axiosReq.post("/posts/", formData);
            setSuccessMessage("Post created.");
            setTimeout(() => {
                history.push(`/posts/${data.id}`);
            }, 2000);
        } catch (err) {
            if (err.response?.data) {
                setErrors(err.response.data);
            } else {
                setErrorMessage("Post submission failed. Please check and try again.");
            }
        }
    };

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label htmlFor="post-title">Post title</Form.Label>
                <Form.Control
                    id="post-title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label htmlFor="post-content">Content</Form.Label>
                <Form.Control
                    id="post-content"
                    type="text"
                    name="content"
                    value={content}
                    as="textarea"
                    rows={6}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label htmlFor="artist-name">Artist</Form.Label>
                <Form.Control
                    id="artist-name"
                    type="text"
                    name="artist_name"
                    value={artist_name}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Form.Label htmlFor="year-of-artwork" style={{ marginRight: '5px', marginBottom: '0' }} >Year 19</Form.Label>
                <Form.Control
                    id="year-of-artwork "
                    type="number"
                    name="year_of_artwork"
                    value={year_of_artwork}
                    onChange={handleChange}
                    maxLength="2"
                    style={{ width: '60px' }}
                    aria-label="Enter the last two digits"
                />
            </Form.Group>
            {errors?.year_of_artwork?.map((message, idx) => (
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
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    className={`${formStyles.customCheckbox}`}
                    label="Make this post visible only to followers"
                    checked={is_private}
                    onChange={(e) => setPostData({ ...postData, is_private: e.target.checked })}
                />
            </Form.Group>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="d-flex flex-column flex-md-row">
                <Col className="py-2 p-0 p-md-2 d-flex flex-column" md={7} lg={8}>
                    <Container className={`${appStyles.Content} d-flex flex-column h-100`}>
                        <Form.Group className="text-center flex-grow-1">
                            {image ? (
                                <>
                                    <figure>
                                        <Image className={`${appStyles.Image} img-fluid`} src={image} rounded />
                                    </figure>
                                    <label
                                        htmlFor="image-upload"
                                        className={styles.TextLink}
                                        style={{ cursor: 'pointer', display: 'inline-block' }}
                                        aria-label="Change the post image"
                                    >
                                        Change image
                                    </label>
                                </>
                            ) : (
                                <label
                                    htmlFor="image-upload"
                                    className={`d-flex flex-column align-items-center ${styles.uploadContainer}`}
                                    style={{ cursor: 'pointer' }}
                                    aria-label="Upload an image for the post"
                                >
                                    <div className={`d-flex justify-content-center ${formStyles.uploadIcon}`}>
                                        <Asset src={Upload} />
                                    </div>
                                    <div className={`d-flex justify-content-center ${btnStyles.Button}`}>
                                        <span>Upload an image</span>
                                    </div>
                                </label>
                            )}
                            <Form.File id="image-upload" accept="image/*" onChange={handleChangeImage} ref={imageInput} style={{ display: 'none' }} />
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
                        {errorMessage && (
                            <div className={feedbackStyles.fixedMessage}>
                                <ErrorMessage message={errorMessage} />
                            </div>
                        )}
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2 d-flex flex-column h-100">
                    <Container className={`${appStyles.Content} h-100`}>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
}

export default PostCreateForm;
