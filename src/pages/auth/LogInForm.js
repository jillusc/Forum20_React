import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from '../../styles/LogInSignUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';
import { Form, Button, Col, Row, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

const LogInForm = () => {
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
        try {
            await axios.post('/dj-rest-auth/login/', loginData);
            history.push('/');
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={4}>
                    <div className={`${appStyles.Content} p-4`}>
                        <h1 className={styles.Header}><strong>Log in</strong></h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label className="d-none">Username</Form.Label>
                                <Form.Control
                                    className={styles.Input}
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    value={username}
                                    onChange={handleChange}
                                    aria-label="Username"
                                />
                            </Form.Group>
                            {errors.username && (
                                <Alert variant="warning">{errors.username}</Alert>
                            )}

                            <Form.Group controlId="password">
                                <Form.Label className="d-none">Password</Form.Label>
                                <Form.Control
                                    className={styles.Input}
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    aria-label="Password"
                                />
                            </Form.Group>
                            {errors.password && (
                                <Alert variant="warning">{errors.password}</Alert>
                            )}

                            <div className="d-flex justify-content-center">
                                <Button
                                    className={`${btnStyles.Button}`}
                                    type="submit">LOG IN</Button>
                            </div>
                            {errors.non_field_errors && (
                                <Alert variant="warning" className="mt-3">
                                    {errors.non_field_errors}
                                </Alert>
                            )}
                        </Form>
                    </div>
                    <div className={`mt-3 ${appStyles.Content}`}>
                        <strong>Don't have an account? </strong><Link className={styles.TextLink} to="/signup">Sign up</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default LogInForm;
