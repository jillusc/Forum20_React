import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";

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
    const [activeTab, setActiveTab] = useState("comments");

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

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Container className={styles.UserActivity}>
            <Row>
                <Col className="col-12 col-md-10 col-lg-8 mx-auto">
                    <div className={`${appStyles.Content} mb-4`}>
                        <h5>My recent activity</h5>
                        {userComments.loading || userBookmarks.loading ? (
                            <Asset spinner />
                        ) : (
                            <Tabs activeKey={activeTab} onSelect={handleTabChange} className={styles.tabPosition}>
                                <Tab eventKey="comments" title={
                                    <>
                                        <div className={`${styles.TabLink} ${activeTab === "comments" ? styles.TabLink_active : ""}`}>
                                            <i className="fa-solid fa-comment-dots" />Comments
                                        </div>
                                    </>
                                }>
                                    <InfiniteScroll
                                        dataLength={userComments.results.length}
                                        next={fetchMoreData}
                                        hasMore={false}
                                        loader={<Asset spinner />}
                                    >
                                        {userComments.results.map(comment => (
                                            <div key={comment.id}>
                                                <h6 className={styles.CommentsHeader}>
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
                                                />
                                                <hr className={styles.notHidden} />
                                            </div>
                                        ))}
                                    </InfiniteScroll>
                                </Tab>
                                <Tab eventKey="bookmarks" title={
                                    <>
                                        <div className={`${styles.TabLink} ${activeTab === "bookmarks" ? styles.TabLink_active : ""}`}>
                                            <i className="fa-solid fa-bookmark" />Bookmarks
                                        </div>
                                    </>
                                }>
                                    {userBookmarks.results.length === 0 ? (
                                        <div>
                                            <p className={styles.NoBookmarkedPosts}>No bookmarked posts to show.</p>
                                        </div>
                                    ) : (
                                        <InfiniteScroll
                                            dataLength={userBookmarks.results.length}
                                            next={fetchMoreData}
                                            hasMore={false}
                                            loader={<Asset spinner />}
                                        >
                                            {userBookmarks.results.map(bookmark => (
                                                <div key={bookmark.id}>
                                                    <div className={styles.Bookmark_MediaBody}>
                                                        <div>
                                                            <Link to={`/profiles/${currentUser.profile_id}`}>
                                                                <Avatar src={currentUser.profile_image} />
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <h6 className={styles.BookmarksHeader}>
                                                                Bookmarked post:
                                                            </h6>
                                                        </div>
                                                        <div>
                                                            <span className={styles.Date}>{bookmark.created_at}</span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-2">
                                                        <h6>
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
                        )
                        }
                    </div >
                </Col>
            </Row>
        </Container >
    );
};

export default UserActivity;