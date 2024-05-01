import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Media from "react-bootstrap/Media";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/UserActivity.module.css";

import Asset from "../../components/Asset";
import Avatar from "../../components/Avatar";
import Comment from "../comments/Comment";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../API/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";

const UserActivity = ({ mobile }) => {
    const currentUser = useCurrentUser();
    const [userComments, setUserComments] = useState({ results: [], loading: true, error: null });
    const [userBookmarks, setUserBookmarks] = useState({ results: [], loading: true, error: null });
    const [, setErrors] = useState({});

    useEffect(() => {
        const fetchUserActivity = async () => {
            if (currentUser?.profile_id) {
                try {
                    const { data } = await axiosReq.get(`/comments/?user_id=${currentUser.profile_id}&user_comments=true`);

                    setUserComments({
                        results: data.results,
                        loading: false,
                        error: null
                    });
                    const { data: bookmarksData } = await axiosReq.get(`/bookmarks/?user_id=${currentUser.profile_id}`);

                    setUserBookmarks({
                        results: bookmarksData.results,
                        loading: false,
                        error: null
                    });
                } catch (err) {
                    setErrors(err.response?.data);
                }
            }
        };
        fetchUserActivity();
    }, [currentUser?.profile_id, setErrors]);

    return (
        <Container className={appStyles.Content}>
            {userComments.loading ? (
                <Asset spinner />
            ) : (
                <InfiniteScroll
                    dataLength={userComments.results.length}
                    next={fetchMoreData}
                    hasMore={false}
                    loader={<Asset spinner />}
                >
                    <h5>My recent activity</h5>
                    {userComments.results.map(comment => (
                        <div key={comment.id} className={`${styles.useractivity}`}>
                            <hr className={`${styles.notHidden}`} />
                            <h6>
                                Comment on post:{" "}
                                <Link to={`/posts/${comment.post}`}>
                                    <span>{comment.post_title}</span>
                                </Link>
                            </h6>
                            <Comment
                                comment={comment}
                                content={comment.content}
                                id={comment.id}
                                owner={comment.owner}
                                profile_id={currentUser.profile_id}
                                profile_image={currentUser.profile_image}
                                updated_at={comment.updated_at}
                                post_title={comment.post_title}
                            />
                        </div>
                    ))}
                    {userBookmarks.results.map(bookmark => (
                        <div key={bookmark.id} className={`${styles.useractivity}`}>
                            <hr className={`${styles.notHidden}`} />
                            <h6>
                                Bookmarked post:{" "}
                                <Link to={`/posts/${bookmark.post}`}>
                                    <span>{bookmark.post_title}</span>
                                </Link>
                            </h6>
                            <Media className="w-100">
                                <Link to={`/profiles/${currentUser.profile_id}`}>
                                    <Avatar src={currentUser.profile_image} />
                                </Link>
                                <Media.Body className={`align-self-center ml-2 ${styles.MediaBody}`}>
                                    <div className={styles.OwnerAndDate}>
                                        <span className={styles.Date}>{bookmark.created_at}</span>                                    </div>
                                    <p className={styles.Comment}>
                                        {bookmark.post_content}
                                    </p>
                                </Media.Body>
                            </Media>
                        </div>
                    ))}

                </InfiniteScroll>
            )}
        </Container>
    );
};

export default UserActivity;
