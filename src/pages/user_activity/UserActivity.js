import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

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
    const [userLikes, setUserLikes] = useState({ results: [], loading: true, error: null });
    const [userComments, setUserComments] = useState({ results: [], loading: true, error: null });
    const [userBookmarks, setUserBookmarks] = useState({ results: [], loading: true, error: null });
    const [, setErrors] = useState({});
    const [activeTab, setActiveTab] = useState("likes");

    useEffect(() => {
        const fetchUserActivity = async () => {
            if (currentUser?.profile_id) {
                try {
                    const { data: likesData } = await axiosReq.get(`/likes/?user_id=${currentUser.profile_id}`);
                    setUserLikes({
                        results: likesData.results,
                        loading: false,
                        error: null
                    });
                    const { data: commentsData } = await axiosReq.get(`/comments/?user_id=${currentUser.profile_id}&user_comments=true`);
                    setUserComments({
                        results: commentsData.results,
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

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Container className={styles.UserActivity}>
            <Row>
                <Col className="col-12 col-md-10 col-lg-8 mx-auto">
                    <div className={`${appStyles.Content} mb-4`}>
                        <h5>My recent activity</h5>
                        {userLikes.loading || userComments.loading || userBookmarks.loading ? (
                            <Asset spinner aria-label="Loading content…" />
                        ) : (
                            <Tabs activeKey={activeTab} onSelect={handleTabChange}
                                className={`${styles.tabPosition} ${styles.verticalTabs}`}>
                                <Tab
                                    eventKey="likes"
                                    aria-labelledby="likes-tab"
                                    title={
                                        <div className={`${styles.TabLink} ${activeTab === "likes" ? styles.TabLink_active : ""}`}>
                                            <i className="fa-solid fa-heart" aria-hidden="true" /> Likes
                                        </div>
                                    }
                                >
                                    {userLikes.results.length === 0 ? (
                                        <div>
                                            <p className={styles.NoContent}>No liked posts to show.</p>
                                        </div>
                                    ) : (
                                        <InfiniteScroll
                                            dataLength={userLikes.results.length}
                                            next={fetchMoreData}
                                            hasMore={false}
                                            loader={<Asset spinner aria-label="Loading content..." />}
                                        >
                                            {userLikes.results.map(like => (
                                                <div key={like.id}>
                                                    <div className="d-flex justify-content-between align-items-end w-100">
                                                        <h6 className={styles.Header}>
                                                            Liked post:
                                                        </h6>
                                                        <span className={styles.Date}>{like.created_at}</span>
                                                    </div>
                                                    <div className="d-flex w-100 align-items-center mb-3">
                                                        <Link to={`/profiles/${currentUser.profile_id}`} className="mr-2">
                                                            <Avatar src={currentUser.profile_image} />
                                                        </Link>
                                                        <h6 className={styles.PostTitle}>
                                                            <Link to={`/posts/${like.post}`}>
                                                                <span>{like.post_title}</span>
                                                            </Link>
                                                        </h6>
                                                    </div>
                                                    <hr className={styles.notHidden} />
                                                </div>
                                            ))}
                                        </InfiniteScroll>
                                    )}
                                </Tab>

                                <Tab
                                    eventKey="comments"
                                    aria-labelledby="comments-tab"
                                    title={
                                        <div className={`${styles.TabLink} ${activeTab === "comments" ? styles.TabLink_active : ""}`}>
                                            <i className="fa-solid fa-comment-dots" aria-hidden="true" /> Comments
                                        </div>
                                    }
                                >
                                    {userComments.results.length === 0 ? (
                                        <div>
                                            <p className={styles.NoContent}>No comments to show.</p>
                                        </div>
                                    ) : (
                                        <InfiniteScroll
                                            dataLength={userComments.results.length}
                                            next={fetchMoreData}
                                            hasMore={false}
                                            loader={<Asset spinner aria-label="Loading content..." />}
                                        >
                                            {userComments.results.map(comment => (
                                                <div key={comment.id}>
                                                    <h6 className={styles.Header}>
                                                        On post:{" "}
                                                        <Link to={`/posts/${comment.post}`}>
                                                            <span>{comment.post_title}</span>
                                                        </Link>
                                                    </h6>
                                                    <Comment
                                                        comment={comment}
                                                        content={comment.content}
                                                        id={comment.id}
                                                        owner={comment.owner}
                                                        hideOwner={true}
                                                        profile_id={currentUser.profile_id}
                                                        profile_image={currentUser.profile_image}
                                                        updated_at={comment.updated_at}
                                                        post_title={comment.post_title}
                                                        setComments={setUserComments}
                                                    />
                                                    <hr className={styles.notHidden} />
                                                </div>
                                            ))}
                                        </InfiniteScroll>
                                    )}
                                </Tab>

                                <Tab
                                    eventKey="bookmarks"
                                    aria-labelledby="bookmarks-tab"
                                    title={
                                        <div className={`${styles.TabLink} ${activeTab === "bookmarks" ? styles.TabLink_active : ""}`}>
                                            <i className="fa-solid fa-bookmark" aria-hidden="true" /> Bookmarks
                                        </div>
                                    }
                                >
                                    {userBookmarks.results.length === 0 ? (
                                        <div>
                                            <p className={styles.NoContent}>No bookmarked posts to show.</p>
                                        </div>
                                    ) : (
                                        <InfiniteScroll
                                            dataLength={userBookmarks.results.length}
                                            next={fetchMoreData}
                                            hasMore={false}
                                            loader={<Asset spinner aria-label="Loading content..." />}
                                        >
                                            {userBookmarks.results.map(bookmark => (
                                                <div key={bookmark.id}>
                                                    <div className="d-flex justify-content-between align-items-end w-100">
                                                        <h6 className={styles.Header}>
                                                            Bookmarked post:
                                                        </h6>
                                                        <span className={styles.Date}>{bookmark.created_at}</span>
                                                    </div>
                                                    <div className="d-flex w-100 align-items-center mb-3">
                                                        <Link to={`/profiles/${currentUser.profile_id}`} className="mr-2">
                                                            <Avatar src={currentUser.profile_image} />
                                                        </Link>
                                                        <h6 className={styles.PostTitle}>
                                                            <Link to={`/posts/${bookmark.post}`}>
                                                                <span>{bookmark.post_title}</span>
                                                            </Link>
                                                        </h6>
                                                    </div>
                                                    <hr className={styles.notHidden} />
                                                </div>
                                            ))}
                                        </InfiniteScroll>
                                    )}
                                </Tab>
                            </Tabs>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UserActivity;
