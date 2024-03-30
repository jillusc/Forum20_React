import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../API/axiosDefaults";

const Post = ({ id, profile_id, profile_image, owner, updated_at, title,
    content, image, likes_count, comments_count, postPage, like_id, setPosts, }) => {
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/likes/", { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
                        : post;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };
    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, likes_count: post.likes_count - 1, like_id: null }
                        : post;
                }),
            }));
        } catch (err) {
            console.log(err);
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
                        {is_owner && postPage && "..."}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/posts/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {content && <Card.Text>{content}</Card.Text>}
                <div className={styles.IconsBar}>
                    {is_owner ? (
                        <OverlayTrigger placement="top" overlay={<Tooltip>You can't like your own post!</Tooltip>}>
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
                        <OverlayTrigger placement="top" overlay={<Tooltip>You must be logged-in to like posts.</Tooltip>}>
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

        </Card>
    );
};

export default Post;
