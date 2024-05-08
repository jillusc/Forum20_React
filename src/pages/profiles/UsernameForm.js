import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import feedbackStyles from "../../styles/CustomFeedback.module.css"

import { axiosRes } from "../../API/axiosDefaults";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { SuccessMessage, ErrorMessage } from "../../components/CustomFeedback";

const UsernameForm = () => {
    const [username, setUsername] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const { id } = useParams();
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    useEffect(() => {
        if (currentUser?.profile_id?.toString() === id) {
            setUsername(currentUser.username);
        } else {
            history.push("/");
        }
    }, [currentUser, history, id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put("/dj-rest-auth/user/", { username });
            setCurrentUser((prevUser) => ({
                ...prevUser,
                username,
            }));
            setSuccessMessage("Username changed successfully.");
            setTimeout(() => {
                setSuccessMessage("");
                history.goBack();
            }, 2000);
        } catch (err) {
            if (err.response?.data) {
                setErrors(err.response.data);
            } else {
                setErrorMessage("Username change failed. Please try again later.");
            }
        }
    };

    return (
        <Row>
            <Col className="py-2 mx-auto text-center" md={6}>
                <Container className={appStyles.Content}>
                    <Form onSubmit={handleSubmit} className="my-2">
                        <Form.Group>
                            <Form.Label htmlFor="username-input">Change username</Form.Label>
                            <Form.Control
                                id="username-input"
                                type="text"
                                name="username"
                                placeholder="Enter new username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Group>
                        {errors?.username?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
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
                        <Button className={`${btnStyles.Button}`} type="submit">
                            Save
                        </Button>
                        <Button className={`${btnStyles.Button}`} onClick={() => history.goBack()} >
                            Cancel
                        </Button>
                    </Form>
                </Container>
            </Col>
        </Row>
    );
};

export default UsernameForm;
