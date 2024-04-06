import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import styles from "../../styles/Post.module.css";
import feedbackStyles from "../../styles/CustomFeedback.module.css"

import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../API/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { SuccessMessage, ErrorMessage } from "../../components/CustomFeedback";

const Post = (props) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { id, owner, profile_id, profile_image, comments_count, likes_count,
        like_id, title, content, image, updated_at, postPage, setPosts,
    } = props;
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/posts/${id}/edit`);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
            try {
                await axiosRes.delete(`/posts/${id}/`);
                setSuccessMessage("Post successfully deleted.");
                setTimeout(() => {
                    setSuccessMessage("");
                    window.location.reload();
                }, 2000);
            } catch (err) {
                /* console.log(err); */
            }
        }
    };

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/likes/", { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? {
                            ...post, likes_count: post.likes_count + 1,
                            like_id: data.id
                        }
                        : post;
                }),
            }));
        } catch (err) {
            /* console.log(err); */
        }
    };
    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? {
                            ...post, likes_count: post.likes_count - 1,
                            like_id: null
                        }
                        : post;
                }),
            }));
        } catch (err) {
            /* console.log(err); */
        }
    };

    return (
        <Card className={styles.Post}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={55} />
                        <p className={styles.Username}>{owner}</p>
                    </Link>
                    <div className="d-flex align-items-center">
                        <span><p>{updated_at}</p></span>
                        {is_owner && postPage && (
                            <div className={styles.DropdownContainer}>
                                <MoreDropdown handleEdit={handleEdit}
                                    handleDelete={handleDelete} />
                            </div>
                        )}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/posts/${id}`}>
                <Card.Img src={image} alt={title} className={styles.PostImage} />
            </Link>
            <Card.Body>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {content && <Card.Text>{content}</Card.Text>}
                <div className={styles.IconsBar}>
                    {is_owner ? (
                        <OverlayTrigger placement="top" overlay={<Tooltip>
                            Users can't like their own posts</Tooltip>}>
                            <i className={`fa-solid fa-heart ${styles.Heart}`} />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleUnlike}>
                            <i className={`fa-solid fa-heart ${styles.Heart}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <i className={`fa-solid fa-heart ${styles.Heart}`} />
                        </span>
                    ) : (
                        <OverlayTrigger placement="top" overlay={<Tooltip>
                            You must be logged-in to like posts</Tooltip>}>
                            <i className={`fa-solid fa-heart ${styles.Heart}`} />
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <Link to={`/posts/${id}`}>
                        <i className={`fa-solid fa-comment-dots ${styles.Comment}`} />
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
            {successMessage && (
                <div className={feedbackStyles.fixedMessage}>
                    <SuccessMessage message={successMessage} />
                </div>
            )}
        </Card>
    );
};

export default Post;
