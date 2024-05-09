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
    const [errors, setErrors] = useState({});
    const { id, owner, profile_id, profile_image, comments_count, likes_count,
        like_id, bookmark_id, title, content, image, updated_at, postPage, setPosts,
        artist_name, year_of_artwork,
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
                    history.push(`/profiles/${profile_id}`);
                }, 2000);
            } catch (err) {
                if (err.response?.data) {
                    setErrors(err.response.data);
                } else {
                    setErrorMessage("Post deletion failed. Please check and try again.");
                }
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
            setErrors(err.response.data);
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
            setErrors(err.response.data);
        }
    };

    const handleBookmark = async () => {
        try {
            const { data } = await axiosRes.post("/bookmarks/", { post: id });
            if (data.profile_id === currentUser.profile_id) {
                setPosts((prevPosts) => ({
                    ...prevPosts,
                    results: prevPosts.results.map((post) =>
                        post.id === id ? { ...post, bookmark_id: data.id } : post
                    ),
                }));
            }
        } catch (err) {
            setErrors(err.response.data);
        }
    };

    const handleUnbookmark = async () => {
        try {
            await axiosRes.delete(`/bookmarks/${bookmark_id}`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) =>
                    post.id === id ? { ...post, bookmark_id: null } : post
                ),
            }));
        } catch (err) {
            setErrors(err.response.data);
        }
    };

    return (
        <Card className={styles.Post}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`} aria-label={`View profile of ${owner}`}>
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
                {title && <Card.Title className="text-center">{title}</Card.Title>}
            </Card.Body>
            <Link to={`/posts/${id}`} aria-label={`View post details of ${title}`}>
                <Card.Img src={image} alt={title} className={styles.PostImage} />
            </Link>
            <Card.Body>
                {artist_name && (
                    <Card.Text>{artist_name}{year_of_artwork && `, ${year_of_artwork}`}</Card.Text>
                )}
                {content && <Card.Text>{content}</Card.Text>}
                <div className={styles.IconsBar}>
                    {is_owner ? (
                        <OverlayTrigger placement="top" overlay={<Tooltip>
                            Users can't like their own posts</Tooltip>}>
                            <i className={`fa-solid fa-heart ${styles.Heart}`} aria-hidden="true" />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleUnlike} aria-label="Unlike this post">
                            <i className={`fa-solid fa-heart ${styles.HeartLiked}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike} aria-label="Like this post">
                            <i className={`fa-solid fa-heart ${styles.Heart}`} />
                        </span>
                    ) : (
                        <OverlayTrigger placement="top" overlay={<Tooltip>
                            You must be logged-in to like posts</Tooltip>}>
                            <i className={`fa-solid fa-heart ${styles.Heart}`} aria-hidden="true" />
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <Link to={`/posts/${id}`} aria-label={`View comments on this post`}>
                        <i className={`fa-solid fa-comment-dots ${styles.Comment}`} aria-hidden="true" />
                    </Link>
                    {comments_count}
                    {!is_owner && currentUser && (
                        <OverlayTrigger placement="top" overlay={<Tooltip>
                            {bookmark_id ? "Remove bookmark" : "Bookmark this post"}</Tooltip>}>
                            <span onClick={bookmark_id ? handleUnbookmark : handleBookmark} aria-label={bookmark_id ? "Remove bookmark" : "Bookmark this post"}>
                                <i className={`fa-solid fa-bookmark ${styles.Bookmark}`} aria-hidden="true" />
                            </span>
                        </OverlayTrigger>
                    )}
                </div>
            </Card.Body>
            {Object.keys(errors).map((key) =>
                Array.isArray(errors[key]) && errors[key].map((message, idx) => (
                    <div key={`${key}-${idx}`} className={feedbackStyles.fixedMessage}>
                        <ErrorMessage message={message} />
                    </div>
                ))
            )}
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
        </Card>
    );
};

export default Post;
