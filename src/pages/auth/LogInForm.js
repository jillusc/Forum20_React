import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";

import styles from "../../styles/LogInSignUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

function LogInForm() {
    const setCurrentUser = useSetCurrentUser();
    useRedirect("loggedIn");
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    const { username, password } = loginData;
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({});
        try {
            const { data } = await axios.post('/dj-rest-auth/login/', loginData);
            setCurrentUser(data.user);
            setTokenTimestamp(data);
            history.goBack();
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Container className="mt-5">
            <Row className={`${styles.Row} justify-content-center`}>
                <Col xs={12} md={6} lg={4}>
                    <div className={`${appStyles.Content} p-4`}>
                        <h1 className={styles.Header}><strong>Log in</strong></h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="username" aria-labelledby="username-label">
                                <Form.Label className="d-none">Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={username}
                                    placeholder="Username"
                                    onChange={handleChange}
                                    aria-label="Username"
                                    className={styles.Input}
                                />
                            </Form.Group>
                            {errors.username?.map((message, idx) => (
                                <Alert key={idx} variant="warning">{message}</Alert>
                            ))}

                            <Form.Group controlId="password" aria-labelledby="password-label">
                                <Form.Label className="d-none">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={handleChange}
                                    aria-label="Password"
                                    className={styles.Input}
                                />
                            </Form.Group>
                            {errors.password?.map((message, idx) => (
                                <Alert key={idx} variant="warning">
                                    {message}
                                </Alert>
                            ))}

                            <div className="d-flex justify-content-center">
                                <Button
                                    className={`${btnStyles.Button}`}
                                    type="submit">Log in</Button>
                            </div>
                            {errors.non_field_errors?.map((message, idx) => (
                                <Alert key={idx} variant="warning" className="mt-3">
                                    {message}
                                </Alert>
                            ))}
                        </Form>
                    </div>
                    <div className={`mt-3 ${appStyles.Content}`}>
                        <strong>Don't have an account? </strong><Link className={styles.TextLink} to="/signup">Sign up</Link>
                    </div>
                </Col>
            </Row>
        </Container >
    );
};

export default LogInForm;
